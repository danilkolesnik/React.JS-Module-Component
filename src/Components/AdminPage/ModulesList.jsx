import React from 'react';

const Moduleslist = ({ item }) => {
  console.log(item)
  
  const moduleChecker = () => {
    if (item.options !== undefined) {
      if (item.options.length > 1) {
      return (
        <div className="main__option__container">
          <h1 className="option__caption">Options:</h1>
          <div className="options__container">
            {item.options.map((org, key) => (<h1 key={key} className="option__descr">{org.option_title}</h1>))}
          </div>
        </div>
      )
    }
    }
  }

  
  return (
    <div className="main__module__block">  
        <div>
          <div className="item__holder">

          <h1 className="item__name">{item.title}</h1>
          <div className="price__button">
            <span className="item__price">price: {item.price}</span>
          </div>
        </div>
        {moduleChecker()}
        
      </div>
      
    </div>
    
  );
}

export default Moduleslist;
