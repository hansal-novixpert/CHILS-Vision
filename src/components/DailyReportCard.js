// DailyReportCard.js
import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const DailyReportCard = () => {
  const [reportData, setReportData] = useState([]);
  const apiKey = 'your-api-key'; // Replace with your actual API key
  const endpoint = 'https://api.example.com/daily-report'; // Replace with your actual API endpoint

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get(endpoint, {
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        });
        setReportData(response.data);
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };

    fetchReportData();
  }, []);

  return (
    <Card title="Daily Report" bordered={false}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={reportData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="items" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default DailyReportCard;
