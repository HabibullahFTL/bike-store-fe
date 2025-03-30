import NotFoundWarning from '@/components/common/not-found-warning';
import UnauthorizedWarning from '@/components/common/unauthorized-warning';

import AdminDashboardLayout from '@/components/layouts/admin-dashboard-layout';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import ProtectedRoute from '@/components/layouts/protected-route';
import AboutPage from '@/pages/About';
import CheckoutPage from '@/pages/Checkout';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';
import ManageOrders from '@/pages/ManageOrders';
import MyOrders from '@/pages/MyOrders';
import OrderDetailsPage from '@/pages/OrderDetails';
import PaymentVerifyPage from '@/pages/PaymentVerify';
import ProductDetailsPage from '@/pages/ProductDetails';
import ProductsPage from '@/pages/Products';
import ProfilePage from '@/pages/Profile';
import RegistrationPage from '@/pages/Registration';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'registration',
        element: <RegistrationPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute role="customer">
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <ProfilePage />,
          },
          {
            path: 'my-orders',
            element: <MyOrders />,
          },
        ],
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute role="admin">
            <AdminDashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={'/admin/manage-users'} replace={true} />,
          },
          {
            path: 'profile',
            element: <ProfilePage />,
          },
          {
            path: 'manage-users',
            element: <ManageOrders />,
          },
          {
            path: 'manage-orders',
            element: <ManageOrders />,
          },
        ],
      },
      {
        path: 'orders/:orderId',
        element: (
          <ProtectedRoute>
            <OrderDetailsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'products/:productId',
        element: <ProductDetailsPage />,
      },
      {
        path: 'checkout/:productId',
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'payment-verify',
        element: (
          <ProtectedRoute>
            <PaymentVerifyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'unauthorized',
        element: <UnauthorizedWarning />,
      },
      {
        path: '404',
        element: <NotFoundWarning />,
      },
      {
        path: '*',
        element: <NotFoundWarning />,
      },
    ],
  },
]);

export default router;
