import React from 'react';
import Moduleslist from './ModulesList';

const Activemodules = ({ data }) => {
  
  return (
    <div>
      <div className="admin__stuff">
        <h1>Active modules</h1>
        <div className="item__container">
          {data.map((num, index) => (<Moduleslist item={num} key={index}/>))}
        </div>
      </div>
    </div>
  );
}

export default Activemodules;
