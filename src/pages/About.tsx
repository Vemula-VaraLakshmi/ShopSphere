
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Users, Target, Heart, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('campusCart') || '[]');
    setCartCount(cart.reduce((total: number, item: any) => total + item.quantity, 0));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation cartCount={cartCount} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About CampusCart</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Empowering students with everything they need to succeed in their academic journey
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            At CampusCart, we understand the unique challenges students face when it comes to finding 
            quality, affordable supplies for their academic needs. Our mission is to be the go-to 
            destination for students seeking everything from essential stationery and textbooks to 
            cutting-edge gadgets and stylish campus merchandise.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            We believe that every student deserves access to the tools they need to excel, without 
            breaking the bank. That's why we carefully curate our products to offer the best value 
            for money while maintaining the highest quality standards.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Student-Focused</h3>
                <p className="text-gray-600">
                  Everything we do is designed with students in mind, from our product selection to our pricing.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quality First</h3>
                <p className="text-gray-600">
                  We carefully select products that meet our high standards for quality and durability.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Affordable</h3>
                <p className="text-gray-600">
                  Student budgets matter to us. We work hard to keep our prices accessible to all.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in every aspect of our service, from products to customer care.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed mb-4">
                CampusCart was founded by a group of college students who experienced firsthand the 
                challenges of finding quality, affordable supplies during their academic journey. 
                Frustrated by overpriced campus bookstores and limited options, they decided to 
                create a better solution.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                What started as a small initiative to help fellow students has grown into a 
                comprehensive platform serving thousands of students across the country. We've 
                partnered with trusted suppliers and manufacturers to bring you the best products 
                at student-friendly prices.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, CampusCart continues to be student-owned and operated, ensuring that our 
                values and commitment to the student community remain at the heart of everything we do.
              </p>
            </div>
            <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=600&fit=crop" 
                alt="Students studying together"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join the CampusCart Community</h2>
          <p className="text-xl mb-8 opacity-90">
            Discover why thousands of students trust CampusCart for their academic needs
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-lg opacity-90">Happy Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Quality Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8★</div>
              <div className="text-lg opacity-90">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
