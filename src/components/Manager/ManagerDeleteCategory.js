// ManagerDeleteCategory.js
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const ManagerDeleteCategory = () => {
  const [form] = Form.useForm();

  const handleDeleteSubmit = async (values) => {
    const apiKey = 'YuznB6eN126oRP2NvXfws1Yo5HLarmkG6Dy4n2qD'; // Replace with your actual API key
    const { warehouseId, itemName } = values;

    // Construct the endpoint URL with warehouse_id and item_name
    const apiEndpoint = `https://xco2iwrzj5.execute-api.us-east-1.amazonaws.com/prod/items/${warehouseId}/${itemName}`;

    try {
      const response = await axios.delete(apiEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': `${apiKey}`, // Add Authorization header if needed
        },
      });

      if (response.status === 200) {
        message.success('Category deleted successfully!');
        form.resetFields(); // Reset form fields after successful submission
      } else {
        message.error('Failed to delete category.');
      }
    } catch (error) {
      console.error('API call error:', error);
      message.error('An error occurred while deleting category.');
    }
  };

  return (
    <div style={{ background: '#fff', padding: 70 }}>
      <h2>Delete Category</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleDeleteSubmit}
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

export default ManagerDeleteCategory;
