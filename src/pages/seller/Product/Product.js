import React from 'react';

import { Wrapper, Example } from '../../../components';

const demos = [
  {
    js: require('./ProductTable').default,
    title: 'Product Management'
  }
]

const Order = () => (
  <Wrapper>
    {demos.map((demo, index) => (
      <Example
        key={index}
        index={index}
        title={demo.title}
        js={demo.js}
      />
    ))}
  </Wrapper>
);

export default Order;
