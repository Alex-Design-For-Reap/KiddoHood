// import { useState } from 'react';
// import React, { useState } from 'react';
// import { Comment, Form } from '@ant-design/compatible';
// import '@ant-design/compatible/assets/index.css';
// import { Card, Button, Input, List, Modal } from 'antd';
import { Card } from 'antd';
import { useQuery} from '@apollo/client';
import { useParams } from 'react-router-dom';
import {QUERY_SINGLE_EVENT} from '../utils/queries';

// const { TextArea } = Input;

const SingleEvent = () => {
  const { eventId } = useParams(); // Extract eventId from route parameters
  console.log('Event ID:', eventId);
  const { loading, data } = useQuery(QUERY_SINGLE_EVENT, {
    variables: { eventId: eventId },
  });

  console.log('Event data:', data);

  // const [modalVisible, setModalVisible] = useState(false);
  // const [newComment, setNewComment] = useState('');

  // const handleAddComment = () => {
  //   // Add logic to handle comment submission here
  //   setNewComment('');
  //   setModalVisible(false);
  // };

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  const event = data?.event || {};
  console.log('Event:', event);



  return (
    <div>
      {/* Event Image Header */}
      <Card
        cover={
          <img
            alt="Event"
            src={event.imageUrl || 'https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1699909962/fallback_image_header/fallback_image_header-png?_i=AA'} // Fallback if imageUrl is not available
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
        }
      >
        <h1>Title: {event.title}</h1>
        <p>Descritpion: {event.description}</p>
        <p>Location: {event.location}</p>
        <p>Date: {event.eventDate ? new Date(event.eventDate).toLocaleDateString() : 'No Date Available'}</p> {/* Format date if needed */}
        <p>Likes: {event.likesCount}</p>
        <p>Created At: {event.createdAt ? new Date(event.createdAt).toLocaleDateString() : 'No Created Date Available'}</p>      </Card>

      {/* Comment List */}
      {/* <List
        className="comment-list"
        header={`${event.comments.length} replies`}
        itemLayout="horizontal"
        dataSource={event.comments}
        renderItem={item => (
          <li key={item._id}>
            <Comment
              author={item.username}
              content={item.commentText}
              datetime={new Date(item.createdAt).toLocaleString()} // Format date if needed
            />
          </li>
        )}
      /> */}

      {/* Button to Open Modal for New Comment */}
      {/* <Button type="primary" onClick={() => setModalVisible(true)}>
        Add Comment
      </Button> */}

      {/* Modal for New Comment Submission */}
      {/* <Modal
        title="Add a Comment"
        visible={modalVisible}
        onOk={handleAddComment}
        onCancel={() => setModalVisible(false)}
      >
        <Form.Item>
          <TextArea
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here..."
          />
        </Form.Item>
      </Modal> */}
    </div>
  );
};

export default SingleEvent;

