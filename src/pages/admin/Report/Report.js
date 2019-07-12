import React from 'react';

import { Wrapper, Example } from '../../../components';

const demos = [
  {
    js: require('./ReportTable').default,
    title: 'Reports List'
  }
]

const Report = () => (
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

export default Report;
