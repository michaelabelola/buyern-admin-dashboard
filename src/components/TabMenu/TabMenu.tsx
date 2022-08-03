import { FC, useEffect, useState } from "react";

interface TabMenuProps {
  dark?: boolean;
  tabs?: TabMenuItemG[];
  children?: any;
  onMenuChange?: Function;
  fullWidth?:boolean;
}
const TabHandler: FC<{tabs?: TabMenuItemG[]; children?:any}> = (props) => {
 return(props.children);
}
const TabContent: FC<{activeTabId:number; children?:any}> = (props) => {
 return(
   <div>
     {props.children ? props.children[props.activeTabId] : ""}
  </div>
   
  )
}

  const TabMenu: FC<TabMenuProps> = (props) => {
  const [activeMenuId, setActiveMenuId] = useState(0);
  useEffect(() => {
    if (props.onMenuChange) props.onMenuChange(activeMenuId);

    return () => {
    }
  }, [activeMenuId])

  return (
    <div className={`w-10/12 ${props.fullWidth?"w-full":""}`}>
      <div className={"w-full flex text-md gap-4 justify-center border-b mb-4 pb-2"}>
        {props.tabs?.map((value: TabMenuItemG, index: number, array: TabMenuItemG[]) => {
          return <TabMenuItem key={index} dark={props.dark} title={value.title} id={index} active={activeMenuId === index ? true : false} onClick={setActiveMenuId} />;
        })}
      </div>
    </div>
  )
}

interface TabMenuItemG {
  title?: any;
}
interface TabMenuItemProps {
  title?: any;
  dark?: boolean;
  id?: number;
  active?: boolean;
  children?: any;
  onClick?: Function;
}

const TabMenuItem: FC<TabMenuItemProps> = (props) => {
  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (props.onClick) props.onClick(props.id);
  }
  return (
    <button onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { onClickHandler(event) }} className={props.active ?
      "cursor-pointer px-4 py-2 rounded-md bg-secondary-700 text-secondary-100 duration-300"
      :
      "cursor-pointer px-4 py-2 hover:bg-secondary-300 rounded-md active:text-secondary-700 active:bg-secondary-200 duration-300"}>
      {props.title}
    </button>
  )
}
export type { TabMenuItemG, TabMenuProps };
export { TabMenuItem, TabHandler, TabContent };
export default TabMenu;