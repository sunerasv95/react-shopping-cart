import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { removeCartItem } from './../../actions/cartActions';
import CartItem from "./CartItem";
import Button from "../ui/Button";
import "./cart.css";

const Cart = ({
  cartItems
}) => {

  const [show, setShow] = useState(false);
  const [itemsCount, setItemsCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if(cartItems.length > 0){
      const tot = cartItems.map(item => item.itemPrice * item.itemQuantity).reduce((prev, curr) => prev + curr, 0);
      setTotal(tot);
    }else{
      setTotal(0);
    }
  }, [cartItems]);

  useEffect(() => {
    if(cartItems.length > 0){
      const icount = cartItems.map(item => item.itemQuantity).reduce((prev, curr) => prev + curr, 0);
      setItemsCount(icount);
    }else{
      setItemsCount(0);
    }
  }, [cartItems]);

  const dispatch = useDispatch();

  const onCartItemRemoveHandler = itemId => {
    //console.log("REMOVE_ID", itemId);
    dispatch(removeCartItem(itemId));
  }

  return (
    <>
      <div>
        <button
          className="cart_btn" 
          onClick={() => setShow(true)}
        >
          My Bag <span> ({itemsCount})</span>
        </button>
      </div>
      <div className={`cart__drawer ${show ? 'cdw__show' : ''}`}>
        <div className="cart__drawer_heading">
          My Bag 
          ({itemsCount}) Item/s
          <button onClick={() => setShow(false)}>Close</button>
        </div>
        
        <ul className="cart__drawer_item_list">
        {
          cartItems?.length > 0 
            ? cartItems?.map((item, i) => (
              <CartItem 
                key={`cart_itm${i}`}
                id={item?.itemId}
                name={item?.itemName}
                itemSubTotal={item?.itemPrice * item?.itemQuantity}
                qty={item?.itemQuantity}
                itemImage={item?.itemImgUrl}
                onCartItemRemove={onCartItemRemoveHandler}
              />
            ))
            : <p style={{ color: 'white'}}>Your Bag is empty</p>
        }
        </ul>
        {
          cartItems?.length > 0 
            ? <>
              <div className="cart_summary">
                <p>Sub Total</p>
                <span>${total || 0}</span>
              </div> 
              <div style={{ padding: '1rem .725rem'}}>
                <Button
                  clicked={() => alert("checked-out!!!!!!")}
                  bgColor="warning"
                >
                  Continue to Checkout
                </Button>
              </div>
            </>
            : ''
        } 
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    cartItems: state.cart.items    
  }
}

export default connect(mapStateToProps)(Cart);