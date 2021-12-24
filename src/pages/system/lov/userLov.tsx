import { Input, Modal, List, Row, Col } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { findAll } from '../../../api/user'

interface IUserLovProp {
  onSelected?: (res: UserInfo) => any | undefined
}

let wrap: HTMLElement = document.createElement("div");
const userLov = (props?: IUserLovProp) => {

  if (!wrap) {
    wrap = document.createElement("div");
  }

  let remove = () => {
    ReactDOM.unmountComponentAtNode(wrap);
  }

  let Cmodal = () => {
    let [visible, setVisible] = useState<boolean>(true);
    let [dataSource, setDataSource] = useState<UserInfo[]>();
    let onSearch = () => {
      findAll().then((res) => {
        setDataSource([...res])
      })
    }

    useEffect(() => {
      onSearch();
    }, [])

    return (
      <Modal
        visible={visible}
        title="选择用户"
        onOk={() => setVisible(false)}
        onCancel={() => {
          setVisible(false);
          ReactDOM.unmountComponentAtNode(wrap)
        }}
        footer={null}
      >
        <div>
          <Input.Search onSearch={() => {
            onSearch();
          }} />
          <List>
            <Row>
              <Col span="2">id</Col>
              <Col span="9">用户名称</Col>
              <Col span="9">电子邮箱</Col>
              <Col span="2">组id</Col>
              <Col span="2">是否删除</Col>
            </Row>
            {
              dataSource?.map((item, key) => <List.Item onDoubleClick={() => {
                if (props?.onSelected) props.onSelected(item);
                remove();
              }}>
                <Row style={{ width: "100%" }}>
                  <Col span="2">{item.id}</Col>
                  <Col span="9">{item.userName}</Col>
                  <Col span="9">{item.email}</Col>
                  <Col span="2">{item.groupId}</Col>
                  <Col span="2">
                    <Checkbox checked={!!item.status} />
                  </Col>
                </Row>
              </List.Item>)
            }
          </List>
        </div>
      </Modal >
    );
  };
  ReactDOM.render(<Cmodal></Cmodal>, wrap);

  return {
    distory:()=>{
      remove();
    }
  }
};

export default userLov;
