import React, { FC } from 'react';
import { FaHamburger } from 'react-icons/fa';
import SideNavVisibilityProp from '../MainNavigationView/SideNavVisibilityProp';
import styles from "./Page.module.scss";

interface PageProps extends SideNavVisibilityProp {
  children?: any;
  noSideNavigation?: boolean;
}

const Page: FC<PageProps> = (props) => (

  <div className={"basis-full h-screen flex gap-0 relative w-screen overflow-x-hidden"}>
    {props.noSideNavigation ?
      <div className={`fixed w-16 flex-shrink-0 flex-grow-0 md:relative md:w-16 h-screen flex ease-in-out duration-500`}> </div>
      :
      (
        props.isMobile ?
          <div className={`fixed flex-shrink-0 flex-grow-0 md:relative h-screen flex ease-in-out duration-500 ${props.sideNavOpenState[0] ? "w-[24rem]" : "w-[0rem]" }`}> </div>
          :
          <div className={`fixed flex-shrink-0 flex-grow-0 md:relative h-screen flex ease-in-out duration-500 ${props.sideNavOpenState[0] ? "w-[24rem]" : "w-[0rem]"}`}> </div>
      )
    }
    <div className={`shrink-0 grow-0 box-border p-0 overflow-x-hidden relative w-screen ease-in-out duration-500 ${!props.noSideNavigation ?
       (
        `${props.sideNavOpenState[0] ? styles.mainPage : styles.MainPageClosedSideNav }`
       )
        :
         styles.mainPage + " " + styles.noSideNav}`}>
      {props.children}
      <div className={"text-3xl w-10 h-10 flex mt-2 justify-center items-center cursor-pointer rounded-md duration-300 bg-primary-100 text-secondary-300 border-secondary-200 border-2 fixed top-0 left-3 z-30"} onClick={() => { !props.sideNavOpenState[0] ? props.sideNavOpenState[1](true) : props.sideNavOpenState[1](false) }}
      >
        <FaHamburger className={""} />
      </div>

    </div>
  </div>
);

export default Page;
