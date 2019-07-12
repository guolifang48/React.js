import React from 'react';

import { Wrapper, Example } from '../../../components';

const demos = [
  {
    js: require('./AdvertiseTable').default,
    title: 'Advertise'
  }
]

const Advertise = () => (
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

export default Advertise;
