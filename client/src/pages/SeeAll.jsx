// import React from 'react';
import { Col, Row } from 'antd';
// import Cards from '../components/Card';
import { useQuery, gql} from '@apollo/client';
import EventsPage from '../components/Card';
import { QUERY_EVENTS } from '../utils/queries';

const SeeAll = () => {
  const { loading, data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>All Events</h1>
      <Row gutter={16}>
        {data.events.map(event => (
          <Col span={8} key={event._id}>
            <EventsPage
              title={event.title}
              description={event.description}
              imageUrl={event.imageUrl || "https://media.istockphoto.com/id/458119657/photo/tentertainment-music-festival-england.jpg?s=612x612&w=0&k=20&c=HeOd_zmNAS3QQptcZrypASP9eZgu-hQNKSY7SrC_3rw="}
              likesCount={event.likesCount}
              onMoreInfo={() => console.log(`More information about ${event.title}`)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default SeeAll;
