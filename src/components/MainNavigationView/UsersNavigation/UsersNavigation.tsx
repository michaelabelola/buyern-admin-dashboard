import { FC } from 'react';
import { FaUserPlus, FaUsers } from 'react-icons/fa';
import { NavLink, useLocation, useMatch } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NavigationHeading from '../../NavigationHeading/NavigationHeading';
import NavigationView from '../../NavigationView/NavigationView';
import SideNavVisibilityProp from '../SideNavVisibilityProp';

const UsersNavigation: FC<SideNavVisibilityProp> = (props) => {
  const { entityId } = useParams();
  const ea = useLocation();

  const match = useMatch(ea.pathname) as any;
  const match2 = useMatch("/:_entityId/users/:_link/*") as any;

  fetch("http://localhost:8010/user?id=6", {
    method: 'GET',
    redirect: 'follow'
  })
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  let getLink: any = () => {
    if (match && match.params && match.params._link) {
      return match.params._link
    } else if (match2 && match2.params && match2.params._link) {
      return match2.params._link
    }
    return null;
  }


  
  return (
    <NavigationView isMobile={props.isMobile} sideNavOpenState={props.sideNavOpenState}>
      <div className={"w-full flex flex-col"}>

        <NavigationHeading>{"Users"}</NavigationHeading>
        {/* <hr className={'border-primary-900 opacity-40 my-0'} /> */}

        <div className={"customScrollBar overflow-x-hidden mt-2 overflow-y-scroll h-full flex flex-col gap-2"}>
          <NavLink
            className={({ isActive }) => {
              return isActive ?
                "px-4 py-2 rounded-lg bg-transparent mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 bg-primary-600 text-primary-200  dark:text-primary-100"
                :
                "px-4 py-2 rounded-lg bg-transparent text-primary-500 dark:text-primary-100 mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 hover:bg-primary-500 hover:text-primary-100"
            }} to={`/${entityId}/users/all`}
          >
            <FaUsers className={"text-xl "} />{" "}
            <span className={"w-full text-left px-4"}>All Users</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => {
              return isActive ?
                "px-4 py-2 rounded-lg bg-transparent mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 bg-green-600 text-green-200  dark:text-green-100"
                :
                "px-4 py-2 rounded-lg bg-transparent text-green-500 dark:text-green-100 mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 hover:bg-green-500 hover:text-green-100"


            }} to={`/${entityId}/users/register`}
          >
            <FaUserPlus className={"text-xl "} />{" "}
            <span className={"w-full text-left px-4"}>Register User</span>
          </NavLink >
          <NavLink
            className={({ isActive }) => {
              return isActive ?
                "px-4 py-2 rounded-lg bg-transparent mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 bg-indigo-600 text-indigo-200  dark:text-indigo-100"
                :
                "px-4 py-2 rounded-lg bg-transparent text-indigo-500 dark:text-indigo-100 mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 hover:bg-indigo-500 hover:text-indigo-100"
            }} to={`/${entityId}/users/groups`}
          >
            <FaUsers className={"text-xl "} />{" "}
            <span className={"w-full text-left px-4"}>Groups</span>
          </NavLink>

          <hr className={'border-primary-900 opacity-40 my-0'} />
          <div className="mt-2 gap-3 flex flex-col">
            <NavLink
              className={({ isActive }) => {
                return isActive ?
                  "px-4 py-2 rounded-lg bg-transparent mx-2 my-0 text-md font-semibold flex cursor-pointer duration-300 bg-primary-600 text-primary-200 dark:text-primary-200 flex-col items-start"
                  :
                  "px-4 py-2 rounded-lg bg-primary-100 text-primary-700 dark:text-primary-200 mx-2 my-0 text-md font-semibold flex cursor-pointer duration-300 hover:bg-primary-600 hover:text-primary-200 flex-col items-start"

              }} to={getLink() ? `/${entityId}/finances/${getLink()}/accountId` : `/${entityId}/finances/transactions/accountId`}
            >
              <span className={"w-full text-left"}>Lagos Office Staffs</span>
            </NavLink >
          </div>
        </div>
      </div >
    </NavigationView>
  )
};

export default UsersNavigation;