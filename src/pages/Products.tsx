
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Star, ShoppingCart, BookOpen, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const allProducts = [
  {
    id: 1,
    name: "Premium Notebook Set",
    price: 15.99,
    originalPrice: 19.99,
    category: "stationery",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
    rating: 4.8,
    description: "High-quality notebooks perfect for note-taking and studying",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 49.99,
    originalPrice: 79.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop",
    rating: 4.9,
    description: "Crystal clear audio for your study sessions",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 3,
    name: "Campus Hoodie",
    price: 34.99,
    originalPrice: 44.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    rating: 4.7,
    description: "Comfortable and stylish campus wear",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 4,
    name: "Calculus Textbook",
    price: 45.99,
    originalPrice: 89.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
    rating: 4.6,
    description: "Comprehensive calculus textbook for advanced mathematics",
    isSecondHand: true,
    academicYear: "sophomore"
  },
  {
    id: 5,
    name: "Laptop Stand",
    price: 24.99,
    originalPrice: 34.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    rating: 4.5,
    description: "Ergonomic laptop stand for better posture",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 6,
    name: "Highlighter Set",
    price: 8.99,
    originalPrice: 12.99,
    category: "stationery",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
    rating: 4.8,
    description: "Bright and vibrant highlighters for studying",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 7,
    name: "University T-Shirt",
    price: 19.99,
    originalPrice: 24.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    rating: 4.4,
    description: "Show your school spirit with this comfortable tee",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 8,
    name: "Psychology Textbook",
    price: 38.99,
    originalPrice: 75.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
    rating: 4.7,
    description: "Introduction to Psychology - Latest Edition",
    isSecondHand: true,
    academicYear: "freshman"
  },
  {
    id: 9,
    name: "Freshman Starter Kit",
    price: 89.99,
    originalPrice: 120.00,
    category: "kits",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop",
    rating: 4.9,
    description: "Complete bundle: notebooks, pens, planner, and dorm essentials",
    isSecondHand: false,
    academicYear: "freshman"
  },
  {
    id: 10,
    name: "Study Planner 2024",
    price: 18.99,
    originalPrice: 24.99,
    category: "stationery",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop",
    rating: 4.8,
    description: "Academic year planner with productivity tracking",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 11,
    name: "Computer Science Kit",
    price: 159.99,
    originalPrice: 199.99,
    category: "kits",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop",
    rating: 4.7,
    description: "Programming books, laptop accessories, and coding essentials",
    isSecondHand: false,
    academicYear: "sophomore"
  },
  {
    id: 12,
    name: "Biology Lab Manual (Used)",
    price: 25.99,
    originalPrice: 52.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop",
    rating: 4.6,
    description: "Gently used biology lab manual with all pages intact",
    isSecondHand: true,
    academicYear: "sophomore"
  }
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "all");
  const [sortBy, setSortBy] = useState("name");
  const [showSecondHand, setShowSecondHand] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('shopSphereCart') || '[]');
    setCartCount(cart.reduce((total: number, item: any) => total + item.quantity, 0));
  }, []);

  useEffect(() => {
    let filtered = allProducts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by second-hand
    if (showSecondHand) {
      filtered = filtered.filter(product => product.isSecondHand);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy, showSecondHand]);

  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem('shopSphereCart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('shopSphereCart', JSON.stringify(cart));
    setCartCount(cart.reduce((total: number, item: any) => total + item.quantity, 0));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation cartCount={cartCount} />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Student Store</h1>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-600">Verified Student Prices</span>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:w-64"
          />
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="books">Books & Textbooks</SelectItem>
              <SelectItem value="stationery">Stationery</SelectItem>
              <SelectItem value="electronics">Tech & Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="kits">Curated Kits</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={showSecondHand ? "default" : "outline"}
            onClick={() => setShowSecondHand(!showSecondHand)}
            className="flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Second-Hand Only
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4">
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100 relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.isSecondHand && (
                      <Badge className="absolute top-2 left-2 bg-green-500">
                        Second-Hand
                      </Badge>
                    )}
                    {product.category === 'kits' && (
                      <Badge className="absolute top-2 right-2 bg-purple-500">
                        Kit
                      </Badge>
                    )}
                  </div>
                </Link>
                
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                </div>
                
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                      <Percent className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-xl font-bold text-blue-600">${product.price}</span>
                    <div className="text-xs text-green-600 font-medium">Student Price</div>
                  </div>
                  <Button 
                    onClick={() => addToCart(product)}
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
