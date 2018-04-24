import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import PropTypes from 'prop-types';
import { Form, Input, Modal, Select,DatePicker,Button,Icon,Table,Tooltip } from 'antd';
import { debounce } from 'lodash/function';
import moment from 'moment';
import { connect } from 'dva';

import MediaList from '../../components/MediaList/list'

export default class PageSuccess extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchValues: {
        verbose: 100,
      },
       modalVisible: false,
       expandForm: false,
       selectedRowKeys: [],
       paySuccessdataSource:[],//支付成功页面广告数据
    };
  }

  handleAddCancel = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  render() {
      const itemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 15 },
      };
      const itemcontentLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 25 },
      };

      const columns = [
        {
          title: intl.get('ad.media.mediaName'),//素材名称
          dataIndex: 'mediaName',
        },
        {
          title: intl.get('ad.media.fileShow'),//文件预览
          dataIndex: 'imageCdnpath',
          width: 100,
          render(value) {
            return <img src={value} style={{width:40,height:40}} />
          }
        },
        {
          title: intl.get('ad.media.createTime'),//创建时间
          dataIndex: 'createTime'
        },
        {
          title: intl.get('common.operation'),
          render: ({ _id: id, state }) => (
            <div>
               <Tooltip title="删除">
                  <Button shape="circle" icon="delete" size="small" />
              </Tooltip>
            </div>
          ),
        },
      ];

      return (
        <div>
          <Form>
            <Form.Item {...itemcontentLayout}>
                <Button type="ghost"   onClick={() => this.handleAddCancel(true)}>
                  <Icon type="plus" /> 添加图片
                </Button>
                <Table
                 dataSource={this.state.paySuccessdataSource}
                 columns={columns}
                 pagination={false}
                 size="small"
                 bordered
                 />
            </Form.Item>
            <Form.Item {...itemcontentLayout}  hasFeedback>
             <Input type="text" id="control-textarea"  defaultValue="请输入链接地址,http://"/>
           </Form.Item>
          </Form>
        </div>
      )
  }
}
