// ManagerAddCategory.js
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const ManagerAddCategory = () => {
  const [form] = Form.useForm();

  const handleAddSubmit = async (values) => {
    const apiKey = 'YuznB6eN126oRP2NvXfws1Yo5HLarmkG6Dy4n2qD'; // Replace with your actual API key
    const apiEndpoint = 'https://xco2iwrzj5.execute-api.us-east-1.amazonaws.com/prod/items'; // Replace with your actual endpoint

    // Format data as required by the API
    const data = {
      warehouse_id: values.warehouseId,
      item_name: values.itemName,
    };

    try {
      const response = await axios.post(apiEndpoint, data, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': `${apiKey}`, // Add Authorization header if needed
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods": "OPTIONS,GET,POST",
          // "Access-Control-Allow-Headers": "Content-Type,Authorization",
        },
      });

      if (response.status === 200) {
        message.success('Category added successfully!');
        form.resetFields(); // Reset form fields after successful submission
      } else {
        
        message.error('Failed to add category.');
      }
    } catch (error) {
      
      console.error('API call error:', error);
      message.error('Category couldn\'t be added!');
    }
  };

  return (
    <div style={{ background: '#fff', padding: 70 }}>
      <h2>Add New Category</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleAddSubmit}
        initialValues={{ warehouseId: '', itemName: '' }}
      >
        <Form.Item
          label="Warehouse ID"
          name="warehouseId"
          rules={[{ required: true, message: 'Please input the Warehouse ID!' }]}
        >
          <Input placeholder="Enter Warehouse ID" />
        </Form.Item>
        <Form.Item
          label="Item Name"
          name="itemName"
          rules={[{ required: true, message: 'Please input the Item Name!' }]}
        >
          <Input placeholder="Enter Item Name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ManagerAddCategory;
