import React, { useState } from "react";
import axios from "axios";
import { Table, Button, message } from "antd";

const GetUsersTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsersData = async () => {
    const apiKey = "qykpj8cp3w7yT1gpz23pu7aVdxzm5H1O9c5rSIrR"; // Replace with your actual API key
    const apiEndpoint = `https://8s894flf3d.execute-api.us-east-1.amazonaws.com/prod/profiles`;
    setLoading(true);
    try {
      const response = await axios.get(apiEndpoint, {
        headers: {
          "x-api-key": `${apiKey}`, // Replace with your actual API key
        },
      });

      if (response.data && Array.isArray(response.data)) {
        const formattedData = response.data.map((item, index) => ({
          key: index,
          user_id: item.user_id,
          user_name: item.user_name,
          user_type: item.user_type,
          phone_no: item.phone_no,
          name: item.name,
          email: item.email,
          password: item.password,
        }));
        setData(formattedData);
      } else {
        message.error("Invalid data format received from API");
      }
    } catch (error) {
      message.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "User ID",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "User Type",
      dataIndex: "user_type",
      key: "user_type",
    },
    {
      title: "Phone No",
      dataIndex: "phone_no",
      key: "phone_no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Button type="primary" onClick={fetchUsersData} loading={loading}>
        Get Users Data
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        style={{ marginTop: "20px" }}
      />
    </div>
  );
};

export default GetUsersTable;
