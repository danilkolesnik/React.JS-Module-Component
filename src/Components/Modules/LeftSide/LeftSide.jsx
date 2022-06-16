import React, { useState, useEffect }from 'react';
// import './LeftSide.css'
import Rightside from '../RightSide/RightSide';
import axios from 'axios'
import ChooseModules from './ChooseModules'

const LeftSide = ({count, slide, array, vat, submit}) => {
  
  const [arrayActive, setArrayActive] = useState([])
  const listActive = (obj) => {
    console.log(obj)
    const edit = []
    arrayActive.forEach((num, ind) => {
      if (ind === obj.key) {
           edit.push(obj)
      } else {
        edit.push(num)
         }
    })
    setArrayActive(edit)
  }


  const [module, setModule] = useState([])
  const response = async () => {
    const { data } = await axios.get('https://dolineofactory.grupaww.jchost09.pl/wp-json/acf/v3/pages/2597');
    setModule([...data.acf.modul])
    const test = []
    data.acf.modul.forEach((num,ind) => {
      test.push({ key: ind, status: false, indexButton: 0, data: num })
    })
    setArrayActive(test)
  }

  useEffect(() => {
    response()
  }, [])

  useEffect(() => {
  })

  return (
    <div className='blocks__container'>

      <div className="choose__modules">
        <h1 className="main__caption">Wybierz moduły</h1>
        <div className='panel__holder'>
          {module.map((num, key) => (
            <ChooseModules data={num} editStatus={listActive} key={key} ind={key}/>
          ))}
        </div>
      </div>

      <Rightside
        activeEl={arrayActive}
        counter={count}
        slide={slide}
        payment={array}
        vat={vat}
        submit={submit}
      />

    </div>
  );
}

export default LeftSide;

