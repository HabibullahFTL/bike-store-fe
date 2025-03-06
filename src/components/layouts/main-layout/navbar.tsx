import logo from '@/assets/my-bike-logo.png';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { selectAuth } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import { InfoIcon, LogInIcon, MenuIcon, PhoneIcon } from 'lucide-react';
import { FaBicycle, FaTools } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import Container from './container';
import NavbarItem from './navbar-item';

const Navbar = () => {
  const { pathname } = useLocation();
  const { user } = useAppSelector(selectAuth);

  const navbarLinks = [
    {
      id: 'about',
      type: 'link',
      label: 'ABOUT US',
      href: '/about',
      icon: <InfoIcon className="mr-2 h-4 w-4" />,
    },
    {
      id: 'products',
      type: 'link',
      label: 'PRODUCTS',
      href: '/products',
      icon: <FaBicycle className="mr-2 h-4 w-4" />,
    },
    {
      id: 'services',
      type: 'link',
      label: 'SERVICES',
      href: '/#services',
      icon: <FaTools className="mr-2 h-4 w-4" />,
    },
    {
      id: 'contact',
      type: 'link',
      label: 'CONTACT',
      href: '/#contact',
      icon: <PhoneIcon className="mr-2 h-4 w-4" />,
    },
    {
      id: 'login',
      type: 'button',
      label: user?._id ? 'PROFILE' : 'LOGIN',
      href: user?._id ? '/profile' : '/login',
      icon: <LogInIcon className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Main Navbar */}
      <nav className="bg-white shadow-md">
        <Container>
          <div className="flex items-center justify-between gap-x-4 h-14 md:h-16 lg:h-20">
            {/* Logo */}
            <Link to={'/'} className="flex-shrink-0">
              <img
                className="h-9 sm:h-10 md:h-11 lg:h-12 w-auto"
                src={logo}
                alt="My Bike Logo"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex lg:space-x-2 h-full">
              {navbarLinks?.map((item) => (
                <NavbarItem
                  key={item?.href}
                  type={item?.type as 'link'}
                  label={item?.label}
                  href={item?.href}
                  pathname={pathname}
                />
              ))}
            </div>

            {/* Search Icon & Mobile Menu Toggle */}
            <div className="flex items-center md:hidden space-x-4">
              <Dialog>
                <SheetTrigger
                  className="min-[1024px]:hidden p-2 transition"
                  asChild
                >
                  <Button
                    variant={'ghost'}
                    className="text-gray-500 px-2 hover:text-gray-700 focus:outline-none"
                  >
                    <MenuIcon className="!size-7" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <Link to="/">
                      <SheetTitle>My Bike</SheetTitle>
                    </Link>
                  </SheetHeader>
                  <div className="flex flex-col space-y-3 mt-[1rem]">
                    {navbarLinks?.map((menuItem) => {
                      if (menuItem?.type === 'link') {
                        return (
                          <DialogClose key={menuItem?.href} asChild>
                            <Link to={menuItem?.href}>
                              <Button variant="outline" className="w-full">
                                {menuItem?.icon}
                                {menuItem?.label}
                              </Button>
                            </Link>
                          </DialogClose>
                        );
                      } else {
                        return (
                          <Separator key={menuItem?.id} className="my-3" />
                        );
                      }
                    })}
                  </div>
                </SheetContent>
              </Dialog>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
};

export default Navbar;
