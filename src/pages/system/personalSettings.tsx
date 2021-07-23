import { useState } from "react"
import { Button } from 'antd'
import { MainTabs } from './index'
const PersonalSettingsPage = () => {
    let [count, setCount] = useState(0)
    return <div>
        <div>{count}</div>
        <Button type="primary" onClick={() => { setCount(++count) }}>test</Button>
        <Button type="primary" onClick={() => { MainTabs.setNewTabIfAbsent("/user") }}>test2</Button>
    </div>
}

export default PersonalSettingsPage