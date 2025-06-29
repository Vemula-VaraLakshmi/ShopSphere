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
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=400&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
    rating: 4.6,
    description: "Gently used biology lab manual with all pages intact",
    isSecondHand: true,
    academicYear: "sophomore"
  },
  {
    id: 13,
    name: "Mechanical Pencils Set",
    price: 12.99,
    originalPrice: 18.99,
    category: "stationery",
    image: "https://images.unsplash.com/photo-1591618443485-d5c5c9b2e3b6?w=400&h=400&fit=crop",
    rating: 4.7,
    description: "Professional mechanical pencils with extra lead refills",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 14,
    name: "Colored Pen Set",
    price: 14.99,
    originalPrice: 22.99,
    category: "stationery",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
    rating: 4.6,
    description: "Set of 12 colored pens for note-taking and organization",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 15,
    name: "Spiral Notebooks (5-Pack)",
    price: 19.99,
    originalPrice: 29.99,
    category: "stationery",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=400&fit=crop",
    rating: 4.8,
    description: "College-ruled spiral notebooks perfect for every subject",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 16,
    name: "Sticky Notes Mega Pack",
    price: 11.99,
    originalPrice: 16.99,
    category: "stationery",
    image: "https://images.unsplash.com/photo-1590649804407-d0b2ec6b8e7d?w=400&h=400&fit=crop",
    rating: 4.9,
    description: "Assorted sticky notes in multiple sizes and colors",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 17,
    name: "Index Cards (500 Pack)",
    price: 7.99,
    originalPrice: 12.99,
    category: "stationery",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=400&fit=crop",
    rating: 4.5,
    description: "Blank index cards for flashcards and study notes",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 18,
    name: "Desk Organizer",
    price: 22.99,
    originalPrice: 32.99,
    category: "dorm",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    rating: 4.6,
    description: "Multi-compartment desk organizer for pens, pencils, and supplies",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 19,
    name: "Bedside Lamp",
    price: 28.99,
    originalPrice: 39.99,
    category: "dorm",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    rating: 4.7,
    description: "Adjustable LED bedside lamp for late-night studying",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 20,
    name: "Storage Bins (3-Pack)",
    price: 35.99,
    originalPrice: 49.99,
    category: "dorm",
    image: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=400&h=400&fit=crop",
    rating: 4.4,
    description: "Stackable storage bins for dorm room organization",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 21,
    name: "Erasers & Correction Kit",
    price: 9.99,
    originalPrice: 14.99,
    category: "stationery",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    rating: 4.5,
    description: "Assorted erasers and correction supplies for clean notes",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 22,
    name: "Graphing Calculator",
    price: 89.99,
    originalPrice: 129.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1596796251042-a0ac3f40c0d0?w=400&h=400&fit=crop",
    rating: 4.8,
    description: "Scientific graphing calculator for math and science courses",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 23,
    name: "Composition Books (10-Pack)",
    price: 24.99,
    originalPrice: 34.99,
    category: "stationery",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    rating: 4.6,
    description: "Wide-ruled composition books for extensive note-taking",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 24,
    name: "Ruler & Protractor Set",
    price: 6.99,
    originalPrice: 10.99,
    category: "stationery",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=400&fit=crop",
    rating: 4.4,
    description: "Essential geometry tools for math and engineering courses",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 25,
    name: "Binder with Dividers",
    price: 16.99,
    originalPrice: 24.99,
    category: "stationery",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
    rating: 4.7,
    description: "3-ring binder with subject dividers for organized notes",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 26,
    name: "Loose-leaf Paper (500 Sheets)",
    price: 13.99,
    originalPrice: 19.99,
    category: "stationery",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop",
    rating: 4.5,
    description: "College-ruled loose-leaf paper for binders",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 27,
    name: "Pencil Case",
    price: 12.99,
    originalPrice: 18.99,
    category: "stationery",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop",
    rating: 4.6,
    description: "Durable pencil case with multiple compartments",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 28,
    name: "Mini Stapler & Staples",
    price: 8.99,
    originalPrice: 13.99,
    category: "stationery",
    image: "https://images.unsplash.com/photo-1564424717879-9b9c88ad6a95?w=400&h=400&fit=crop",
    rating: 4.3,
    description: "Compact stapler with extra staples for assignments",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 29,
    name: "Dorm Room Rug",
    price: 45.99,
    originalPrice: 64.99,
    category: "dorm",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    rating: 4.5,
    description: "Soft area rug to make your dorm room feel more like home",
    isSecondHand: false,
    academicYear: "all"
  },
  {
    id: 30,
    name: "Backpack - Student Edition",
    price: 39.99,
    originalPrice: 59.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    rating: 4.8,
    description: "Durable backpack with laptop compartment and multiple pockets",
    isSecondHand: false,
    academicYear: "all"
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
              <SelectItem value="dorm">Dorm Essentials</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
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
