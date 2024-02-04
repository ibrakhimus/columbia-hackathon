import React from 'react';

const Bill = (policy) => {
    return (
        <>
            <div class="bill" >
            <figure class="bill__img--wrapper" onClick={policy.onClick}>
              <img class="bill__img" src={policy.img} alt={policy.name}/>
            </figure>
            <div class="bill__description">
            <h3 className="bill__title">{policy.name.length > 30 ? policy.name.substring(0, 30) + '...' : policy.name}</h3>
              <p class="bill__para">{policy.date}</p>
            </div>
          </div>
        </>
    );
}

export default Bill;
