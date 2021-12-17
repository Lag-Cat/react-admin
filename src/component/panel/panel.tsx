import './index.scss'
import classnames from 'classnames'
import { FC, LegacyRef } from 'react';
import React from 'react';
interface PanelProps {
    className?: string,
    style?: React.CSSProperties
    //ref?: React.RefObject<HTMLDivElement>
}
const Panel: FC<PanelProps & { ref?: React.Ref<HTMLDivElement> }> = React.forwardRef((props, ref) => {
    return (
        <div
            className={classnames("bui-panel", props.className)}
            ref={ref}
            style={props.style}
        >
            {props.children}
        </div>
    );
});
export default Panel;


