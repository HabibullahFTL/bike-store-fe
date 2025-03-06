import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Slider from 'rc-slider';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { brandOptions, categoryOptions, sortOptions } from './default-data';

interface IProps {
  search: string;
  sort: string;
  brand: string;
  category: string;
  priceRange: number[];
  setPage: Dispatch<SetStateAction<number>>;
  setSort: Dispatch<SetStateAction<string>>;
  setBrand: Dispatch<SetStateAction<string>>;
  setPriceRange: Dispatch<SetStateAction<number[]>>;
  setCategory: Dispatch<SetStateAction<string>>;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchAndFilter = ({
  sort,
  search,
  brand,
  category,
  priceRange,
  setPage,
  setSort,
  setBrand,
  setCategory,
  setPriceRange,
  handleSearch,
}: IProps) => {
  return (
    <>
      {/* Search & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Input
          placeholder="Search by name, brand, or category"
          value={search}
          onChange={handleSearch}
          className="col-span-1 md:col-span-2"
        />

        <Select
          value={category}
          onValueChange={(value) => {
            setCategory(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions?.map((option) => (
              <SelectItem key={option?.value} value={option?.value}>
                {option?.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={brand}
          onValueChange={(value) => {
            setBrand(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            {brandOptions?.map((option) => (
              <SelectItem key={option?.value} value={option?.value}>
                {option?.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price & Stock Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">
            Price Range: ৳{priceRange[0]} - ৳{priceRange[1]}
          </span>
          <Slider
            range
            min={0}
            max={10000}
            step={50}
            value={priceRange}
            onChange={(values) => setPriceRange(values as number[])}
            styles={{
              track: { backgroundColor: 'black' },
              handle: { borderColor: 'black', backgroundColor: 'black' },
              rail: { backgroundColor: '#ccc' },
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={sort}
            onValueChange={(value) => {
              setSort(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort products" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions?.map((option) => (
                <SelectItem key={option?.value} value={option?.value}>
                  {option?.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default SearchAndFilter;
