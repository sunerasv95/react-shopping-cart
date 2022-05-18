
import { useState } from "react";
import "./product-size-filter.css";

const ProductSizeFilter = ({
    activeFilter,
    onFilterChange,
    onFilterRemove
}) => {
    const SIZE_FILTERS = [
        { 
            key: "xsmall",
            displayVal: "XS" 
        }, 
        { 
            key: "small",
            displayVal: "XS"
        },
        { 
            key: "medium",
            displayVal: "M"
        },
        {
            key: "large",
            displayVal: "L"
        },
        {
            key: "xlarge",
            displayVal: "XL"
        },
        {
            key: "xxlarge",
            displayVal: "XXL"
        }
    ];

    return(
        <div className="filters">
            <div className="filters__heading">
                <p>Size Filter</p>
                {
                    activeFilter ? <button onClick={() => onFilterRemove()}>Remove Filters</button> : ''
                }
            </div>
            <div className="filters__list"> 
               {
                  SIZE_FILTERS
                  ? SIZE_FILTERS.map((f, i) => (
                    <button
                        className={`filters__btn ${f.key === activeFilter ? 'filters__btn_active': ''} `} 
                        key={`filters_btn_${i}`}
                        onClick={() => onFilterChange(f.key)}
                    >{f.displayVal}</button>
                  ))
                  : <span>No filters found</span>
               }
            </div>
        </div>
    );
}

export default ProductSizeFilter;