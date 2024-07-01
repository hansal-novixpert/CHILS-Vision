import React from "react";
import "./App.css";
import { Layout } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ManagerDashboard from "./components/ManagerDashboard";
import ManagerCategory from "./components/ManagerCategory";
import ManagerInventory from "./components/ManagerInventory";
import ManagerNotification from "./components/ManagerNotification";
import OwnerDashboard from "./components/OwnerDashboard";
import OwnerInventory from "./components/OwnerInventory";
import OwnerCategory from "./components/OwnerCategory";
import AdminDashboard from "./components/AdminDashboard";
import OperatorDashboard from "./components/OperatorDashboard";
import OperatorJobs from "./components/OperatorJobs";
import OperatorEarnings from "./components/OperatorEarnings";
import AdminEvents from "./components/AdminEvents";
import AdminReviews from "./components/AdminReviews";
import AdminGetUsers from "./components/AdminGetUsers";
import OwnerManagers from "./components/OwnerManagers";

const { Footer } = Layout;

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manager/*" element={<ManagerRoutes />} />
            <Route path="/owner/*" element={<OwnerRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/operator/*" element={<OperatorRoutes />} />
          </Routes>
          <Footer style={{ textAlign: "center" }}>
            Created by Novixpert team
          </Footer>
        </Layout>
      </div>
    </Router>
  );
}

// Component for Manager-specific routes
const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<ManagerDashboard />} />
      <Route path="categories" element={<ManagerCategory />} />
      <Route path="inventory" element={<ManagerInventory />} />
      <Route path="notifications" element={<ManagerNotification />} />
      <Route path="*" element={<ManagerDashboard />} /> {/* Fallback to dashboard */}
    </Routes>
  );
};

// Component for Admin-specific routes
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="events" element={<AdminEvents />} />
      <Route path="users" element={<AdminGetUsers />} />
      <Route path="reviews" element={<AdminReviews />} />
      <Route path="*" element={<AdminDashboard />} /> {/* Fallback to dashboard */}
    </Routes>
  );
};

// Component for Owner-specific routes
const OwnerRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<OwnerDashboard />} />
      <Route path="categories" element={<OwnerCategory />} />
      <Route path="inventory" element={<OwnerInventory />} />
      <Route path="managers" element={<OwnerManagers />} />
      <Route path="*" element={<OwnerDashboard />} /> {/* Fallback to dashboard */}
    </Routes>
  );
};

// Component for Operator-specific routes
const OperatorRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<OperatorDashboard />} />
      <Route path="jobs" element={<OperatorJobs />} />
      <Route path="earnings" element={<OperatorEarnings />} />
      <Route path="*" element={<OperatorDashboard />} /> {/* Fallback to dashboard */}
    </Routes>
  );
};

export default App;
