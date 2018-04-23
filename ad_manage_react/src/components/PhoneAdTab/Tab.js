import React, { Component } from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import AdPayPage from '../../components/AdPayPage/Page';

export default class Tab extends Component {

     tabChange = values => {
       console.log("1111==="+values);
     }

     render() {
        return (
          <div className="card-container">
            <Tabs
              type="card"
              size="large"
              tabBarStyle={{ marginBottom: 24 }}
              animated={{ inkBar: true, tabPane: false }}
              defaultActiveKey="1"
              onChange={this.tabChange}
            >
              <TabPane tab="支付页面" key="1">
                 <AdPayPage />
              </TabPane>
              <TabPane tab="支付成功页面" key="2">
                 <p>22222</p>
              </TabPane>
            </Tabs>
          </div>
        )
    }

}
