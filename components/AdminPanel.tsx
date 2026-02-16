
import React, { useState } from 'react';
import { Product, Category } from '../types';
import { generateProductDescription } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface AdminPanelProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ products, setProducts }) => {
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: Category.ELECTRONICS,
    stock: 0,
    image: 'https://picsum.photos/400/300'
  });
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock analytics data
  const salesData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ];

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.description) return;

    const product: Product = {
      ...newProduct as Product,
      id: Date.now().toString(),
      rating: 5.0,
    };
    setProducts([...products, product]);
    setNewProduct({
      name: '',
      price: 0,
      category: Category.ELECTRONICS,
      stock: 0,
      image: 'https://picsum.photos/400/300'
    });
  };

  const handleAIDescription = async () => {
    if (!newProduct.name) {
      alert("Please enter a product name first.");
      return;
    }
    setIsGenerating(true);
    const desc = await generateProductDescription(newProduct.name);
    setNewProduct({ ...newProduct, description: desc });
    setIsGenerating(false);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 uppercase font-semibold">Total Revenue</p>
          <p className="text-2xl font-bold text-indigo-600">$12,450.00</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 uppercase font-semibold">Orders</p>
          <p className="text-2xl font-bold text-indigo-600">84</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 uppercase font-semibold">Products</p>
          <p className="text-2xl font-bold text-indigo-600">{products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 uppercase font-semibold">Average Rating</p>
          <p className="text-2xl font-bold text-indigo-600">4.7 / 5.0</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-6">Sales Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Add Product Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-4">Add New Product</h3>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <button
                  type="button"
                  onClick={handleAIDescription}
                  disabled={isGenerating}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
                >
                  {isGenerating ? 'Generating...' : '✨ Generate with AI'}
                </button>
              </div>
              <textarea
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                rows={3}
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Stock</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              >
                {Object.values(Category).filter(c => c !== Category.ALL).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition font-semibold"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>

      {/* Product List Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold">Inventory Management</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img src={product.image} className="w-10 h-10 rounded-lg object-cover" alt={product.name} />
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-600">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4 text-yellow-500 font-bold">{product.rating} ★</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
