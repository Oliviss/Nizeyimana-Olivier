
import React from 'react';
import { CartItem } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cart, updateQuantity, removeFromCart }) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full animate-slide-in">
          <div className="p-6 border-b flex justify-between items-center bg-white">
            <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border bg-gray-50">
                    <img src={item.image} className="h-full w-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                      >
                        <i className="fas fa-trash-alt text-sm"></i>
                      </button>
                    </div>
                    <p className="text-indigo-600 font-bold">${item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center mt-auto">
                      <div className="flex items-center border rounded-lg p-1 bg-gray-50">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition"
                        >
                          <i className="fas fa-minus text-xs"></i>
                        </button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition"
                        >
                          <i className="fas fa-plus text-xs"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-12 opacity-40">
                <i className="fas fa-shopping-basket text-7xl mb-4"></i>
                <p className="text-xl font-bold">Your cart is empty</p>
                <p className="mt-2">Start adding products to see them here.</p>
              </div>
            )}
          </div>

          <div className="p-6 bg-gray-50 space-y-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <button 
              disabled={cart.length === 0}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
            >
              Checkout Now
            </button>
            <p className="text-center text-xs text-gray-400">Secure 256-bit SSL encrypted checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
