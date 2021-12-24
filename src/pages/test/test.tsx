import { Button, Checkbox, Modal } from "antd"
import React, { ReactNode } from "react";
import { addNoticeItem } from '../index/lib/indexPage'
import './inedx.scss'
import { testExcel } from '../../api/test'
import { Table, CommLayout, Panel, RichTextEditor } from '../../component'
interface props {
    test11: number
}
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
                        }
                    })
                }}>
                删除
            </Button>
    },
]
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
const TestPage = (props: props) => {
    return <div>
        {/* <Button type="primary" onClick={() => {
            console.log(document.getElementById("test")?.innerHTML);
            console.log(window.getSelection()?.getRangeAt(0));
        }}>测试</Button>

        <div contentEditable suppressContentEditableWarning style={{ height: "400px", width: "400px", border: "1px solid #000" }} id="test">
            <img src="http://10.2.78.52:46082/ftp/file/16" style={{ height: "50px", width: "50px" }} />
        </div> */}
        <RichTextEditor></RichTextEditor>
    </div>
}

// const TestPage = (props: props) => {

//     return <CommLayout style={{ display: "flex", flexDirection: "column", height: "100%" }}>
//         <Panel style={{ flex: 0 }}>
//             <Button type="primary" onClick={() => {
//                 // addNoticeItem({
//                 //     title: "test",
//                 //     content: "test123"
//                 // })

//                 testExcel().then((data) => {
//                     console.log(data);
//                 })
//             }}>测试1</Button>
//             <div className="font">{props.test11}</div>
//         </Panel>
//         <Table
//             dataSource={[]}
//             columns={columns} add update query remove
//             onAdd={() => { console.log("add") }}
//             onUpdate={() => { console.log("update") }}
//             onQuery={() => { console.log("query") }}
//             onRemove={() => { console.log("remove") }}
//             style={{ flex: "1" }}
//             pagination={{}}
//         ></Table>
//     </CommLayout >
// }

// interface ITitle { title: string, subtitle: string }

// const TestPage = () => {
//     return <div>
//         <AntdTree
//             titleRender={(c: ITitle) => {
//                 return <Title {...c} ></Title>
//             }}
//         />
//     </div >
// }

// const Title: React.FC<ITitle> = (props) => {
//     return <div>
//         <div>{props.title}</div>
//         <div>{props.subtitle}</div>
//     </div>
// }

// const AntdTree = (props: { titleRender: (c: ITitle) => ReactNode }) => {
//     let title: ITitle = { title: "title", subtitle: "subtitle" }

//     return <div>
//         <div className="title">{props.titleRender(title)}</div>
//     </div>
// }


export default TestPage