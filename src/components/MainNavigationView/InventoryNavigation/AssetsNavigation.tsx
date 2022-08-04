import { FC } from 'react';
import { FaList } from 'react-icons/fa';
import { FiGrid, FiList } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NavigationHeading from '../../NavigationHeading/NavigationHeading';
import NavigationView from '../../NavigationView/NavigationView';
import SideNavVisibilityProp from '../SideNavVisibilityProp';

const AssetsNavigation: FC<SideNavVisibilityProp> = (props) => {
  const { entityId } = useParams();
  return (
    <NavigationView isMobile={props.isMobile} sideNavOpenState={props.sideNavOpenState}>
      <div className={"w-full flex flex-col"}>

        <NavigationHeading>{"Assets"}</NavigationHeading>
        <div>
          <div className={"customScrollBar flex w-full gap-2 justify-evenly items-center flex-nowrap overflow-x-scroll"}>

            <NavLink to={`/${entityId}/assets/all`} title={"All Assets"} className={({ isActive }) => {
              return isActive ?
                'h-12 w-12 rounded-md duration-300 cursor-pointer bg-primary-600 text-primary-100 flex justify-evenly items-center'
                :
                'h-12 w-12 rounded-md duration-300 cursor-pointer text-primary-500 hover:bg-primary-500  hover:text-primary-100 flex justify-evenly items-center';
            }}>
              <FiGrid className='scale-125' />
            </NavLink>
            <NavLink to={`/${entityId}/assets/active`} title={"Active Assets"} className={({ isActive }) => {
              return isActive ?
                'h-12 w-12 rounded-md duration-300 cursor-pointer bg-green-500 text-green-100 flex justify-evenly items-center'
                :
                'h-12 w-12 rounded-md duration-300 cursor-pointer text-green-500 hover:bg-green-500  hover:text-green-100 flex justify-evenly items-center';
            }}>
              <FiList className='scale-125' />
            </NavLink>

            <NavLink to={`/${entityId}/assets/inactive`} title={"Inactive Assets"} className={({ isActive }) => {
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
                "px-4 py-2 rounded-lg bg-transparent mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 bg-primary-600 text-primary-200  dark:text-primary-100"
                :
                "px-4 py-2 rounded-lg bg-transparent text-primary-500 dark:text-primary-100 mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 hover:bg-primary-500 hover:text-primary-100"
            }} to={`/${entityId}/assets/all`}
          >
            <FiGrid className={"text-xl "} />{" "}
            <span className={"w-full text-left px-4"}>All Assets</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => {
              return isActive ?
                "px-4 py-2 rounded-lg bg-transparent mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 bg-green-600 text-green-200  dark:text-green-100"
                :
                "px-4 py-2 rounded-lg bg-transparent text-green-500 dark:text-green-100 mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 hover:bg-green-500 hover:text-green-100"


            }} to={`/${entityId}/assets/active`}
          >
            <FiList className={"text-xl "} />{" "}
            <span className={"w-full text-left px-4"}>Active Assets</span>
          </NavLink >
          <NavLink
            className={({ isActive }) => {
              return isActive ?
                "px-4 py-2 rounded-lg bg-transparent mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 bg-red-500 text-red-100 dark:text-red-100"
                :
                "px-4 py-2 rounded-lg bg-transparent text-red-500 dark:text-red-100 mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 hover:bg-red-500 hover:text-red-100"


            }} to={`/${entityId}/assets/inactive`}
          >
            <FaList className={"text-xl "} />{" "}
            <span className={"w-full text-left px-4"}>Inactive Assets</span>
          </NavLink >

          <hr className={'border-primary-900 opacity-40 my-0'} />
          {/* <div className="mt-2 gap-3 flex flex-col">
            <NavLink
              className={({ isActive }) => {
                return isActive ?
                  "px-4 py-2 rounded-lg bg-transparent mx-2 my-0 text-md font-semibold flex cursor-pointer duration-300 bg-primary-600 text-primary-200 dark:text-primary-200 flex-col items-start"
                  :
                  "px-4 py-2 rounded-lg bg-transparent text-primary-700 dark:text-primary-200 mx-2 my-0 text-md font-semibold flex cursor-pointer duration-300 hover:bg-primary-600 hover:text-primary-200 flex-col items-start"

              }} to={getLink() ? `/${entityId}/orders/${getLink()}/orderId` : `/${entityId}/orders/order/orderId`}
            >
              <small>12/Oct/2021</small>
              <span className={"w-full text-left"}>2020 Denim Jacket</span>
              <small>4 items</small>
            </NavLink >
          </div> */}
        </div>
      </div >
    </NavigationView>
  )
};

export default AssetsNavigation;