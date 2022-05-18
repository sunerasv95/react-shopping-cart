import "./cart-item.css";

const CartItem = ({
    id,
    name,
    itemSubTotal,
    qty,
    itemImage,
    onCartItemRemove
}) => {
    console.log("CART ITEM RENDERED");
    return(
        <li>
            <div className="cart__drawer_item">
              <img 
                alt="cart-image"
                src={itemImage}
              />
              <div className="cart__drawer_item_details">
                <p className="cart__drawer_item_name">{name}</p>
                <p className="cart__drawer_item_qty">Quantity: {qty}</p>
                <button onClick={() => onCartItemRemove(id)}>Remove</button>
              </div>
              <div className="cart__drawer_item_subt">
                  <span>${itemSubTotal}</span>
              </div>
            </div>
          </li>
    );
}

export default CartItem;