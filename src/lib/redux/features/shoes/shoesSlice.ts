import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductData, UserInfo, ShoesState } from "@/types/types";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

const initialState: ShoesState = {
  cart: [],
  populatedCart: [],
  userInfo: null,
  favorite: [],
  loading: false,
  cartLoading: false,
  favoriteLoading: false,
  error: null,
};

export const fetchCart = createAsyncThunk("shoes/fetchCart", async () => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cart`
  );
  if (!response.ok) throw new Error("Failed to fetch cart");
  return await response.json();
});

export const fetchAndPopulateCart = createAsyncThunk(
  "shoes/fetchAndPopulateCart",
  async (_, { rejectWithValue }) => {
    try {
      // Fetch raw cart data from the API
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart`
      );
      if (!response.ok) throw new Error("Failed to fetch cart");
      console.log(response);
      const rawCart = await response.json();
      console.log("rawCart: ", rawCart);

      // Fetch product details from Sanity
      const productIds = rawCart.items.map((item) => item.productId);
      console.log("ProductIds: ", productIds);
      const query = groq`*[_type == "product" && _id in $ids]{
        _id,
        title,
        "image": image.asset->url,
        price
      }`;
      const products = await client.fetch(query, { ids: productIds });
      console.log("Sanity products: ", products);
      const populatedCart = rawCart.items
        .map((item) => {
          const product = products.find((p) => p._id === item.productId);
          if (product) {
            return {
              _id: item.productId,
              name: product.title,
              image: product.image,
              price: product.price,
              quantity: item.quantity,
              subtotal: product.price * item.quantity,
            };
          }
          console.warn(`Product not found for ID: ${item._id}`);
          return null;
        })
        .filter(Boolean); // Remove null entries
      console.log("Populated Cart: ", populatedCart);

      return { rawCart: rawCart.items, populatedCart };
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "shoes/addProductToCart",
  async (product: ProductData) => {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
      {
        method: "POST",
        body: { productId: product._id, quantity: 1 },
      }
    );
    if (!response.ok) throw new Error("Failed to add product to cart");
    return await response.json();
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "shoes/updateCartItemQuantity",
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
      {
        method: "PATCH",
        body: { productId, quantity },
      }
    );
    if (!response.ok) throw new Error("Failed to update item quantity");
    return await response.json();
  }
);

export const removeFromCart = createAsyncThunk(
  "shoes/removeFromCart",
  async (productId: string) => {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: { productId },
      }
    );
    if (!response.ok) throw new Error("Failed to remove item from cart");
    return productId;
  }
);
export const clearCart = createAsyncThunk(
  "shoes/clearCart",
  async () => {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cart/clear`,
      {
        method: "POST"
      }
    );
    if (!response.ok) throw new Error("Failed to add product to cart");
    return await response.json();
  }
);


export const shoesSlice = createSlice({
  name: "shoes",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<ProductData>) => {
      const product = action.payload;
      if (!state.favorite.some((item) => item._id === product._id)) {
        state.favorite.push(product);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorite = state.favorite.filter(
        (item) => item._id !== action.payload
      );
    },
    // clearCart: (state) =>{
    //   state.populatedCart = [];
    // },
    clearFavorites: (state) => {
      state.favorite = [];
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    removeUserInfo: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.populatedCart = action.payload.items;
        state.cartLoading = false;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.cartLoading = false;
        state.error = "Failed to fetch cart.";
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        const { productId, quantity } = action.meta.arg;
        const updatedCart = action.payload.items;

        // Update cart
        state.cart = updatedCart;

        // Update populatedCart
        state.populatedCart = state.populatedCart.map((item) =>
          item._id === productId
            ? {
                ...item,
                quantity,
                subtotal: item.price * quantity, // Update subtotal
              }
            : item
        );
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.cartLoading = true;
      })

      .addCase(fetchAndPopulateCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(fetchAndPopulateCart.fulfilled, (state, action) => {
        state.cart = action.payload.rawCart;
        state.populatedCart = action.payload.populatedCart;
        state.cartLoading = false;
      })
      .addCase(fetchAndPopulateCart.rejected, (state, action) => {
        state.cartLoading = false;
        state.error = action.payload;
      })

      .addCase(addProductToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.cart = action.payload.items;
        state.loading = false;
      })
      .addCase(addProductToCart.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to add product to cart.";
      })

      .addCase(removeFromCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.populatedCart = state.populatedCart.filter(
          (item) => item._id !== action.payload
        );
        state.cartLoading = false;
      })
      .addCase(removeFromCart.rejected, (state) => {
        state.cartLoading = false;
        state.error = "Failed to remove product.";
      })
      .addCase(clearCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = [];
        state.populatedCart = [];
        state.cartLoading = false;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.cartLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
  setUserInfo,
  removeUserInfo,
} = shoesSlice.actions;

export default shoesSlice.reducer;
