import React, { FC } from 'react';
import { FaArchive, FaHome, FaList, FaListAlt, FaTrashAlt } from 'react-icons/fa';
import { FiArchive, FiBarChart2, FiGrid, FiPlus } from 'react-icons/fi';
import { NavLink, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NavigationHeading from '../../NavigationHeading/NavigationHeading';
import NavigationView from '../../NavigationView/NavigationView';
import SideNavVisibilityProp from '../SideNavVisibilityProp';

interface OrdersNavigationProps extends SideNavVisibilityProp { }

const OrdersNavigation: FC<OrdersNavigationProps> = (props) => {
  const { entityId } = useParams();
  return (
    <NavigationView isMobile={props.isMobile} sideNavOpenState={props.sideNavOpenState}>
      <div className={"w-full flex flex-col"}>

        <NavigationHeading>Orders</NavigationHeading>
        <div>
          <div className={"customScrollBar flex w-full gap-2 justify-evenly items-center flex-nowrap overflow-x-scroll"}>

            <NavLink to={`/${entityId}/orders/all`} title={"All Orders"} className={({ isActive }) => {
              return isActive ?
                'h-12 w-12 rounded-md duration-300 cursor-pointer bg-primary-500 text-primary-100 flex justify-evenly items-center'
                :
                'h-12 w-12 rounded-md duration-300 cursor-pointer text-primary-500 hover:bg-primary-500  hover:text-primary-100 flex justify-evenly items-center';
            }}>
              <FaList className='scale-125' />
            </NavLink>
            <NavLink to={`/${entityId}/orders/live`} title={"Active Orders"} className={({ isActive }) => {
              return isActive ?
                'h-12 w-12 rounded-md duration-300 cursor-pointer bg-green-500 text-green-100 flex justify-evenly items-center'
                :
                'h-12 w-12 rounded-md duration-300 cursor-pointer text-green-500 hover:bg-green-500  hover:text-green-100 flex justify-evenly items-center';
            }}>
              <FaList className='scale-125' />
            </NavLink>
            <NavLink to={`/${entityId}/orders/cancelled`} title={"Cancelled Orders"} className={({ isActive }) => {
              return isActive ?
                'h-12 w-12 rounded-md duration-300 cursor-pointer bg-red-500 text-red-100 flex justify-evenly items-center'
                :
                'h-12 w-12 rounded-md duration-300 cursor-pointer text-red-500 hover:bg-red-500  hover:text-red-100 flex justify-evenly items-center';
            }}>
              <FaList className='scale-125' />
            </NavLink>
          </div>
        </div>

        {/* <hr className={'border-primary-900 opacity-40 my-0'} /> */}

        <div className={"customScrollBar overflow-x-hidden mt-2 overflow-y-scroll h-full flex flex-col gap-2"}>
          <NavLink
            className={({ isActive }) => {
              return isActive ?
                "px-4 py-2 rounded-lg bg-transparent mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 bg-green-600 text-green-200  dark:text-green-100"
                :
                "px-4 py-2 rounded-lg bg-transparent text-primary-500 dark:text-primary-100 mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 hover:bg-primary-500 hover:text-green-100"
            }} to={`/${entityId}/orders/register`} key={3}
          >
            <FiPlus className={"text-xl "} />{" "}
            <span className={"w-full text-left px-4"}>All Orders</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => {
              return isActive ?
                "px-4 py-2 rounded-lg bg-transparent mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 bg-green-500 text-green-100 dark:text-green-100"
                :
                "px-4 py-2 rounded-lg bg-transparent text-green-500 dark:text-green-100 mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 hover:bg-green-500 hover:text-green-100"


            }} to={`/${entityId}/orders/trash`} key={5}
          >
            <FaTrashAlt className={"text-xl "} />{" "}
            <span className={"w-full text-left px-4"}>Active Orders</span>
          </NavLink >
          <NavLink
            className={({ isActive }) => {
              return isActive ?
                "px-4 py-2 rounded-lg bg-transparent mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 bg-red-500 text-red-100 dark:text-red-100"
                :
                "px-4 py-2 rounded-lg bg-transparent text-red-500 dark:text-red-100 mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 hover:bg-red-500 hover:text-red-100"


            }} to={`/${entityId}/orders/trash`} key={5}
          >
            <FaTrashAlt className={"text-xl "} />{" "}
            <span className={"w-full text-left px-4"}>Cancelled Orders</span>
          </NavLink >

          <hr className={'border-primary-900 opacity-40 my-0'} />

          <div className='box-border px-2'>
            <input placeholder='Search Inventory Groups' className={"w-full p-2 rounded-md bg-primary-100 placeholder-primary-300 font-semibold outline-primary-500"} />
          </div>
          <div className="mt-2 gap-3 flex flex-col">
            <NavLink
              className={({ isActive }) => {
                return isActive ?
                  "px-2 py-2 rounded-lg bg-transparent mx-2 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 bg-primary-900 text-primary-200 dark:text-primary-200"
                  :
                  "px-2 py-2 rounded-lg bg-transparent text-primary-700 dark:text-primary-200 mx-2 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 hover:bg-primary-600 hover:text-primary-200"

              }} to={`/${entityId}/orders/group/groupId`} key={6}
            >
              <span className={"w-full text-left px-4"}>Summer Apparels <br /><small>200 items</small></span>
            </NavLink >
          </div>
        </div>
        {/* <div>
          <div>
            <Outlet />
          </div>
        </div> */}



      </div >
    </NavigationView>
  )
};

export default OrdersNavigation;
export type { OrdersNavigationProps };