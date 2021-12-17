import './index.scss'
import classnames from 'classnames'
import { FC } from 'react';
import React from 'react';
interface CommLayoutProps {
    className?: string;
    style?: React.CSSProperties;
}
const CommLayout: FC<CommLayoutProps & { ref?: React.Ref<HTMLDivElement> }> = React.forwardRef((props, ref) => {
    return (
        <div
            className={classnames("comm-layout", props.className)}
            style={props.style}
            ref={ref}
        >
            {props.children}
        </div>
    );
});

export default CommLayout;