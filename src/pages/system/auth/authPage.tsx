import { ReactNode, useEffect, useState } from 'react';
import { findAll, addRecord, updateRecord, deleteRecord, refreshAuthMenu } from '../../../api/auth'
import { Button, Row, Col, Space, Table, Modal, Form, Input, Checkbox, Tabs, Card, List, message } from 'antd'
import ReactDOM from 'react-dom'
import userLov from '../lov/userLov'
import SysmenuLov from '../lov/sysmenuLov'
import { isExists } from '../../../utils/entityUtils'
import { CommLayout, Panel } from '../../../component'

interface dataRow {
    key: string,
    id: number,
    groupName: string,
    isDeleted: number,
    memo: string,
    createdBy: string,
    createdDate: string,
    updatedBy: string,
    updatedDate: string,
    sysMenus: SysMenu[],
    users: UserInfo[];
}
declare type dataSource = dataRow[]

let wrap: HTMLElement;
const AuthPage = () => {
    const [dataSource, setDataSource] = useState<dataSource>();
    const [refreshMenuBtnState, setRefreshMenuBtnState] = useState<boolean>(false);
    const columns: column[] = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '用户组名称',
            dataIndex: 'groupName',
            key: 'groupName',
        },
        {
            title: '是否禁用',
            dataIndex: 'isDeleted',
            key: 'isDeleted',
            render: (text: any) => {
                return <Checkbox checked={!!text} />
            }
        },
        {
            title: '备注',
            dataIndex: 'memo',
            key: 'memo',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text: any, record: dataRow) =>
                <Button
                    type="link"
                    onClick={() => {
                        Modal.confirm({
                            title: "提醒",
                            content: "是否删除?",
                            onOk() {
                                deleteRecord(record).then(() => { getData() })
                            }
                        })
                    }}>
                    删除
                </Button>
        },
    ]
    const getData = () => {
        findAll().then(res => {
            const resp = res.map((item, key) => { let r = (item as dataRow); r.key = key.toString(); return r; })
            setDataSource(resp);
        })
    }

    useEffect(() => {
        getData();
        return () => {
            if (wrap) {
                ReactDOM.unmountComponentAtNode(wrap);
                userLov().distory();
                wrap.remove();
            }
        }
    }, [])

    return <CommLayout>
        <Panel>
            <Row>
                <Col>
                    <Space>
                        <Button type="primary" onClick={() => getData()}>查询</Button>
                        <Button type="primary"
                            onClick={() => UserModal({ visible: true, operation: "add", onFinish: () => { getData() } })}
                        >
                            新增
                        </Button>
                        <Button
                            type="primary"
                            loading={refreshMenuBtnState}
                            onClick={() => {
                                setRefreshMenuBtnState(true);
                                refreshAuthMenu().then(() => {
                                    message.success("刷新成功");
                                    setRefreshMenuBtnState(false);
                                })
                            }}
                        >
                            刷新菜单
                        </Button>
                    </Space>
                </Col>
            </Row>
        </Panel>
        <Panel>
            <Table
                columns={columns}
                dataSource={dataSource}
                onRow={
                    record => {
                        return {
                            onDoubleClick: event => {
                                UserModal({
                                    visible: true,
                                    dataSource: record,
                                    operation: "update",
                                    onFinish: () => { getData() }
                                })
                            }
                        }
                    }
                } >
            </Table>
        </Panel>
    </CommLayout >
}

declare type operation = "add" | "update"
interface IUserModalProp {
    visible: boolean,
    dataSource?: dataRow,
    operation: operation,
    onFinish?: () => any
}

interface SysMenuDataSource extends SysMenu {
    children?: SysMenuDataSource[]
    key: React.Key,
}

