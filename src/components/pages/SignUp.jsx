// HOOKS
import React, {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';

// FIREBASE
import {auth} from "/src/firebase/authSignUp";
import {createUserWithEmailAndPassword, onAuthStateChanged, updateProfile} from "firebase/auth";
import handleAuthError from "/src/firebase/handleAuthError";

// COMPONENTS
import Banner from '/src/components/Banner';
import ProgressActivity from '/src/components/ProgressActivity';
import Alert from '/src/components/Alert';

// SCSS
import '/src/styles/components/pages/SignUp.scss';

// UTILS
import validate from '/src/utils/validate';
import Redirector from '/src/utils/Redirector';

// ASSETS
// import user from '/assets/img/icons/user.svg';
import person from '/assets/img/icons/person.svg';

// ASSETS - DARKMODE
import userDarkMode from '/assets/img/icons/user_darkMode.svg';
import personDarkMode from '/assets/img/icons/person_darkMode.svg';

function SignUp ({darkMode, lan}) {

  const en = lan === 'en';
  const pageTitle = en ? 'CREATE ACCOUNT' : 'انشاء حساب';
  const {pathname} = window.location;
  const navigate = useNavigate();
  const redirector = new Redirector(navigate);

  const [processing, setProcessing] = useState(false);
  const [alertText, setAlertText] = useState(null);
  const [newAlert, setNewAlert] = useState(0);
  const [user, setUser] = useState(false);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    newsLetter: false,
  });

  const createButtonEL = useRef(null);

  const formEL = useRef(null);
  const fNameLabelEL = useRef(null);
  const lNameLabelEL = useRef(null);
  const emailLabelEL = useRef(null);
  const phoneLabelEL = useRef(null);
  const passLabelEL = useRef(null);
  const cPassLabelEL = useRef(null);

  const fNameInputEL = useRef(null);
  const lNameInputEL = useRef(null);
  const emailInputEL = useRef(null);
  const phoneInputEL = useRef(null);
  const passInputEL = useRef(null);
  const cPassInputEL = useRef(null);

  const fNamePopupEL = useRef(null);
  const lNamePopupEL = useRef(null);  
  const emailPopupEL = useRef(null);  
  const phonePopupEL = useRef(null);  
  const passPopupEL = useRef(null);  
  const cPassPopupEL = useRef(null);  

  const fNameEL = useRef(null);
  const lNameEL = useRef(null);
  const emailEL = useRef(null);
  const phoneEL = useRef(null);
  const passEL = useRef(null);
  const cPassEL = useRef(null);

  useEffect(() => redirector.signup(pathname, user), [user]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    return () => unsubscribe();
  }, []);

  const handleChange = e => {
    const {name, value, checked} = e.target;
    const isNewsLetter = name === 'newsLetter';
    setFormData(prevData => ({...prevData, [name]: isNewsLetter ? checked : value}))
  }

  const handleSubmit = async e => {

    const removeErrorPopup = () => {
      fNameEL.current.classList.remove('error');
      lNameEL.current.classList.remove('error');
      phoneEL.current.classList.remove('error');
      passEL.current.classList.remove('error');
      cPassEL.current.classList.remove('error');
    }

    e.preventDefault();
    removeErrorPopup();
    
    if (!validateInputs()) return;
    setProcessing(true);
    const isOperationSucesssful = await signUpWithEmailAndPass();
    if (isOperationSucesssful) {
      await submitForm();
      scroll({top: 0, behavior: 'smooth'});
    } else {
      formEL.current.style.border = 'solid var(--red-color) 2px';
    }
    setProcessing(false);
  }

  const signUpWithEmailAndPass = async () => {
    const {email, password} = formData;
    try {
      const userCredintial = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredintial.user;
      return true;
    } catch (err) {
      console.error(err);
      setAlertText(handleAuthError(err, en));
      setNewAlert(Math.random());
      return false;
    }
  }

  const submitForm = async () => {
    const {fname, lname, phone, newsLetter} = formData
    try {
      updateProfile(auth.currentUser, {
        displayName: fname + ' ' + lname
      })
    } catch (err) {
      console.error(err);
      setAlertText(handleAuthError(err, en));
      setNewAlert(Math.random());
    }
  }
  
  const validateInputs = () => {

    const handleError = (errorMessage, popupEL, formChildEL) => {
      popupEL.textContent = errorMessage;
      formChildEL.classList.add('error');
      formEL.current.style.border = 'solid var(--red-color) 2px';
      return false;      
    }

    const {fname, lname, email, phone, password, confirmPassword} = formData;

    if (typeof(validate.register.firstName(fname, en)) === 'string') return handleError(validate.register.firstName(fname, en), fNamePopupEL.current, fNameEL.current);
    if (typeof(validate.register.lastName(lname, en)) === 'string') return handleError(validate.register.lastName(lname, en), lNamePopupEL.current, lNameEL.current);
    if (typeof(validate.register.email(email, en)) === 'string') return handleError(validate.register.email(email, en), emailPopupEL.current, emailEL.current);
    if (typeof(validate.register.phone(phone, en)) === 'string') return handleError(validate.register.phone(phone, en), phonePopupEL.current, phoneEL.current);
    if (typeof(validate.register.password(password, en)) === 'string') return handleError(validate.register.password(password, en), passPopupEL.current, passEL.current);
    if (typeof(validate.register.confirmPassword(password, confirmPassword, en)) === 'string') return handleError(validate.register.confirmPassword(password, confirmPassword, en), cPassPopupEL.current, cPassEL.current);

    return true;
  }

  const removeError = el => el.classList.remove('error');

  const handleFocus = e => {
    const {name} = e.target;
    formEL.current.style.border = 'solid var(--signUp-input-border-color) 2px';

    switch (name) {
      case 'fname':
        fNameEL.current.classList.remove('error');
        fNameEL.current.classList.add('onFocus');
        break;
      case 'lname':
        lNameEL.current.classList.remove('error');
        lNameEL.current.classList.add('onFocus');  
        break;
      case 'email':
        emailEL.current.classList.remove('error');
        emailEL.current.classList.add('onFocus');  
        break;
      case 'phone':
        phoneEL.current.classList.remove('error');
        phoneEL.current.classList.add('onFocus');  
        break;
      case 'password':
        passEL.current.classList.remove('error');
        passEL.current.classList.add('onFocus');
        break;
      case 'confirmPassword':
        cPassEL.current.classList.remove('error');
        cPassEL.current.classList.add('onFocus');  
        break;
      case 'vcode':
        vCodeEL.current.classList.remove('error');
        vCodeEL.current.classList.add('onFocus');  
        break;
      default:
        console.log('Unknown type:', type);
    }
  }

  const handleBlur = e => {
    const {name} = e.target;
    const inputEmpty = e.target.value === '';

    if (inputEmpty) {
      switch (name) {
        case 'fname':
          fNameEL.current.classList.remove('onFocus');
          break;
        case 'lname':
          lNameEL.current.classList.remove('onFocus');
          break;
        case 'email':
          emailEL.current.classList.remove('onFocus');
          break;
        case 'phone':
          phoneEL.current.classList.remove('onFocus');
          break;
        case 'password':
          passEL.current.classList.remove('onFocus');
          break;
        case 'confirmPassword':
          cPassEL.current.classList.remove('onFocus');
          break;
        case 'vcode':
          vCodeEL.current.classList.remove('onFocus');
          break;
        default:
          console.log('Unknown type:', type);
      }
    }
  }

  const path = el => el.dataset.path;

  const handleClick = e => {
    navigate(path(e.target))
    scroll({top: 0, behavior: 'smooth'});
  }

  const handleProcessing = text => {
    switch (true) {
      case processing:
        return <ProgressActivity darkMode={darkMode} invert={true} />
      default:
        return text;
    }
  }

  return (
    <section className='signUp'>
      <Alert alertText={alertText} newAlert={newAlert} />
      <Banner pageTitle={pageTitle} description={false}/>
      <form className='signUp__form' acceptCharset="UTF-8" onSubmit={handleSubmit} ref={formEL} autoComplete="on">
        <div className="signUp__form__intro">
          <div className="img"/>
          <h1>{en ? 'Start Your Cycling Journey' : 'ابدأ رحلتك في ركوب الدراجات'}</h1>
          <p>{en ? 'Let\'s get you set up!' : 'دعنا نقوم بإعدادك!'}</p>
        </div>
        <div className="signUp__form__fname" ref={fNameEL}>
          <label className="signUp__form__fname__label" htmlFor="fname" ref={fNameLabelEL}>{en ? 'FIRST NAME' : 'الاسم الاول'}</label>
          <input className="signUp__form__fname__input" type="text" name="fname" id="fname" autoComplete="true" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} ref={fNameInputEL} />
          <div className="signUp__form__fname__error-popup" onClick={() => removeError(fNameEL.current)} ref={fNamePopupEL} />
        </div>
        <div className='signUp__form__lname' ref={lNameEL}>
          <label htmlFor="lname" ref={lNameLabelEL}>{en ? 'LAST NAME' : 'الاسم الاخير'}</label>
          <input type="text" name="lname" id="lname" autoComplete="true" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} ref={lNameInputEL}/>
          <div className="signUp__form__fname__error-popup" onClick={() => removeError(lNameEL.current)} ref={lNamePopupEL} />
        </div>
        <div className='signUp__form__email' ref={emailEL}>
          <label htmlFor="email" ref={emailLabelEL}>{en ? 'EMAIL' : 'البريد الالكتروني'}</label>
          <input type="text" name="email" id="email" autoComplete="true" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} ref={emailInputEL}/>
          <div className="signUp__form__email__error-popup" onClick={() => removeError(emailEL.current)} ref={emailPopupEL} />
        </div>
        <div className='signUp__form__phone' ref={phoneEL}>
          <label htmlFor="phone" ref={phoneLabelEL}>{en ? 'PHONE NUMBER' : 'رقم الهاتف'}</label>
          <input type="text" name="phone" id="phone" autoComplete="true" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} ref={phoneInputEL}/>
          <div className="signUp__form__phone__error-popup" onClick={() => removeError(phoneEL.current)} ref={phonePopupEL} />
        </div>
        <div className='signUp__form__password' ref={passEL}>
          <label htmlFor="password" ref={passLabelEL}>{en ? 'PASSWORD' : 'كلمه المرور'}</label>
          <input type="password" name="password" id="password" autoComplete="true" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}ref={passInputEL}/>
          <div className="signUp__form__password__error-popup" onClick={() => removeError(passEL.current)} ref={passPopupEL} />
        </div>
        <div className='signUp__form__cpassword' ref={cPassEL}>
          <label htmlFor="cpassword" ref={cPassLabelEL}>{en ? 'CONFIRM PASSWORD' : 'تاكيد كلمه المرور'}</label>
          <input type="password" name="confirmPassword" id="cpassword" autoComplete="true" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} ref={cPassInputEL}/>
          <div className="signUp__form__password__error-popup" onClick={() => removeError(cPassEL.current)} ref={cPassPopupEL} />
        </div>
        <div className='signUp__form__newsletter'>
          <input className="checkbox-input" type="checkbox" name="newsLetter" id="newsLetter" autoComplete="true" onChange={handleChange} readOnly/>
          <label className="description" htmlFor="newsLetter">{en ? 'I agree recieving latest news and special deals emails according to the privacy policy' : 'أوافق على تلقي آخر الأخبار والعروض الخاصة عبر البريد الإلكتروني وفقًا لسياسة الخصوصية'}</label>
        </div>
        <button className='signUp__form__create' type="submit" ref={createButtonEL}>{handleProcessing(en ? 'CREATE' : 'انشئ')}</button>
      </form>
    </section>
  )
}

export default SignUp;