import { Button, Space, Table as AntdTable, TableProps as AntdTableProps } from 'antd'
import { CSSProperties, useEffect, useRef, useState } from 'react'
import Panel from '../panel/panel'
import classnames from 'classnames'
import './index.scss'
interface TableProps extends AntdTableProps<any> {
    add?: Boolean;
    update?: Boolean;
    remove?: Boolean;
    query?: Boolean;
    onAdd?: () => void;
    onUpdate?: () => void;
    onRemove?: () => void;
    onQuery?: () => void | undefined;
    className?: string;
    style?: React.CSSProperties;
    height?: number,
    autoSize?: boolean
}
interface RecordType { }
const Table: React.FC<TableProps> = (props) => {
    let [tableHeight, setTableHeight] = useState<number>(0);
    let componentRef = useRef<HTMLDivElement>(null);
    let [id] = useState(new Date().getTime())
    let firstLoad = true;
    let onResize = () => {
        if (props.autoSize && props.height && !firstLoad) {
            let pagination = document.getElementsByClassName("bui-table-" + id)[0].getElementsByClassName("ant-table-pagination")
            let paginationHeight = pagination.length > 0 ? pagination[0].clientHeight + 32 : 64
            let height = (props.height || 0)
                - document.getElementsByClassName("bui-table-" + id)[0].getElementsByClassName("ant-table-thead")[0].clientHeight
                - document.getElementsByClassName("bui-table-" + id)[0].getElementsByClassName("bui-table-control")[0].clientHeight
                - paginationHeight
                - 8;
            setTableHeight(height)
        }
    }

    useEffect(() => {
        onResize();
    }, [props.height])

    firstLoad = false;
    return <Panel
        className={classnames("bui-table", "bui-table-" + id, props.className)}
        style={props.style}
    // ref={componentRef}
    >
        <div className="bui-table-control" >
            <Space style={{ float: "right" }}>
                {props.query && <Button type="primary" onClick={props.onQuery}>查询</Button>}
                {props.add && <Button type="primary" onClick={props.onAdd}>新增</Button>}
                {props.update && <Button type="primary" onClick={props.onUpdate}>修改</Button>}
                {props.remove && <Button type="primary" danger onClick={props.onRemove}>删除</Button>}
            </Space>
        </div>
        <AntdTable {...props}
            {...(props.autoSize && props.height) ? { scroll: { y: tableHeight } } : {}}
        />
    </Panel>
}

export default Table;