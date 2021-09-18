import { Button } from "antd"
import React, { ReactNode } from "react";
import { addNoticeItem } from '../system/lib/indexPage'
import './inedx.scss'
interface props {
    test11: number
}
const TestPage = (props: props) => {
    return <div className="testpage">
        <Button type="primary" onClick={() => {
            addNoticeItem({
                title: "test",
                content: "test123"
            })
        }}>测试1</Button>
        <div className="font">{props.test11}</div>

    </div>
}

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