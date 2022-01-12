import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { httpServices } from '../../../../core/backend/http/services';


const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: false,
  action: httpServices.uploadData,
  onChange(info: { file: { name?: any; status?: any; }; fileList: any; }) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e: { dataTransfer: { files: any; }; }) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};


export const  ImportForm = ()=> {


    return (
      <div style={{width: '300px', height: '300px'}}>
      <Dragger {...props} style={{width: '300px', height: '300px'}}>
        <p className="ant-upload-drag-icon"><InboxOutlined /></p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
      Support for a single file. The format must be csv
    </p>

      </Dragger>
      </div>
     
    )

    
}