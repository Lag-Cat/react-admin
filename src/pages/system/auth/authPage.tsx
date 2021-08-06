import { ReactNode, useEffect, useState } from 'react';
import { findAll } from '../../../api/auth'
import { Button, Row, Col, Space, Table, Modal, Form, Input, Checkbox, Tabs, Card, List } from 'antd'
import ReactDOM from 'react-dom'
import UserLov from '../lov/userLov'
import SysmenuLov from '../lov/sysmenuLov'
import { isExists } from '../../../utils/entityUtils'
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
                wrap.remove();
            }
        }
    }, [])

    return <div>
        <Row>
            <Col>
                <Space>
                    <Button type="primary" onClick={() => getData()}>查询</Button>
                    <Button type="primary"
                        onClick={() => UserModal({ visible: true, operation: "add" }).then(() => getData())}
                    >
                        新增
                    </Button>
                </Space>
            </Col>
        </Row>
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
                                operation: "update"
                            }).then(() => {

                                getData();
                            })
                        }
                    }
                }
            } >
        </Table>
    </div>
}

declare type operation = "add" | "update"
interface IUserModalProp {
    visible: boolean,
    dataSource?: dataRow,
    operation: operation,
}

interface SysMenuDataSource extends SysMenu {
    children?: SysMenuDataSource[]
    key: React.Key
}

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
]

const UserModal = (props: IUserModalProp): Promise<void> => {
    if (!wrap) {
        wrap = document.createElement("div");
        // if (wrap)
        //     document.body && document.body.appendChild(wrap);
    }
    return new Promise((resolve__, reject__) => {
        let submitRecord = (data: any): Promise<void> => {
            if (data.status) data.status = 1;
            if (!data.status) data.status = 0;

            return new Promise((resolve, reject) => {
                if (props.operation === "add") { }
                if (props.operation === "update") { }
            })
        }

        let Cmodal = () => {
            let [visible, setVisible] = useState<boolean>(props.visible);
            let [userGroup, setUserGroup] = useState<AuthUserGroup>(props.dataSource as AuthUserGroup);
            let onFinishFailed = () => {

            }
            let onFinish = (values: any) => {
                submitRecord(values).then(() => {
                    setVisible(false);
                });
            }
            let rootNode = userGroup.sysMenus.find(item => item.id === 0)
            if (!rootNode) rootNode = { id: 0, parentId: 0, menuName: "", urlTo: "", isDeleted: "0", createdBy: "", createdDate: "" }
            let sysMenuDs = getMenuTree(userGroup.sysMenus, rootNode);
            return <Modal
                visible={visible}
                title={props.operation === "add" ? "新增" : props.operation === "update" ? "修改" : ""}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <div>
                    <Row>
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
                    <Row>
                        <Col span="16" offset="8">
                            <Checkbox
                                checked={!!userGroup.isDeleted}
                                onChange={(e) => { setUserGroup({ ...userGroup, ...{ isDeleted: e.target.checked ? 1 : 0 } }) }}
                            >
                                禁用
                            </Checkbox>
                        </Col>
                    </Row>
                    <Row>
                        <Card style={{ width: "100%" }}>
                            <Tabs defaultActiveKey="1" style={{ padding: "0px" }}>
                                <Tabs.TabPane tab="用户" key="1" style={{ height: "300px", overflow: "auto" }}>
                                    <List
                                        header={
                                            <div style={{ textAlign: "right" }}>
                                                <Space>
                                                    <Button
                                                        type="link"
                                                        onClick={() => UserLov({
                                                            onSelected: (res) => {
                                                                if (userGroup.users.findIndex((item) => item.id === res.id) === -1)
                                                                    setUserGroup({
                                                                        ...userGroup,
                                                                        users: [
                                                                            ...userGroup.users,
                                                                            ...[res]
                                                                        ]
                                                                    })
                                                            }
                                                        })}>
                                                        添加
                                                    </Button>
                                                </Space>
                                            </div>
                                        }
                                        size="small"
                                    >
                                        {
                                            userGroup.users.map((item, key) => {
                                                return <List.Item key={key}>
                                                    <Row>
                                                        <Col>{item.id}</Col>
                                                        <Col>{item.userName}</Col>
                                                        <Col>{item.email}</Col>
                                                        <Col>
                                                            <Space>
                                                                <Button type="link">删除</Button>
                                                            </Space>
                                                        </Col>
                                                    </Row>
                                                </List.Item>
                                            })
                                        }
                                    </List>
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
                    <Row>
                        <Col span="16" offset="8">
                            <Row>
                                <Col span={11}>
                                    <Button type="primary" htmlType="submit" block>
                                        保存
                                    </Button>
                                </Col>
                                <Col span={11} offset={2}>
                                    <Button type="ghost" block onClick={() => setVisible(false)}>
                                        取消
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Modal>
        }

        ReactDOM.render(<Cmodal></Cmodal>, wrap);
    })
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