import { GET_CART_ITEMS, ADD_TO_CART, REMOVE_CART_ITEM} from './../actions/constants';

const initialState = {
    items: [],
}

export default function cartReducer(state = initialState, action) {
    const { type, payload } = action;
    //console.log("CART REDUCER", type, action);
    switch(type){
        case ADD_TO_CART:
            //add to cart 
            let itemsArr = [...state.items];
            if(state.items.length === 0){
                let newItem = {
                    itemId: payload.itemId,
                    itemName: payload.itemName,
                    itemImgUrl: payload.itemImgUrl,
                    itemQuantity: 1,
                    itemPrice: payload.itemPrice
                };
                itemsArr.push(newItem);
            }else{
                let isExistingItem = false;
                let updateItem = null;
                itemsArr.filter(item => {
                    if(item.itemId === payload.itemId){
                        isExistingItem = true;
                        updateItem = item;
                    }
                });

                if(isExistingItem){
                    const removeItem = itemsArr.filter(item => item?.itemId === updateItem?.itemId);
                    const updateArr = itemsArr.filter(item => item?.itemId !== updateItem?.itemId);
                    updateItem.itemQuantity +=1;
                    updateArr.push(updateItem);
                    itemsArr = updateArr;
                    //console.log("EXISTING_ITEM",updateArr,removeItem);
                }else{
                    let newItem = {
                        itemId: payload.itemId,
                        itemName: payload.itemName,
                        itemImgUrl: payload.itemImgUrl,
                        itemQuantity: 1,
                        itemPrice: payload.itemPrice
                    };
                    itemsArr.push(newItem);
                }
            }

            return {
                ...state,
                items: itemsArr
            };
        break;

        case REMOVE_CART_ITEM:
            let currentArr = [...state.items];
            const removedArr = currentArr.filter(item => item.itemId !== payload);
            //console.log("REMOVED_ARR", currentArr, payload, removedArr);
            return {
                ...state,
                items: removedArr
            }

        default:
            return state;
    }
}
