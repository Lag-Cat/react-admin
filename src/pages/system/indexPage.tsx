import { Layout, Menu, Breadcrumb, Avatar, Popover, Tabs, Button, Divider, Drawer, Card, Badge, Image } from 'antd'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    CloseOutlined,
    AppstoreOutlined,
    createFromIconfontCN
} from '@ant-design/icons';
import layout from './index.module.scss'
import React, { ReactNode, useEffect, useState, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { router } from '../../router'
import { setNewTabIfAbsent, setActiveKey } from './lib/indexPage'
import { getSysMenuList } from '../../api/system'
import logo from '../../assets/img/logo.png'
import { create } from 'domain';
import './index.scss'

const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_2654806_z1m63sil87.js"
})
const DEFAULT_ICON = "icon-moren"
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
    icon: string;
}

const IndexPage = () => {
    const [sideToggle, setSideToggle] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const activeKey = useSelector((state: IReduxIndex) => state.router.activeKey)
    const [visible, setVisible] = useState<boolean>();
    const [notice, setNotice] = useState<Notice[]>();
    const dispatch = useDispatch();
    const tabItems = useSelector((state: IReduxIndex) => state.router.tabItems)
    const [MainMenu, setMainMenu] = useState<ReactNode[]>();
    const [showIconOnly, setShowIconOnly] = useState<boolean>(false);
    const [menu, setMenu] = useState<Res[]>([]);
    let LOCK_DOUBLECLICK: NodeJS.Timeout;
    window.onresize = () => {
        if (window.innerWidth <= 768)
            setIsMobile(true);
        else
            setIsMobile(false);
    }

    useEffect(() => {
        setNewTabIfAbsent("/home");
        getSysMenuList().then(res => {
            setMenu(res)
        })
    }, [])

    useEffect(() => {
        setMenuTree(menu)
        console.log(IconFont, "iconfont")
    }, [showIconOnly, menu])

    let setMenuTree = (res: Res[]) => {
        console.log(res);
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
                        <Menu.Item icon={<IconFont type={item.icon ? item.icon : DEFAULT_ICON} />}
                            key={item.id}
                            onClick={() => setNewTabIfAbsent(item.urlTo)}
                        >
                            {item.menuName}
                        </Menu.Item>
                    )
                } else {
                    let _menuList = getMenuTree(rows, item);

                    menuList.push(
                        <Menu.SubMenu icon={<IconFont type={item.icon ? item.icon : DEFAULT_ICON} />} key={item.id} title={item.menuName}>
                            {_menuList}
                        </Menu.SubMenu>
                    );
                }
            })
            return menuList;
        }

        let rootNode = res.find(item => item.id === 0)
        let menu = getMenuTree(res, rootNode);
        setMainMenu(menu);
    }

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

    let onMenuToggleClick = () => {
        if (!sideToggle) {
            setSideToggle(true);
            setShowIconOnly(false);
            return;
        }
        clearTimeout(LOCK_DOUBLECLICK)
        LOCK_DOUBLECLICK = setTimeout(() => {
            setShowIconOnly(true);
            setSideToggle(false);
        }, 300);
    }

    let onMenuToggleDoubleClick = () => {
        setSideToggle(!sideToggle);
        clearTimeout(LOCK_DOUBLECLICK);
    }
    return <>
        <Layout style={{ height: "100%" }} className={layout["site-layout"]} >
            <Sider style={{ ...sideToggle ? {} : { marginLeft: showIconOnly ? "" : "-200px" } }}
                className={layout["site-siderbar"]}
                trigger={null}
                collapsible
                collapsed={showIconOnly}
            >
                {/* {SiderMenu} */}
                <div className={layout["siderbar-title"]}>
                    <Image
                        style={{ ...showIconOnly ? { opacity: 0 } : {}, transition: "0.5s all" }}
                        width={200}
                        src={logo}
                        preview={false}
                    />
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[]}>
                    {MainMenu ? MainMenu : <></>}
                </Menu>
            </Sider>

            <Layout>
                <Header className={layout["site-header"]}>
                    <div className={layout["site-header-content"]}>
                        {
                            !sideToggle ?
                                <MenuUnfoldOutlined onClick={onMenuToggleClick} onDoubleClick={onMenuToggleDoubleClick} className={layout["site-header-content-icon"]} />
                                : <MenuFoldOutlined onClick={onMenuToggleClick} onDoubleClick={onMenuToggleDoubleClick} className={layout["site-header-content-icon"]} />
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
                <Content className={layout["site-content"] + " site-content-t"}>
                    <Tabs className="content-tabs" hideAdd type="editable-card" onEdit={onEdit} onChange={(activeKey) => setActiveKey(activeKey)} activeKey={activeKey} >
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