import { Layout, Menu, Breadcrumb, Avatar, Popover, Tabs, Button, Divider, Drawer, Card, Badge } from 'antd'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    CloseOutlined,
    AppstoreOutlined
} from '@ant-design/icons';
import layout from './index.module.scss'
import React, { ReactNode, useEffect, useState, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { router } from '../../router'
import { setNewTabIfAbsent, setActiveKey } from './lib/indexPage'
import { getSysMenuList } from '../../api/system'

const { Header, Footer, Sider, Content } = Layout
const { TabPane } = Tabs;
interface Notice {
    id: string,
    title: string,
    content: string,
    __isClose: boolean
}

interface Res {
    id: number;
    parentId: number;
    menuName: string;
    urlTo: string;
    isDeleted: string;
    createdBy: string;
    createdDate: string;
}

const IndexPage = () => {
    const [sideToggle, setSideToggle] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const activeKey = useSelector((state: IReduxIndex) => state.router.activeKey)
    const [visible, setVisible] = useState<boolean>();
    const [notice, setNotice] = useState<Notice[]>();
    const dispatch = useDispatch();
    const tabItems = useSelector((state: IReduxIndex) => state.router.tabItems)
    const [MainMenu, setMenu] = useState<ReactNode[]>();


    window.onresize = () => {
        if (window.innerWidth <= 768)
            setIsMobile(true);
        else
            setIsMobile(false);
    }

    useEffect(() => {
        setNewTabIfAbsent("/home");
        getSysMenuList().then(res => {
            let getChild = (row: Res, rows: Res[]) => {
                return rows.filter(item => row.id === item.parentId);
            }

            let getMenuTree = (rows: Res[], node?: Res) => {
                let menuList: ReactNode[] = [];
                rows.forEach(item => {
                    if (item.id === 0) return;
                    if (node && node.id !== item.parentId) return;

                    let menuChildren: Res[] = getChild(item, rows)
                    if (menuChildren.length === 0) {
                        menuList.push(
                            <Menu.Item key={item.id} onClick={() => setNewTabIfAbsent(item.urlTo)}>{item.menuName}</Menu.Item>
                        )
                    } else {
                        let _menuList = getMenuTree(rows, item);

                        menuList.push(
                            <Menu.SubMenu key={item.id} title={item.menuName}>
                                {_menuList}
                            </Menu.SubMenu>
                        );
                    }
                })

                console.log(menuList)
                return menuList;
            }

            let rootNode = res.find(item => item.id === 0)
            let menu = getMenuTree(res, rootNode);
            setMenu(menu);
        })
        // let ws = new WebSocket("ws://10.2.78.52:46082/test")
        // ws.onopen = () => {
        //     ws.send("hello")
        // }

        // ws.onmessage = (e) => {
        //     console.log(e.data);
        //     // setNotice([...(notice ? notice : []),
        //     //  ...[{ id: new Date().getTime().toString(), title: e.data, content: e.data, __isClose: false }]])
        //     notice?.push({ id: new Date().getTime().toString(), title: e.data, content: e.data, __isClose: false })
        //     setNotice(notice)
        // }
    }, [])

    let onEdit = (targetKey: string | React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>, action: "add" | "remove") => {
        console.log(targetKey, action)
        if (action === "remove") {
            let t = tabItems.findIndex(item => item.id === targetKey);
            if (t > 0)
                setActiveKey(tabItems[t - 1].id)
            else if (t === 0 && tabItems.length > 1)
                setActiveKey(tabItems[t + 1].id)
            dispatch({
                type: "REMOVE_ADD",
                payload: targetKey
            })
        }
        //setTabItems(tabItems.filter(item => item.id !== targetKey))
    }

    let onDrawItemCloseClick = (item: Notice) => {
        setNotice(notice?.map(item1 => {
            if (item1.id === item.id) {
                item1.__isClose = true;
            }
            return item1
        }))

        setTimeout(() => {
            setNotice(notice?.filter(item1 => !item1.__isClose))
        }, 1000 * 1);
    }
    const SiderMenu = <>
        <div className={layout["site-sider-logo"]} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[]}>
            <Menu.Item key="1" icon={<UserOutlined />} onClick={() => setNewTabIfAbsent("/personalSettings")}>
                nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />} onClick={() => setNewTabIfAbsent('/messageRecord')}>
                nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
                nav 3
            </Menu.Item>
        </Menu>
    </>


    return <>
        <Layout style={{ height: "100%" }} className={layout["site-layout"]} >
            <Sider style={sideToggle ? {} : { marginLeft: "-200px" }}>
                {/* {SiderMenu} */}
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[]}>
                    {MainMenu ? MainMenu : <></>}
                </Menu>
            </Sider>

            <Layout>
                <Header className={layout["site-header"]}>
                    <div className={layout["site-header-content"]}>
                        {
                            !sideToggle ?
                                <MenuUnfoldOutlined onClick={() => setSideToggle(true)} className={layout["site-header-content-icon"]} />
                                : <MenuFoldOutlined onClick={() => setSideToggle(false)} className={layout["site-header-content-icon"]} />
                        }
                        <Popover placement="bottomRight" content={<>
                            <div><a>设置</a></div>
                            <div><a onClick={() => router.push({ path: "/login" })}>注销</a></div>
                        </>
                        } trigger="click">
                            <Avatar size={36} icon={<UserOutlined />} />
                        </Popover>
                    </div>
                </Header>
                <Content className={layout["site-content"]}>
                    <Tabs hideAdd type="editable-card" onEdit={onEdit} onChange={(activeKey) => setActiveKey(activeKey)} activeKey={activeKey} >
                        {
                            tabItems.map((item: TabItem) => <TabPane tab={item.title} key={item.id} closable={!item.notCloseable} >
                                {
                                    <Suspense fallback={<></>}><item.content /></Suspense>
                                }
                            </TabPane>)
                        }
                    </Tabs>
                </Content>
                <Footer className={layout["site-footer"]}>
                    <div className={layout["site-footer-info"]}>developed by banana</div>
                    <div className={layout["site-footer-btn"]}>
                        <Badge dot>
                            <AppstoreOutlined onClick={() => setVisible(!visible)} />
                        </Badge>
                    </div>
                </Footer>
            </Layout>
        </Layout>
        <Drawer placement="right" closable={false} visible={visible} onClose={() => setVisible(false)}>
            {notice?.map((item, k) =>
                <div className={layout["site-drawer-item"] + " " + (item.__isClose === true ? layout["site-drawer-item-close"] : "")} key={k}>
                    <Card
                        title={item.title}
                        size="small"
                        extra={<div className={layout["site-drawer-item-extra"]}>
                            <div className={layout["site-drawer-item-btn"]}>
                                <CloseOutlined onClick={() => onDrawItemCloseClick(item)} />
                            </div>
                        </div>} >
                        {
                            item.content
                        }
                    </Card>
                </div>
            )}
        </Drawer>
    </>
}

export default IndexPage