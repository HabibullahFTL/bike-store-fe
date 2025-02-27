import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronDownIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CommonItem {
  label: string;
}

interface LinkItem extends CommonItem {
  type: 'link' | 'button';
  href: string;
  pathname: string;
  items?: never; // items should not be present in LinkItem
}

interface DropdownItem extends CommonItem {
  type: 'dropdown';
  href?: never; // href should not be present in DropdownItem
  pathname?: never; // pathname should not be present in DropdownItem
  items: { label: string; href: string }[];
}

type IProps = LinkItem | DropdownItem;

const NavbarItem = ({ type, label, href, pathname, items }: IProps) => {
  const className = `text-sm border-b-2 h-full border-b-transparent xl:text-[15px] 2xl:text-base px-2 lg:px-3 hover:border-b-red-400 rounded-none  uppercase ${
    type === 'link' && href === pathname ? 'text-red-400 font-bold' : ''
  }`;
  return type && href ? (
    type === 'button' ? (
      <div className="flex items-center">
        <Button
          asChild
          variant={'default'}
          className={'h-12 rounded bg-red-500 hover:bg-red-600'}
        >
          <Link to={href}>{label}</Link>
        </Button>
      </div>
    ) : (
      <Button asChild variant={'ghost'} className={className}>
        <Link to={href}>{label}</Link>
      </Button>
    )
  ) : (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'ghost'} className={className}>
          {label} <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 rounded p-0" align="start">
        {items?.map((item) => (
          <Button
            asChild
            key={item?.label}
            variant={'ghost'}
            className="w-full rounded-none justify-start !py-3 text-sm h-12 hover:text-red-400 uppercase"
          >
            <Link to={item?.href}>{item?.label}</Link>
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default NavbarItem;
