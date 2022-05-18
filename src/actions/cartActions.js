
import { GET_CART_ITEMS, ADD_TO_CART, REMOVE_CART_ITEM } from './constants'; 

export const fetchCartItems = ()  => {
    return {
        type: GET_CART_ITEMS
    }
}

export const addCartItem = newItem => {
    return {
        type: ADD_TO_CART,
        payload: newItem
    }
}

export const removeCartItem = itemId => {
    return {
        type: REMOVE_CART_ITEM,
        payload: itemId
    }
}