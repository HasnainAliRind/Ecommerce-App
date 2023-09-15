import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    sidebar: false,
    searchQuery: "",
    currentProduct: null,
    editCartItem: {
        status: false,
        product: null
    },
    cartItems: null,
    currentCategory: {index: 0 , category: "Shirt"},
    cartItemUpdated: false
}

export const slice = createSlice({
    name: "productsData",
    initialState,
    reducers: {
        setSidebar: (state , action)=>{
            state.sidebar = action.payload;
        },
        setSearchQuery: (state , action)=>{
            state.searchQuery = action.payload;
        },
        setCurrentProduct: (state , action)=>{
            state.currentProduct = action.payload;
        },
        setCartItemEditor: (state , action)=>{
            state.editCartItem = action.payload;
        },
        setCartItems: (state , action)=>{
            state.cartItems = action.payload;
        },
        setCurrentCategory: (state , action)=>{
            state.currentCategory = action.payload;
        },
        setCartItemUpdation: (state, action)=>{
            state.cartItemUpdated = action.payload;
        }
    }
})

export const {setSidebar, setSearchQuery, setCartItemEditor, setCartItems, setCurrentCategory, setCurrentProduct, setCartItemUpdation} = slice.actions;
export default slice.reducer;