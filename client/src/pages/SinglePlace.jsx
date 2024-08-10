import { useState } from 'react';
// import React, { useState } from 'react';
import { Comment, Form } from '@ant-design/compatible';
// import '@ant-design/compatible/assets/index.css';
import { Card, Button, Input, List, Modal } from 'antd';

const { TextArea } = Input;

const SinglePlace = () => {
  const [comments, setComments] = useState([
    {
      author: 'User1',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
      content: <p>This is a great event!</p>,
      datetime: '2 hours ago',
    },
    {
      author: 'User2',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2',
      content: <p>Looking forward to it!</p>,
      datetime: '1 hour ago',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    setComments([
      ...comments,
      {
        author: 'CurrentUser',
        avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=currentuser',
        content: <p>{newComment}</p>,
        datetime: 'Just now',
      },
    ]);
    setNewComment('');
    setModalVisible(false);
  };

  return (
    <div>
      {/* Event Image Header */}
      <Card
        cover={
          <img
            alt="Event"
            src="https://media.istockphoto.com/id/458119657/photo/tentertainment-music-festival-england.jpg?s=612x612&w=0&k=20&c=HeOd_zmNAS3QQptcZrypASP9eZgu-hQNKSY7SrC_3rw="
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
        }
      >
        <h1>Event Title</h1>
        <p>Event details go here...</p>
      </Card>

      {/* Comment List */}
      <List
        className="comment-list"
        header={`${comments.length} replies`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={item => (
          <li>
            <Comment
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          </li>
        )}
      />

      {/* Button to Open Modal for New Comment */}
      <Button type="primary" onClick={() => setModalVisible(true)}>
        Add Comment
      </Button>

      {/* Modal for New Comment Submission */}
      <Modal
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
      </Modal>

      {/* Optional: Inline Text Area for Comment (Alternative to Modal) */}
      
      {/* <Form.Item>
        <TextArea
          rows={4}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
        />
      </Form.Item>
      <Button type="primary" onClick={handleAddComment}>
        Submit Comment
      </Button>  */}
     
    </div>
  );
};

export default SinglePlace;
