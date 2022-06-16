import React, { useState } from 'react';

const Test = ({ data, editStatus, ind }) => {
  const [buttonsActive, setButtonsActive] = useState([])
  const onSetActive = (index) => {
    if (buttonsActive.includes(index)) {
      const filt = buttonsActive.filter(num => (num !== index))
      setButtonsActive([...filt])
      editStatus({ key: ind, status: activeButton, indexButton: null, opstatus: filt, data })
      return
    }
    if (buttonsActive.length === 0) {
      setButtonsActive([index])
      } else {
      setButtonsActive([...buttonsActive, index])
      }
      editStatus({key: ind, status: activeButton, indexButton: null, opstatus: [...buttonsActive, index], data })
      return
  }

  const [optionButton, setOptionButton] = useState(false);
  const onOptionButton = () => {
    if (optionButton === true) {
      setOptionButton(!optionButton)
      setFewOptionButton(false)
      setActiveItem(null)
      setButtonsActive([])
      editStatus({ key: ind, status: activeButton, indexButton: null, opstatus: buttonsActive, data });
    } else {
      setOptionButton(!optionButton)
      setActiveItem(0)
      editStatus({ key: ind, status: activeButton, indexButton: 0, opstatus: buttonsActive, data });
    } 
  }

  const [activeButton, setActiveButton] = useState(false);
  const onActiveButton = () => {
    if (activeButton === true) {
      setActiveButton(!activeButton)
      setOptionButton(false)
      setFewOptionButton(false)
      setActiveItem(null)
      setButtonsActive([])
    } else {
      setActiveButton(!activeButton)
      setActiveItem(0)
    }
    editStatus({ key: ind, status: !activeButton, indexButton: activeItem, opstatus: buttonsActive, data })
  }

  const [activeItem, setActiveItem] = useState(null);
  const onActiveItem = (test) => {
    setActiveItem(test);
    editStatus({ key: ind, status: activeButton, indexButton: test, opstatus: buttonsActive, data });
  }

  const [fewOptionButton, setFewOptionButton] = useState(false);
  const onSetFewOptions = () => {
    if (fewOptionButton === false) {
      setFewOptionButton(!fewOptionButton)
      setActiveItem(null)
    } else {
      setFewOptionButton(!fewOptionButton)
      setActiveItem(0)
    }
    editStatus({ key: ind, status: activeButton, indexButton: null, opstatus: buttonsActive, data });
  }

  return (
    <>
      <div className="parent" key={ind}>
          <h1 className='undercaption' >{data.title}</h1>
          <div className="title__row">  
            <p className="description">{data.description}</p>
            <div className="switcher">
              <button className={activeButton ? "position__right" : "position__left"}
                      onClick={onActiveButton}>
              <div className="round__switcher"></div>
              </button>
            </div>
        </div>
        
        <div className="options__hold">
          <ul className = 'buttons'>
            {fewOptionButton !== true ? (data.options && data.options.map((item, test) => (
              <li
                key={`${item}_${test}`}
                className={optionButton === true ? (activeItem === test ? 'active__pick' : 'disabled__pick') : 'off__pick'}
                onClick={() => optionButton === true ? onActiveItem(test) : null}
              >
                {item.option_title}
              </li>
            )))
              :
              //renders if user toggles FEW_OPTIONS button
              (data.options && data.options.map((item, index) => {
                return (
                  <li
                    key={`${item}_${index}`}
                    className={buttonsActive.length === 0 ? 'pick__few__disabled' : buttonsActive.includes(index) ? "pick__few__enabled" : "pick__few__disabled"}

                    onClick={() => onSetActive(index)}
                  >
                    {item.option_title}
                  </li>
                )
              }))
          }
          </ul>

          {data.options &&
            <div className="option__switcher">
              <button className={optionButton ? "option__position__right" : "option__position__left"}
                onClick={activeButton === true ? onOptionButton : null}>
                <div className="option__round__switcher"></div>
              </button>
            </div>
          }
        </div>

        {data.options &&
          <div className="few__option__holder">
            <span className="few__option__span">Wiele opcji</span>
            <div className="few__option__switcher">
              <button className={fewOptionButton ? "few__option__position__right" : "few__option__position__left"}
                onClick={optionButton === true ? onSetFewOptions : null}>
                <div className="few__option__round__switcher"></div>
              </button>
            </div>
          </div>
        }

        </div>
        
    </>
  );
}

export default Test;
