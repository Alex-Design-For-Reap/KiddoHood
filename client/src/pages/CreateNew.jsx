import React from 'react';
import { Button, DatePicker, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const CreateNew = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item name="title" label="Event Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="date" label="Event Date" rules={[{ required: true }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="address" label="Address" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="details" label="More Details">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="upload" label="Upload Photo">
        <Upload>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Event
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateNew;
