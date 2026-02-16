
import { Product, Category } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Quantum X-1 Headphones',
    description: 'Experience pure sound with active noise cancellation and 40-hour battery life.',
    price: 299.99,
    category: Category.ELECTRONICS,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    stock: 25,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Urban Explorer Backpack',
    description: 'Minimalist design meets maximum utility. Waterproof and fits a 16-inch laptop.',
    price: 89.00,
    category: Category.FASHION,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    stock: 40,
    rating: 4.5
  },
  {
    id: '3',
    name: 'Luminary Smart Lamp',
    description: 'Voice-controlled ambient lighting with 16 million colors to choose from.',
    price: 124.50,
    category: Category.HOME,
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800',
    stock: 15,
    rating: 4.2
  },
  {
    id: '4',
    name: 'Code Master Mechanical Keyboard',
    description: 'Tactile blue switches with customizable RGB and aluminum frame.',
    price: 159.99,
    category: Category.ELECTRONICS,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800',
    stock: 12,
    rating: 4.9
  },
  {
    id: '5',
    name: 'Nordic Ceramic Set',
    description: 'A set of 4 handmade ceramic bowls in matte charcoal finish.',
    price: 65.00,
    category: Category.HOME,
    image: 'https://images.unsplash.com/photo-1484133113325-9825827195e6?auto=format&fit=crop&q=80&w=800',
    stock: 30,
    rating: 4.6
  },
  {
    id: '6',
    name: 'The Future of AI (Book)',
    description: 'An insightful journey into how artificial intelligence is shaping our world.',
    price: 24.95,
    category: Category.BOOKS,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
    stock: 100,
    rating: 4.7
  }
];
