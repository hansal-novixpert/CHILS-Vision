// GetJobsTable.js
import React, { useState } from "react";
import { Table, Button, Input, InputNumber, Row, Col, message } from "antd";
import axios from "axios";

const GetJobsTable = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch jobs without flag value
  const fetchJobs = async () => {
    setLoading(true);
    const apiKey = "kUkEQymXgA2TqsS8mpDe84isJ8fiT2u94TT42Qeo"; // Replace with your actual API key
    const apiEndpoint = `https://4xh7x0lhy4.execute-api.us-east-1.amazonaws.com/prod/batches`;
    try {
      const response = await axios.get(apiEndpoint, {
        headers: {
          "x-api-key": `${apiKey}`,
        },
      });
      const data = response.data;
      const jobsWithEditableFields = data.map((job) => ({
        ...job,
        item_id: "",
        item_name: "",
        item_count: null, // Initialize item_count as null
      }));
      setJobs(jobsWithEditableFields);
      message.success("Jobs fetched successfully.");
    } catch (error) {
      console.error("Error fetching jobs:", error);
      message.error("Failed to fetch jobs.");
    }
    setLoading(false);
  };

  // Handle job updates
  const updateJob = async (index) => {
    const job = jobs[index];
    if (!job.item_id || !job.item_name) {
      message.error("Please provide Item ID and Item Name.");
      return;
    }

    const apiKey = "kUkEQymXgA2TqsS8mpDe84isJ8fiT2u94TT42Qeo"; // Replace with your actual API key
    const apiEndpoint = `https://4xh7x0lhy4.execute-api.us-east-1.amazonaws.com/prod/batches`;

    const body = {
      video_id: job.video_id,
      warehouse_id: job.warehouse_id,
      user_id: job.user_id,
      item_id: job.item_id,
      item_name: job.item_name,
      item_count: job.item_count,
      flagvalue: job.flagvalue,
    };

    try {
      const response = await axios.post(apiEndpoint, body, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${apiKey}`, // Include the API key in the headers
        },
      });

      if (response.status === 200) {
        message.success("Job updated successfully.");
      } else {
        message.error("Failed to update job.");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      message.error("Failed to update job.");
    }
  };

  // Handle notification action
  const notifyJob = async (index) => {
    const job = jobs[index];
    if (!job.item_id || job.flagvalue !== 0) {
      message.error("Please provide Item ID or set flagvalue to 0 for notifying.");
      return;
    }

    const apiKey = "kUkEQymXgA2TqsS8mpDe84isJ8fiT2u94TT42Qeo"; // Replace with your actual API key
    const apiEndpoint = `https://4xh7x0lhy4.execute-api.us-east-1.amazonaws.com/prod/notify`;

    const body = {
      video_id: job.video_id,
      warehouse_id: job.warehouse_id,
      user_id: job.user_id,
      item_id: job.item_id,
      item_name: job.item_name,
      item_count: job.item_count,
      flagvalue: job.flagvalue,
    };

    try {
      const response = await axios.post(apiEndpoint, body, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${apiKey}`, // Include the API key in the headers
        },
      });

      if (response.status === 200) {
        message.success("Notified successfully.");
      } else {
        message.error("Failed to notify job.");
      }
    } catch (error) {
      console.error("Error notifying :", error);
      message.error("Failed to notify.");
    }
  };
  // Handle input change for item_id and item_name
  const handleEdit = (value, key, index) => {
    const newJobs = [...jobs];
    newJobs[index][key] = value;
    setJobs(newJobs);
  };

  // Table columns definition
  const columns = [
    {
      title: "Warehouse ID",
      dataIndex: "warehouse_id",
      key: "warehouse_id",
      width: 150,
    },
    {
      title: "Video ID",
      dataIndex: "video_id",
      key: "video_id",
      width: 150,
    },
    {
      title: "User ID",
      dataIndex: "user_id",
      key: "user_id",
      width: 250,
      render: (text, record, index) => (
        <Input
          placeholder="Enter User ID"
          value={text}
          onChange={(e) => handleEdit(e.target.value, "user_id", index)}
        />
      ),
    },
    {
      title: "Item ID",
      dataIndex: "item_id",
      key: "item_id",
      width: 250,
      render: (text, record, index) => (
        <Input
          placeholder="Enter Item ID"
          value={text}
          onChange={(e) => handleEdit(e.target.value, "item_id", index)}
        />
      ),
    },
    {
      title: "Item Name",
      dataIndex: "item_name",
      key: "item_name",
      width: 250,
      render: (text, record, index) => (
        <Input
          placeholder="Enter Item Name"
          value={text}
          onChange={(e) => handleEdit(e.target.value, "item_name", index)}
        />
      ),
    },
    {
      title: "Item Count",
      dataIndex: "item_count",
      key: "item_count",
      width: 150,
      render: (text, record, index) => (
        <InputNumber
          placeholder="Count"
          value={text}
          onChange={(value) => handleEdit(value, "item_count", index)}
        />
      ),
    },
    {
      title: "Flagvalue",
      dataIndex: "flagvalue",
      key: "flagvalue",
      width: 150,
      render: (text, record, index) => (
        <InputNumber
          placeholder="flagvalue"
          min={-1}
          value={text}
          onChange={(value) => handleEdit(value, "flagvalue", index)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record, index) => (
        <>
          <Button
            type="primary"
            style={{ background: "#099B82", marginRight: "8px" }}
            onClick={() => updateJob(index)}
          >
            Update
          </Button>
          <Button type="primary" danger onClick={() => notifyJob(index)}>
            Notify
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: "16px" }}>
        <Col span={4}>
          <Button type="primary" onClick={fetchJobs} loading={loading}>
            Get Jobs
          </Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={jobs} rowKey="video_id" />
    </div>
  );
};

export default GetJobsTable;
