// HOOKS
import React, {useState, useEffect, useRef, useReducer} from 'react';

// SCSS
import '/src/styles/components/pages/products/AdvertList.scss';

// JSON
import products from '/src/data/products.json';

// REDUCERS
import cartReducer from '/src/reducers/cartReducer.js';

// UTILS
import formatNumberWithCommas from '/src/utils/formatNumberWithCommas.js'
import calculatePrice from '/src/utils/calculatePrice.js'
import calculateDiscountPercantage from '/src/utils/calculateDiscountPercantage.js'
import fetchElementById from '/src/utils/fetchElementById.js'

// product img test
import productIMG from '/assets/img/products/GIYO Small Bike tire Pump Schrader.jpg';
import productIMG2 from '/assets/img/products/Giant Bicycle Road full Carbon.avif';
import productIMG3 from '/assets/img/products/RIDE 12 Chili Red Carbon Grey 2023.avif';
import productIMG4 from '/assets/img/products/Seymour Oceanweave 1.3 H2O.avif';
import brandLogo from '/assets/img/logo/trek.webp';
import brandLogo2 from '/assets/img/logo/giant.webp';
import brandLogo3 from '/assets/img/logo/evoc.webp';

function AdvertList ({darkMode, lan, matchedProducts, onCartProductsChange}) {
  const [cartDispatchData, setCartDispatchData] = useState([]);
  const [loadLimit, setLoadLimit] = useState(0);
  const allProductsLoaded = loadLimit === matchedProducts.length;

  const addToCartELs = useRef([]);
  const productAmountELs = useRef([]);

  const en = lan === 'en';
  const displayedProducts = matchedProducts.slice(0, loadLimit);
  const nowStyle = {color: "var(--primary-color)"}

  useEffect(() => {
    onCartProductsChange(cartDispatchData);
  }, [cartDispatchData])

  useEffect(() => {
    setLoadLimit(24 < matchedProducts.length ? 24 : matchedProducts.length);
  }, [matchedProducts])

  const addRef = (type, el, i) => {

    const updateElements = (currentArray, el) => currentArray.length < matchedProducts.length ? [...currentArray, el] : currentArray;
    
    switch (type) {
      case 'productAmountELs':
        i === 0 && (productAmountELs.current = []);
        productAmountELs.current = updateElements(productAmountELs.current, el)
        break;
      default:
        console.log('unknown type:' + type);
    }
  }

  const updateProductAmount = (e, type) => {
    const getAmountEL = fetchElementById(e.target, 'productId', productAmountELs.current);
    const currentAmount = Number(getAmountEL.textContent);
    
    switch (true) {
      case (currentAmount >= 9 && type === 1):
        getAmountEL.textContent = 9;
        break;
      case (currentAmount <= 1 && type === -1):
        getAmountEL.textContent = 1;
        break;
      default:
        getAmountEL.textContent = currentAmount + type;
    }
  }

  function handleClick (type, e, product) {
    
    switch (type) {
      case 'ADD_TO_CART':
        const getAmountEL = fetchElementById(e.target, 'productId', productAmountELs.current);
        const quantity = Number(getAmountEL.textContent);

        setCartDispatchData({
          type,
          quantity,
          product
        })
        break;
      default:
        console.log('unknown type:' + type);
    }
  }

  return (
    <div className='advertList'>
      <section className="advertList__advert-sctn">
        <ul className="advertList__advert-sctn__grid">
          {displayedProducts.map((product, i) => 
          <li className={`advertList__advert-sctn__grid__product${product.outOfStock ? ' out-of-stock' : ''}`} key={product.id}>
            <button className="advertList__advert-sctn__grid__product__favourite"></button>
            <img className="advertList__advert-sctn__grid__product__img" src={`/assets/img/products/${product.category}/${product.type}/${product.id + '-' + product.color.en}-front.webp`}/>
            {product.discount ? <h3 className="advertList__advert-sctn__grid__product__discount">{lan === 'ar' ? 'خصم ' : ''}{calculateDiscountPercantage(product.price, product.discount)}{en ? ' off' : ''}</h3> : <></>}
            <h3 className="advertList__advert-sctn__grid__product__description">{product.title[lan]}</h3>
            <img className="advertList__advert-sctn__grid__product__brand-logo" src={product.brand ? `/assets/img/logo/${product.brand}.webp` : ''}/>
            <h2 className="advertList__advert-sctn__grid__product__price">
              {product.discount ? 
              <><span className="now" style={nowStyle}>{en ? 'NOW' : 'الان'}</span> 
              <span className="total">{formatNumberWithCommas(calculatePrice(product.price, product.discount))}</span>
              <span className="currency-symbol">{en ? 'S.P ' : 'ل.س'}</span>
              <s className="old">{formatNumberWithCommas(product.price)}</s></> 
              : <><span className="total">{formatNumberWithCommas(product.price)}</span>
              <span className="currency-symbol">{en ? 'S.P' : 'ل.س'}</span></>}
            </h2>
            <div className="advertList__advert-sctn__grid__product__btns">
              <button className="advertList__advert-sctn__grid__product__btns__add-to-cart" data-product-id={product.id} onClick={e => handleClick('ADD_TO_CART', e, product)}>{en ? 'Add to cart' : 'اضف الى السله'}</button>  
              <button className="advertList__advert-sctn__grid__product__btns__increment" data-product-id={product.id} onClick={e => updateProductAmount(e, 1)}></button>  
              <div className="advertList__advert-sctn__grid__product__btns__total" data-product-id={product.id} ref={el => addRef('productAmountELs', el, i)}>1</div>  
              <button className="advertList__advert-sctn__grid__product__btns__decrement" data-product-id={product.id} onClick={e => updateProductAmount(e, -1)}></button>  
            </div>
          </li>
          )}
        </ul>
      </section>
      <section className="advertList__btn-sctn">
        {allProductsLoaded || <button className="advertList__btn-sctn__load-more" onClick={() => setLoadLimit(num => num + 24 < matchedProducts.length ? (num + 24) : matchedProducts.length)}>{en ? 'Load More' : 'عرض المزيد'}</button>}
        <div className="advertList__btn-sctn__load-amount">{en ? `${loadLimit} showing out of ${matchedProducts.length} results` : `${loadLimit} معروض من ${matchedProducts.length} نتيجه`}</div>
      </section>
    </div>
  )
}

export default AdvertList;
