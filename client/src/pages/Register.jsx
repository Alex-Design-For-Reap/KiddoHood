import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register = () => {
  const [formState, setFormState] = useState({ 
    username: '',
    email: '',
    password: '',
  }); 
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // Update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Submit form
  const handleFormSubmit = async (values) => {
    try {
      const { data } = await addUser({
        variables: { ...values },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  const [form] = Form.useForm();
  
  return (
    <>
      {Auth.loggedIn() ? (
        <p>
          You are already Logged in! You may now head to{' '}
          <Link to="/Dashboard"> Dashboard.</Link>
        </p>
      ) : (
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={handleFormSubmit} // Use handleFormSubmit here
        style={{ maxWidth: 600,
          margin:'auto'

         }}
        scrollToFirstError
        >
        <Form.Item
          name="username"
          label="Username"
          value={formState.username}
          onChange={handleChange}
          rules={[
            {
              required: true,
              message: 'Please input your username!',
              whitespace: true,
            },
          ]}
          >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          value={formState.email}
          onChange={handleChange}
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
          >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          value={formState.password}
          onChange={handleChange}
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
          >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      )}
      {error && (
        <div>
          {error.message}
        </div>
      )}
    </>
  );
};

export default Register;
