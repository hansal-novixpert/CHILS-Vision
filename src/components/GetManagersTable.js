import React, { useState } from 'react';
import { Table, Input, Button, message } from 'antd';
import axios from 'axios';

const GetManagersTable = () => {
  const [warehouseId, setWarehouseId] = useState('');
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setWarehouseId(e.target.value);
  };

  const handleGetManagersClick = async () => {
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
        message.success('Managers fetched successfully!');
        console.log(response.data); // Check API response in console
        // Transform the data
        const transformedData = response.data.map(manager => ({
          manager_id: manager.manager_id.S,
          user_id: manager.user_id.S,
        }));
        setManagers(transformedData);
      } else {
        message.error('Failed to fetch managers.');
      }
    } catch (error) {
      console.error('API call error:', error);
      message.error('An error occurred while fetching managers.');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Manager ID',
      dataIndex: 'manager_id',
      key: 'manager_id',
    },
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'user_id',
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
        <Button type="primary" onClick={handleGetManagersClick} loading={loading}>
          Get Managers
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={managers}
        loading={loading}
        rowKey="manager_id" // Assuming manager_id is unique for each row
      />
    </div>
  );
};

export default GetManagersTable;
