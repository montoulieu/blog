import React from 'react';

const Debugger = ({ data }) => (
  <pre className="w-full whitespace-pre-wrap">
    <code>{JSON.stringify(data, null, 4)}</code>
  </pre>
);

export default Debugger;
