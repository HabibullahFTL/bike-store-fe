import { Button } from '@/components/ui/button';
import { contactInfo } from '@/data/contact-info';
import { ChevronRight } from 'lucide-react';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const importantLinks = [
    { label: 'Shop Bikes', href: '/shop' },
    { label: 'Bike Accessories', href: '/accessories' },
    { label: 'Bike Repair Services', href: '/services' },
  ];

  const aboutLinks = [
    { label: 'About Us', href: '/#about' },
    { label: 'Our Team', href: '/#team' },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-10">
      <div className="container mx-auto px-6 md:flex md:flex-col md:justify-between md:flex-wrap gap-8 xl:flex-row xl:gap-0">
        <div className="flex gap-8 flex-col md:flex-row md:w-full xl:w-1/2">
          {/* Store Location */}
          <div className="md:w-1/2 xl:w-80">
            <h3 className="text-lg font-semibold mb-4">Store Location</h3>
            <div className="rounded-md overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.5552058503877!2d90.48076097458896!3d23.678232728719614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b728b3b91cd1%3A0x1e7d1dd56b0fb82f!2sMy%20Bike%20Store!5e1!3m2!1sen!2sbd!4v1735327945301!5m2!1sen!2sbd"
                width="320"
                height="300"
                className="w-full h-56 border-none"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Important Links */}
          <div className="md:w-1/2 xl:w-auto flex-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {importantLinks.map((item) => (
                <Link
                  to={item.href}
                  key={item.label}
                  className="flex items-center gap-x-2 text-sm hover:text-red-400 transition"
                >
                  <ChevronRight size={16} /> {item.label}
                </Link>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-8 flex-col md:flex-row md:w-full xl:w-1/2">
          {/* About Us */}
          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              {aboutLinks.map((item) => (
                <Link
                  to={item.href}
                  key={item.label}
                  className="flex items-center gap-x-2 text-sm hover:text-red-400 transition"
                >
                  <ChevronRight size={16} /> {item.label}
                </Link>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p>{contactInfo?.name}</p>
            <p className="flex flex-wrap gap-2">
              Tel:{' '}
              <a
                href={`tel:${contactInfo?.phone}`}
                className="hover:text-red-400 transition"
              >
                {contactInfo?.phone}
              </a>
              ,
              <a
                href={`tel:${contactInfo?.phone2}`}
                className="hover:text-red-400 transition"
              >
                {contactInfo?.phone2}
              </a>
            </p>
            <p>
              Email:{' '}
              <a
                href={`mailto:${contactInfo?.email}`}
                className="hover:text-red-400 transition"
              >
                {contactInfo?.email}
              </a>
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-white transition"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-white transition"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-white transition"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-800 mt-10 py-4 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()}{' '}
          <span className="text-red-500"> My Bike</span>. All rights reserved.
        </p>
        <p>
          Developed by{' '}
          <Button asChild variant="link" className="text-red-500 px-0 py-0">
            <Link
              to="https://www.habibullahftl.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Habibullah Bahar Piash
            </Link>
          </Button>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
