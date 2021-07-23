import { Button, Table } from 'antd'
import { useEffect, useState } from 'react'
import { findAll, findById } from '../../../api/user'
interface dataRow {
    key: string,
    id: number,
    userName: string,
    email: string,
    status: string,
    groupId: string,
    createdAt: string,
    updatedAt: string
}
declare type dataSource = dataRow[]

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
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: '修改日期',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
    },
]


const UserPage = () => {
    const [dataSource, setDataSource] = useState<dataSource>();

    const getData = () => {
        findAll().then(res => {
            const resp = res.map((item, key) => { let r = (item as dataRow); r.key = key.toString(); return r; })
            setDataSource(resp);
        })
    }

    useEffect(() => {
        getData();
    }, [])

    return <div>
        <div><Button type="primary" onClick={() => getData()}>查询</Button></div>
        <Table columns={columns} dataSource={dataSource} />
    </div>
}

export default UserPage;