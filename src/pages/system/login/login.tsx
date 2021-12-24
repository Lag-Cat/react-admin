import React, { useState } from "react";
import { Button, Form, Input, Checkbox, message, Divider, Row, Col, Card } from "antd";
import styles from "./index.module.scss";
// import { login } from '../../../api/system'
import { useDispatch } from 'react-redux'
import { router } from '../../../router'
import { login } from '../../index/lib/system'
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
        if (!account) {
            message.error("请输入用户id/邮箱/手机号");
            return;
        }
        if (!password) {
            message.error("请输入密码");
            return;
        }
        login(account, password).then((res) => {
            message.success('登录成功');
            setTimeout(() => {
                router.push({ path: "/index" })
            }, 1 * 2000);
        })
    }
    return <div className={styles.login}>
        <div className={styles["header"]}></div>
        <div className={styles.banner}>
            <div className={styles["panel-login"]}>
                <Row>
                    <Col className={styles["title"]} span={24}>
                        用户登录
                    </Col>
                </Row>
                <Row className={styles["item-input"]}>
                    <Col span={24}>
                        <Input
                            placeholder="请输入用户id/邮箱/手机号"
                            value={account}
                            onChange={(e) => {
                                setAccount(e.target.value);
                            }}
                            onKeyPress={(e) => {
                                if (e.key == "Enter")
                                    userLogin();
                            }}
                        />
                    </Col>
                </Row>
                <Row className={styles["item-input"]}>
                    <Col span={24}>
                        <Input.Password
                            placeholder="请输入密码"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            onKeyPress={(e) => {
                                if (e.key == "Enter")
                                    userLogin();
                            }}
                        />
                    </Col>
                </Row>
                <Row className={styles["item-input"]} >
                    <Col span={12}>
                        <Checkbox>记住我</Checkbox>
                    </Col>
                    <Col span={12} className={styles["forgetpsw"]}>
                        <div>忘记密码</div>
                    </Col>
                </Row>
                <Row className={styles["item-input"]}>
                    <Col span={24}>
                        <Button
                            type="primary"
                            onClick={userLogin}
                            block>
                            登录
                        </Button>

                    </Col>
                </Row>
                <Row className={styles["item-input"]}>
                    <Col span={24}>
                        <Button
                            type="dashed"
                            block
                        >
                            注册
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
        <div className={styles.notice}>
            <Divider />
            <div>
                <Row>
                    <Col xs={24} sm={24} md={16} >
                        <Card className={styles["notice-card"]} title="Default size card" size="small" extra={<a href="#">More</a>} >
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={8} >
                        <Card className={styles["notice-card"]} title="Default size card" size="small" extra={<a href="#">More</a>} >
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={16} >
                        <Card className={styles["notice-card"]} title="Default size card" size="small" extra={<a href="#">More</a>} >
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={8} >
                        <Card className={styles["notice-card"]} title="Default size card" size="small" extra={<a href="#">More</a>} >
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
}

export default LoginPage;