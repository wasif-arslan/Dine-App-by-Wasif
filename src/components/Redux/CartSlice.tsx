
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { urlForImage } from "../../../sanity/lib/image";
import { Image as IImage } from "sanity";


interface IProduct {
    quantity: number;
    name: any;
    price: number;
    _id: string;
    title: string;
    image: IImage;
    category: {
      name: string;
    };
  }

interface CartState {
    items: Array<IProduct> | any;
    totalAmount: number;
    totalQuantity: number;
    isLoading: boolean;
    error: any;
}

const initialState: CartState = {
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
    isLoading: false,
    error: null
}

export const fetchData = createAsyncThunk(
    "cart/fetchdata",
    async (userId: string) => {
        const res = await fetch(`/api/cart/${userId}`);
        if (!res.ok) {
            console.log('Failed to Get Data');
        }
        const data = await res.json();
        return data;
    }
)


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state: CartState, action: PayloadAction<{ product: IProduct; quantity: number }>) {
            const newItem = action.payload.product;
            const existingItem = state.items.find((item: any) => item._id === newItem._id);
            state.totalQuantity = state.totalQuantity + action.payload.quantity;
            state.totalAmount = state.totalAmount + action.payload.quantity * action.payload.product.price;

            if (!existingItem) {
                const totalPrice = newItem.price * action.payload.quantity;
                state.items.push({
                    ...newItem,
                    image: newItem.image,
                    quantity: action.payload.quantity,
                    totalPrice,
                });
            } else {
                const totalPrice = existingItem.totalPrice + existingItem.price * action.payload.quantity;
                existingItem.quantity += action.payload.quantity;
                existingItem.totalPrice = totalPrice;

            }
        },
        removeProduct(state: CartState, action: PayloadAction<string>) {
            const productId = action.payload;
            state.items = state.items.filter((eachItem: any) => eachItem._id !== productId);
            state.totalQuantity = state.items.reduce((total: any, item: any) => total + item.quantity, 0);
            state.totalAmount = state.items.reduce((total: any, item: any) => total + item.totalPrice, 0);
        },
        decreamentCartProduct(state: CartState, action: PayloadAction<string>) {
            const Product = action.payload;
            const existingItem = state.items.find((item: any) => item._id === Product);

            state.totalQuantity--;

            state.totalAmount = state.totalAmount - existingItem?.price!;

            if (existingItem?.quantity === 1) {
                state.items = state.items.filter((item: any) => item._id !== Product)
            } else {
                existingItem!.quantity--;
                existingItem!.totalPrice = existingItem!.totalPrice - existingItem?.price!;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchData.fulfilled, (state, action) => {
            const { cartItems, totalQuantity, totalPrice } = action.payload;
            state.items = cartItems;
            state.totalAmount = totalPrice;
            state.totalQuantity = totalQuantity;
            state.isLoading = false;

        });
        builder.addCase(fetchData.rejected, (state,action) => {
            state.isLoading = false;
            state.error = action.error
        })
    }
});

export const cartAction = cartSlice.actions;

export default cartSlice.reducer;