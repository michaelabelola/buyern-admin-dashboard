import React, { FC } from 'react';


interface HeaderProps {
  children?: any;
}

const Header: FC<HeaderProps> = (props) => {
  return (<header
    className={
      "px-4 text-center text-ellipsis whitespace-nowrap rounded-lg overflow-hidden w-full h-20 flex justify-center items-center box-border text-lg font-bold "
    }
  >
    <div className={"text-center text-ellipsis whitespace-nowrap rounded-lg overflow-hidden w-full h-full flex justify-center items-center box-border text-lg font-bold bg-primary-600 text-primary-200"}>
    {props.children}
    </div>
  </header>)
}

export default Header;
