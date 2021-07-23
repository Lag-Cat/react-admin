import { Button, Table, Checkbox } from 'antd'
import { useEffect, useState } from 'react'
import { getSysMenuList } from '../../../api/system'

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

interface dataSource extends SysMenu {
    children?: SysMenu[]
    key: React.Key
}

const MenuPage = () => {
    const [dataSource, setDataSource] = useState<dataSource[]>();

    const getData = () => {
        getSysMenuList().then(res => {
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
        <div><Button type="primary" onClick={() => getData()}>查询</Button></div>
        <Table columns={columns} dataSource={dataSource} pagination={false}></Table>
    </div>
}

export default MenuPage;