import Container from '@/components/layouts/main-layout/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AboutPage = () => {
  return (
    <section className="py-20 px-6 md:px-12 bg-gray-50">
      <Container>
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            About My Bike
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            Welcome to <span className="font-semibold">My Bike</span>, your
            one-stop destination for top-quality bicycles and accessories. Our
            mission is to provide riders with premium bikes that fit their
            lifestyle, whether it's for adventure, daily commutes, or
            competitive racing.
          </p>

          {/* Mission Statement */}
          <Card className="mb-10 max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                At <span className="font-semibold">My Bike</span>, we are
                committed to promoting a healthier and more eco-friendly
                lifestyle. We believe that everyone deserves a smooth,
                enjoyable, and reliable ride. Our team carefully selects and
                curates the best products to ensure customer satisfaction.
              </p>
            </CardContent>
          </Card>

          {/* Why Choose Us */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-red-100">
              <CardHeader>
                <CardTitle>🚴 Premium Bikes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our bikes are crafted with precision, ensuring quality,
                  durability, and a smooth ride.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-blue-100">
              <CardHeader>
                <CardTitle>🔧 Expert Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our skilled team provides excellent maintenance and repair
                  services to keep you riding safely.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-100">
              <CardHeader>
                <CardTitle>🌍 Eco-Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We support green transportation, helping you reduce carbon
                  footprints while enjoying your ride.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutPage;
