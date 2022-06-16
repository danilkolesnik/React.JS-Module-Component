import React from 'react';

const Optionfield = (number) => {
  return (
    <div className="additional__options__menu">
      <span className="option__label">Option {number.number}</span>
      <input className="input__additional" type="text" required="required" placeholder=
      {`Option title ${number.number}`} />
      <input className="input__additional" type="text" required="required" placeholder=
      {`Option price ${number.number}`} />
    </div>
  );
}

export default Optionfield;
