import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    items: [],
    totalQuantity: 0,
    changed: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState : initialCartState,
    reducers : {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addToCart(state, action){
            const {payload} = action;
            const currentIndex = state.items.findIndex(item => 
                item.id === payload.id);
            state.totalQuantity++;
            state.changed = true;
            if(currentIndex !== -1){
                state.items[currentIndex].quantity = state.items[currentIndex].quantity + 1;
                state.items[currentIndex].total += payload.price * 1;
            }else{
                const transfer = {
                    id: payload.id,
                    title: payload.title,
                    description: payload.description,
                    price: payload.price,
                    quantity: 1,
                    total: 1 * payload.price
                }
                // console.log(state.items);
                state.items = state.items.concat(transfer);
            }
            // console.log(action.payload);
            // return updateItem;
        },
        removeCart(state, action){
            const id = action.payload;
            const currentIndex = state.items.findIndex(item => 
                item.id === id);
            state.totalQuantity--;
            state.changed = true;
            if(state.items[currentIndex].quantity > 1) {
                state.items[currentIndex].quantity = state.items[currentIndex].quantity - 1;
                state.items[currentIndex].total -= state.items[currentIndex].price;
            }else {
                state.items = state.items.filter(item => item.id !== id);
            }
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.item.find(item => item.id === newItem.id);
            
            state.changed = true;
            if(!existingItem) {
                state.items.push({
                    id: newItem.id,
                    title: newItem.title,
                    description: newItem.description,
                    price: newItem.price,
                    quantity: 1,
                    total: newItem.price
                });
            }
            else{
                existingItem.quantity++;
                existingItem.total = existingItem.total + newItem.price;
            }
        },
        removeItemCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id  === id)
            if(existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            }else{
                existingItem.quantity--;
            }
            state.changed = true;
        }
    }
});


export const cartActions = cartSlice.actions

export default cartSlice.reducer;