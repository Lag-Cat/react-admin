import { ReactNode, useState } from "react";
import ReactDOM from 'react-dom';
interface Props {
    children?: ReactNode,
    onClose?: () => any,
    isOpen?: boolean,
}

const ActionSheet = (props: Props) => {
    let onClick = () => { if (props.onClose) props.onClose() }
    console.log(props.isOpen)
    return <div style={{ position: "fixed", height: "100%", width: "100%", zIndex: 999 }}>
        <div style={{ position: "absolute", zIndex: 99 }}>{props.children}</div>
        {props.isOpen ? <div style={{ position: "absolute", height: "100%", width: "100%", background: "rgba(0,0,0,0.5)" }} onClick={onClick} ></div> : null}
    </div>
}

export default ActionSheet;