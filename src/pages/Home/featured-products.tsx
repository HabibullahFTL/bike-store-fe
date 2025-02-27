import bikeImage from '@/assets/bike-image.png';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FeaturedProducts = () => {
  return (
    <section className="py-20 px-6 md:px-12">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Top Picks for Every Ride
        </h2>
        <p className="text-gray-600 mb-10">
          Explore our best-selling bikes, built for speed, adventure, and daily
          commutes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((bike) => (
            <Card key={bike} className="p-4 bg-gray-50 border-gray-50">
              <CardHeader>
                <CardTitle>Bike Model {bike}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={bikeImage}
                  alt="Bike"
                  className="w-full h-40 object-cover mb-4"
                />
                <p className="text-gray-600">
                  High-performance bike with advanced features.
                </p>
                <Button className="mt-4 w-full bg-red-500 hover:bg-red-600">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
