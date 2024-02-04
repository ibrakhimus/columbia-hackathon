import React from 'react';

const Bill = (policy) => {
    return (
        <>
            <div className="bill" >
            <figure className="bill__img--wrapper" onClick={policy.onClick}>
              <img className="bill__img" src={policy.img} alt={policy.name}/>
            </figure>
            <div className="bill__description">
            <h3 className="bill__title">{policy.name.length > 45 ? policy.name.substring(0, 45) + '...' : policy.name}</h3>
              <p className="bill__para">{policy.date}</p>
            </div>
          </div>
        </>
    );
}

export default Bill;
