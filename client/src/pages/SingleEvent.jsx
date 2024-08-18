import { useState } from 'react';
import { Comment, Form } from '@ant-design/compatible';
import { Card, Button, Input, List, Modal, Row, Col, Avatar, Badge } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_EVENT } from '../utils/queries';
import { ADD_COMMENT } from '../utils/mutations';
import Auth from '../utils/auth';
import moment from 'moment';

const { TextArea } = Input;

const SingleEvent = () => {
  const { eventId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_EVENT, {
    variables: { eventId: eventId },
  });

  const [addComment] = useMutation(ADD_COMMENT, {
    update(cache, { data: { addComment } }) {
      try {
        // Read the current event data from the cache
        const existingEvent = cache.readQuery({
          query: QUERY_SINGLE_EVENT,
          variables: { eventId },
        });

        // Update the event's comments with the new comment
        cache.writeQuery({
          query: QUERY_SINGLE_EVENT,
          variables: { eventId },
          data: {
            event: {
              ...existingEvent.event,
              comments: [...existingEvent.event.comments, addComment],
            },
          },
        });
      } catch (e) {
        console.error('Error updating cache:', e);
      }
    },
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = async () => {
    try {
      await addComment({
        variables: {
          text: newComment,
          userId: "currentUserId", // Replace this with the actual user ID
          eventId: eventId,
        },
      });
      setNewComment('');
      setModalVisible(false);
    } catch (e) {
      console.error('Error adding comment:', e);
    }
  };

  if (loading) return <p>Loading...</p>;

  const event = data?.event || {};
  const comments = event.comments || [];

  return (
    <div style={{ padding: '20px' }}>
      {/* Event Image Header */}
      <Card
        cover={
          <img
            alt="Event"
            src={event.imageUrl || 'https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1699909962/fallback_image_header/fallback_image_header-png?_i=AA'}
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
        }
        bordered={false}
        style={{ marginBottom: '20px' }}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Date:</strong> {event.eventDate ? moment(event.eventDate).format('DD/MM/YYYY') : 'No Date Available'}</p>
          </Col>
          <Col span={12} style={{alignContent:"center"}}>
            <Badge count={event.likesCount} showZero>
              <Avatar icon={<HeartOutlined />} style={{ backgroundColor: '#f56a00' }} />
            </Badge>
            <p><strong>Created At:</strong> {event.createdAt ? moment(event.createdAt).format('DD/MM/YYYY') : 'No Created Date Available'}</p>
          </Col>
        </Row>
      </Card>

      {Auth.loggedIn() ? (
        <>
          <Button type="primary" onClick={() => setModalVisible(true)}>
            Add Comment
          </Button>

          <Modal
            title="Add a Comment"
            open={modalVisible}
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
          </Modal>
        </>
      ) : (
        <p>You need to be logged in to add a comment.</p>
      )}


      {/* Comment List */}
      <Card title="Comments" bordered={false}>
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={comment => (
            <li key={comment._id}>
              <Comment
                author={comment.userId.username}
                avatar={<Avatar>{comment.userId.username[0].toUpperCase()}</Avatar>}
                content={comment.text}
                datetime={comment.createdAt ? moment(comment.createdAt).format('DD/MM/YYYY HH:mm') : 'No Date Available'}
              />
            </li>
          )}
          locale={{ emptyText: 'No comments yet.' }}
        />
      </Card>
    </div>
  );
};

export default SingleEvent;
