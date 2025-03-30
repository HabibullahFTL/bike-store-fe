import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { logout, selectAuth } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  LayoutDashboardIcon,
  LogOutIcon,
  PackageSearchIcon,
  UserIcon,
} from 'lucide-react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);

  const menuItems = [
    {
      label: 'Profile',
      icon: <UserIcon className="size-4" />,
      to: user?.role === 'admin' ? '/admin/profile' : '/profile',
      show: true,
    },
    {
      label: 'My Orders',
      icon: <PackageSearchIcon className="size-4" />,
      to: '/profile/my-orders',
      show: user?.role === 'customer',
    },
    {
      label: 'Admin Dashboard',
      icon: <LayoutDashboardIcon className="size-4" />,
      to: '/admin',
      show: user?.role === 'admin',
    },
  ];

  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="h-10 w-10 rounded-full !p-0 border"
          >
            <FaUserCircle className="text-gray-500 size-8" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0" align="end">
          <div className="border-b px-2 py-2">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-white text-lg font-semibold">
                <FaUserCircle className="text-gray-500 w-8 h-8" />
              </div>
              <div className="flex flex-col">
                <span className="w-[166px] truncate text-sm font-medium">
                  {user?.name || 'Anonymous'}
                </span>
                <span className="text-xs text-muted-foreground capitalize">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 py-0">
            {menuItems
              .filter((item) => item.show)
              .map((item) => (
                <Button
                  key={item.label}
                  asChild
                  variant="ghost"
                  className="justify-start gap-2 px-3 py-2 text-sm rounded-none"
                >
                  <Link to={item.to}>
                    {item.icon}
                    {item.label}
                  </Link>
                </Button>
              ))}

            <Button
              onClick={() => dispatch(logout())}
              variant="ghost"
              className="justify-start gap-2 px-3 py-2 text-sm text-red-500 hover:text-red-600"
            >
              <LogOutIcon className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserMenu;
