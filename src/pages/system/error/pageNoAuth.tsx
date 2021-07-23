import { Empty } from "antd";

const PageNoAuth = () => {
    return <Empty
        style={{ marginTop: "150px" }}
        description={
            <span>
                没有权限
            </span>
        }
    />
}

export default PageNoAuth