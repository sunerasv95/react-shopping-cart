import Badge from "../../ui/Badge";
import Button from "../../ui/Button";
import "./product-list-item.css";

const ProductListItem = ({
    prodId,
    imageUrl,
    title,
    price,
    tag,
    onAdd
}) => {
  return (
    <div className="product__list_item">
        {tag !== "" ? <div style={{ width: '100%' , display: 'flex', justifyContent: 'flex-end'}}><Badge>{tag}</Badge></div> : ''}
        <img src={imageUrl} alt="product-img-here" />
        <p className="product__title">{title}</p>
        <span className="product__price">$<span>{price}</span></span>
        <Button clicked={() => onAdd(prodId)}>
          ADD TO BAG
        </Button>
    </div>
  )
}

export default ProductListItem;