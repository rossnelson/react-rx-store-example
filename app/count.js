import React from 'react';

import countStore from './count-store';

export default function Count(props) {
  const [count] = countStore.useStore();

  return (
    <div>{count}</div>
  );
}
