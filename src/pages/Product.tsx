
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Star, ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const allProducts = [
  {
    id: 1,
    name: "Premium Notebook Set",
    price: 15.99,
    category: "stationery",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop",
    rating: 4.8,
    description: "High-quality notebooks perfect for note-taking and studying. This premium set includes 3 notebooks with different ruling styles: lined, dotted, and blank pages. Made with eco-friendly materials and durable binding.",
    features: ["3 notebooks included", "Eco-friendly materials", "Durable binding", "Multiple ruling styles"],
    inStock: true
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 49.99,
    category: "gadgets",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=600&fit=crop",
    rating: 4.9,
    description: "Crystal clear audio for your study sessions. These wireless earbuds feature noise cancellation, long battery life, and comfortable fit for extended use.",
    features: ["Noise cancellation", "8-hour battery life", "Comfortable fit", "Quick charge"],
    inStock: true
  },
  {
    id: 3,
    name: "Campus Hoodie",
    price: 34.99,
    category: "merchandise",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop",
    rating: 4.7,
    description: "Comfortable and stylish campus wear. Made from premium cotton blend for ultimate comfort and durability. Perfect for those chilly campus days.",
    features: ["Premium cotton blend", "Machine washable", "Available in multiple sizes", "University logo"],
    inStock: true
  },
  {
    id: 4,
    name: "Calculus Textbook",
    price: 89.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=600&fit=crop",
    rating: 4.6,
    description: "Comprehensive calculus textbook for advanced mathematics. Latest edition with updated examples and practice problems.",
    features: ["Latest edition", "1000+ practice problems", "Step-by-step solutions", "Online resources included"],
    inStock: true
  },
  {
    id: 5,
    name: "Laptop Stand",
    price: 24.99,
    category: "gadgets",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop",
    rating: 4.5,
    description: "Ergonomic laptop stand for better posture during long study sessions. Adjustable height and angle for optimal viewing.",
    features: ["Adjustable height", "Ergonomic design", "Portable and foldable", "Non-slip base"],
    inStock: true
  },
  {
    id: 6,
    name: "Highlighter Set",
    price: 8.99,
    category: "stationery",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=600&fit=crop",
    rating: 4.8,
    description: "Bright and vibrant highlighters for studying. Set of 6 different colors with chisel tips for precise highlighting.",
    features: ["6 vibrant colors", "Chisel tip design", "Quick-drying ink", "Ergonomic grip"],
    inStock: true
  },
  {
    id: 7,
    name: "University T-Shirt",
    price: 19.99,
    category: "merchandise",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
    rating: 4.4,
    description: "Show your school spirit with this comfortable tee. Made from soft cotton with a classic fit.",
    features: ["100% cotton", "Classic fit", "University logo", "Machine washable"],
    inStock: true
  },
  {
    id: 8,
    name: "Psychology Textbook",
    price: 75.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=600&fit=crop",
    rating: 4.7,
    description: "Introduction to Psychology - Latest Edition. Comprehensive coverage of psychological principles and research methods.",
    features: ["Latest edition", "Case studies included", "Online study materials", "Expert authors"],
    inStock: true
  }
];

const Product = () => {
  const { id } = useParams();
  const [cartCount, setCartCount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('campusCart') || '[]');
    setCartCount(cart.reduce((total: number, item: any) => total + item.quantity, 0));
    
    const foundProduct = allProducts.find(p => p.id === parseInt(id || '0'));
    setProduct(foundProduct);
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    
    const cart = JSON.parse(localStorage.getItem('campusCart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    
    localStorage.setItem('campusCart', JSON.stringify(cart));
    setCartCount(cart.reduce((total: number, item: any) => total + item.quantity, 0));
    setQuantity(1);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation cartCount={cartCount} />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-center text-gray-500 text-lg">Product not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation cartCount={cartCount} />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link to="/products" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-white shadow-lg">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.rating}) • In Stock</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-blue-600">
              ${product.price}
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <Button 
                  onClick={addToCart}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
