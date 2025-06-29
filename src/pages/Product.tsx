
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
    category: "electronics",
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
    category: "clothing",
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
    category: "electronics",
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
    category: "clothing",
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
  },
  {
    id: 9,
    name: "Programming Fundamentals",
    price: 65.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=600&fit=crop",
    rating: 4.9,
    description: "Complete guide to programming fundamentals and algorithms. Perfect for beginners and intermediate programmers looking to strengthen their foundation.",
    features: ["Beginner-friendly", "Practical examples", "Code snippets included", "Multiple programming languages"],
    inStock: true
  },
  {
    id: 10,
    name: "Data Structures & Algorithms",
    price: 79.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=600&fit=crop",
    rating: 4.8,
    description: "Master data structures and algorithms with practical examples. Essential for computer science students and software developers.",
    features: ["Comprehensive coverage", "Visual diagrams", "Practice problems", "Interview preparation"],
    inStock: true
  },
  {
    id: 11,
    name: "Web Development Bible",
    price: 69.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=600&fit=crop",
    rating: 4.7,
    description: "Complete guide to modern web development technologies. Covers HTML, CSS, JavaScript, React, and more.",
    features: ["Modern frameworks", "Responsive design", "Best practices", "Project-based learning"],
    inStock: true
  },
  {
    id: 12,
    name: "Machine Learning Handbook",
    price: 94.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=600&fit=crop",
    rating: 4.6,
    description: "Comprehensive guide to machine learning and AI concepts. From basic statistics to advanced neural networks.",
    features: ["Theory and practice", "Python examples", "Real-world applications", "Latest research"],
    inStock: true
  },
  {
    id: 13,
    name: "Database Design Principles",
    price: 72.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=600&fit=crop",
    rating: 4.5,
    description: "Learn database design and optimization techniques. Covers SQL, NoSQL, and database management systems.",
    features: ["SQL mastery", "Database optimization", "Performance tuning", "Industry standards"],
    inStock: true
  },
  {
    id: 14,
    name: "Fiction Novel Collection",
    price: 24.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=600&fit=crop",
    rating: 4.8,
    description: "Bestselling fiction novels bundle - 5 books included. A diverse collection of contemporary and classic literature.",
    features: ["5 bestselling novels", "Various genres", "Award-winning authors", "Perfect for book clubs"],
    inStock: true
  },
  {
    id: 15,
    name: "Business Management Guide",
    price: 59.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
    rating: 4.4,
    description: "Essential business management strategies and principles. Learn to lead teams and grow organizations effectively.",
    features: ["Leadership strategies", "Team management", "Strategic planning", "Case studies"],
    inStock: true
  },
  {
    id: 16,
    name: "History of Science",
    price: 45.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=600&fit=crop",
    rating: 4.6,
    description: "Journey through the evolution of scientific discoveries. From ancient civilizations to modern breakthroughs.",
    features: ["Chronological timeline", "Scientific breakthroughs", "Historical context", "Illustrated content"],
    inStock: true
  },
  {
    id: 17,
    name: "Creative Writing Workshop",
    price: 38.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=600&h=600&fit=crop",
    rating: 4.7,
    description: "Develop your creative writing skills with practical exercises. Perfect for aspiring authors and storytellers.",
    features: ["Writing exercises", "Genre exploration", "Character development", "Publishing tips"],
    inStock: true
  },
  {
    id: 18,
    name: "Philosophy Essays",
    price: 42.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=600&fit=crop",
    rating: 4.5,
    description: "Collection of thought-provoking philosophical essays. Explore fundamental questions about existence and meaning.",
    features: ["Classical philosophy", "Modern thinkers", "Critical thinking", "Discussion questions"],
    inStock: true
  },
  {
    id: 19,
    name: "Digital Marketing Strategy",
    price: 55.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=600&fit=crop",
    rating: 4.8,
    description: "Master digital marketing in the modern era. Learn SEO, social media, content marketing, and analytics.",
    features: ["SEO strategies", "Social media marketing", "Content creation", "Analytics tools"],
    inStock: true
  },
  {
    id: 20,
    name: "Art History Masterpiece",
    price: 67.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34d19?w=600&h=600&fit=crop",
    rating: 4.9,
    description: "Explore the greatest art movements and masterpieces. Beautifully illustrated guide to world art history.",
    features: ["High-quality reproductions", "Art movements", "Artist biographies", "Cultural context"],
    inStock: true
  }
];

const Product = () => {
  const { id } = useParams();
  const [cartCount, setCartCount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('shopSphereCart') || '[]');
    setCartCount(cart.reduce((total: number, item: any) => total + item.quantity, 0));
    
    const foundProduct = allProducts.find(p => p.id === parseInt(id || '0'));
    setProduct(foundProduct);
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    
    const cart = JSON.parse(localStorage.getItem('shopSphereCart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    
    localStorage.setItem('shopSphereCart', JSON.stringify(cart));
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
