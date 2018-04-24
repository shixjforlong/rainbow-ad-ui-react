import React, { Component } from 'react';
import { Tabs,Form,Input } from 'antd';
const TabPane = Tabs.TabPane;

import AdPayPage from '../../components/AdPayPage/Page';
import AdPaySuccessPage from '../../components/AdPayPage/PageSuccess'

export default class Tab extends Component {

     onConfirmTab1 = (selectMedia) => {
         console.log(selectMedia);
     }

     onConfirmTab2= (selectMedia) => {
         console.log(selectMedia);
     }

     tabChange = values => {
       console.log("1111==="+values);
     }

     render() {
       const itemLayout = {
         labelCol: { span: 5 },
         wrapperCol: { span: 15 },
       };

        return (
          <div className="card-container">
            <Tabs
              type="card"
              size="small"
              tabBarStyle={{ marginBottom: 24 }}
              animated={{ inkBar: true, tabPane: false }}
              defaultActiveKey="1"
              onChange={this.tabChange}
            >
              <TabPane tab="支付页面" key="1">
                 <AdPayPage
                   onConfirmTab = {this.onConfirmTab1}
                 />
              </TabPane>
              <TabPane tab="支付成功(广告链接)" key="2">
                <Form>
                  <Form.Item {...itemLayout}  label="链接地址" hasFeedback>
                   <Input type="text" id="control-textarea"/>
                 </Form.Item>
                </Form>
              </TabPane>
              <TabPane tab="支付成功(广告图片)" key="3">
                 <AdPaySuccessPage
                  onConfirmTab = {this.onConfirmTab3}
                 />
              </TabPane>
            </Tabs>
          </div>
        )
    }

}
