import React, { FC } from 'react';
const NavigationHeading: FC<{ children?: any; }> = (props) => (
  <span>
    <header
      className={
        "py-2 text-center h-16 top-0 right-0 left-0 text-ellipsis whitespace-nowrap overflow-hidden w-full flex justify-center items-center box-border text-xl font-bold bg-transparent text-primary-500"
      }
    >
      {props.children}
    </header>
    <hr className={'border-primary-900 opacity-40 mb-1'} />
  </span>
);

export default NavigationHeading;
