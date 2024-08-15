// src/components/DeleteAccount.jsx
import React from 'react';
import { Button, Modal, message } from 'antd';
import { useMutation } from '@apollo/client';
import { DELETE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [deleteUser] = useMutation(DELETE_USER);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const userId = Auth.getProfile().data._id;
      await deleteUser({ variables: { userId } });
      message.success('Account deleted successfully!');
      Auth.logout(); // Log the user out
      navigate('/'); // Redirect to home page after deletion
    } catch (err) {
      console.error('Failed to delete account:', err);
      message.error('Failed to delete account. Please try again.');
    } finally {
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
      type="primary"
      danger style={{ margin4: '20px' }}
      onClick={showModal}>
        Delete My Account
      </Button>
      <Modal
        title="Delete Account"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Delete"
        okType="danger"
      >
        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
      </Modal>
    </>
  );
};

export default DeleteAccount;
