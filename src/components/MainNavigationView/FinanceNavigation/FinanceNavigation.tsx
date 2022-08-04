import { FC } from 'react';
import { FaBitcoin, FaHandshake, FaHistory, FaMoneyBillAlt, FaSpinner } from 'react-icons/fa';
import { NavLink, useLocation, useMatch } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NavigationHeading from '../../NavigationHeading/NavigationHeading';
import NavigationView from '../../NavigationView/NavigationView';
import SideNavVisibilityProp from '../SideNavVisibilityProp';

const FinanceNavigation: FC<SideNavVisibilityProp> = (props) => {
  const { entityId } = useParams();
  const ea = useLocation();

  const match = useMatch(ea.pathname) as any;
  const match2 = useMatch("/:_entityId/finances/:_link/*") as any;
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

        <NavigationHeading>{"Finances"}</NavigationHeading>
        {/* <hr className={'border-primary-900 opacity-40 my-0'} /> */}

        <div className={"customScrollBar overflow-x-hidden mt-2 overflow-y-scroll h-full flex flex-col gap-2"}>
          <NavLink
            className={({ isActive }) => {
              return isActive ?
                "px-4 py-2 rounded-lg bg-transparent mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 bg-primary-600 text-primary-200  dark:text-primary-100"
                :
                "px-4 py-2 rounded-lg bg-transparent text-primary-500 dark:text-primary-100 mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 hover:bg-primary-500 hover:text-primary-100"
            }} to={`/${entityId}/finances/accounts`}
          >
            <FaMoneyBillAlt className={"text-xl "} />{" "}
            <span className={"w-full text-left px-4"}>Accounts</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => {
              return isActive ?
                "px-4 py-2 rounded-lg bg-transparent mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 bg-indigo-600 text-indigo-200  dark:text-indigo-100"
                :
                "px-4 py-2 rounded-lg bg-transparent text-indigo-500 dark:text-indigo-100 mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 hover:bg-indigo-500 hover:text-indigo-100"
            }} to={`/${entityId}/finances/budget`}
          >
            <FaBitcoin className={"text-xl "} />{" "}
            <span className={"w-full text-left px-4"}>Budgets</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => {
              return isActive ?
                "px-4 py-2 rounded-lg bg-transparent mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 bg-green-600 text-green-200  dark:text-green-100"
                :
                "px-4 py-2 rounded-lg bg-transparent text-green-500 dark:text-green-100 mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 hover:bg-green-500 hover:text-green-100"


            }} to={`/${entityId}/finances/transactions`}
          >
            <FaHandshake className={"text-xl "} />{" "}
            <span className={"w-full text-left px-4"}>Transactions</span>
          </NavLink >
          <NavLink
            className={({ isActive }) => {
              return isActive ?
                "px-4 py-2 rounded-lg bg-transparent mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 bg-green-600 text-green-200  dark:text-green-100"
                :
                "px-4 py-2 rounded-lg bg-transparent text-green-500 dark:text-green-100 mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 hover:bg-green-500 hover:text-green-100"


            }} to={`/${entityId}/finances/transactions-history`}
          >
            <FaHistory className={"text-xl "} />{" "}
            <span className={"w-full text-left px-4"}>Transactions History</span>
          </NavLink >
          <NavLink
            className={({ isActive }) => {
              return isActive ?
                "px-4 py-2 rounded-lg bg-transparent mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 bg-amber-500 text-amber-100 dark:text-amber-100"
                :
                "px-4 py-2 rounded-lg bg-transparent text-amber-500 dark:text-amber-100 mx-4 my-0 text-md font-semibold flex cursor-pointer items-center duration-300 hover:bg-amber-500 hover:text-amber-100"


            }} to={`/${entityId}/finances/transactions/active`}
          >
            <FaSpinner className={"text-xl "} />{" "}
            <span className={"w-full text-left px-4"}>Incomplete Transactions</span>
          </NavLink >

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
              <span className={"w-full text-left"}>₦200,000.43</span>
              <small>Michael Abel</small>
              <small className={"text-green-400"}>Active</small>
            </NavLink >
          </div>
        </div>
      </div >
    </NavigationView>
  )
};

export default FinanceNavigation;