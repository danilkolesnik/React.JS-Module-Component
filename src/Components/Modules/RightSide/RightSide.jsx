import React, { useState, useEffect } from 'react';
// import '../../../sass/main.scss'

let indexChecker = 1

const RightSide = ({ activeEl, counter, slide, payment, vat, submit }) => {
  const [activePaymentButton, setActivePaymentButton] = useState(1);
  const onActivePaymentButton = (index) => {
    setActivePaymentButton(index);
    indexChecker = index
  }

  const firstMonthHide = () => {
    if (indexChecker === 0) {
      return (
        <span className='first__month__indicator'>/ 1 m-с</span>
      )
    }
  }

  const secondMonthHide = () => {
    if (indexChecker === 0) {
      return (
        <span className='second__month__indicator'>/ 1 m-с</span>
      )
    }
  }

  const [workCoef, setWorkCoef] = useState(10)
  const onWorkCoef = (int) => {
    setWorkCoef(int)
}
  
  const [coeficient, setCoeficient] = useState(1)
  const onSetCoeficient = (val) => {
    if (val === 1) {
      setCoeficient(1)
      onWorkCoef(10)
    }
    if (val === 7) {
      setCoeficient(1.5)
      onWorkCoef(25)
    }
    if (val === 13) {
      setCoeficient(2.5)
      onWorkCoef(50)
    }
    if (val === 19) {
      setCoeficient(4)
      onWorkCoef(100)
    }
    if (val === 25) {
      setCoeficient(10)
      onWorkCoef(250)
    }
    if (val === 31) {
      setCoeficient(20.1)
      onWorkCoef(500)
    }
    if (val === 37) {
      setCoeficient(30)
      onWorkCoef(1000)
    }
  }

  const render = () => {
    return (
      <>
        {activeEl === undefined ? null :
              activeEl.map(num => (num.status === true && num.indexButton !== null ?
              <div className="analiza__item" key={num.key}>
                <div className="item__holder__option">
                  <h1 className="cart__header">
                      {num.data.title}{num.data.options.length !== 0 ? ' / ' : null}<b>{num.data.options.length !== 0 ? num.data.options[num.indexButton].option_title : null}</b>
                      
                    </h1>
                  <div className="price__final__holder">
                    <span> + </span>
                      <span className="price__by__module">
                        {indexChecker === 0
                        ?
                          (num.data.options.length > 0 ? ((Number(num.data.price) + (Number(num.data.options[num.indexButton].price_option))) * coeficient).toFixed(2) : ((num.data.price) * coeficient).toFixed(2))
                        :
                          (num.data.options.length > 0 ? (((Number(num.data.price) + (Number(num.data.options[num.indexButton].price_option))) * coeficient) * 12).toFixed(2) : (((num.data.price) * coeficient) * 12).toFixed(2))
                        }
                      </span>
                    <span> PLN {firstMonthHide()} </span>
                  </div>

                </div>
              </div>
                :
                num.status === true &&
                <div className="analiza__item" key={num.key}>
                  <div className="item__holder__option">
                    <div className="cart__header__div">
                      <h1 className="cart__header">
                      {num.data.title}
                      </h1>
                    </div>
                    <div className="few__options__holder">
                      {num.opstatus !== 0 ? num.opstatus.map((ftp, din) => (
                        <b><span className='few__option__span' key={din}>{num.opstatus !== 0 ? '/ ' : ' '}{num.data.options[ftp].option_title}</span></b>
                      )
                      ) : null}
                    </div>
                    <div className="price__final__holder">
                    <span> + </span>
                      <span className="price__by__module">
                        {indexChecker === 0 ? 
                          num.opstatus.length > 0 ? ((Number(num.data.price) + num.opstatus.reduce((total, ftp) => ((Number(num.data.options[ftp].price_option) + total)), 0))*coeficient).toFixed(2) : (num.data.price*coeficient).toFixed(2)
                          :
                          num.opstatus.length > 0 ? (((Number(num.data.price) + num.opstatus.reduce((total, ftp) => ((Number(num.data.options[ftp].price_option) + total)), 0))*coeficient)*12).toFixed(2)  : ((num.data.price*coeficient)*12).toFixed(2)
                        }
                      </span>
                    <span> PLN {firstMonthHide()} </span>
                  </div>

                </div>
              </div>  
              ))}
      </>
    )
  }
  const totalArr = []
  const [totalPrice, setTotalPrice] = useState(0)
  const onSetTotalPrice = () => {
    let inter = 0
    totalArr.forEach(item => {
      inter += item
    })
    setTotalPrice(inter)
  }
  const findTotal = () => {
    const total = document.querySelectorAll('.price__by__module')
    if (total.length !== 0) {
      total.forEach(num => {
        totalArr.push(Number(num.innerText))
      })
    }
  }
  
  useEffect(() => {
    let sliderValue = slide
    onSetCoeficient(Number(sliderValue))

    //to other useEffect
    findTotal()
    onSetTotalPrice()
  });
  return (
    <>
      <div className="rower">
      <div className="main__window">
      <div className="picked__modules">
          <h1 className='top__caption'>Wybrane moduły</h1>
          {/* aint picked place */}
          {render()}
      </div>
      <h1 className='lower__caption'>Rozliczenie</h1>
      <div className="button__payment__block">
        <ul className="button__list">
          {
            payment.map((item, index) =>
              (<li
                key={`${item}_${index}`}
                className= {activePaymentButton === index ? 'active__payment__button' : 'disabled__payment__button'}
                onClick = {() =>  onActivePaymentButton(index)}
                >   
                {item}
                </li>)
              )
          }
        </ul>
      </div>
        <div className="bottom_elements">

          <div className="price__holder">
              <h1 className='total__value'>{workCoef !== 1000 ? totalPrice.toFixed(2) : '-'} {workCoef !== 1000 ? 'PLN' : ''}</h1>
              {secondMonthHide()}
          </div>

          <p className="slider__indicator">{counter} pracowników</p>
            <p className='worker__price'>{workCoef !== 1000 ? (totalPrice / workCoef).toFixed(2) : '-'} PLN / 1 PRACOWNIK MIESIĘCZNIE</p>
        </div>

      </div>
      <div className ='description__container'>
          <span className="description__holder">{vat}</span>
      </div>
        <button className="admin__button">
          {workCoef === 1000 ? 'Indywidualna wycena' : submit}
        </button>
      </div>
    </>
  )

}

export default RightSide;
