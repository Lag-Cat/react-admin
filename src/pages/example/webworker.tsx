import { Button, Input } from "antd";
import { useState } from "react"

const WebWorkerPage = () => {
    let [sendMessage, setSendMessage] = useState<string>("");
    let [callbackMessage, setCallBackMessage] = useState<string>("");

    const onClick = () => {
        let worker = new Worker("/worker/demo1.js")
        worker.postMessage(sendMessage);
        worker.onmessage = (e) => {
            setCallBackMessage(e.data);
            worker.terminate();
        }
    }

    return <>
        <Input value={sendMessage} onChange={(e) => { setSendMessage(e.target.value) }} />
        <Input value={callbackMessage} readOnly />
        <Button type="primary" onClick={onClick}>send</Button>
    </>
}

export default WebWorkerPage