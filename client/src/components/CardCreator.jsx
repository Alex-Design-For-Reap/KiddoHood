// import React from 'react';
import { HeartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card, Button, Badge } from 'antd';

const { Meta } = Card;

const CardCreator = ({ title, description, imageUrl, likesCount, onEdit, onDelete }) => (
  <Card
    style={{
      width: 300,
      margin: 20,
    }}
    cover={
      <img
        alt={title}
        src={imageUrl}
        style={{ height: '200px', objectFit: 'cover' }}
      />
    }
    actions={[
      <Button type="primary" icon={<EditOutlined />} onClick={onEdit}>
        Edit
      </Button>,
      <Button type="primary" danger icon={<DeleteOutlined />} onClick={onDelete}>
        Delete
      </Button>,
    ]}
  >
    <Meta
      title={title}
      description={description}
      avatar={
        <Badge count={likesCount} showZero>
          <Avatar icon={<HeartOutlined />} style={{ backgroundColor: '#f56a00' }} />
        </Badge>
      }
    />
  </Card>
);

export default CardCreator;
