// import React from 'react';
import { Button, DatePicker, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import Auth from '../utils/auth';
import PleaseLogin from '../components/PleaseLogin';

const CreateNew = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <h1>Create New Event</h1>
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item 
      name="title" 
      label="Event Title" 
      rules={[{ required: true, message: 'Please enter the event title' }]}>
        <Input />
      </Form.Item>
      <Form.Item 
      name="date" 
      label="Event Date" 
      rules={[{ required: true, message: 'Please enter the event date'}]}>
        <DatePicker />
      </Form.Item>
      <Form.Item 
      name="address" 
      label="Address" 
      rules={[{ required: true, message: 'Please enter the event address'}]}>
        <Input />
      </Form.Item>
      <Form.Item 
      name="description" 
      label="Event Description" 
      rules={[{ required: true, message: 'Please enter the event description'}]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item 
      name="upload" 
      label="Upload Photo" 
      rules={[{required: true, message: 'Please upload an image for the event cover'}]}>
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
      </>
      ) : (
        <>
          <PleaseLogin />
        </>
      )}

    </div>
  );
};

export default CreateNew;
