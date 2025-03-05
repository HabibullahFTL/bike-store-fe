import bikeImage from '@/assets/bike-image-2.png';
import { Button } from '@/components/ui/button';

const Slide02 = () => {
  return (
    <div className="w-full gap-4 flex flex-col-reverse md:flex-row items-center p-8">
      {/* Right Side - Text Content */}
      <div className="md:w-1/2 order-2 text-center lg:text-right">
        <h1 className="text-5xl font-bold text-gray-900">
          Ride with <span className="text-blue-500">Confidence</span>
        </h1>
        <p className="text-gray-600 mt-4">
          Get the best bicycles at unbeatable prices. <br />
          **Limited-time offer: Up to 30% OFF on select models!**
        </p>
        <p className="text-blue-600 font-semibold mt-2">
          🚴‍♂️ Free accessories with every purchase! Hurry, offer ends soon.
        </p>
        <Button className="mt-6 px-6 h-14 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition">
          Grab Your Deal Now
        </Button>
      </div>

      {/* Left Side - Image (First on mobile, second on larger screens) */}
      <div className="md:w-1/2 order-1 flex justify-center mt-6 md:mt-0">
        <img src={bikeImage} alt="My Bike Store" className="w-full max-w-lg" />
      </div>
    </div>
  );
};

export default Slide02;
