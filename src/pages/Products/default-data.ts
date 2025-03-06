export const categoryOptions = [
  { value: '-', label: 'All Categories' },
  { value: 'Mountain', label: 'Mountain' },
  { value: 'Road', label: 'Road' },
  { value: 'Hybrid', label: 'Hybrid' },
];

export const brandOptions = [
  { value: '-', label: 'All Brands' },
  { value: 'Canyon', label: 'Canyon' },
  { value: 'Giant', label: 'Giant' },
  { value: 'Trek', label: 'Trek' },
  { value: 'Cannondale', label: 'Cannondale' },
];

export const sortOptions = [
  { value: 'newest-first', label: 'Newest First' },
  { value: 'oldest-first', label: 'Oldest First' },
  { value: 'price-low-to-high', label: 'Price: Low to High' },
  { value: 'price-high-to-low', label: 'Price: High to Low' },
];
export const sortFormats = {
  'newest-first': { sortBy: 'createdAt', sortOrder: 'desc' },
  'oldest-first': { sortBy: 'createdAt', sortOrder: 'asc' },
  'price-low-to-high': { sortBy: 'price', sortOrder: 'asc' },
  'price-high-to-low': { sortBy: 'price', sortOrder: 'desc' },
};
