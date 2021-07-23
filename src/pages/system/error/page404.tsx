import { Empty } from "antd";

const Page404 = () => {
    return (
        <Empty
            style={{ marginTop: "150px" }}
            description={
                <span>
                    没有找到页面（404），
                </span>
            }
        />
    );
}

export default Page404;