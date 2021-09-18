import { Button, Row, Table, Form, Checkbox, Input, message, Col, Modal, Space } from 'antd'
import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { findAll, findById, addUser, updateUser, deleteUser } from '../../../api/user'
import { debounce } from '../../../utils/optimize'
interface dataRow extends UserInfo {
    key: string,
    // id: number,
    // userName: string,
    // email: string,
    // sex: string;
    // phone: string;
    // status: string,
    // groupId: string,
    // createdAt: string,
    // updatedAt: string
}
declare type dataSource = dataRow[]


// const { Column } = Table;
const { confirm } = Modal;
const UserPage = () => {
    const [dataSource, setDataSource] = useState<dataSource>();
    const pageHeight = useRef<HTMLDivElement>(null);
    const [tableHeight, setTableHeight] = useState<number>(300);
    const columns: column[] = [
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
            title: '状态',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '组id',
            dataIndex: 'groupId',
            key: 'groupId',
        },
        {
            title: '创建日期',
            dataIndex: 'createdat',
            key: 'createdat',
        },
        {
            title: '修改日期',
            dataIndex: 'updatedat',
            key: 'updatedat',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text: any, record: dataRow) =>
                <Button
                    type="link"
                    onClick={() => {
                        confirm({
                            title: "提示",
                            content: "是否删除？",
                            onOk() {
                                deleteUser({ id: record.id }).then(() => {
                                    message.success("删除成功")
                                    getData();
                                })
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

    let getTableHeight = (reducer: number, minHeight?: number) => {
        minHeight = minHeight ? minHeight : 300;
        let ph = pageHeight.current?.parentElement?.clientHeight ? pageHeight.current?.parentElement?.clientHeight : minHeight;
        if (ph < minHeight) ph = minHeight;
        return ph - reducer;
    }

    useEffect(() => {
        getData();
        setTableHeight(getTableHeight(240));
        window.onresize = () => {
            setTableHeight(getTableHeight(240));
        }
        return () => {
            if (wrap) {
                ReactDOM.unmountComponentAtNode(wrap);
            }
        }
    }, [])

    console.log(tableHeight, pageHeight.current?.parentElement?.clientHeight)
    return <div ref={pageHeight} style={{ padding: "10px" }}>
        <Row className="m-t-10">
            <Col span="11">
                <Row>
                    <Col span="8">id：</Col>
                    <Col span="16"><Input /></Col>
                </Row>
            </Col>
            <Col span="11" offset="2">
                <Row>
                    <Col span="8">用户名：</Col>
                    <Col span="16"><Input /></Col>
                </Row>
            </Col>
        </Row>
        <Row className="m-t-10">
            <Col span="11">
                <Row>
                    <Col span="8">电子邮箱：</Col>
                    <Col span="16"><Input /></Col>
                </Row>
            </Col>
            <Col span="11" offset="2">
                <Row>
                    <Col span="16" offset="8">
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
            </Col>
        </Row>
        <Table
            columns={columns}
            dataSource={dataSource}
            scroll={{ x: 1000, y: tableHeight }}

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
let wrap: HTMLElement
const UserModal = (props: IUserModalProp): Promise<void> => {
    return new Promise((resolve__, reject__) => {
        if (!wrap) {
            wrap = document.createElement("div");

            if (wrap)
                document.body && document.body.appendChild(wrap);
        }

        let submitRecord = (data: any): Promise<void> => {
            if (data.status) data.status = 1;
            if (!data.status) data.status = 0;

            return new Promise((resolve, reject) => {
                if (props.operation === "add")
                    addUser({ ...props.dataSource, ...data }).then(() => {
                        message.success("保存成功")
                        resolve()
                        resolve__();
                    })
                if (props.operation === "update")
                    updateUser({ ...props.dataSource, ...data }).then(() => {
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
                            label="用户名"
                            name="userName"
                            rules={[{ required: true, message: '请输入用户名' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="电子邮箱"
                            name="email"
                            rules={[{ required: true, message: '请输入电子邮箱' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="组id"
                            name="groupId"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="status" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
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

export default UserPage;