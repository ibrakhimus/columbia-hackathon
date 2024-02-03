import React from 'react';

const Bill = (policy) => {
    return (
        <>
            <div className="bill">
                <img src={policy.pic} alt={policy.name} />
                <h2>{policy.name}</h2>
                <p>{policy.date}</p>
            </div>
        </>
    );
}

export default Bill;
