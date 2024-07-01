// InventoryCard.js
import React, { useState } from "react";
import { Card, Input, Button, Row, Col, Statistic, message } from "antd";
import axios from "axios";

const InventoryCard = () => {
  const [warehouseId, setWarehouseId] = useState("");
  const [inventoryData, setInventoryData] = useState({ items: 0, types: 0 });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setWarehouseId(e.target.value);
  };

  const handleFetchInventory = async () => {
    if (!warehouseId) {
      message.error("Please enter a Warehouse ID");
      return;
    }

    const apiKey = "YuznB6eN126oRP2NvXfws1Yo5HLarmkG6Dy4n2qD"; // Replace with your actual API key
    const apiEndpoint = `https://xco2iwrzj5.execute-api.us-east-1.amazonaws.com/prod/count/${warehouseId}`;

    setLoading(true);

    try {
      const response = await axios.get(apiEndpoint, {
        headers: {
          'x-api-key': `${apiKey}`,
        },
      });

      if (response.status === 200) {
        message.success("Inventory data fetched successfully!");
        setInventoryData({
          items: response.data.total_item_count,
          types: response.data.total_items,
        });
      } else {
        message.error("Failed to fetch inventory data.");
      }
    } catch (error) {
      console.error("API call error:", error);
      message.error("An error occurred while fetching inventory data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="My Inventory" bordered={false} style={{ marginTop: 16 }}>
      <Row gutter={[16, 16]}>
        <Col span={4}>
          <Input
            placeholder="Enter Warehouse ID"
            value={warehouseId}
            onChange={handleInputChange}
          />
        </Col>
        <Col span={3}>
          <Button
            type="primary"
            onClick={handleFetchInventory}
            loading={loading}
            style={{ width: "100%" }}
          >
            Fetch Inventory
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Statistic title="Number of Items" value={inventoryData.items} />
        </Col>
        <Col span={12}>
          <Statistic title="Number of Types" value={inventoryData.types} />
        </Col>
      </Row>
    </Card>
  );
};

export default InventoryCard;
