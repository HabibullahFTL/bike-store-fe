import bikeImage from '@/assets/bike-image.png';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { TProduct } from '@/types/common';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: TProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="w-full border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white py-4 gap-2 px-4">
      {/* Product Image */}
      <CardHeader className="relative p-0">
        <img
          src={product.image || bikeImage}
          alt={product.name}
          className="w-full h-56 object-contain bg-accent rounded-xl"
        />
        {/* Stock Badge */}
        <Badge
          className={`absolute top-2 right-2 ${
            product.inStock ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </Badge>
      </CardHeader>

      {/* Product Details */}
      <CardContent className="p-0">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h2>
        <p className="text-gray-600 text-sm">
          {product.brand} | {product.category}
        </p>
        <p className="text-xl font-bold text-red-500 mt-2">
          ৳{product.price.toLocaleString()}
        </p>
      </CardContent>

      {/* Actions */}
      <CardFooter className="flex justify-between gap-2 px-0 pb-0">
        {/* <Button className="flex items-center gap-2 cursor-pointer">
          <ShoppingCart size={18} /> Add to Cart
        </Button> */}
        <Button
          asChild
          variant="destructive"
          className="flex w-full bg-red-500 hover:bg-red-600 items-center gap-2 cursor-pointer"
        >
          <Link to={`/products/${product?._id}`}>
            <Eye size={18} /> View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
