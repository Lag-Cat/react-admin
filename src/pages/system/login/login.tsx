import React, { useState } from "react";
import { Button, Form, Input, Checkbox, message } from "antd";
import styles from "./index.module.scss";
import { login } from '../../../api/system'
import { useDispatch } from 'react-redux'
import { router } from '../../../router'
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const LoginPage = () => {
    let [account, setAccount] = useState("");
    let [password, setPassword] = useState("");
    let dispatch = useDispatch();
    const userLogin = () => {
        login({ account, password }).then((res) => {
            message.success('登录成功');
            dispatch({ type: "SET_TOKEN", payload: { token: res.token.token } });
            setTimeout(() => {
                router.push({ path: "/" })
            }, 1 * 2000);
        })
    }
    return <div className={styles.login}>
        <div className={styles["panel-login"]}>
            <Form {...layout}>
                <Form.Item
                    label="用户"
                    name="username"
                    rules={[{ required: true, message: "Please input your username!" }]}
                >
                    <Input
                        placeholder="用户id/邮箱/手机号"
                        value={account}
                        onChange={(e) => {
                            setAccount(e.target.value);
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                >
                    <Input.Password
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>记住我</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" onClick={userLogin}>
                        登录
                    </Button>
                    <Button
                        type="ghost"
                        htmlType="button"
                        style={{ background: "white", margin: "0 8px" }}

                    >
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>
}

export default LoginPage;