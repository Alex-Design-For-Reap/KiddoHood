import { Form, Input, DatePicker, Button, message } from 'antd';
import Auth from '../utils/auth';
import PleaseLogin from '../components/PleaseLogin';
import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../utils/mutations';

const CreateNew = () => {
  const [createEvent, { error }] = useMutation(ADD_EVENT);

  const handleFormSubmit = async (values) => {
    try {
      // Get the logged-in user's ID from the token
      const userId = Auth.getProfile().data._id;

      // Perform the mutation
      const { data } = await createEvent({
        variables: {
          title: values.title,
          eventDate: values.eventDate.format('YYYY-MM-DD'),
          location: values.address,
          description: values.description,
          imageUrl: values.imageUrl || '',
          userId: userId,
        },
        context: {
          headers: {
            authorization: `Bearer ${Auth.getToken()}`,
          },
        },
      });

      message.success('Event created successfully!', data);
    } catch (err) {
      console.error('Error creating event:', err);
      message.error(`Failed to create event: ${err.message}`);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <h1>Create New Event</h1>
          <Form onFinish={handleFormSubmit} layout="vertical">
  <Form.Item
    name="title"
    label="Event Title"
    rules={[{ required: true, message: 'Please enter the event title' }]}
  >
    <Input />
  </Form.Item>

  <Form.Item
    name="eventDate"
    label="Event Date"
    rules={[{ required: true, message: 'Please enter the event date' }]}
  >
    <DatePicker style={{ width: '100%' }} />
  </Form.Item>

  <Form.Item
    name="address"
    label="Address"
    rules={[{ required: true, message: 'Please enter the event address' }]}
  >
    <Input />
  </Form.Item>

  <Form.Item
    name="description"
    label="Event Description"
    rules={[{ required: true, message: 'Please enter the event description' }]}
  >
    <Input.TextArea />
  </Form.Item>

  <Form.Item
    name="imageUrl"
    label="Add image URL"
    rules={[{ required: false, message: 'Please enter the image URL' }]}
  >
    <Input />
  </Form.Item>

  <Form.Item>
    <Button type="primary" htmlType="submit">
      Create Event
    </Button>
      {error && (
        <div className="col-12 my-3 bg-danger text-white p-3">
          {error.message}
        </div>
      )}
  </Form.Item>
</Form>        </>
      ) : (
        <PleaseLogin />
      )}
    </div>
  );
};

export default CreateNew;




// import { Form, Input, DatePicker, Upload, Button, message } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import Auth from '../utils/auth';
// import PleaseLogin from '../components/PleaseLogin';
// import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { ADD_EVENT } from '../utils/mutations';

// const CreateNew = () => {
//   const [createEvent] = useMutation(ADD_EVENT);
//   const [fileList, setFileList] = useState([]);

//   const onFinish = async (values) => {
//     try {
//       if (fileList.length === 0) {
//         throw new Error('No file selected for upload');
//       }

//       const formData = new FormData();
//       formData.append('image', fileList[0].originFileObj); // Ensure the file object is used

//       const response = await fetch('/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to upload image: ${response.statusText}`);
//       }

//       const data = await response.json();
//       const imageUrl = data.filePath;

//       await createEvent({
//         variables: {
//           title: values.title,
//           date: values.eventDate.format('YYYY-MM-DD'),
//           location: values.address,
//           details: values.description,
//           imageUrl,
//         },
//       });

//       message.success('Event created successfully!');
//     } catch (err) {
//       console.error('Error creating event:', err);
//       message.error(`Failed to create event: ${err.message}`);
//     }
//   };

//   const handleUploadChange = ({ fileList }) => setFileList(fileList);

//   return (
//     <div>
//       {Auth.loggedIn() ? (
//         <>
//           <h1>Create New Event</h1>
//           <Form onFinish={onFinish} layout="vertical">
//             <Form.Item
//               name="title"
//               label="Event Title"
//               rules={[{ required: true, message: 'Please enter the event title' }]}
//               >
//               <Input />
//             </Form.Item>

//             <Form.Item
//               name="eventDate"
//               label="Event Date"
//               rules={[{ required: true, message: 'Please enter the event date' }]}
//               >
//               <DatePicker style={{ width: '100%' }} />
//             </Form.Item>

//             <Form.Item
//               name="address"
//               label="Address"
//               rules={[{ required: true, message: 'Please enter the event address' }]}
//               >
//               <Input />
//             </Form.Item>

//             <Form.Item
//               name="description"
//               label="Event Description"
//               rules={[{ required: true, message: 'Please enter the event description' }]}
//               >
//               <Input.TextArea />
//             </Form.Item>

//             <Form.Item
//               name="imageUrl"
//               label="Add image URL"
//               rules={[{ required: false, message: 'Please enter the event address' }]}
//               >
//               <Input />
//             </Form.Item>


//             <Form.Item
//               name="upload"
//               label="Upload Photo"
//               rules={[{ required: false, message: 'Please upload an image for the event cover' }]}
//               >
//               <Upload
//                 name="file"
//                 listType="picture"
//                 beforeUpload={() => false}
//                 onChange={handleUploadChange}
//                 fileList={fileList}
//               >
//                 <Button icon={<UploadOutlined />}>Click to Upload</Button>
//               </Upload>
//             </Form.Item>

//             <Form.Item>
//               <Button type="primary" htmlType="submit">
//                 Create Event
//               </Button>
//             </Form.Item>
//           </Form>
//         </>
//       ) : (
//         <PleaseLogin />
//       )}
//     </div>
//   );
// };

// export default CreateNew;
