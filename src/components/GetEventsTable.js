import React, { useState } from 'react';
import axios from 'axios';
import { Table, Button, message } from 'antd';

const EventsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEventsData = async () => {
    const apiKey = 'qUupP6epE11uOMW8gAVnW2HBgPdiSR0y34nKkYSk'; // Replace with your actual API key
    const apiEndpoint = `https://j08vu3l062.execute-api.us-east-1.amazonaws.com/prod/events`;
    setLoading(true);
    try {
      const response = await axios.get(apiEndpoint, {
        headers: {
          'x-api-key': `${apiKey}` // Replace with your actual API key
        }
      });

      if (response.data && Array.isArray(response.data)) {
        const formattedData = response.data.map((item, index) => ({
          key: index,
          videoId: item.video_id,
          warehouseId: item.warehouse_id,
          itemId: item.item_id,
          itemCount: item.item_count,
          timestamp: item.timestamp,
          status: item.status,
        }));
        setData(formattedData);
      } else {
        message.error('Invalid data format received from API');
      }
    } catch (error) {
      message.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Video ID',
      dataIndex: 'videoId',
      key: 'videoId',
    },
    {
      title: 'Warehouse ID',
      dataIndex: 'warehouseId',
      key: 'warehouseId',
    },
    {
      title: 'Item ID',
      dataIndex: 'itemId',
      key: 'itemId',
    },
    {
      title: 'Item Count',
      dataIndex: 'itemCount',
      key: 'itemCount',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Button type="primary" onClick={fetchEventsData} loading={loading}>
        Get Events Data
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        style={{ marginTop: '20px' }}
      />
    </div>
  );
};

export default EventsTable;
