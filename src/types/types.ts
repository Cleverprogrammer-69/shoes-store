export type ImageData = {
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
    url: string;
  };
};

export type CategoryData = {
  _id: string;
  _rev: string;
  _type: "category";
  _createdAt: string;
  _updatedAt: string;
  title: string;
  description?: string;
  image?: ImageData;
};

export type ProductData = {
  _id: string;
  _rev: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };
  description?: string;
  image: ImageData;
  category: Array<CategoryData>;
  price: number;
  rowprice?: number;
  ratings: number;
  isnew?: boolean;
  position?: string;
  brand?: string;
  quantity?: number;
};

export interface CartItem extends ProductData {
  itemQuantity: number;
}
export type PopulatedCartItem = {
  _id: string; 
  name: string; 
  image: string; 
  price: number; 
  quantity: number; 
  subtotal: number; 
  category?: string[]; 
  brand?: string; 
  isnew?: boolean; 
  ratings?: number; 
};


export interface UserInfo {
  id: string;
  name: string;
  email: string;
}

export interface ShoesState {
  cart: CartItem[]; 
  populatedCart: PopulatedCartItem[]; 
  userInfo: UserInfo | null;
  favorite: ProductData[];
  loading: boolean;
  cartLoading: boolean;
  favoriteLoading: boolean;
  error: never | string | unknown | null;
}


export type CartItemRow = {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
};

export interface Order {
  id: number;
  sessionId: string;
  userId: string;
  status: string;
  totalAmount: string;
  createdAt: string; 
  updatedAt: string; 
  items: OrderItem[];
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

