import "./product-type-filter.css";

const ProductTypeFilter = ({
    onTypeChange
}) => {

    const PRODUCT_TYPES = [
        { 
            key: "all",
            displayVal: "ALL" 
        }, 
        { 
            key: "t-shirt",
            displayVal: "TSHIRTS" 
        }, 
        { 
            key: "dress-shirts",
            displayVal: "DRESS SHIRTS"
        }
    ];

    return(
        <div className="types">
        <div className="types__heading">
            <p>Product Types</p>
            <button onClick={() => console.log("remove type filter")}>Remove types</button>
        </div>
        <div className="types__list"> 
           {
              PRODUCT_TYPES
              ? PRODUCT_TYPES.map((f, i) => (
                <button 
                    key={`types_btn_${i}`}
                    onClick={() => onTypeChange(f.key)}
                >{f.displayVal}</button>
              ))
              : <span>No types found</span>
           }
        </div>
        
    </div>
    );
}

export default ProductTypeFilter;
