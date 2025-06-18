
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const featuredProducts = [
  {
    id: 1,
    name: "Premium Notebook Set",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
    rating: 4.8
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop",
    rating: 4.9
  },
  {
    id: 3,
    name: "Campus Hoodie",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    rating: 4.7
  }
];

const Index = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('campusCart') || '[]');
    setCartCount(cart.reduce((total: number, item: any) => total + item.quantity, 0));
  }, []);

  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem('campusCart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('campusCart', JSON.stringify(cart));
    setCartCount(cart.reduce((total: number, item: any) => total + item.quantity, 0));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <Navigation cartCount={cartCount} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Campus<span className="text-orange-400">Cart</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Your one-stop shop for everything you need to succeed in college life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
              <Link to="/products" className="flex items-center gap-2">
                Shop Now <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-800 px-8 py-3">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Student-Friendly Prices</h3>
              <p className="text-gray-600">Affordable prices designed with student budgets in mind</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">Carefully curated items to help you succeed academically</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick shipping to get your essentials when you need them</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Featured Products
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    <Button 
                      onClick={() => addToCart(product)}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              <Link to="/products" className="flex items-center gap-2">
                View All Products <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">CampusCart</h3>
          <p className="text-gray-400 mb-6">Making student life easier, one purchase at a time.</p>
          <div className="flex justify-center gap-6">
            <Link to="/about" className="hover:text-orange-400 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-orange-400 transition-colors">Contact</Link>
            <Link to="/products" className="hover:text-orange-400 transition-colors">Products</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
