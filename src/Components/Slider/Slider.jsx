import React, {useState, useEffect} from 'react';
// import './Slider.css'
import LeftSide from '../Modules/LeftSide/LeftSide'
import axios from 'axios';

const Slider = () => {
  const button_array = []
  const [datas, setDatas] = useState([]) 
  useEffect(() => {
      axios.get('https://dolineofactory.grupaww.jchost09.pl/wp-json/acf/v3/pages/2597').then(({ data }) => {
        setDatas(data.acf)
      })
  }, []);

  const [sliderValue, setSliderValue] = useState(1);
  const [counter, setCounter] = useState('1-10')


  const onSliderValue = ({ target }) => {
    const value = target.value
    if (value <= 2) {
      setCounter('1-10')
    } else if (value <= 7) {
      setCounter('10-25')
    } else if (value <= 13) {
      setCounter('26-50')
    } else if (value <= 19) {
      setCounter('51-100')
    } else if (value <= 25) {
      setCounter('101-250')
    } else if (value <= 31) {
      setCounter('251-500')
    } else if (value >= 37) {
      setCounter('1000')
    }      
    setSliderValue(value)
  }
  button_array.push(datas.month_title)
  button_array.push(datas.year_title)
  
  return (
    <>
      <div className='top__container'>

        <div className="inner__container">
          <h1 className='cennik__caption'>{datas.title}</h1>

          <div className="slider__container">
            <span className='value__indicator'>1</span>

            <input type="range" min="1" max="37" className="slider" step='6' value={sliderValue}
               onInput={onSliderValue}/>
            
            <span className='value__indicator'>1000</span>
          </div>
          <p className='employee__counter'>{datas.sub_title} {counter} osób</p>
        </div>
        
      </div>
      
      <div className="content__box">
        <LeftSide
          count={counter}
          slide={sliderValue}
          array={button_array}
          vat={datas.vat}
          submit={datas.submit_title}
        />
        </div>
    </>
  );
}

export default Slider;
