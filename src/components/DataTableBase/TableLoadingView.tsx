import React, { FC } from 'react';
import { FiLoader } from 'react-icons/fi';


interface TableLoadingViewProps {
children?:any;
}

const TableLoadingView: FC<TableLoadingViewProps> = (props) => (
  <div className='flex font-bold text-xl items-center gap-4 p-10 duration-300 text-amber-500'>
    <FiLoader className={"duration-1000 animate-spin ease-in-out text-amber-500"} />
    {props.children ? props.children : "LOADING ..."}
  </div>
);

export default TableLoadingView;
