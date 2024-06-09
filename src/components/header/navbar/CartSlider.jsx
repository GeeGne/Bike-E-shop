// HOOKS
import React, {useState, useEffect, useRef, useContext, useReducer} from 'react';

// SCSS
import '/src/styles/components/header/navbar/CartSlider.scss';

// REDUCERS
import cartReducer from '/src/reducers/cartReducer.js';

// UTILS
import CartProductsContext from '/src/utils/myContext.js';
import formatNumberWithCommas from '/src/utils/formatNumberWithCommas.js'
import calculatePrice from '/src/utils/calculatePrice.js'
import calculateDiscountPercantage from '/src/utils/calculateDiscountPercantage.js'
import fetchElementById from '/src/utils/fetchElementById.js'

// ICONS
import closeIcon from '../../../assets/img/icons/close.svg';
import cartIcon from '/src/assets/img/icons/shopping_cart.svg';

// ICONS - DARKMODE
import closeIconDarkMode from '../../../assets/img/icons/close_darkMode.svg';
import cartIconDarkMode from '/src/assets/img/icons/shopping_cart_darkMode.svg';

// product img test
import productIMG from '/src/assets/img/products/GIYO Small Bike tire Pump Schrader.jpg';
import productIMG2 from '/src/assets/img/products/Giant Bicycle Road full Carbon.avif';
import productIMG3 from '/src/assets/img/products/RIDE 12 Chili Red Carbon Grey 2023.avif';
import productIMG4 from '/src/assets/img/products/Seymour Oceanweave 1.3 H2O.avif';
import brandLogo from '/src/assets/img/logo/trek.webp';
import brandLogo2 from '/src/assets/img/logo/giant.webp';
import brandLogo3 from '/src/assets/img/logo/evoc.webp';

function CartSlider ({darkMode, lan, onCartChange, cartToggle, onCartToggleChange}) {
  const cartDispatchData = useContext(CartProductsContext);
  const [cart, dispatch] = useReducer(cartReducer, []);
  const cartContainerElement = useRef(null);  
  const sliderElement = useRef(null);

  let totalPrice = 0;
  cart.forEach(list => (totalPrice += calculatePrice(list.product.price, list.product.discount) * list.quantity))

  const cartEmpty = cart.length === 0;
  console.log(cart);
  useEffect(() => {
    onCartChange(cart);
  },[cart])

  useEffect(() => {
    dispatch(cartDispatchData);
  }, [cartDispatchData])

  useEffect(() => {
    const containerStyle = cartContainerElement.current.style;
    const sliderStyle = sliderElement.current.style;
    switch (cartToggle) {
      case true:
        document.body.style.overflow = 'hidden hidden';
        containerStyle.visibility= 'visible';
        containerStyle.backgroundColor= 'var(--cartSlider-background-color)'
        sliderStyle.transform = 'translateX(0)';
        break;
      case false:
        document.body.style.overflow = 'hidden auto';
        sliderStyle.transform = `translateX(${lan === 'en' ? '' : '-'}30em)`;
        containerStyle.backgroundColor= 'hsla(0, 0%, 0%, 0)';
        setTimeout(() => containerStyle.visibility = 'hidden', 500);
        break;
    }
  }, [cartToggle, lan])

  function handleClick (type, e) {
    console.log(type)
    switch (type) {
      case 'REMOVE_FROM_CART':
        console.log('hi')
        const id = Number(e.target.dataset.productId);
        dispatch({
          type,
          id
        })
        break;
      default:
        console.log('Unknown type:', type);
    }
  }

  return (
    <div className="cartSlider-container" onClick={() => onCartToggleChange(false)} ref={cartContainerElement}>
      <div className={`cartSlider-container__slider${cartEmpty ? ' empty' : ''}`} onClick={e => e.stopPropagation()} ref={sliderElement}>
        <div className="cartSlider-container__slider__empty">
          <img className="cartSlider-container__slider__empty__cart" src={darkMode ? cartIconDarkMode : cartIcon}/>
          <div className="cartSlider-container__slider__empty__note">{lan === 'en' ? 'Your Cart Is Empty' : 'سله التسوق فارغه'}</div>
          <button className="cartSlider-container__slider__empty__button" onClick={() => onCartToggleChange(false)}>{lan === 'en' ? 'Back to shopping' : 'العوده للتسوق'}</button>
        </div>
        <section className="cartSlider-container__slider__top">
          <div className="cartSlider-container__slider__top__cart">{lan === 'en' ? 'Cart' : 'السله'}</div>
          <div className="cartSlider-container__slider__top__quantity">{cart.length}</div>
          <img className="cartSlider-container__slider__top__exit" onClick={() => onCartToggleChange(false)} src={darkMode ? closeIconDarkMode : closeIcon} role="button" tabIndex="0"/>
        </section>
        <ul className="cartSlider-container__slider__products">
          {cart.map(list =>
          {
              return <li className="cartSlider-container__slider__products__product" key={list.id}>
                <img className="cartSlider-container__slider__products__product__image" src={`/src/assets/img/products/${list.product.category}/${list.product.type}/${list.product.id + '-' + list.product.color.en}-front.webp`} />
                <a className="cartSlider-container__slider__products__product__title">{list.product.title[lan]}</a>
                <div className="cartSlider-container__slider__products__product__price">{lan === 'en' ? 'S.P' : 'ل.س'} {formatNumberWithCommas(calculatePrice(list.product.price, list.product.discount) * list.quantity)}</div>
                <div className="cartSlider-container__slider__products__product__toggles">
                  <button className="cartSlider-container__slider__products__product__toggles__delete" data-product-id={list.id} onClick={e => handleClick('REMOVE_FROM_CART', e)}/> 
                  <button className="cartSlider-container__slider__products__product__toggles__increment" />
                  <div className="cartSlider-container__slider__products__product__toggles__value">{list.quantity}</div>
                  <button className="cartSlider-container__slider__products__product__toggles__decrement" />
                </div>
              </li>;
            }
          )}
        </ul>
        <section className="cartSlider-container__slider__bottom">
          <div className="cartSlider-container__slider__bottom__total">{lan === 'en' ? 'Total' : 'اجمالي'} <span>{lan === 'en' ? 'S.P' : 'ل.س'} {formatNumberWithCommas(totalPrice)}</span></div>
          <div className="cartSlider-container__slider__bottom__shipment">{lan === 'en' ? 'Shipment fee calculated at Checkout' : 'تكاليف الشحن ستضاف عند الدفع'}</div>
          <button className="cartSlider-container__slider__bottom__view-cart">{lan === 'en' ? 'View cart' : 'عرض العربة'}</button>
          <button className="cartSlider-container__slider__bottom__checkout">{lan === 'en' ? 'Checkout' : 'الدفع'}</button>
        </section>
      </div>
    </div>
  )
}

export default CartSlider;