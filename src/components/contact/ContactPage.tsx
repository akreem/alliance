import { Mail, Phone, Facebook, Instagram, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900">Get in Touch</h2>
              <p className="mt-4 text-lg text-gray-600">
                Reach out to us for exceptional properties and personalized
                service
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6 text-gray-600" />
                <span className="text-gray-600">
                  123 Luxury Avenue, Beverly Hills, CA 90210
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-gray-600" />
                <span className="text-gray-600">+1 (310) 555-0123</span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-gray-600" />
                <span className="text-gray-600">contact@luxuryestates.com</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Follow Us</h3>
              <div className="flex space-x-6">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Facebook className="h-8 w-8" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Instagram className="h-8 w-8" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  className="mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  className="mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message"
                  className="mt-1 h-32"
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
