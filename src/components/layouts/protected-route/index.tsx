import { selectCurrentToken, TUser } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import { verifyToken } from '@/utils/common/verify-token';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: ReactNode;
  role?: 'admin' | 'customer';
}

const ProtectedRoute = ({ children, role }: IProps) => {
  const location = useLocation();

  const token = useAppSelector(selectCurrentToken);

  let user: TUser | undefined = undefined;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  const params = new URLSearchParams();
  if (location?.pathname) {
    params.append('to', location.pathname);
  }

  const loginURL = `/login?${params.toString()}`;

  // If role is defined, and no user role matched
  if (role && (!user?.role || user?.role !== role)) {
    if (token) {
      return <Navigate to={'/unauthorized'} replace={true} />;
    }
    return <Navigate to={loginURL} replace={true} />;
  }

  // If token is not found
  if (!token) {
    return <Navigate to={loginURL} replace={true} />;
  }

  // Giving access for valid user
  return children;
};

export default ProtectedRoute;
