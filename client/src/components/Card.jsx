import { HeartOutlined } from '@ant-design/icons';
import { Avatar, Card, Badge, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const Cards = ({ title, description, imageUrl, likesCount, onMoreInfo }) => (
  <Card
    hoverable
    style={{
      width: '100%',
      margin: '0 auto',
    }}
    cover={
      <img
        alt={title}
        src={imageUrl}
        style={{ height: '200px', objectFit: 'cover' }}
      />
    }
actions={[
  <div key="more-info">
    {onMoreInfo}
  </div>
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

// actions={[
//   <div key="more-info">
//     {onMoreInfo}
//   </div>