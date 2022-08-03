import React, { FC, useEffect } from 'react';
import { useState } from 'react';
import { FaCheck, FaFilter, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { FiArchive } from 'react-icons/fi';
import { TransparentButton } from '../Button/Button';
import { FormInput } from '../FormControl/FormControl';
import { FilterItem } from './DataTableBase';
interface DataTableHeaderProps {
  isSelectable: boolean;
  setSelectable: any;
  filterHandler: (text: string) => void;
  isFilterable: boolean;
  filterItems?: FilterItem[];
  headerButtons?: React.ReactElement[];
  tableActionButtons?: React.ReactElement[];
}

const DataTableHeader: FC<DataTableHeaderProps> = (props) => {
  const [isTableSelectable, setTableSelectable] = useState(false);
  useEffect(() => {
    setTableSelectable(props.isSelectable);
    return () => {
    }
  }, [props.isSelectable])

  return (
    <header
      className={
        "flex justify-center items-center box-border text-md font-bold bg-transparent"
      }
    >
      <div className={"flex flex-col w-full gap-2 mt-1"}>
        <hr className={'border-primary-900 opacity-40 mt-2 hidden'} />
        <div className={"flex justify-end w-full gap-2 mt-0 px-0 items-center"}>
          <div className={"flex justify-end w-full gap-2 items-center text-primary-200"}>
            <div className={"flex w-full gap-2 px-2 items-center"}>
              <div title={"Select"} className={'w-fit flex-nowrap rounded-md duration-300 cursor-pointer hover:bg-primary-500 hover:text-primary-100 bg-transparent text-primary-500 active:bg-transparent active:text-primary-500 flex justify-evenly gap-2 items-center px-4 py-4'} onClick={(ev) => { props.setSelectable() }}><FaCheck /></div>
              <span className={isTableSelectable ? 'flex flex-nowrap' : 'hidden'}>
                {props.tableActionButtons}
              </span>
              <div className={"bg-primary-500 h-full w-1 inline-block"}></div>
              {props.headerButtons}
            </div>
            <div className={"flex w-fit gap-2 px-2 justify-evenly items-center"}>
              <FaFilter />
              {props.isFilterable ?
                <div>
                  <FormInput className={"w-fit rounded-md duration-300 cursor-pointer bg-primary-200 text-primary-800 placeholder:text-primary-400 outline-primary-500 flex justify-evenly gap-2 items-center px-4 py-2"} onChange={ev => { props.filterHandler(ev.target.value) }} placeholder={'Filter'} />
                </div>
                : ""}
              <select className={'w-fit rounded-md duration-300 cursor-pointer bg-primary-500 text-primary-100 flex items-center outline-primary-200 pl-4 pr-2 py-2'} defaultValue={"name"} >
                {
                  props.filterItems?
                  props.filterItems.map((value: FilterItem, index: number) => (
                    <option value={value.id} key={index}>{value.name}</option>
                  ))
                    : <option value="">😉</option>
                }
              </select>
            </div>
          </div>
        </div>
        <hr className={'border-primary-900 opacity-40 mt-0'} />
      </div>
    </header>
  )
};
export type { DataTableHeaderProps };
export default DataTableHeader;