const UserModal = (props: IUserModalProp) => {
    if (!wrap) {
        wrap = document.createElement("div");
        // if (wrap)
        //     document.body && document.body.appendChild(wrap);
    }
    let submitRecord = (data: AuthUserGroup): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (props.operation === "add") {
                addRecord(data).then(() => {
                    if (props.onFinish) props.onFinish();
                    resolve();
                })
            }
            if (props.operation === "update") {
                updateRecord(data).then(() => {
                    if (props.onFinish) props.onFinish();
                    resolve();
                })
            }
        })
    }

    let Cmodal = () => {
        let [visible, setVisible] = useState<boolean>(props.visible);
        let [userGroup, setUserGroup] = useState<AuthUserGroup>((props.dataSource || { users: [], sysMenus: [] }) as AuthUserGroup);
        const sysmenuColumns: column[] = [
            {
                title: "菜单名称",
                dataIndex: "menuName",
                key: "menuName"
            },
            {
                title: "是否启用",
                dataIndex: "isDeleted",
                key: "isDeleted",
                render: (data: number) => <><Checkbox checked={data === 0}></Checkbox></>
            },
            {
                title: "备注",
                dataIndex: "memo",
                key: "memo"
            },
            {
                title: "操作",
                dataIndex: "operation",
                key: "operation",
                render: (text: string, record: SysMenu) => <Button type="link" onClick={() => {
                    let rootNode = record;
                    let getChildNodeList = (node: SysMenu) => {
                        let childNodes: SysMenu[] = [];
                        childNodes.push(node);
                        let children = getChild(node, userGroup.sysMenus);
                        for (let item of children) {
                            childNodes = [...childNodes, ...getChildNodeList(item)]
                        }

                        return childNodes
                    }
                    let deleteList = getChildNodeList(rootNode);
                    setUserGroup({
                        ...userGroup,
                        sysMenus: userGroup.sysMenus.filter(item => {
                            for (let item1 of deleteList) {
                                if (item1.id === item.id) return false;
                            }
                            return true;
                        })
                    })
                }}>删除</Button>
            }
        ]
        const userColumns: column[] = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: '电子邮箱',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: "操作",
                dataIndex: "operation",
                key: "operation",
                render: (text: string, record: UserInfo) => <Button type="link" onClick={() => {
                    setUserGroup({
                        ...userGroup,
                        users: userGroup.users.filter(item => item.id !== record.id)
                    })
                }}>删除</Button>
            }
        ]
        let onFinishFailed = () => {

        }
        let onSave = () => {
            submitRecord(userGroup).then(() => {
                setVisible(false);
            });
        }
        // let sysMenuDs;
        // if (userGroup && userGroup.sysMenus) {
        let rootNode = userGroup.sysMenus.find(item => item.id === 0)
        if (!rootNode) rootNode = { id: 0, parentId: 0, menuName: "", urlTo: "", isDeleted: "0", createdBy: "", createdDate: "", icon: "" }
        let sysMenuDs = getMenuTree(userGroup.sysMenus, rootNode);
        // }

        return <Modal
            visible={visible}
            title={props.operation === "add" ? "新增" : props.operation === "update" ? "修改" : ""}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            footer={null}
        >
            <div>
                <Row >
                    <Col span="7" style={{ textAlign: "right" }}>用户组名称:  </Col>
                    <Col span="16" offset="1">
                        <Input value={userGroup.groupName}
                            onChange={(e) => {
                                setUserGroup({
                                    ...userGroup,
                                    ...{ groupName: e.target.value }
                                })
                            }}
                        />
                    </Col>
                </Row>
                <Row className="m-t-10">
                    <Col span="16" offset="8">
                        <Checkbox
                            checked={!!userGroup.isDeleted}
                            onChange={(e) => { setUserGroup({ ...userGroup, ...{ isDeleted: e.target.checked ? 1 : 0 } }) }}
                        >
                            禁用
                        </Checkbox>
                    </Col>
                </Row>
                <Row className="m-t-10">
                    <Card style={{ width: "100%" }}>
                        <Tabs defaultActiveKey="1" style={{ padding: "0px" }}>
                            <Tabs.TabPane tab="用户" key="1" style={{ height: "300px", overflow: "auto" }}>
                                <Space>
                                    <Button
                                        type="link"
                                        onClick={() => userLov({
                                            onSelected: (res) => {
                                                if (userGroup.users.findIndex((item) => item.id === res.id) === -1) {
                                                    setUserGroup({
                                                        ...userGroup,
                                                        users: [
                                                            ...userGroup.users,
                                                            ...[res]
                                                        ]
                                                    })
                                                }
                                            }
                                        })}>
                                        添加
                                    </Button>
                                </Space>
                                <Table
                                    columns={userColumns}
                                    dataSource={userGroup.users.map((item, key) => { return { ...item, key: key } })}
                                    pagination={false} />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="菜单" key="2" style={{ height: "300px", overflow: "auto" }}>
                                <Space>
                                    <Button
                                        type="link"
                                        onClick={() => SysmenuLov({
                                            onSelected: (res) => {
                                                setUserGroup({
                                                    ...userGroup,
                                                    sysMenus: [
                                                        ...userGroup.sysMenus,
                                                        ...res.filter((item) => !isExists(item, ['id'], userGroup.sysMenus))
                                                    ]
                                                })
                                            }
                                        })}
                                    >添加</Button>
                                </Space>
                                <Table
                                    columns={sysmenuColumns}
                                    dataSource={sysMenuDs}
                                    pagination={false} />
                            </Tabs.TabPane>
                        </Tabs>
                    </Card>
                </Row>
                <Row className="m-t-10">
                    <Col span="24" >
                        <div className="c-on-right">
                            <Space>
                                <Button type="primary" htmlType="submit" onClick={onSave}>
                                    保存
                                </Button>
                                <Button type="ghost" onClick={() => setVisible(false)}>
                                    取消
                                </Button>
                            </Space>
                        </div>
                    </Col>
                </Row>
            </div>
        </Modal>
    }

    ReactDOM.render(<Cmodal></Cmodal>, wrap);
}

let getChild = (row: SysMenu, rows: SysMenu[]) => {
    return rows.filter(item => row.id === item.parentId);
}

let getMenuTree = (rows: SysMenu[], node?: SysMenu) => {
    let menuList: SysMenuDataSource[] = [];
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

export default AuthPage;