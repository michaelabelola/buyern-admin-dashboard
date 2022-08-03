import React, { FC } from 'react';
import { FaArchive, FaHome, FaListAlt, FaTrashAlt } from 'react-icons/fa';
import { FiArchive, FiBarChart2, FiGrid, FiPlus } from 'react-icons/fi';
import { NavLink, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NavigationHeading from '../../NavigationHeading/NavigationHeading';
import NavigationView from '../../NavigationView/NavigationView';
import SideNavVisibilityProp from '../SideNavVisibilityProp';

interface InventoryNavigationProps extends SideNavVisibilityProp {}

const InventoryNavigation: FC<InventoryNavigationProps> = (props) => {
  const { entityId } = useParams();
  return (
    <NavigationView isMobile={props.isMobile} sideNavOpenState={props.sideNavOpenState}>
      <div className={"w-full flex flex-col"}>

        <NavigationHeading>Inventories</NavigationHeading>
        <div>
          <div className={"customScrollBar flex w-full gap-2 justify-evenly items-center flex-nowrap overflow-x-scroll"}>
            <NavLink to={`/${entityId}/inventories/all`} className={({ isActive }) => {
              return isActive ?
                'h-12 w-12 rounded-md duration-300 cursor-pointer bg-secondary-500 text-secondary-100 flex justify-evenly items-center'
                :
                'h-12 w-12 rounded-md duration-300 cursor-pointer text-secondary-500 hover:bg-secondary-500 hover:text-secondary-100 flex justify-evenly items-center';
            }}>
              <FaHome className='scale-125' />
            </NavLink>
            {/* <NavLink to={`/${entityId}/inventories/charts`} className={({ isActive }) => {
              return isActive ?
                'h-12 w-12 rounded-md duration-300 cursor-pointer bg-fuchsia-500 text-fuchsia-100 flex justify-evenly items-center'
                :
                'h-12 w-12 rounded-md duration-300 cursor-pointer text-fuchsia-500 hover:bg-fuchsia-500 hover:text-fuchsia-100 flex justify-evenly items-center';
            }}>
              <FiBarChart2 className='scale-125' />
            </NavLink> */}
            <NavLink to={`/${entityId}/inventories/register`} className={({ isActive }) => {
              return isActive ?
                'h-12 w-12 rounded-md duration-300 cursor-pointer bg-green-500 text-green-100 flex justify-evenly items-center'
                :
                'h-12 w-12 rounded-md duration-300 cursor-pointer text-green-500 hover:bg-green-500  hover:text-green-100 flex justify-evenly items-center';
            }}>
              <FiPlus className='scale-125' />
            </NavLink>
            <NavLink to={`/${entityId}/inventories/trash`} className={({ isActive }) => {
              return isActive ?
                'h-12 w-12 rounded-md duration-300 cursor-pointer bg-red-500 text-red-100 flex justify-evenly items-center'
                :
                'h-12 w-12 rounded-md duration-300 cursor-pointer text-red-500 hover:bg-red-500  hover:text-red-100 flex justify-evenly items-center';
            }}>
              <FaTrashAlt className='scale-125' />
            </NavLink>
          </div>
        </div>

        {/* <hr className={'border-primary-900 opacity-40 my-0'} /> */}

        <div className={"customScrollBar overflow-x-hidden mt-2 overflow-y-scroll h-full flex flex-col gap-2 hidden"}>

          <NavLink
            className={({ isActive }) => {
              return isActive ?
                "px-4 py-2 rounded-lg bg-transparent mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 bg-secondary-500 text-secondary-200  dark:text-secondary-100"
                :
                "px-4 py-2 rounded-lg bg-transparent text-secondary-500 dark:text-secondary-100 mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 hover:bg-secondary-500 hover:text-secondary-100"


            }} to={`/${entityId}/inventories/all`} key={1}
          >
            <FaHome className={"text-xl "} />{" "}
            <span className={"w-full text-left px-4"}>Home</span>
          </NavLink >
          <NavLink
            className={({ isActive }) => {
              return isActive ?
                "px-4 py-2 rounded-lg bg-transparent mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 bg-fuchsia-500 text-fuchsia-200  dark:text-fuchsia-100"
                :
                "px-4 py-2 rounded-lg bg-transparent text-fuchsia-500 dark:text-fuchsia-100 mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 hover:bg-fuchsia-500 hover:text-fuchsia-100"

            }} to={`/${entityId}/inventories/charts`} key={2}
          >
            <FiBarChart2 className={"text-xl "} />{" "}
            <span className={"w-full text-left px-4"}>Ratings / Charts</span>
          </NavLink >
          <NavLink
            className={({ isActive }) => {
              return isActive ?
                "px-4 py-2 rounded-lg bg-transparent mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 bg-green-600 text-green-200  dark:text-green-100"
                :
                "px-4 py-2 rounded-lg bg-transparent text-green-500 dark:text-green-100 mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 hover:bg-green-500 hover:text-green-100"
         }} to={`/${entityId}/inventories/register`} key={3}
          >
            <FiPlus className={"text-xl "} />{" "}
            <span className={"w-full text-left px-4"}>New Inventory</span>
          </NavLink >
          <NavLink
            className={({ isActive }) => {
              return isActive ?
                "px-4 py-2 rounded-lg bg-transparent mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 bg-yellow-500 text-amber-100  dark:text-amber-100"
                :
                "px-4 py-2 rounded-lg bg-transparent text-amber-500 dark:text-amber-100 mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 hover:bg-amber-500 hover:text-amber-100"


            }} to={`/${entityId}/inventories/archive`} key={4}
          >
            <FiArchive className={"text-xl "} />{" "}
            <span className={"w-full text-left px-4"}>Archives</span>
          </NavLink >
          <NavLink
            className={({ isActive }) => {
              return isActive ?
                "px-4 py-2 rounded-lg bg-transparent mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 bg-red-500 text-red-100 dark:text-red-100"
                :
                "px-4 py-2 rounded-lg bg-transparent text-red-500 dark:text-red-100 mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 hover:bg-red-500 hover:text-red-100"


            }} to={`/${entityId}/inventories/trash`} key={5}
          >
            <FaTrashAlt className={"text-xl "} />{" "}
            <span className={"w-full text-left px-4"}>Trash</span>
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

              }} to={`/${entityId}/inventories/group/groupId`} key={6}
            >
              <span className={"w-full text-left px-4"}>Summer Apparels <br /><small>200 items</small></span>
            </NavLink >
          </div>
        </div>
        <div>
          <div className={"customScrollBar flex w-full gap-2 justify-evenly items-center flex-nowrap overflow-x-scroll"}>
            <NavLink to={`/${entityId}/inventories/archive`} className={({ isActive }) => {
              return isActive ?
                'h-12 w-12 rounded-md duration-300 cursor-pointer bg-amber-500 text-amber-100 flex justify-evenly items-center'
                :
                'h-12 w-12 rounded-md duration-300 cursor-pointer text-amber-500 hover:bg-amber-500  hover:text-amber-100 flex justify-evenly items-center';
            }}>
              <FaArchive className='scale-125' />
            </NavLink>
            <NavLink to={`/${entityId}/inventories/listings`} title={"Listings"} className={({ isActive }) => {
              return isActive ?
                'h-12 w-12 rounded-md duration-300 cursor-pointer bg-secondary-500 text-secondary-100 flex justify-evenly items-center'
                :
                'h-12 w-12 rounded-md duration-300 cursor-pointer text-secondary-500 hover:bg-secondary-500 hover:text-secondary-100 flex justify-evenly items-center';
            }}>
              <FaListAlt className='scale-125' />
            </NavLink>
            <NavLink to={`/${entityId}/inventories/groups`} title={"Groups"} className={({ isActive }) => {
              return isActive ?
                'h-12 w-12 rounded-md duration-300 cursor-pointer bg-fuchsia-500 text-fuchsia-100 flex justify-evenly items-center'
                :
                'h-12 w-12 rounded-md duration-300 cursor-pointer text-fuchsia-500 hover:bg-fuchsia-500 hover:text-fuchsia-100 flex justify-evenly items-center';
            }}>
              <FiGrid className='scale-125' />
            </NavLink>
            {/* <NavLink to={`/${entityId}/inventories/Collections`} title={"Collections"} className={({ isActive }) => {
              return isActive ?
                'h-12 w-12 rounded-md duration-300 cursor-pointer bg-green-500 text-green-100 flex justify-evenly items-center'
                :
                'h-12 w-12 rounded-md duration-300 cursor-pointer text-green-500 hover:bg-green-500  hover:text-green-100 flex justify-evenly items-center';
            }}>
              <FaClipboardList className='scale-125' />
            </NavLink> */}
          </div>
          <div>
            <Outlet />
            </div>
          </div>



      </div >
    </NavigationView>
  )
};

export default InventoryNavigation;
export type { InventoryNavigationProps };