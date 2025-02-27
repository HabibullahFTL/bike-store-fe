import CustomerTestimonialSections from './customer-testimonial-sections';
import FeaturedProducts from './featured-products';
import HeroSection from './hero-section';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <CustomerTestimonialSections />
    </div>
  );
};

export default HomePage;
