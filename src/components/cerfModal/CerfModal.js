import React, {useRef, useEffect, useState} from "react";
import "./CerfModal.css";
import Frame from '../../assets/Frame.svg';
import {useNavigate} from "react-router-dom";
import VerificationCode from "../verificationCode/VerificationCode";
import axios from "axios";
import Freedom from "../../assets/Logo Credit.png";
import InputMask from "react-input-mask";
import Loading from "react-fullscreen-loading";

function CerfModal({ onClose, prices }) {
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [showVerification, setShowVerification] = useState(false)
    const [showIIN, setShowIIN] = useState(false)
    const [reject, setReject] = useState(null)
    const [phone, setPhone] = useState("")
    const [iinOk, setIINOk] = useState(true)
    const [iin, setIIN] = useState("")
    const [month, setMonth] = useState(-1)
    const [showLoader, setShowLoader] = useState(false)

    let [user, setUser] = useState({
        "email": "",
        "firstName": "",
        "lastName": "",
        "username": "",
        "phone_number": ""
    });
    const handleIINChange = (e) => {
        setIIN(e.target.value);
    };
    const waitForRedirect = async () => {
        console.log("HERE WE GO AGAIN")
        try{
            await fetch('https://cloudpaymentsapi.kz/redirect_user/' + localStorage.getItem('userId'), )
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    const url = data.url;
                    console.log(url)
                    setShowLoader(false)
                    if (url) {
                        if (url['0'] == 'h')
                            window.location.href = url;
                        else {
                            alert(url)
                            navigate('/')
                        }
                    }
                })

        }
        catch (error){
            await waitForRedirect()
        }

    }
    const handlePriceSelection = (price) => {
        console.log(price)
        setShowIIN(true)
        setSelectedPrice(price);
        setShowIIN(month > 0 && price > 0)
    };
    const handleMonth = (price) => {
        setMonth(price);
        setShowIIN(price > 0 && selectedPrice > 0)
    };
    const handleVerification = (id) => {
        fetch('https://api.ffin.credit/ffc-api-public/universal/general/validate-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "JWT " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                'iin': iin,
                'mobile_phone': '+' + user.phone_number,
                'code' : id[0].toString() + id[1].toString() + id[2].toString() + id[3].toString()
            })
        })
            .then((response) =>{
                console.log(response)
                fetch('https://api.ffin.credit/ffc-api-public/universal/apply/apply-lead', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "JWT " + localStorage.getItem("jwt")
                    },
                    body: JSON.stringify({
                        'iin': iin,
                        'mobile_phone': '+' + user.phone_number,
                        'product': 'REDDEL',
                        'channel': 'REDDEL_WEB',
                        'partner': 'REDDEL',
                        'credit_params': {
                            'period': '3',
                            'principal' : selectedPrice,
                        },
                        'additional_information': {
                            'hook_url': 'https://cloudpaymentsapi.kz/handle',
                            'success_url': 'https://cloudpaymentsapi.kz/handle',
                            'failure_url': 'https://cloudpaymentsapi.kz/handle'
                        },
                        'credit_goods': [{'cost': selectedPrice}]
                    })
                })
                    .then((response) =>{
                        if(response.ok){
                            waitForRedirect()
                        }
                        else{
                        }
                    })
                    .catch((error) =>{
                        console.log(error.message)
                    })
            })

    }
    const create_certificate = async (e) => {
        fetch('https://surapid.kz/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'jwt': localStorage.getItem('accessToken')})
        })
            .then((response) => {
                if(response.status != '200')
                    navigate('/login')
                return response.json();
            })
            .then((data) => {
                console.log(data)
                setUser(data);
            })
            .catch((error) => {
                console.error(error); // Handle any errors that occurred during the fetch
                navigate('/login')
            });
        if(selectedPrice==null || iin.length < 12)
            return
        e.preventDefault();
        await fetch('https://api.ffin.credit/ffc-api-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': 'reddel@ffin.credit',
                'password': '3TxAA5@rsA9M$*yw'
            })
        })
            .then(async (response) => {
                let jwt = await response.json()
                console.log(jwt.access)
                localStorage.setItem("jwt", jwt.access)
            })
        fetch('https://api.ffin.credit/ffc-api-public/universal/general/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "JWT " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                'iin': iin,
                'mobile_phone': '+' + user.phone_number
            })
        })
            .then((response) =>{
                console.log(response)
                if(showIIN) {
                    setShowVerification(response.ok)
                    setIINOk(response.ok)
                }
            })
    };
    // useEffect(() => {
    //   const handleClickOutside = (event) => {
    //     if (modalRef.current && !modalRef.current.contains(event.target)) {
    //       onClose();
    //     }
    //   };
    //
    //   document.addEventListener("mousedown", handleClickOutside);
    //   return () => {
    //     document.removeEventListener("mousedown", handleClickOutside);
    //   };
    // }, [onClose]);
    
    return (
    <div className="cerf-modal">
        <div className="cerf-modal-content" ref={modalRef}>
            <h5 className="h5">Сертификат в рассрочку на сумму</h5>
            <div className='price'>
                {prices && prices.map((item, index) => (
                    <span
                        key={index}
                        onClick={() => handlePriceSelection(item)}
                        className={selectedPrice === item ? 'selected-price' : ''}
                    >
                            <p>{item} ₸</p>
                        </span>
                ))}
            </div>
            <h5 className="h5">На срок</h5>
            <div className='price'>
                        <span className={month === 3 ? 'selected-price' : ''} onClick={()  => handleMonth(3)}>
                            <p>3 месяца</p>
                        </span>
                <span className={month === 6 ? 'selected-price' : ''} onClick={()  => handleMonth(6)}>
                            <p>6 месяцев</p>
                        </span>
            </div>
            <div className='certificate'>
                <img src={Frame} alt="random" />
                <span>Сертификатом можно оплатить 1 счет</span>
            </div>
            <img src={Freedom} alt="random" width={'150px'}/>

            { showIIN ? (
                <form>
                    <label htmlFor="inputField">Введите иин:</label>
                    <br></br>
                    <br></br>
                    <InputMask
                        type="integer"
                        mask="* * * * * * * * * * * *"
                        maskChar=" "
                        placeholder="_ _ _ _ _ _ _ _ _ _ _ _"
                        value={iin}
                        onChange={(e) => {
                            const numbersOnly = e.target.value.replace(/[^0-9]/g, '');
                            setIIN(numbersOnly)
                        }
                        }
                        className="input_iin"
                    />
                    {/*<input type="text" value={iin} onChange={handleIINChange} name="code" minLength="12" maxLength="12" required></input>*/}
                    <br></br>
                    <br></br>

                    <button className='certificate-button' type={"submit"} onClick={create_certificate}>Оформить</button>
                </form>) : (
                <a>Выберите сумму</a>
            )

            }
            { !showIIN ? <button className='certificate-button' onClick={create_certificate}>Оформить</button> : (<a></a>)}
        </div>
        {showVerification && <VerificationCode handleVerification={handleVerification}/>}
        {showLoader ? <Loading loading background="" loaderColor="#3498db" > Банк принимает решение </Loading> : (<a></a>)}

    </div>
  );
}

export default CerfModal;
