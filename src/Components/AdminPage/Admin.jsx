import React, {useState, useEffect} from 'react';
// import './Admin.css'
import ActiveModules from './ActiveModules'
import axios from 'axios';


const Admin = () => {
  const [dataState, setDataState] = useState([])
  
  useEffect(() => {
      axios.get('https://dolineofactory.grupaww.jchost09.pl/wp-json/acf/v3/pages/2597').then(({ data }) => {
        setDataState([...data.acf.modul])
      })
  }, []);
  
  return (
    <div className="admin__form">
      <div className="modules__container">
        <ActiveModules data={dataState} />
      </div>
    </div>
  );
}

export default Admin;
