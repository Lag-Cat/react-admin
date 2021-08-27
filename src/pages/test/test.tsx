import { Button } from "antd"
import { addNoticeItem } from '../system/lib/indexPage'
const TestPage = () => {
    return <>
        <Button type="primary" onClick={() => {
            addNoticeItem({
                title: "test",
                content: "test123"
            })
        }}>测试1</Button>
    </>
}

export default TestPage