import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CustomerTestimonialSections = () => {
  return (
    <section className="bg-gray-100 py-20 px-6 md:px-12">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Why Riders Love My Bike
        </h2>
        <p className="text-gray-600 mb-10">
          Hear from our happy customers who found their perfect ride.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((testimonial) => (
            <Card key={testimonial} className="p-4">
              <CardHeader>
                <CardTitle>Customer {testimonial}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 italic">
                  "Amazing bike quality and great customer service! Highly
                  recommended."
                </p>
                <p className="mt-4 text-yellow-500">⭐⭐⭐⭐⭐</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonialSections;
