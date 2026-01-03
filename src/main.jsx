import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./pages/DashboardLayout";
import BuyerHome from "./pages/BuyerHome";
import AddTask from "./pages/AddTask";
import MyTasks from "./pages/MyTasks";
import PurchaseCoin from "./pages/PurchaseCoin";
import PaymentHistory from "./pages/PaymentHistory";
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
            <Route index element={<BuyerHome />} />
            <Route path="add-task" element={<AddTask />} />
            <Route path="my-tasks" element={<MyTasks />} />
            <Route path="purchase-coin" element={<PurchaseCoin />} />
            <Route path="payment-history" element={<PaymentHistory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
