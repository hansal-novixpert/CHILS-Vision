import React, { useState } from 'react';
import { Table, Input, Button, message } from 'antd';
import axios from 'axios';

const GetNotificationTable = () => {
  const [warehouseId, setWarehouseId] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setWarehouseId(e.target.value);
  };

  const handleGetNotificationsClick = async () => {
    if (!warehouseId) {
      message.error('Please enter a Warehouse ID');
      return;
    }

    const apiKey = 'kUkEQymXgA2TqsS8mpDe84isJ8fiT2u94TT42Qeo'; // Replace with your actual API key
    const apiEndpoint = `https://4xh7x0lhy4.execute-api.us-east-1.amazonaws.com/prod/notify/${warehouseId}`;

    setLoading(true);

    try {
      const response = await axios.get(apiEndpoint, {
        headers: {
          'x-api-key': `${apiKey}`,
        },
      });

      if (response.status === 200) {
        message.success('Notifications fetched successfully!');
        console.log(response.data); // Check API response in console
        // Transform the data
        const transformedData = response.data.map(notification => ({
          video_id: notification.video_id.S,
          item_id: notification.item_id.S,
          item_name: notification.item_name.S, // Placeholder, use actual item_name if available
          item_count: parseInt(notification.item_count.N, 10), // Convert count to number
        }));
        setNotifications(transformedData);
      } else {
        message.error('Failed to fetch notifications.');
      }
    } catch (error) {
      console.error('API call error:', error);
      message.error('An error occurred while fetching notifications.');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Video ID',
      dataIndex: 'video_id',
      key: 'video_id',
    },
    {
      title: 'Item ID',
      dataIndex: 'item_id',
      key: 'item_id',
    },
    {
      title: 'Item Name',
      dataIndex: 'item_name',
      key: 'item_name',
    },
    {
      title: 'Count',
      dataIndex: 'item_count',
      key: 'item_count',
    },
  ];

  return (
    <div style={{ padding: 24, background: '#fff' }}>
      <div style={{ display: 'flex', marginBottom: 16 }}>
        <Input
          placeholder="Enter Warehouse ID"
          value={warehouseId}
          onChange={handleInputChange}
          style={{ marginRight: 8, width: '200px' }}
        />
        <Button type="primary" onClick={handleGetNotificationsClick} loading={loading}>
          Get Notifications
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={notifications}
        loading={loading}
        rowKey="video_id" // Assuming video_id is unique for each row
      />
    </div>
  );
};

export default GetNotificationTable;
