import React, { FC } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import MainNavigationItem from './MainNavigationItem';
import { FaBoxes, FaBusAlt, FaCartPlus, FaCogs, FaListAlt, FaMoneyCheckAlt, FaShieldAlt, FaSuitcase, FaUsers } from "react-icons/fa";
import { FiGrid } from 'react-icons/fi';
interface MainNavigationViewProps { 
  isMobile:boolean;
  sideNavOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const MainNavigationView: FC<MainNavigationViewProps> = (props) => {  
  var { entityId } = useParams();
  return (
    <div className={`w-fit h-screen flex z-10 left-0 top-0 bottom-0 overflow-x-hidden ease-in-out duration-500 ${!props.sideNavOpenState[0] ? "left-72" :"left-0"}` }>

      <div
        className={
          `w-16 fixed h-full top-0 left-0 bottom-0 flex flex-col justify-center items-center box-border bg-neutral-700 dark:bg-primary-900 ease-in-out duration-500 z-20 ${!props.sideNavOpenState[0] ? "-left-16" : ""}`
        }
      >
        <div className={"text-3xl w-10 h-10 flex mt-2 justify-center items-center cursor-pointer rounded-md duration-300 bg-primary-600 overflow-hidden"} onClick={()=>{!props.sideNavOpenState[0]?props.sideNavOpenState[1](true):props.sideNavOpenState[1](false)}}
        >
          <img
            className={
              "w-10 h-10 duration-300 object-cover object-center rounded-md border-2 border-primary-800 hover:opacity-80"
            }
            src={`${process.env.REACT_APP_STORAGE_SERVER}/test/logos/aktionariat-c5784b26234a389632687a36d2fb3258.png`}
            alt={"Buyern"}
          />
        </div>

        <div
          className={
            "h-full flex flex-col justify-center gap-3 items-center"
          }
        >
          <MainNavigationItem icon={<FiGrid />} title={"Dashboard"} link={"/" + entityId + "/dashboard"} />
          <MainNavigationItem icon={<FaUsers />} title={"Users / Employees"} link={"/" + entityId + "/users"} />
          <MainNavigationItem icon={<FaBoxes />} title={"Inventories"} link={"/" + entityId + "/inventories"} />
          <MainNavigationItem icon={<FaShieldAlt />} title={"Roles / Permissions"} link={"/" + entityId + "/roles-permissions/permissions"} />
          <MainNavigationItem icon={<FaListAlt />} title={"Orders"} link={"/" + entityId + "/orders"} />
          <MainNavigationItem icon={<FaSuitcase />} title={"Assets"} link={"/" + entityId + "/assets"} />
          <MainNavigationItem icon={<FaMoneyCheckAlt />} title={"Finances"} link={"/" + entityId + "/finances"} />
          <MainNavigationItem icon={<FaCartPlus />} title={"E-Commerce"} link={"/" + entityId + "/eCommerce"} />
          <MainNavigationItem icon={<FaBusAlt />} title={"Delivery"} link={"/" + entityId + "/delivery"} />
          <MainNavigationItem icon={<FaCogs />} title={"Settings"} link={"/" + entityId + "/settings"} />
        </div>
        <div
          className={
            "text-3xl w-10 h-10 flex mb-2 justify-center items-center cursor-pointer rounded-md duration-300 bg-primary-800"
          }
        >
          <img
            className={
              "w-10 h-10 duration-300 object-cover object-center rounded-md border-2 border-primary-800 hover:opacity-80"
            }
            
            src={`${process.env.REACT_APP_STORAGE_SERVER}/test/profileImages/IMG_7511.JPG`}
            alt={"Abel Michael"}
          />
        </div>
      </div>
        <Outlet />
    </div>
  )
};

export default MainNavigationView;
