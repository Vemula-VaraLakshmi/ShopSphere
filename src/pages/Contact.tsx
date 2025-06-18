
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [cartCount, setCartCount] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('campusCart') || '[]');
    setCartCount(cart.reduce((total: number, item: any) => total + item.quantity, 0));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation cartCount={cartCount} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Have questions? We're here to help! Reach out to our friendly team.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What is this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                We'd love to hear from you! Whether you have questions about our products, 
                need help with an order, or just want to say hello, don't hesitate to reach out.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="shadow-md border-0">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                      <p className="text-gray-600 mb-1">support@campuscart.com</p>
                      <p className="text-gray-600">We'll respond within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-0">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                      <p className="text-gray-600 mb-1">1-800-CAMPUS (226-7871)</p>
                      <p className="text-gray-600">Monday - Friday, 9 AM - 6 PM EST</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-0">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
                      <p className="text-gray-600 mb-1">123 University Avenue</p>
                      <p className="text-gray-600">College Town, ST 12345</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-0">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
                      <p className="text-gray-600 mb-1">Monday - Friday: 9 AM - 6 PM</p>
                      <p className="text-gray-600">Saturday: 10 AM - 4 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-md border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">What are your shipping options?</h3>
                <p className="text-gray-600">
                  We offer free standard shipping on orders over $25. Express shipping options 
                  are also available for faster delivery.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Do you offer student discounts?</h3>
                <p className="text-gray-600">
                  Yes! We offer special discounts for verified students. Sign up with your 
                  .edu email address to access exclusive student pricing.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">What is your return policy?</h3>
                <p className="text-gray-600">
                  We offer a 30-day return policy for most items in original condition. 
                  Textbooks and digital products may have different return terms.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">How can I track my order?</h3>
                <p className="text-gray-600">
                  Once your order ships, you'll receive a tracking number via email. 
                  You can also check your order status in your account dashboard.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
