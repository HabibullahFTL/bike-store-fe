import Container from '@/components/layouts/main-layout/container';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Slide01 from './slide-01';
import Slide02 from './slide-02';

export default function HeroSection() {
  const slides = [
    {
      id: 'slide-01',
      component: <Slide01 />,
    },
    {
      id: 'slide-02',
      component: <Slide02 />,
    },
  ];
  return (
    <div className="hero-section flex items-center justify-center min-h-screen bg-blue-50">
      <Container>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="hero-slider"
        >
          {slides?.map((slide) => (
            <SwiperSlide key={slide?.id}>{slide?.component}</SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
}
