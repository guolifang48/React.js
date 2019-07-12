import React from 'react';

import { Wrapper, Example } from '../../../components';

const demos = [
  {
    js: require('./SellerTable').default,
    title: 'Sellers List'
  }
]

const Seller = () => (
  <Wrapper>
    {demos.map((demo, index) => (
      <Example
        key={index}
        index={index}
        title={demo.title}
        js={demo.js}
        docs={demo.docs}
      />
    ))}
  </Wrapper>
);

export default Seller;
