// HOOKS
import React, {useState, useEffect, useRef} from 'react';

// SCSS
import '/src/Styles/Components/Pages/Products/AdvertList.scss';

// product img test
import productIMG from '/src/assets/Img/Products/GIYO Small Bike tire Pump Schrader.jpg';
import productIMG2 from '/src/assets/Img/Products/Giant Bicycle Road full Carbon.avif';
import productIMG3 from '/src/assets/Img/Products/RIDE 12 Chili Red Carbon Grey 2023.avif';
import productIMG4 from '/src/assets/Img/Products/Seymour Oceanweave 1.3 H2O.avif';
import brandLogo from '/src/assets/Img/Logo/TREK.avif';
import brandLogo2 from '/src/assets/Img/Logo/GIANT.avif';
import brandLogo3 from '/src/assets/Img/Logo/EVOC.avif';

function AdvertList ({darkMode, language}) {

  return (
    <>
      <div className="advertList-container">
        <ul className="advertList-container__grid">
          <li className="advertList-container__grid__product-content">
            <div className="advertList-container__grid__product-content__img-container">
              <img className="advertList-container__grid__product-content__img-container__img" src={productIMG}/>
              <button className="advertList-container__grid__product-content__img-container__favourite"></button>
            </div>
            <h3 className="advertList-container__grid__product-content__description">{language === 'english' ? 'Hand size air pump' : 'منفاخ هوائي بحجم اليد'}</h3>
            <img className="advertList-container__grid__product-content__brandLogo" src={brandLogo}/>
            <h3 className="advertList-container__grid__product-content__price">500 <span className="currency-symbol">{language === 'english' ? 'S.P' : 'ل.س'}</span></h3>
            <div className="advertList-container__grid__product-content__cart-utils">
              <button className="advertList-container__grid__product-content__cart-utils__add-to-cart">{language === 'english' ? 'Add to cart' : 'اضف الى السله'}</button>  
              <button className="advertList-container__grid__product-content__cart-utils__increment"></button>  
              <div className="advertList-container__grid__product-content__cart-utils__total">1</div>  
              <button className="advertList-container__grid__product-content__cart-utils__decrement"></button>  
            </div>
          </li>
          <li className="advertList-container__grid__product-content">
            <div className="advertList-container__grid__product-content__img-container">
              <img className="advertList-container__grid__product-content__img-container__img" src={productIMG2}/>
              <button className="advertList-container__grid__product-content__img-container__favourite"></button>
            </div>
            <h3 className="advertList-container__grid__product-content__description">{language === 'english' ? 'Giant Road Bicycle full Carbon' : 'دراجه جيانت سباق فول كربون'}</h3>
            <img className="advertList-container__grid__product-content__brandLogo" src={brandLogo2}/>
            <h3 className="advertList-container__grid__product-content__price discount">{language === 'english' ? 'now' : 'الان'} 25 <span className="currency-symbol">{language === 'english' ? 'S.P ' : 'ل.س'}</span><s>50</s></h3>
            <div className="advertList-container__grid__product-content__cart-utils">
              <button className="advertList-container__grid__product-content__cart-utils__add-to-cart">{language === 'english' ? 'Add to cart' : 'اضف الى السله'}</button>  
              <button className="advertList-container__grid__product-content__cart-utils__increment"></button>  
              <div className="advertList-container__grid__product-content__cart-utils__total">1</div>  
              <button className="advertList-container__grid__product-content__cart-utils__decrement"></button>  
            </div>
          </li>
          <li className="advertList-container__grid__product-content">
            <div className="advertList-container__grid__product-content__img-container">
              <img className="advertList-container__grid__product-content__img-container__img" src={productIMG3}/>
              <button className="advertList-container__grid__product-content__img-container__favourite"></button>
            </div>
            <h3 className="advertList-container__grid__product-content__description">{language === 'english' ? 'RIDE 12 (Chili Red Carbon Grey) 2023' : 'RIDE 12 (Chili Red Carbon Grey) 2023'}</h3>
            <img className="advertList-container__grid__product-content__brandLogo" src={brandLogo3}/>
            <h3 className="advertList-container__grid__product-content__price">1200 <span className="currency-symbol">{language === 'english' ? 'S.P' : 'ل.س'}</span></h3>
            <div className="advertList-container__grid__product-content__cart-utils">
              <button className="advertList-container__grid__product-content__cart-utils__add-to-cart">{language === 'english' ? 'Add to cart' : 'اضف الى السله'}</button>  
              <button className="advertList-container__grid__product-content__cart-utils__increment"></button>  
              <div className="advertList-container__grid__product-content__cart-utils__total">1</div>  
              <button className="advertList-container__grid__product-content__cart-utils__decrement"></button>  
            </div>
          </li>
          <li className="advertList-container__grid__product-content">
            <div className="advertList-container__grid__product-content__img-container">
              <img className="advertList-container__grid__product-content__img-container__img" src={productIMG4}/>
              <button className="advertList-container__grid__product-content__img-container__favourite"></button>
            </div>
            <h3 className="advertList-container__grid__product-content__description">{language === 'english' ? 'Seymour Oceanweave 1.3 H2O' : 'Seymour Oceanweave 1.3 H2O'}</h3>
            <img className="advertList-container__grid__product-content__brandLogo" src={brandLogo3}/>
            <h3 className="advertList-container__grid__product-content__price">5000 <span className="currency-symbol">{language === 'english' ? 'S.P' : 'ل.س'}</span></h3>
            <div className="advertList-container__grid__product-content__cart-utils">
              <button className="advertList-container__grid__product-content__cart-utils__add-to-cart">{language === 'english' ? 'Add to cart' : 'اضف الى السله'}</button>  
              <button className="advertList-container__grid__product-content__cart-utils__increment"></button>  
              <div className="advertList-container__grid__product-content__cart-utils__total">1</div>  
              <button className="advertList-container__grid__product-content__cart-utils__decrement"></button>  
            </div>
          </li>
        </ul>
      </div>
    </>
  )
}

export default AdvertList;