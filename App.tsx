
import React, { useState, useEffect } from 'react';
import { ViewMode, Product, CartItem } from './types';
import { INITIAL_PRODUCTS } from './constants';
import Storefront from './components/Storefront';
import AdminPanel from './components/AdminPanel';
import CartModal from './components/CartModal';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.STORE);
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('nexus_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('nexus_products', JSON.stringify(products));
  }, [products]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <nav className="bg-white border-b sticky top-0 z-40 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <i className="fas fa-bolt text-white text-xl"></i>
              </div>
              <span className="text-2xl font-black text-gray-900 tracking-tighter">Nexus<span className="text-indigo-600">Store</span></span>
            </div>

            <div className="hidden md:flex items-center space-x-10">
              <button 
                onClick={() => setView(ViewMode.STORE)}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${view === ViewMode.STORE ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-400'}`}
              >
                Storefront
              </button>
              <button 
                onClick={() => setView(ViewMode.ADMIN)}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${view === ViewMode.ADMIN ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-400'}`}
              >
                Admin Panel
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <button 
                  onClick={() => setView(view === ViewMode.STORE ? ViewMode.ADMIN : ViewMode.STORE)}
                  className="px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg font-bold text-sm hover:bg-indigo-600 hover:text-white transition duration-200"
                >
                  {view === ViewMode.STORE ? 'Switch to Admin' : 'Switch to Store'}
                </button>
              </div>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-600 hover:text-indigo-600 transition"
              >
                <i className="fas fa-shopping-bag text-2xl"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow bg-gray-50">
        {view === ViewMode.STORE ? (
          <Storefront products={products} addToCart={addToCart} />
        ) : (
          <AdminPanel products={products} setProducts={setProducts} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-bolt text-white text-sm"></i>
                </div>
                <span className="text-xl font-black tracking-tighter">NexusStore</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                The ultimate shopping experience powered by the next generation of e-commerce technology. Modern, fast, and secure.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><button onClick={() => setView(ViewMode.STORE)} className="hover:text-indigo-400 transition">Browse Products</button></li>
                <li><button onClick={() => setView(ViewMode.ADMIN)} className="hover:text-indigo-400 transition">Merchant Portal</button></li>
                <li><a href="#" className="hover:text-indigo-400 transition">Track Your Order</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition">Gift Cards</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Customer Care</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4">Subscribe to get special offers and limited edition drops.</p>
              <div className="flex flex-col space-y-2">
                <input 
                  type="email" 
                  placeholder="Enter email..." 
                  className="bg-gray-800 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <button className="bg-indigo-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-indigo-700 transition">
                  Join The Nexus
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} NexusStore Inc. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default App;
