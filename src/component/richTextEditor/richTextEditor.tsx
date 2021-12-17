import './index.scss'
import './icon/iconfont.css'
import classNames from 'classnames'
import { createElement, FC, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import Popover from '../popover/popover'
import { Slider } from 'antd'
import React from 'react'
interface OrderListProperty {
    keep: boolean,
    lineNumber: number,
}

interface UnOrderListProperty {
    keep: boolean;
}

export type OptionsEumn = "fontSize" | "underLine" | "fontColor" | "hyperLink" | "picture" | "calendar" | "orderList" | "unOrderList"
const fontSize = [
    { name: "字体", size: "1", style: { fontSize: "13px" } },
    { name: "字体", size: "2", style: { fontSize: "17px" } },
    { name: "字体", size: "3", style: { fontSize: "21px" } },
    { name: "字体", size: "4", style: { fontSize: "25px" } },
    { name: "字体", size: "5", style: { fontSize: "29px" } },
    { name: "字体", size: "6", style: { fontSize: "33px" } },
    { name: "字体", size: "7", style: { fontSize: "37px" } },
]

export interface RichTextEditorProps {
    options?: Array<OptionsEumn>
}

const RichTextEditor = (props: RichTextEditorProps) => {
    let contentRef = useRef<HTMLDivElement>(null);
    let [orderList, setOrderList] = useState<OrderListProperty>({ keep: false, lineNumber: 0 });
    let [unOrderList, setUnOrderList] = useState<UnOrderListProperty>({ keep: false });

    let setFontSize = (size: string) => {
        document.execCommand("fontSize", false, size);
    }

    return <div className="bui-richtexteditor">
        <div className="bui-richtexteditor-header">
            <Popover
                content={
                    <div style={{ width: "100px" }}>
                        <Slider defaultValue={3} min={1} max={7} onChange={(value) => setFontSize(value + "")}/>
                    </div>
                }
            >
                <EditorIcon icon="icon-Word" />
            </Popover>
            <EditorIcon icon="icon-xiahuaxian" onClick={() => {
                document.execCommand("fontSize", false, "1");
            }} />
            <EditorIcon icon="icon-ziyuan" onClick={() => {
                document.execCommand("underline")
            }} />
            <EditorIcon icon="icon-chaolianjie" onClick={() => {
                document.execCommand("createLink", false, "https://www.baidu.com")
            }} />
            <EditorIcon icon="icon-tupian" />
            <EditorIcon icon="icon-rili" />
            <EditorIcon icon="icon-12duanla" onClick={() => { setOrderList({ keep: !orderList.keep, lineNumber: 0 }) }} hover={orderList.keep} />
            <EditorIcon icon="icon-dianduanla" onClick={() => { setUnOrderList({ keep: !unOrderList.keep }) }} hover={unOrderList.keep} />
        </div>
        <div
            className="bui-richtexteditor-content"
            contentEditable
            suppressContentEditableWarning
            ref={contentRef}
        >
            <div style={{ minHeight: "24px", fontSize: "16px" }}></div>
        </div>
    </div>
}
interface EditorIconProps {
    icon: String;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    className?: string;
    hover?: boolean;
    title?: string;
}

const EditorIcon: FC<EditorIconProps & { ref?: React.Ref<HTMLButtonElement> }> = React.forwardRef((props: EditorIconProps, ref) => {
    return <button
        ref={ref}
        className={
            classNames("bui-richtexteditor-icon", "iconfont",
                props.icon,
                props?.className,
                props.hover ? "bui-richtexteditor-icon-hover" : ""
            )
        }
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
    > </button>
})

export default RichTextEditor;