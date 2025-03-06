import ProtectedRoute from '@/components/layouts/protected-route';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';
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
    ],
  },
]);

export default router;
