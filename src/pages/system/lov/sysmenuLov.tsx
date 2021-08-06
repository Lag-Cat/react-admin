
import { Input, Modal, List, Row, Col, Table } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { findAll } from '../../../api/sysMenu'

interface ILovProp {
    onSelected?: (res: SysMenu[]) => any | undefined
}

interface DataSource extends SysMenu {
    children?: DataSource[]
    key: React.Key
}

let wrap: HTMLElement = document.createElement("div");
const UserLov = (props: ILovProp) => {

    if (!wrap) {
        wrap = document.createElement("div");

        // if (wrap) document.body && document.body.appendChild(wrap);
    }

    let Cmodal = () => {
        let [visible, setVisible] = useState<boolean>(true);
        let [dataSource, setDataSource] = useState<SysMenu[]>();

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
                title: "备注",
                dataIndex: "memo",
                key: "memo"
            },
        ];

        let onSearch = () => {
            findAll().then((res) => {
                let getChild = (row: SysMenu, rows: SysMenu[]) => {
                    return rows.filter(item => row.id === item.parentId);
                }
                let getMenuTree = (rows: SysMenu[], node?: SysMenu) => {
                    let menuList: DataSource[] = [];
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

                    console.log(menuList)
                    return menuList;
                }
                let rootNode = res.find(item => item.id === 0)
                let menu = getMenuTree(res, rootNode);
                setDataSource(menu)
            })
        }

        let onRemove = () => {
            ReactDOM.unmountComponentAtNode(wrap);
            wrap.remove();
        }

        useEffect(() => {
            onSearch();
        }, [])

        return (
            <Modal
                visible={visible}
                title="选择菜单"
                onOk={() => setVisible(false)}
                onCancel={() => {
                    setVisible(false);
                    ReactDOM.unmountComponentAtNode(wrap)
                }}
                footer={null}
            >
                <div>
                    <Input.Search onSearch={() => {
                        onSearch();
                    }} />
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        pagination={false}
                        onRow={(record) => {
                            return {
                                onDoubleClick: e => {
                                    if (props.onSelected) {
                                        let r = [record] as DataSource[]
                                        console.log(record)
                                        let getChild = (node: DataSource[]) => {
                                            let res: SysMenu[] = [];
                                            for (let item of node) {
                                                let i: any = item
                                                if (item.children && item.children.length > 0)
                                                    res = [...getChild(item.children), ...res]
                                                let newObj: any = {};
                                                Object.keys(item).forEach((key: string) => {
                                                    if (key === "children" || key === "key")
                                                        return;
                                                    newObj[key] = i[key]
                                                })
                                                res.push(newObj)
                                            }
                                            return res;
                                        }
                                        props.onSelected(getChild(r));
                                    }
                                    onRemove();
                                }
                            }
                        }}></Table>
                </div>
            </Modal >
        );
    };

    ReactDOM.render(<Cmodal></Cmodal>, wrap);
};

export default UserLov;
