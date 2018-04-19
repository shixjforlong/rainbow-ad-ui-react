import React from 'react'
import {Upload, Modal} from 'antd'

class Example extends React.Component{
  state = {
    preview: "",
    visible: false,
    imageList: [],
    token: {}
  }

  render() {
    const props = {
      onRemove: (file) => {
        this.setState(({ imageList }) => {
          const index = imageList.indexOf(file);
          const newFileList = imageList.slice();
          newFileList.splice(index, 1);
          return {imageList: newFileList};
        });
      },
      beforeUpload: this.beforeUpload,
      fileList: this.state.imageList,
      onPreview: this.handlePreview,
      accept: "image/*",
      listType: "picture-card"
    };
    const {preview, visible, imageList} = this.state
    return(
	<div>
	  <Upload {...props}>
	    {
	      imageList.length >= 1 ? null : uploadButton
	    }
	  </Upload>
	  <Modal visible={visible} footer={null} onCancel={this.handleCancel}>
	     <img alt="example" style={{ width: '100%' }} src={preview} />
	  </Modal>
	</div>
    )
  }

  //因为我们需要与表单一起上传,所以默认是不去上传到后台服务器.
  beforeUpload = file => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      UploadToOss(this, DRIVER_LICENSE_PATH, file).then(data => {
	this.setState(({ imageList }) => ({
          imageList: [{
            uid: file.uid,
            name: file.name,
            status: file.status,
            type: file.type,
            result: data.name,
            url: reader.result
          }],
        }));
      })
    }
    return false;
  }

  handlePreview = (file) => {
    this.setState({
      preview: file.url || file.thumbUrl,
      visible: true,
    });
  }

  componentDidMount(){
     //使用的sts,向后台服务器请求获取token.
     // setState({token: "you get result"})
  }
}

const client = (self) => {
  const {token} = self.state
  return new window.OSS.Wrapper({
    accessKeyId: token.access_key_id,
    accessKeySecret: token.access_key_secret,
    stsToken: token.security_token,
    region: OSS_ENDPOINT, //常量,你可以自己定义
    bucket: OSS_BUCKET,
  });
}

const uploadPath = (path, file) => {
  return `${path}/${file.name.split(".")[0]}-${file.uid}.${file.type.split("/")[1]}`
}

const UploadToOss = (self, path, file) => {
  const url = uploadPath(path, file)
  return new Promise((resolve, reject) => {
    client(self).multipartUpload(url, file).then(data => {
      resolve(data);
    }).catch(error => {
      reject(error)
    })
  })
}
