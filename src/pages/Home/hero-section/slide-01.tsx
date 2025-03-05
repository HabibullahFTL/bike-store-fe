import bikeImage from '@/assets/bike-image.png';
import { Button } from '@/components/ui/button';

const Slide01 = () => {
  return (
    <div className="w-full gap-4 flex flex-col-reverse md:flex-row items-center p-8">
      {/* Right Side - Image (First on mobile, second on larger screens) */}
      <div className="md:w-1/2 order-2 flex justify-center mt-6 md:mt-0">
        <img src={bikeImage} alt="My Bike Store" className="w-full max-w-lg" />
      </div>

      {/* Left Side - Text Content */}
      <div className="md:w-1/2 order-1 text-center md:text-left">
        <h1 className="text-5xl font-bold text-gray-900">
          Welcome to <span className="text-red-500">My Bike</span>
        </h1>
        <p className="text-gray-600 mt-4">
          Your one-stop shop for premium bicycles and accessories. <br />
          Discover the latest models and ride with confidence!
        </p>
        <Button className="mt-6 px-6 h-14 text-lg font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 transition">
          Shop Now
        </Button>
      </div>
    </div>
  );
};

export default Slide01;
