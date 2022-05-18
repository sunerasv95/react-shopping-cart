import "./product-list.css";
import ProductListItem from "./ProductListItem";

const ProductList = ({
  items,
  onAddToCart
}) => {
  console.log("PRODUCT LIST", items);
  return (
    <div className='product__list'>
        <div className="list_container">
          {
            items.length > 0
            ? items?.map((item, i) => (
              <ProductListItem 
                  key={`list__item_${i}`}
                  prodId={item?.id}
                  imageUrl={item?.details?.image}
                  title={item?.name}
                  price={item?.details?.price}
                  tag={item?.details?.tag}
                  onAdd={onAddToCart}
              />
            ))
            : <p>No products found</p>
          }
        </div>
    </div>
  )
}

export default ProductList;