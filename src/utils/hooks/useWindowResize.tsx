import { useEffect, useState } from "react";

const useWindowsResize = (htmlElement?: HTMLElement) => {
    let [size, setSize] = useState({
        elWidth: htmlElement?.clientWidth,
        elHeight: htmlElement?.clientHeight,
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
    })

    let onResize = () => {
        setSize({
            elWidth: htmlElement?.clientWidth,
            elHeight: htmlElement?.clientHeight,
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        })
    }

    useEffect(() => {
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        }
    })

    return size;
}

export default useWindowsResize;