import {
  logout,
  selectCurrentToken,
  TUser,
} from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { verifyToken } from '@/utils/common/verify-token';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface IProps {
  children: ReactNode;
  role?: 'admin' | 'customer';
}

const ProtectedRoute = ({ children, role }: IProps) => {
  const token = useAppSelector(selectCurrentToken);

  let user: TUser | undefined = undefined;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  const dispatch = useAppDispatch();

  // If role is defined, and no user role matched
  if (role && (!user?.role || user?.role !== role)) {
    dispatch(logout());
    return <Navigate to={'/login'} replace={true} />;
  }

  // If token is not found
  if (!token) {
    return <Navigate to={'/login'} replace={true} />;
  }

  // Giving access for valid user
  return children;
};

export default ProtectedRoute;
