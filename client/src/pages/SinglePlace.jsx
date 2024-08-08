import React from 'react';
import { Button, Form, Input, List } from 'antd';
import { Comment } from '@ant-design/compatible';

const SinglePlace = () => {
  const comments = [
    {
      author: 'User1',
      content: 'Great event!',
    },
    {
      author: 'User2',
      content: 'Looking forward to it.',
    },
  ];

  const handleSubmit = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div>
      <img src="" alt="" />
      <h1>Event Title</h1>
      <p>Event details and description here.</p>
      <Form onFinish={handleSubmit}>
        <Form.Item name="comment">
          <Input.TextArea rows={4} placeholder="Add a comment" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Comment
          </Button>
        </Form.Item>
      </Form>
      <List
        header={`${comments.length} replies`}
        dataSource={comments}
        renderItem={(item) => (
          <Comment author={item.author} content={item.content} />
        )}
      />
    </div>
  );
};

export default SinglePlace;
