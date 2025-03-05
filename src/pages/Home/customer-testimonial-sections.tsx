import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CustomerTestimonialSections = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Mizan Khan',
      feedback:
        'Amazing bike quality and great customer service! Highly recommended.',
      rating: '⭐⭐⭐⭐⭐',
    },
    {
      id: 2,
      name: 'Oliullah',
      feedback:
        "The best bike store I've ever visited. Friendly staff and top-notch products!",
      rating: '⭐⭐⭐⭐⭐',
    },
    {
      id: 3,
      name: 'Rasel Ahmed',
      feedback:
        'Superb selection of accessories and excellent repair service. Will come again!',
      rating: '⭐⭐⭐⭐',
    },
  ];

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
          {testimonials.map((testimonial) => (
            <Card key={testimonial?.id} className="p-4 gap-2">
              <CardHeader>
                <CardTitle>{testimonial?.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 italic">
                  "{testimonial?.feedback}"
                </p>
                <p className="mt-3 text-yellow-500">{testimonial?.rating}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonialSections;
