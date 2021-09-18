import { Layout, Menu, Breadcrumb, Avatar, Popover, Tabs, Button, Divider, Drawer, Card, Badge, Image, Switch } from 'antd'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    SettingOutlined,
    CloseOutlined,
    AppstoreOutlined,
    createFromIconfontCN,
    LogoutOutlined
} from '@ant-design/icons';
import layout from './index.module.scss'
import React, { ReactNode, useEffect, useState, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { router } from '../../router'
import { setNewTabIfAbsent, setActiveKey, removeNoticeItem, readNoticeItem } from './lib/indexPage'
import { getSysMenuList } from '../../api/system'
import logo from '../../assets/img/logo.png'
import { loginOut } from './lib/indexPage'
import { create } from 'domain';
import './index.scss'

const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_2654806_z1m63sil87.js"
})
const DEFAULT_ICON = "icon-moren"
const { Header, Footer, Sider, Content } = Layout
const { TabPane } = Tabs;
// interface Notice {
//     id: string,
//     title: string,
//     content: string,
//     __isClose: boolean
// }

interface Res {
    id: number;
    parentId: number;
    menuName: string;
    urlTo: string;
    isDeleted: string;
    createdBy: string;
    isRoot: number;
    seq?: number;
    createdDate: string;
    icon: string;
}

const IndexPage = () => {
    const [sideToggle, setSideToggle] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const activeKey = useSelector((state: IReduxIndex) => state.indexPage.activeKey)
    const [visible, setVisible] = useState<boolean>();
    //const [notice, setNotice] = useState<INotice[]>([]);
    const dispatch = useDispatch();
    const tabItems = useSelector((state: IReduxIndex) => state.indexPage.tabItems)
    const notice = useSelector((state: IReduxIndex) => state.indexPage.drawBar);
    const userInfo = useSelector((state: IReduxIndex) => state.system.userInfo);
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
        let rootNode = res.find(item => item.isRoot === 1)
        if (!rootNode)
            rootNode = { id: 0, parentId: 0, menuName: "", urlTo: "", isDeleted: "0", createdBy: "", createdDate: "", isRoot: 1, icon: "" };

        let menuTmp = getMenuTree(res, rootNode);
        let _memu = renderTree(menuTmp);

        setMainMenu(_memu);
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


    let onDrawItemCloseClick = (item: INotice) => {
        removeNoticeItem(item);
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

    let toggleDrawBar = () => {
        if (!visible) {
            for (let item of notice) {
                readNoticeItem(item);
            }
        }
        setVisible(!visible)
    }

    let onLoginOut = () => {
        loginOut();
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
                <Header className={layout["site-header"]} style={{ flex: "0 1 auto" }}>
                    <div className={layout["site-header-content"]}>
                        {
                            !sideToggle ?
                                <MenuUnfoldOutlined onClick={onMenuToggleClick} onDoubleClick={onMenuToggleDoubleClick} className={layout["site-header-content-icon"]} />
                                : <MenuFoldOutlined onClick={onMenuToggleClick} onDoubleClick={onMenuToggleDoubleClick} className={layout["site-header-content-icon"]} />
                        }
                        <div className={layout["site-header-content-right"]}>
                            <div>{userInfo ? '欢迎您，' + userInfo.userName : "请登录"}</div>
                            <Popover placement="bottomRight" content={<div style={{ display: "flex", flexDirection: "column" }}>
                                <Button icon={<SettingOutlined />} type="link" onClick={() => setNewTabIfAbsent("/user/userSettings")}>个人中心</Button>
                                <Button icon={<SettingOutlined />} type="link" onClick={() => setNewTabIfAbsent("/user/userSettings")}>用户设置</Button>
                                <Divider style={{ margin: "5px 0" }} />
                                <Button icon={<LogoutOutlined />} type="link" onClick={onLoginOut}>退出登录</Button>
                            </div>
                            } trigger="hover">
                                <Avatar
                                    size={36}
                                    src={"http://10.2.78.52:46082/ftp/file/"+userInfo.photo}
                                />

                            </Popover>

                        </div>
                    </div>
                </Header>
                <Content className={layout["site-content"] + " site-content-t"} style={{ flex: "1" }}>
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
                <Footer className={layout["site-footer"]} style={{ flex: "0 1 auto" }}>
                    <div></div>
                    <div className={layout["site-footer-info"]}>developed by banana</div>
                    <div className={layout["site-footer-btn"]}>
                        <Badge dot={notice?.filter(item => !item.read).length > 0 ? true : false}>
                            <AppstoreOutlined onClick={toggleDrawBar} />
                        </Badge>
                    </div>
                </Footer>
            </Layout>
        </Layout>
        <Drawer placement="right" closable={false} visible={visible} onClose={() => setVisible(false)} >
            <div className={layout["site-drawer"]}>
                <div className={"site-drawer-notice"}>
                    {notice?.map((item, k) =>
                        <div className={layout["site-drawer-notice-item"] + " " + (item.__isClose === true ? layout["site-drawer-item-close"] : "")} key={k}>
                            <Card
                                title={item.title}
                                size="small"
                                extra={<div className={layout["site-drawer-notice-item-extra"]}>
                                    <div className={layout["site-drawer-notice-item-btn"]}>
                                        <CloseOutlined onClick={() => onDrawItemCloseClick(item)} />
                                    </div>
                                </div>} >
                                {
                                    item.content
                                }
                            </Card>
                        </div>
                    )}
                </div>
                <div className={layout["site-drawer-settings"]}>
                    <Switch
                        checkedChildren="日间"
                        unCheckedChildren="夜间"
                        defaultChecked
                        onChange={
                            (checked) => {
                                console.log(11)
                                let body = document.getElementsByTagName("body")[0];
                                if (checked) {
                                    body.className = "light-theme";
                                } else {
                                    body.className = "dark-theme";
                                }
                            }
                        }
                    />
                </div>
            </div>
        </Drawer>
    </>
}

interface MenuTreeType extends SysMenu { key: React.Key, children?: MenuTreeType[] }

let getMenuTree = (rows: SysMenu[], node?: SysMenu) => {
    let menuList: MenuTreeType[] = [];
    rows.forEach(item => {
        if (item.id === 0) return;
        if (node && node.id !== item.parentId) return;

        let menuChildren: SysMenu[] = getChild(item, rows)
        if (menuChildren.length === 0) {
            menuList.push({ ...item, key: item.id })
        } else {
            let _menuList = getMenuTree(rows, item);
            menuList.push({ ...item, key: item.id, children: _menuList });
        }
    })

    return menuList;
}

let getChild = (row: SysMenu, rows: SysMenu[]) => {
    return rows.filter(item => row.id === item.parentId);
}

let renderTree = (node: MenuTreeType[]) => {
    let menu: React.ReactNode[] = []
    if (node.length > 1) {
        node.sort((a, b) => {
            let seqA = a.seq || 0, seqB = b.seq || 0;
            if (seqA > seqB)
                return 1;
            else
                return -1
        })
    }
    node.forEach(item => {
        if (!item.children) {
            menu.push(<Menu.Item icon={<IconFont type={item.icon ? item.icon : DEFAULT_ICON} />}
                key={item.id}
                onClick={() => setNewTabIfAbsent(item.urlTo)}
            >
                {item.menuName}
            </Menu.Item>)
        } else {
            let _menuList = renderTree(item.children);
            menu.push(<Menu.SubMenu icon={<IconFont type={item.icon ? item.icon : DEFAULT_ICON} />} key={item.id} title={item.menuName}>
                {_menuList}
            </Menu.SubMenu>)
        }
    })
    return menu;
}
export default IndexPage