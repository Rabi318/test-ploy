import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Layout from "./Layout.jsx";
import Admin from "./pages/Admin.jsx";
import Analytics from "./pages/admin/Analytics.jsx";
import User from "./pages/admin/User.jsx";
import Payment from "./pages/admin/Payment.jsx";
import Role from "./pages/admin/Role.jsx";
import Expenses from "./pages/admin/Expenses.jsx";
import NotFound from "./pages/NotFound.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Rice from "./pages/admin/Rice.jsx";
import RiceDetails from "./pages/admin/RiceDetails.jsx";
import Notifications from "./pages/admin/Notifications.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/admin" element={<PrivateRoute />}>
        <Route path="" element={<Admin />}>
          <Route path="" element={<Navigate to="analytics" />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="user" element={<User />} />
          <Route path="payment" element={<Payment />} />
          <Route path="role" element={<Role />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="rice" element={<Rice />} />
          <Route path="notifications" element={<Notifications />} />
          {/* <Route path="rice/:userId" element={<RiceDetails />} /> */}
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
