
import React, { useState, useMemo } from 'react';
import { Product, Category, CartItem } from '../types';

interface StorefrontProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const Storefront: React.FC<StorefrontProps> = ({ products, addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === Category.ALL || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-indigo-900 text-white mb-12 p-8 md:p-16 h-80 flex flex-col justify-center">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight leading-tight">
            Discover the Future of <span className="text-indigo-400">Shopping.</span>
          </h1>
          <p className="text-lg text-indigo-100 mb-8 opacity-90">
            Exclusive collection of cutting-edge technology and modern lifestyle essentials.
          </p>
          <button className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition shadow-lg">
            Shop New Arrivals
          </button>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 pointer-events-none hidden md:block">
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" alt="Hero bg" className="h-full w-full object-cover" />
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex flex-wrap gap-2">
          {Object.values(Category).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 border-2 ${
                selectedCategory === cat
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                  : 'bg-white border-gray-100 text-gray-600 hover:border-indigo-600 hover:text-indigo-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-96">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 flex flex-col h-full">
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gray-800 shadow-sm">
                  {product.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-indigo-600 transition">
                    {product.name}
                  </h3>
                  <div className="flex items-center text-yellow-500 text-sm font-bold">
                    <i className="fas fa-star mr-1"></i> {product.rating}
                  </div>
                </div>
                
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-extrabold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-md hover:shadow-indigo-200"
                    title="Add to cart"
                  >
                    <i className="fas fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-200">
          <div className="text-gray-300 text-6xl mb-4">
            <i className="fas fa-box-open"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-700">No products found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
          <button 
            onClick={() => {setSelectedCategory(Category.ALL); setSearchQuery('');}}
            className="mt-6 text-indigo-600 font-bold hover:underline"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Storefront;
