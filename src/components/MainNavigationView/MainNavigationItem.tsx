import { FC } from "react";
import { NavLink } from "react-router-dom";

const MainNavigationItem: FC<{ icon: any, title?: string, link: string }> = (props) => {
    return (
        <NavLink
        title={props.title}
            className={({ isActive }) => {
                return isActive ?
                    `text-2xl w-12 flex justify-center items-center h-12 duration-300 text-primary-800 bg-primary-100 dark:text-primary-800 cursor-pointer rounded-md`
                    :
                    `text-2xl w-12 flex justify-center items-center h-12 duration-300 text-primary-200 active:text-primary-100 active:bg-opacity-0 hover:text-primary-800 hover:bg-primary-200 dark:text-primary-200 dark:hover:text-primary-800 dark:active:bg-transparent cursor-pointer rounded-md`

            }} to={props.link} key={props.title}
        >
            {props.icon}
        </NavLink >



    );
}
export default MainNavigationItem;