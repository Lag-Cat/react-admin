import { Button, Row, Form, Checkbox, Input, message, Col, Modal, Space } from 'antd'
import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { findAll, findById, addUser, updateUser, deleteUser, selectPage } from '../../../api/user'
import { debounce } from '../../../utils/optimize'
import { CommLayout, Panel, Table } from '../../../component'
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
const DEFAULT_SIZE = 10;
const DEFAULT_CURRENT = 0;
const { confirm } = Modal;
const UserPage = () => {
    const [dataSource, setDataSource] = useState<dataSource>();
    const pageHeight = useRef<HTMLDivElement>(null);
    const searchPanel = useRef<HTMLDivElement>(null);
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
                                    getData(0, 0);
                                })
                            }
                        })
                    }}>
                    删除
                </Button>
        },
    ]
    const [total, setTotal] = useState(0);
    const [current, setCurrent] = useState(DEFAULT_CURRENT);
    const [pageSize, setPageSize] = useState(DEFAULT_SIZE);
    const getData = (page: number, pageSize: number) => {
        // findAll().then(res => {
        //     const resp = res.map((item, key) => { let r = (item as dataRow); r.key = key.toString(); return r; })
        //     setDataSource(resp);
        // })
        selectPage(page, pageSize).then(res => {
            console.log(res);
            const resp = res.records.map((item, key) => { let r = (item as dataRow); r.key = key.toString(); return r; })
            setTotal(res.total);
            setCurrent(res.current);
            setDataSource(resp);
        })
    }

    let onResize = () => {
        console.log(pageHeight.current?.parentElement?.clientHeight)
        let height = (pageHeight.current?.parentElement?.clientHeight || 0) - (searchPanel.current?.clientHeight || 0) - 24 - 50

        setTableHeight(height);
    }

    useEffect(() => {
        getData(0, 0);
        onResize();
        window.addEventListener("resize", onResize)

        return () => {
            window.removeEventListener('resize', onResize)
            if (wrap) {
                ReactDOM.unmountComponentAtNode(wrap);
            }
        }
    }, [])

    return (
        <CommLayout style={{ display: "flex", flexDirection: "column" }} ref={pageHeight}>
            <Panel style={{ flex: 0 }} ref={searchPanel}>
                <Row className="m-t-10">
                    <Col span="7">
                        <Row>
                            <Col span="8">id：</Col>
                            <Col span="16"><Input /></Col>
                        </Row>
                    </Col>
                    <Col span="7" offset="1">
                        <Row>
                            <Col span="8">用户名：</Col>
                            <Col span="16"><Input /></Col>
                        </Row>
                    </Col>
                    <Col span="7" offset="1">
                        <Row>
                            <Col span="8">电子邮箱：</Col>
                            <Col span="16"><Input /></Col>
                        </Row>
                    </Col>
                </Row>
            </Panel>
            <Table
                style={{ flex: 1 }}
                columns={columns}
                dataSource={dataSource}
                scroll={{ x: 1000 }}
                autoSize
                height={tableHeight}
                query add
                onQuery={() => getData(0, pageSize)}
                onAdd={() => UserModal({ visible: true, operation: "add" }).then(() => getData(current, pageSize))}
                pagination={{
                    total: total,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    showLessItems: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} 总共 ${total} 条`,
                    pageSizeOptions: ["10", "20", "50", "100"],
                    defaultCurrent: DEFAULT_CURRENT,
                    defaultPageSize: DEFAULT_SIZE,
                    current: current,
                    onChange: (page, pageSize) => {
                        setPageSize(pageSize || 0);
                        setCurrent(page);
                        getData(page, pageSize || 0)
                    }
                }}
                onRow={
                    record => {
                        return {
                            onDoubleClick: event => {
                                UserModal({
                                    visible: true,
                                    dataSource: record,
                                    operation: "update"
                                }).then(() => {
                                    getData(current, pageSize);
                                })
                            }
                        }
                    }
                } >
            </Table>
        </CommLayout >
    )
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