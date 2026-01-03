import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./pages/DashboardLayout";
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
import PrivateRoute from "./routes/PrivateRoute";
import { AdminRoute, BuyerRoute, WorkerRoute } from "./routes/RoleRoutes";
import ScrollToTop from "./components/ScrollToTop";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard Routes - Protected */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<DashboardHome />} />

            {/* Buyer Routes */}
            <Route
              path="add-task"
              element={
                <BuyerRoute>
                  <AddTask />
                </BuyerRoute>
              }
            />
            <Route
              path="my-tasks"
              element={
                <BuyerRoute>
                  <MyTasks />
                </BuyerRoute>
              }
            />
            <Route
              path="purchase-coin"
              element={
                <BuyerRoute>
                  <PurchaseCoin />
                </BuyerRoute>
              }
            />
            <Route
              path="payment-history"
              element={
                <BuyerRoute>
                  <PaymentHistory />
                </BuyerRoute>
              }
            />

            {/* Worker Routes */}
            <Route
              path="task-list"
              element={
                <WorkerRoute>
                  <TaskList />
                </WorkerRoute>
              }
            />
            <Route
              path="task-details/:id"
              element={
                <WorkerRoute>
                  <TaskDetails />
                </WorkerRoute>
              }
            />
            <Route
              path="my-submissions"
              element={
                <WorkerRoute>
                  <MySubmissions />
                </WorkerRoute>
              }
            />
            <Route
              path="withdrawals"
              element={
                <WorkerRoute>
                  <Withdrawals />
                </WorkerRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="manage-users"
              element={
                <AdminRoute>
                  <ManageUsers />
                </AdminRoute>
              }
            />
            <Route
              path="manage-tasks"
              element={
                <AdminRoute>
                  <ManageTasks />
                </AdminRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
