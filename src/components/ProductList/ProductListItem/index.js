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
        {tag !== "" ? <Badge>{tag}</Badge> : ''}
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