// import React from 'react';
import { HeartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card, Badge } from 'antd';

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
      <div key="edit"> {onEdit} </div>,
      <div key="delete"> {onDelete} </div>
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

const DashboardPage = ({ title, description, imageUrl, likesCount, onEdit, onDelete }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
    <CardCreator
      title={title}
      description={description}
      imageUrl={imageUrl}
      likesCount={likesCount}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  </div>
);

export default DashboardPage;
