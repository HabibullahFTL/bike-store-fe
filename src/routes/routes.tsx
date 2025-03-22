import DashboardLayout from '@/components/layouts/dashboard-layout';
import ProtectedRoute from '@/components/layouts/protected-route';
import AboutPage from '@/pages/About';
import CheckoutPage from '@/pages/Checkout';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';
import MyOrders from '@/pages/MyOrders';
import OrderDetailsPage from '@/pages/OrderDetails';
import PaymentVerifyPage from '@/pages/PaymentVerify';
import ProductDetailsPage from '@/pages/ProductDetails';
import ProductsPage from '@/pages/Products';
import ProfilePage from '@/pages/Profile';
import RegistrationPage from '@/pages/Registration';
import { createBrowserRouter } from 'react-router-dom';
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
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'my-orders',
            element: (
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            ),
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
    ],
  },
]);

export default router;
