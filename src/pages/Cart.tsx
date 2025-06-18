
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Cart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('campusCart') || '[]');
    setCartItems(cart);
    setCartCount(cart.reduce((total: number, item: any) => total + item.quantity, 0));
  }, []);

  const updateCart = (updatedCart: any[]) => {
    localStorage.setItem('campusCart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    setCartCount(updatedCart.reduce((total: number, item: any) => total + item.quantity, 0));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    
    const updatedCart = cartItems.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedCart);
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    updateCart(updatedCart);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation cartCount={cartCount} />
        
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Start shopping to add items to your cart!</p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation cartCount={cartCount} />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          <Button 
            variant="outline" 
            onClick={clearCart}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Clear Cart
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <Link 
                        to={`/product/${item.id}`}
                        className="font-semibold text-lg hover:text-blue-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-gray-600 capitalize">{item.category}</p>
                      <p className="text-xl font-bold text-blue-600 mt-2">${item.price}</p>
                    </div>
                    
                    <div className="flex flex-col justify-between items-end">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      
                      <div className="flex items-center gap-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items ({cartCount})</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white mb-4" size="lg">
                  Proceed to Checkout
                </Button>
                
                <Button variant="outline" className="w-full" size="lg">
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
