import { createSlice } from "@reduxjs/toolkit"
import { act } from "react"
import Swal from "sweetalert2"


const initialState = {
  cartItems: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exisitingItem = state.cartItems.find(item => item._id === action.payload._id)
      if ( !exisitingItem ) {
        state.cartItems.push(action.payload)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Item Added to Cart",
          showConfirmButton: false,
          timer: 1000,
        })
      } else {
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: "Item Already in Cart",
          showConfirmButton: false,
          timer: 1000,
        })
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
    },
    clearCart: (state) => {
      state.cartItems = []
    }
  }
})

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions
export default cartSlice.reducer
