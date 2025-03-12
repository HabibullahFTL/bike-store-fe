import ProtectedRoute from '@/components/layouts/protected-route';
import AboutPage from '@/pages/About';
import CheckoutPage from '@/pages/Checkout';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';
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
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'products',
        element: <ProductsPage />,
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
        path: 'orders/:orderId',
        element: (
          <ProtectedRoute>
            <OrderDetailsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
