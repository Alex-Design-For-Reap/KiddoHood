import React from 'react';
import { HeartOutlined } from '@ant-design/icons';
import { Avatar, Card, Button, Badge } from 'antd';

const { Meta } = Card;

const Cards = ({ title, description, imageUrl, likesCount, onMoreInfo }) => (
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
      <Button type="primary" onClick={onMoreInfo}>
        More Information
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

const EventsPage = ({ title, description, imageUrl, likesCount, onMoreInfo }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
    <Cards
      title={title}
      description={description}
      imageUrl={imageUrl}
      likesCount={likesCount}
      onMoreInfo={onMoreInfo}
    />
  </div>
);

export default EventsPage;
