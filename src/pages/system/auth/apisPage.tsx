import { CommLayout, Table } from "../../../component"
import { Table as AntdTable } from 'antd'
import { useEffect, useRef, useState } from "react";
import { selectPage } from '../../../api/apis'
declare interface dataRow extends Apis {
    key: number | string;
}
declare type dataSource = dataRow[]

const DEFAULT_SIZE = 10;
const DEFAULT_CURRENT = 0;
const ApisPage = () => {
    const [dataSource, setDataSource] = useState<dataSource>();

    const [total, setTotal] = useState(0);
    const [current, setCurrent] = useState(DEFAULT_CURRENT);
    const [pageSize, setPageSize] = useState(DEFAULT_SIZE);
    const pageHeight = useRef<HTMLDivElement>(null);
    const [tableHeight, setTableHeight] = useState<number>(300);
    let getPage = (current: number, pageSize: number, systemId: string) => {
        selectPage(current, pageSize, systemId).then((res) => {
            console.log(res);
            setTotal(res.total);
            setCurrent(res.current);
            setDataSource(res.records.map((item, key) => { return { ...item, key: key } }))
        })
    }

    const columns: column[] = [
        {
            title: '名称',
            dataIndex: 'resourceName',
            key: 'resourceName',
        },
        {
            title: '路径',
            dataIndex: 'resourceUrl',
            key: 'resourceUrl',
        },
        {
            title: '请求方法',
            dataIndex: 'resourceMethod',
            key: 'resourceMethod',
        },
        {
            title: '方法名',
            dataIndex: 'methodName',
            key: 'methodName',
        },
    ]

    let onResize = () => {
        console.log(pageHeight.current?.parentElement?.clientHeight)
        let height = (pageHeight.current?.parentElement?.clientHeight || 0) - 24 - 50

        setTableHeight(height);
    }

    useEffect(() => {
        getPage(0, 100, "1");
    }, [])

    useEffect(() => {
        onResize();
        window.addEventListener("resize", onResize)

        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])
    return (
        <CommLayout ref={pageHeight}>
            <Table add
                onAdd={() => getPage(0, pageSize, "1")}
                columns={columns}
                dataSource={dataSource}
                scroll={{ x: 1000 }}
                autoSize
                height={tableHeight}
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
                        getPage(page, pageSize || 0, "1")
                    }
                }} />
        </CommLayout>
    )
}

export default ApisPage;