import { Form, Input, Select, Button, Radio, Upload, message } from 'antd'
import { useEffect, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { getCurrentUserInfo, updateUserInfo } from '../../../api/user'
import { UploadChangeParam } from 'antd/lib/upload';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';
import { upload } from '../../../api/files'
const { Option } = Select;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
let photo = ""
const UserSettingPage = () => {
    // const [data, setData] = useState<UserInfo>();

    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
    const onFinish = (values: UserInfoM) => {

        updateUserInfo({ ...values, photo: photo }).then(() => {
            message.success("保存成功")
        })
    };

    const onReset = () => {
        form.resetFields();
    };

    const onFill = () => {
    };

    const onChange = (info: UploadChangeParam<UploadFile<any>>) => {
        setFileList(info.fileList);
    };

    const beforeUpload = (file: RcFile) => {
        setFileList([...fileList, file])
        upload("1", file);
        console.log(file);
        return false
    }

    useEffect(() => {
        getCurrentUserInfo().then((res) => {
            form.setFieldsValue(res)
        })
    }, [])
    return <div>

        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item name="userName" label="用户名" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="email" label="电子邮箱" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="phone" label="电话" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item
                name="sex"
                label="性别"
                rules={[{ required: true, message: 'Please pick an item!' }]}
            >
                <Radio.Group>
                    <Radio value="male">男</Radio>
                    <Radio value="female">女</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item name="photo1" label="头像">
                <ImgCrop rotate>
                    <Upload
                        listType="picture-card"
                        action="http://10.2.78.52:46082/ftp/upload"
                        headers={{
                            Authorization: localStorage.getItem("token") || ""
                        }}
                        name="file"
                        onChange={(info) => {
                            console.log(info.file.response)
                            if (info.file.status === 'done') {
                                photo = info.file.response.data;
                            }
                        }}
                        // beforeUpload={beforeUpload}
                        // // fileList={fileList}
                        // // onChange={onChange}
                        maxCount={1}
                    >
                        {fileList.length < 1 && '+ Upload'}
                    </Upload>
                </ImgCrop>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    保存
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    取消
                </Button>
            </Form.Item>
        </Form>
    </div>
}


export default UserSettingPage;