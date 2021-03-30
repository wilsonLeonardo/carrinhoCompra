/* eslint-disable no-use-before-define */
import React from 'react';
import InputMask from 'react-text-mask';

import { createNumberMask } from 'text-mask-addons';

export const Money = createNumberMask({
  prefix: 'R$ ',
  thousandsSeparatorSymbol: '.',
  decimalSymbol: ',',
  allowDecimal: true,
});

export function CurrencyMask(props) {
  const { inputRef, ...other } = props;

  return (
    <InputMask
      {...other}
      //   ref={inputRef}
      mask={Money}
      placeholderChar={'\u2000'}
    />
  );
}
