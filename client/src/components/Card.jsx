// import React from 'react';
import { HeartOutlined } from '@ant-design/icons';
import { Avatar, Card, Button, Badge } from 'antd';
// import { Link } from 'react-router-dom';

const { Meta } = Card;

const events = [
    {
      id: 1,
      title: "Amazing Event",
      description: "Join us for an amazing event full of fun!",
      imageUrl: "https://media.istockphoto.com/id/458119657/photo/tentertainment-music-festival-england.jpg?s=612x612&w=0&k=20&c=HeOd_zmNAS3QQptcZrypASP9eZgu-hQNKSY7SrC_3rw=",
      likesCount: 15,
    },
    {
      id: 2,
      title: "Outdoor Adventure",
      description: "Experience the thrill of the outdoors!",
      imageUrl: "https://media.istockphoto.com/id/458119657/photo/tentertainment-music-festival-england.jpg?s=612x612&w=0&k=20&c=HeOd_zmNAS3QQptcZrypASP9eZgu-hQNKSY7SrC_3rw=",
      likesCount: 30,
    },
    {
      id: 3,
      title: "Art Exhibition",
      description: "Explore beautiful art pieces from local artists.",
      imageUrl: "https://media.istockphoto.com/id/458119657/photo/tentertainment-music-festival-england.jpg?s=612x612&w=0&k=20&c=HeOd_zmNAS3QQptcZrypASP9eZgu-hQNKSY7SrC_3rw=",
      likesCount: 45,
    },
    // Add more events as needed
  ];

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

const EventsPage = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
    {events.map((event) => (
      <Cards
        key={event.id}
        title={event.title}
        description={event.description}
        imageUrl={event.imageUrl}
        likesCount={event.likesCount}
        onMoreInfo={() => console.log(`More information about ${event.title}`)}
      />
    ))}
  </div>
);

// export default Cards;
export default EventsPage;
