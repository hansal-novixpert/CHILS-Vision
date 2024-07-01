import React, { useState } from 'react';
import { Table, Input, Button, message } from 'antd';
import axios from 'axios';

const GetInventoryTable = () => {
  const [warehouseId, setWarehouseId] = useState('');
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setWarehouseId(e.target.value);
  };

  const handleUpdateClick = async () => {
    if (!warehouseId) {
      message.error('Please enter a Warehouse ID');
      return;
    }

    const apiKey = 'qUupP6epE11uOMW8gAVnW2HBgPdiSR0y34nKkYSk'; // Replace with your actual API key
    const apiEndpoint = `https://j08vu3l062.execute-api.us-east-1.amazonaws.com/prod/inventory/${warehouseId}`;

    setLoading(true);

    try {
      const response = await axios.get(apiEndpoint, {
        headers: {
          'x-api-key': `${apiKey}`,
        },
      });

      if (response.status === 200) {
        message.success('Data fetched successfully!');
        console.log(response.data); // Check API response in console
        const transformedData = response.data.map(notification => ({
          item_id: notification.item_id.S,
          item_name: notification.item_name.S, // Placeholder, use actual item_name if available
          item_count: parseInt(notification.item_count.N, 10), // Convert count to number
        }));
        setTableData(transformedData); // Assuming response.data is an array of items
      } else {
        message.error('Failed to fetch data.');
      }
    } catch (error) {
      console.error('API call error:', error);
      message.error('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'item_name',
      key: 'item_name',
    },
    {
      title: 'Item ID',
      dataIndex: 'item_id',
      key: 'item_id',
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
        <Button type="primary" onClick={handleUpdateClick} loading={loading}>
          Get Your Inventory
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={tableData}
        loading={loading}
        rowKey="item_id" // Assuming item_id is unique for each row
      />
    </div>
  );
};

export default GetInventoryTable;
