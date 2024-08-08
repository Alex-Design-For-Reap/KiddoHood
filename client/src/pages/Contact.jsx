import React from 'react';
import { Button, Form, Input } from 'antd';

const ContactUs = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // You can handle form submission here (e.g., send the data to an API)
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto' }}>
      <h1>Contact Us</h1>
      <Form
        form={form}
        name="contact_us"
        onFinish={onFinish}
        layout="vertical"
        requiredMark="optional"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input placeholder="Your name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input placeholder="Your email" />
        </Form.Item>

        <Form.Item
          name="subject"
          label="Subject"
          rules={[{ required: true, message: 'Please enter the subject' }]}
        >
          <Input placeholder="Subject" />
        </Form.Item>

        <Form.Item
          name="message"
          label="Message"
          rules={[{ required: true, message: 'Please enter your message' }]}
        >
          <Input.TextArea rows={4} placeholder="Your message" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactUs;
