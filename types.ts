
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  date: string;
  customerName: string;
}

export enum ViewMode {
  STORE = 'STORE',
  ADMIN = 'ADMIN'
}

export enum Category {
  ALL = 'All',
  ELECTRONICS = 'Electronics',
  FASHION = 'Fashion',
  HOME = 'Home',
  BOOKS = 'Books'
}
