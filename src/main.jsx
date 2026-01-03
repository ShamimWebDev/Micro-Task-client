import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./pages/DashboardLayout";
import BuyerHome from "./pages/BuyerHome";
import WorkerHome from "./pages/WorkerHome";
import DashboardHome from "./pages/DashboardHome";
import AddTask from "./pages/AddTask";
import MyTasks from "./pages/MyTasks";
import TaskList from "./pages/TaskList";
import TaskDetails from "./pages/TaskDetails";
import MySubmissions from "./pages/MySubmissions";
import PurchaseCoin from "./pages/PurchaseCoin";
import Withdrawals from "./pages/Withdrawals";
import PaymentHistory from "./pages/PaymentHistory";
import ManageUsers from "./pages/ManageUsers";
import ManageTasks from "./pages/ManageTasks";
import AuthProvider from "./providers/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="add-task" element={<AddTask />} />
            <Route path="my-tasks" element={<MyTasks />} />
            <Route path="task-list" element={<TaskList />} />
            <Route path="task-details/:id" element={<TaskDetails />} />
            <Route path="my-submissions" element={<MySubmissions />} />
            <Route path="purchase-coin" element={<PurchaseCoin />} />
            <Route path="withdrawals" element={<Withdrawals />} />
            <Route path="payment-history" element={<PaymentHistory />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="manage-tasks" element={<ManageTasks />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
