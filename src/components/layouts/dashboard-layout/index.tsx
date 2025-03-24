import { Button } from '@/components/ui/button';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Container from '../main-layout/container';

const DashboardLayout = () => {
  const { pathname } = useLocation();
  const menuItems = [
    {
      href: '/dashboard',
      title: 'Profile',
    },
    {
      href: '/dashboard/my-orders',
      title: 'My Orders',
    },
    {
      href: '/dashboard/manage-orders',
      title: 'Manage Orders',
    },
  ];

  return (
    <Container>
      <div className="max-w-3xl md:max-w-4xl mx-auto grid md:grid-cols-12 border rounded-md my-6">
        <div className="border-b md:border-b-0 md:col-span-4 md:border-r p-2 md:p-3 space-y-2">
          {menuItems?.map((item) => (
            <Button
              asChild
              key={item?.href}
              variant={item?.href === pathname ? 'default' : 'outline'}
              className="w-full justify-start"
            >
              <Link to={item.href}>{item.title}</Link>
            </Button>
          ))}
        </div>
        <div className="md:col-span-8 w-full p-2 md:p-4 lg:p-6">
          <Outlet />
        </div>
      </div>
    </Container>
  );
};

export default DashboardLayout;
