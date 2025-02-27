import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  className?: string;
  isSubtitle?: boolean;
}

const AuthCardTitle = ({ children, className, isSubtitle }: IProps) => {
  return isSubtitle ? (
    <p className={cn('text-sm text-gray-500', className)}>{children}</p>
  ) : (
    <h1 className={cn('text-xl font-semibold text-primary', className)}>
      {children}
    </h1>
  );
};

export default AuthCardTitle;
