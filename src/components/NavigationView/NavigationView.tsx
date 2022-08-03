import React, { FC } from 'react';
import SideNavVisibilityProp from '../MainNavigationView/SideNavVisibilityProp';


interface NavigationViewProps extends SideNavVisibilityProp {
  children?: any;
  noSideNavigation?: boolean;
  isMobile: boolean;
  sideNavOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const NavigationView: FC<NavigationViewProps> = (props) => {
  return (

    <div className={`fixed h-screen flex bg-neutral-200 dark:bg-neutral-700 overflow-y-hidden z-10 box-border w-96 ease-in-out duration-500 ${!props.sideNavOpenState[0] ? "-left-96" : "-left-0"}`}>
    <div className={"w-full box-border flex overflow-y-hidden overflow-x-hidden"}>
      {
        props.noSideNavigation ?
          ""
          : <div className="w-16 grow-0 shrink-0"></div>
      }

      {props.children}
    </div>
  </div>
)};

export default NavigationView;
export type { NavigationViewProps };
