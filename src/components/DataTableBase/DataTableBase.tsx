import React, { useState } from "react";
import DataTable, { TableProps } from "react-data-table-component";
import DataTableHeader from "./DataTableHeader";

interface DataTableBaseProps<T> {
  tableProp: TableProps<T>;
  dataTableHeader?: any;
  filterItems?:FilterItem[];
  headerButtons?:React.ReactElement[];
  tableActionButtons?:React.ReactElement[];
}

interface FilterItem {
  id?: string;
  name?: string;
}

function DataTableBase<T>(props: DataTableBaseProps<T>): JSX.Element {

  const [selectable, setselectable] = useState(false);
  const setselectableFn = (b?: boolean) => {
    // if b=== null, toggle selectable else set selectable
    !b ? setselectable(!selectable) : setselectable(b)
  }
  const [filteredItems, setFilteredItems] = useState(props.tableProp.data as T[]);
  const expandedComponent = (data: T) => <pre>{JSON.stringify(data, null, 2)}</pre>;

  // FILTERING
  const filterHandler = (text: string) => {
    setFilteredItems(
      props.tableProp.data.filter((item: T | any) => {
        return item.name && item.name.toLowerCase().includes(text.toLowerCase())
      }) as T[]);
  }
  // END FILTERING
  return (
    <div>
      <DataTableHeader isSelectable={selectable} headerButtons={props.headerButtons} tableActionButtons={props.tableActionButtons} setSelectable={setselectableFn} isFilterable filterItems={ props.filterItems } filterHandler={filterHandler} />
      <DataTable
        pointerOnHover
        highlightOnHover
        selectableRows={selectable}
        expandableRowsComponent={expandedComponent as any}
        responsive
        {... props.tableProp}
      />
    </div>
  )
}
export type { DataTableBaseProps, FilterItem };
export default DataTableBase;
