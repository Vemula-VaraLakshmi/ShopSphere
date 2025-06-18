
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const allProducts = [
  {
    id: 1,
    name: "Premium Notebook Set",
    price: 15.99,
    category: "stationery",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
    rating: 4.8,
    description: "High-quality notebooks perfect for note-taking and studying"
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 49.99,
    category: "gadgets",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop",
    rating: 4.9,
    description: "Crystal clear audio for your study sessions"
  },
  {
    id: 3,
    name: "Campus Hoodie",
    price: 34.99,
    category: "merchandise",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    rating: 4.7,
    description: "Comfortable and stylish campus wear"
  },
  {
    id: 4,
    name: "Calculus Textbook",
    price: 89.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
    rating: 4.6,
    description: "Comprehensive calculus textbook for advanced mathematics"
  },
  {
    id: 5,
    name: "Laptop Stand",
    price: 24.99,
    category: "gadgets",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    rating: 4.5,
    description: "Ergonomic laptop stand for better posture"
  },
  {
    id: 6,
    name: "Highlighter Set",
    price: 8.99,
    category: "stationery",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
    rating: 4.8,
    description: "Bright and vibrant highlighters for studying"
  },
  {
    id: 7,
    name: "University T-Shirt",
    price: 19.99,
    category: "merchandise",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    rating: 4.4,
    description: "Show your school spirit with this comfortable tee"
  },
  {
    id: 8,
    name: "Psychology Textbook",
    price: 75.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
    rating: 4.7,
    description: "Introduction to Psychology - Latest Edition"
  }
];

const Products = () => {
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('campusCart') || '[]');
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
  }, [searchTerm, selectedCategory, sortBy]);

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
    <div className="min-h-screen bg-gray-50">
      <Navigation cartCount={cartCount} />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">All Products</h1>
        
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
              <SelectItem value="stationery">Stationery</SelectItem>
              <SelectItem value="books">Books</SelectItem>
              <SelectItem value="gadgets">Gadgets</SelectItem>
              <SelectItem value="merchandise">Merchandise</SelectItem>
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
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4">
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
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
                  <span className="text-xl font-bold text-blue-600">${product.price}</span>
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
