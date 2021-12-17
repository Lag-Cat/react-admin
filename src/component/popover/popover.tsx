
import classNames from "classnames";
import React, { FC, useEffect, useRef, useState, isValidElement, createElement } from "react"
import ReactDOM from "react-dom";
import { replaceElement } from '../_util/ReactNode'
import { IBoundingClientRect } from '../_util/_types'
import './index.scss'
declare interface IProps {
    content?: React.ReactNode
}

let container: HTMLDivElement;
const Popover: React.FC<IProps> = (props) => {
    let [visible, setVisible] = useState<boolean>(false);
    let ref = useRef();
    let [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    let NewDom = replaceElement(props.children, props.children, {
        ref: ref,
        onClick: () => {
            setVisible(!visible);
        },
        onMouseEnter: () => {
            setVisible(true);
        },
        onMouseLeave: () => {
            setVisible(false);
        }
    })

    useEffect(() => {
        let clientRect: IBoundingClientRect = (ref.current as any)?.getBoundingClientRect();
        setPosition({
            x: clientRect.x,
            y: clientRect.y + clientRect.height
        })
    }, [visible])

    return <>
        {NewDom}
        <_toolTip position={position} visible={visible} content={props.content} />
    </>
}

declare interface _tooltip_props {
    visible?: boolean,
    content?: React.ReactNode,
    position: { x: number, y: number },
}
const _toolTip: FC<_tooltip_props> = (props) => {
    let [dom, setDom] = useState<HTMLDivElement>(document.createElement("div"));
    let [visible, setVisible] = useState<boolean>(false);
    let [visibleAnimation, setVisibleAnimation] = useState<boolean>(false);
    let [visibleHandle, setVisibleHandle] = useState<NodeJS.Timeout>(setTimeout(() => { }, 0));
    useState(() => {
        if (!container) {
            container = document.createElement("div");
            document.getElementById("root")?.appendChild(container);
        }
        container.appendChild(dom);
    })

    let _setVisible = (_visible: boolean) => {
        if (_visible) {
            setVisible(true);
            clearInterval(visibleHandle);
            setVisibleHandle(setTimeout(() => {
                setVisibleAnimation(true);
            }, 10));
        } else {
            clearInterval(visibleHandle);
            setVisibleAnimation(false);
            setVisibleHandle(setTimeout(() => {
                setVisible(false);
            }, 300));
        }
    }

    useEffect(() => {
        _setVisible(props.visible || false);
    }, [props.visible])

    return ReactDOM.createPortal(
        <div
            className={classNames("popover-tooltip", visibleAnimation ? "popover-tooltip-show" : "popover-tooltip-hide")}
            style={{
                top: props.position.y,
                left: props.position.x,
                display: visible ? "block" : "none",
            }}
            onMouseOver={() => {
                _setVisible(true);
            }}
            onMouseOut={() => {
                _setVisible(false);
            }}
        >
            {props.content}
        </div>
        , dom
    )
}

export default Popover;