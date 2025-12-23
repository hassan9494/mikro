import React from 'react';
import noCartBag from './NoCartBag.svg';
import Image from 'components/image/image';

export const NoCartBag = () => {
  return <Image url={noCartBag} alt="Empty Cart" width={120} height={120} />;
};