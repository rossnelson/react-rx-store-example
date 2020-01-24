import React from 'react';

import countStore from './count-store';

function clickButton() {
  const { incrementCount } = countStore.actions;
  incrementCount(1);
}

export default function Button(props) {
  return (
    <button onClick={clickButton}>increment</button>
  );
}
