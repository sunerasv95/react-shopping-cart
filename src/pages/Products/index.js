import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from "../../api/axios";
import ProductList from "../../components/ProductList";
import ProductSizeFilter from "../../components/ProductSizeFilter";
import ProductTypeFilter from "../../components/ProductTypeFilter";
import { addCartItem } from './../../actions/cartActions';
import "./products.css";

const PRODUCTS_ENDPOINT = "prasadhewage/ecommerce/shipments";
const ORDER_OPT = [
    {
        key: "1",
        value: "Order by Name"
    },
    {
        key: "1",
        value: "Order by Date"
    },
    {
        key: "1",
        value: "Order by Price low-high"
    },
    {
        key: "1",
        value: "Order by Price high=low"
    }
];

const PRODUCT_TYPES = [
    { 
        key: "all",
        displayVal: "ALL" 
    }, 
    { 
        key: "t-shirt",
        displayVal: "T-SHIRTS" 
    }, 
    { 
        key: "dress shirts",
        displayVal: "DRESS SHIRTS"
    }
];

const Products = () => {
	const [products, setProducts] = useState([]);
    const [productResult, setProductResult] = useState([]);
    const [productCount, setProductCount] = useState(0);
    const [size, setSize] = useState(null);
    const [category, setCategory] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    
    const dispatch = useDispatch();

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        const controller = new AbortController();

        const fetchProducts = async ()  => {
            try {
                const res = await axios.get(PRODUCTS_ENDPOINT);
                const prods = res?.data;
                //console.log("PRODS", prods);
                isMounted && setProducts(prods);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                console.error(err);
            }
        } 

        fetchProducts();

        return () => {
            isMounted = false;
            controller.abort();
        }
        
    }, [])

    useEffect(() => {
        if(products.length > 0){
            let res = [];
            let prodCount = 0;

            const prodArr = [...products];
            console.log("COPY PRODUCTS", prodArr);
            if(category !== "all" && size !== null){
                res = prodArr.filter(prod => prod.details.type === category && prod.details.size === size);
            }else if(category === "all" && size !== null){
                res = prodArr.filter(prod => prod.details.size === size);
            }else if(category === "all" && size === null){
                res = prodArr;
            }else if(category !== "all" && size === null){
                res = prodArr.filter(prod => prod.details.type === category);
            }
            console.log("RESULT", res);
            prodCount = res.length;

            setProductResult(res);
            setProductCount(prodCount);
        }
    }, [size, category, products]);
    
    const onFilterChangeHandler = filter => setSize(filter);

    const onAddToCartHandler = (productId) => {
        const productList = [...products];
        const item = productList.filter(product => product.id === productId);
        if(item){
            console.log("NEW TO CART", item);
            const newItem = {
                itemId: item[0].id,
                itemName: item[0].name,
                itemImgUrl: item[0].details.image,
                itemPrice: item[0].details.price
            };
            dispatch(addCartItem(newItem));
        }else{
            alert("Invalid item!");
        }
    }

    const onRemoveFilterHandler = () => setSize(null);

    // const filterProducts = (products) =>{
    //     if(size){
    //         return products.filter(product => product.details.size.toLowerCase() === size);
    //     }else{
    //         return products;
    //     }
    // }
  
	return (
        <div className="products">
            <div className="products__left_side">  
                <div style={{ padding :'.1rem 1rem'}}>
                    <p style={{ fontSize: '1rem', fontWeight: 700 }}>Product Category</p>
                    <select
                        style={{ height: '35px', width: '100%'}}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {
                            PRODUCT_TYPES
                            ? PRODUCT_TYPES.map((f, i) => (
                                <option key={`types_btn_${i}`} value={f.key}>{f.displayVal}</option>
                            ))
                            : <option>No types found</option>
                        }
                    </select>
                </div>
                <ProductSizeFilter
                    activeFilter={size}
                    onFilterChange={onFilterChangeHandler}
                    onFilterRemove={onRemoveFilterHandler}
                />
              
            </div>
            <div className="products__right_side">
                {
                    isLoading 
                        ? <div style={{ display: 'flex', margin: 'auto' , width: '100%'}}><span style={{ color: 'black'}}>Loading...</span> </div>
                        : <>
                             <div className="products__heading">
                                <div className="products__count_lbl">
                                    <span>{productCount || 0} Product(s) found</span>
                                </div>
                                <div className="products__order_opt">
                                    <select>
                                            {
                                                ORDER_OPT 
                                                ? ORDER_OPT?.map((opt, i) => (
                                                    <option key={`order_opt_${i}`} value={opt.key}>{opt.value}</option>
                                                ))
                                                : <option>No Options</option>
                                                
                                            }
                                    </select>
                                </div>
                                </div>
                                <ProductList 
                                    items={productResult}
                                    onAddToCart={onAddToCartHandler}
                                />
                        </>
                }
            </div>
        </div>
    );
};

export default Products;
