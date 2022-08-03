import React, { FC } from 'react';
const NavigationHeading: FC<{ children?: any; }> = (props) => (
  <span>
    <header
      className={
        "py-2 text-center h-16 top-0 right-0 left-0 text-ellipsis whitespace-nowrap overflow-hidden w-full flex justify-center items-center box-border text-xl font-bold bg-transparent text-primary-500"
      }
    >
      {/* <img
        className={
          "w-6 h-6 duration-300 object-cover object-center rounded-md border-2 m-2 border-primary-800 hover:opacity-80 overflow-hidden"
        }
        src={
          "http://127.0.0.1:10000/devstoreaccount1/entities/f07bb90a-202a-4ed3-96c6-2f9b70b04480/logo.png"
        }
        alt={"Buyern Clothings"}
      /> */}
      {props.children}
    </header>
    <hr className={'border-primary-900 opacity-40 mb-1'} />
  </span>
);

export default NavigationHeading;
