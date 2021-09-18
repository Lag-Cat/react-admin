import { Button, Table, Checkbox, Modal, message, Form, Input, Row, Col, Space } from 'antd'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { findAll, addRecord, updateRecord, deleteRecord } from '../../../api/sysMenu'
interface dataRow {
    key: string,
    id: number,
    parentId: number;
    menuName: string;
    urlTo: string;
    isDeleted: string;
    createdBy: string;
    createdDate: string;
}


interface dataSource extends SysMenu {
    children?: SysMenu[]
    key: React.Key
}

const MenuPage = () => {
    const [dataSource, setDataSource] = useState<dataSource[]>();
    const [tableHeight, setTableHeight] = useState<number>(300);
    const columns: column[] = [
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
            title: "顺序",
            dataIndex: "seq",
            key: "seq",
        },
        {
            title: "备注",
            dataIndex: "memo",
            key: "memo"
        },
        {
            title: "操作",
            key: "operation",
            render: (text, record: dataRow) => {
                return <>
                    <Space>
                        <Button
                            type="link"
                            onClick={() => {
                                let ds: any = { parentId: record.id };
                                cModal({ operation: "addChild", dataSource: ds, visible: true }).then(() => {
                                    getData();
                                })
                            }}
                        >
                            新增子菜单
                        </Button>
                        <Button
                            type="link"
                            onClick={() => {
                                cModal({ operation: "update", visible: true, dataSource: record }).then(() => {
                                    getData();
                                })
                            }}
                        >
                            修改
                        </Button>
                        <Button type="link"
                            onClick={() => {
                                Modal.confirm({
                                    title: "提醒",
                                    content: "是否删除?",
                                    onOk() {
                                        deleteRecord({ id: record.id }).then(() => { getData(); })
                                    }
                                })
                            }}
                        >
                            删除
                        </Button>
                    </Space>
                </>
            }
        }
    ];
    const getData = () => {
        findAll().then(res => {
            let getChild = (row: SysMenu, rows: SysMenu[]) => {
                return rows.filter(item => row.id === item.parentId);
            }
            let getMenuTree = (rows: SysMenu[], node?: SysMenu) => {
                let menuList: dataSource[] = [];
                rows.forEach(item => {
                    if (item.id === 0) return;
                    if (node && node.id !== item.parentId) return;

                    let menuChildren: SysMenu[] = getChild(item, rows)
                    if (menuChildren.length === 0) {
                        menuList.push({ ...item, key: item.id })
                    } else {
                        let _menuList = getMenuTree(rows, item);
                        if (_menuList.length > 1) {
                            _menuList.sort((a, b) => {
                                let seqA = a.seq || 0, seqB = b.seq || 0;
                                if (seqA > seqB)
                                    return 1;
                                else
                                    return -1
                            })
                        }
                        menuList.push({ ...item, key: item.id, children: _menuList });
                    }
                })

                console.log(menuList)
                return menuList;
            }
            let rootNode = res.find(item => item.id === 0)
            let menu = getMenuTree(res, rootNode);
            setDataSource(menu)
        })
    }

    useEffect(() => {

        getData();
    }, [])

    return <div>
        <Space>
            <Button type="primary" onClick={() => getData()}>查询</Button>
            <Button type="primary"
                onClick={
                    () => cModal({ operation: "add", visible: true })
                        .then(() => {
                            getData();
                        })
                }>新增</Button>
        </Space>
        <Table columns={columns} dataSource={dataSource} pagination={false}></Table>
    </div>
}

declare type operation = "add" | "update" | "addChild"
interface IUserModalProp {
    visible: boolean,
    dataSource?: dataRow,
    operation: operation,
}
let wrap: HTMLElement
const cModal = (props: IUserModalProp): Promise<void> => {
    return new Promise((resolve__, reject__) => {
        if (!wrap) {
            wrap = document.createElement("div");

            if (wrap)
                document.body && document.body.appendChild(wrap);
        }

        let submitRecord = (data: any): Promise<void> => {
            if (data.isDeleted) data.isDeleted = 1;
            if (!data.isDeleted) data.isDeleted = 0;

            return new Promise((resolve, reject) => {
                if (props.operation === "add")
                    addRecord({ ...props.dataSource, ...data }).then(() => {
                        message.success("保存成功")
                        resolve()
                        resolve__();
                    })
                if (props.operation === "update")
                    updateRecord({ ...props.dataSource, ...data }).then(() => {
                        message.success("保存成功")
                        resolve()
                        resolve__();
                    })
                if (props.operation === "addChild")
                    addRecord({ ...props.dataSource, ...data }).then(() => {
                        message.success("保存成功")
                        resolve()
                        resolve__();
                    })
            })

        }

        let Cmodal = () => {
            let [visible, setVisible] = useState<boolean>(props.visible);
            let onFinishFailed = () => {
                message.error("表单中存在填写错误。")
            }
            let onFinish = (values: any) => {
                submitRecord(values).then(() => {
                    setVisible(false);
                });
            }
            return <Modal
                visible={visible}
                title={props.operation === "add" ? "新增" : props.operation === "update" ? "修改" : ""}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <div style={{ margin: "40px 30px 10px 0px" }}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ ...props.dataSource }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="菜单名称"
                            name="menuName"
                            rules={[{ required: true, message: '请输入用户名' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="url"
                            name="urlTo"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="顺序"
                            name="seq"
                        >
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item
                            label="备注"
                            name="memo"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item name="isDeleted" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox>禁用</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        }

        ReactDOM.render(<Cmodal></Cmodal>, wrap);
    })
}

export default MenuPage;