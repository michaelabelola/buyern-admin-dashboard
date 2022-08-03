import React, { FC, useLayoutEffect, useState } from 'react';
import { Alignment, Direction, TableColumn } from 'react-data-table-component';
import { PaginationChangePage, PaginationChangeRowsPerPage } from 'react-data-table-component/dist/src/DataTable/types';
import { FaArrowAltCircleRight, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { FiArchive } from 'react-icons/fi';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button, { SuccessButton, TransparentButton } from '../../components/Button/Button';
import DataTableBase, { DataTableBaseProps, FilterItem } from '../../components/DataTableBase/DataTableBase';
import TableLoadingView from '../../components/DataTableBase/TableLoadingView';
import Header from '../../components/Header/Header.lazy';
import SideNavVisibilityProp from '../../components/MainNavigationView/SideNavVisibilityProp';
import Modal from '../../components/Modal/Modal.lazy';
import Page from '../../components/Page/Page';
import InventoryController from '../../Controllers/InventoryControllers/InventoryController';
import InventoryItemController from '../../Controllers/InventoryControllers/InventoryItemController';
import { Inventory } from '../../Models/Inventory/Inventory';
import { FeatureType, InventoryFeature, InventoryItemFeature } from '../../Models/Inventory/InventoryFeature';
import { InventoryItem } from '../../Models/Inventory/InventoryItem';
import { InventoryMedia } from '../../Models/Inventory/InventoryMedia';
import { PageableResponseData } from '../../Models/ResponseDTO';


interface InventoriesPageProps extends SideNavVisibilityProp { }

const InventoriesPage: FC<InventoriesPageProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { entityId } = useParams();
  // const requestStatusState = useState(RequestStatus.IDLE);
  const [inventories, setInventories] = useState([] as InventoryItem[]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tableActionButtonsActive, setTableActionButtonsActive] = useState(false);
  const [selectedRows, setSelectedRows] = useState([] as InventoryItem[]);

  // Inventory Quick View Handler
  const [quickViewActiveItem, setQuickViewActiveItem] = useState(null) as any;
  const [showQuickView] = useState(true);

  const columns: TableColumn<InventoryItem>[] = [
    // {
    //   name: 'Icon',
    //   selector: (inventoryItem: InventoryItem): any =>
    //     <div className={"w-16 h-16 box-border p-2 transition-all ease-in-out flex items-center justify-center"}><img src={inventoryItem.image} alt={inventoryItem.uid} className={"max-w-16 max-h-16 rounded-lg"} /></div>,
    // },
    {
      name: 'Name',
      selector: (inventoryItem: InventoryItem): any => <b>{inventoryItem.name}</b>,
      sortable: true
    },
    {
      name: 'About',
      selector: (inventoryItem: InventoryItem): any => inventoryItem.about,
    },
    {
      name: 'qty',
      selector: (inventoryItem: InventoryItem): any => inventoryItem.qty,
      sortable: true
    },
    {
      name: 'Category',
      selector: (inventoryItem: InventoryItem): any => inventoryItem.category?.name,
      sortable: true
    },
    {
      name: 'SubCategory',
      selector: (inventoryItem: InventoryItem): any => inventoryItem.subCategory?.name,
      sortable: true
    },
    {
      name: 'price',
      selector: (inventoryItem: InventoryItem): any => inventoryItem.price,
      sortable: true
    },
    {
      name: 'feaures',
      selector: (inventoryItem: InventoryItem) => {
        let featuresText: string = "";
        inventoryItem.features?.forEach((feature: InventoryItemFeature, index: number, array: InventoryItemFeature[]) => {
          featuresText += `${feature.value?.name}, `;
        });
        return featuresText;
      },
    },
  ];
  useLayoutEffect(() => {
    if (!initialLoad) {
      fetchInventories(1, perPage);
    }
    return () => {
    }
  }, []);
  const fetchInventories = (page: number, rowsPerPage: number) => {
    setInitialLoad(true)
    setLoading(true);
    InventoryItemController(entityId).fetchAllPagable(page = page - 1, rowsPerPage).then((pagableInventories: PageableResponseData<InventoryItem[]>) => {
      if (totalRows === 0)
        setTotalRows(pagableInventories.totalRowCount);
      // if (perPage !== rowsPerPage)
      setPerPage(rowsPerPage);
      setInventories(pagableInventories.data ? pagableInventories.data : [])
      // if (inventories === _inventories)
      //   return;
      // console.log(_inventories);
      setLoading(false);
    })
      .catch((reason: any) => {
        setLoading(false);
        console.log(reason);
      })
  }
  const handlePageChange: PaginationChangePage = (page: number) => {
    if (totalRows === 0) return;
    fetchInventories(page, perPage);
  };
  const handlePerRowsChange: PaginationChangeRowsPerPage = (currentRowsPerPage: number, currentPage: number) => {
    if (totalRows === 0) return;
    fetchInventories(currentPage, currentRowsPerPage);
  };
  /**
   * generate filter by items
   */
  var filterItems: FilterItem[] = columns.map((value: TableColumn<InventoryItem>, index: number) => {
    return ({ id: value.name, name: value.name } as FilterItem);
  })
  // columns.forEach((value: TableColumn<Inventory>, index: number)=>{
  //   if (value.sortable)
  //   filterItems.push({ id: value.name, name: value.name } as FilterItem);
  // })
  const expandedComponent = ({ data }: { data: InventoryItem }) => {
    let featuresView: any = data.features?.forEach((value: InventoryItemFeature, index: number) => {
      return (<div key={index}> {value.type === FeatureType.VALUE ?
        value.value?.name :
        <span key={index}>
          <span>Min: {value.minValue}</span> <br />
          <span>Max: {value.maxValue}</span>
        </span>
      } </div>)
    });

    return (
      <div className={"p-4"} >
        <div className={"flex items-stretch bg-primary-200 rounded-lg"}>
          <div className={"left_view w-4/12 flex items-center p-4"}>
            <div className={"w-full"}>
              {data.image ?
                <img src={data.image} alt={data.name} className={"w-full h-auto rounded-lg"} />
                : ""
              }
            </div>
          </div>
          <div className={"right_view w-full p-4 flex flex-col gap-4"}>
            <div> Id: <b className={"cursor-pointer hover:scale-125 transition-all duration-300"}>{data.uid}</b></div>
            <div>Name: <b className={"cursor-pointer"}>{data.name}</b></div>
            <div>About Inventory: <b className={"cursor-pointer"}>{data.about}</b></div>
            <div>Category: <b className={"cursor-pointer"}>{data.category?.name + ` > ` + data.subCategory?.name}</b></div>
            <div>Price: <b className={"cursor-pointer"}>{data.price}</b></div>
            <div>Qty: <b className={"cursor-pointer"}>{data.qty}</b></div>
            <div>features: <b className={"cursor-pointer"}>
              {featuresView}
            </b>
            </div>
            <div>
              <div>Media: </div>
              <div className={"flex flex-wrap gap-4 py-4"}>

                {data.image ?
                  data.media?.map((_media: InventoryMedia, index: number) => (
                    <div key={index} className={"max-w-[8rem] max-h-24 flex content-center justify-center"}>
                      <img src={_media.link} alt={_media.id} className={"w-fit h-fit rounded-lg cursor-pointer hover:scale-125 transition-transform"} />
                    </div>
                  ))
                  : ""
                }

              </div>
            </div>

            <div>
              {
                data.listings?.map((value: String, index: number) => {
                  if (value === "PUBLIC") {
                    return <TransparentButton btntype={"SUCCESS"} key={0} starticon={<FaPlus />}>Add To Public Listing</TransparentButton>
                  } else return <div></div>
                })
              }

            </div>
          </div>
        </div>
      </div>
    );
  }
  const onSelectedRowsChange = (selected: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: InventoryItem[];
  }) => {
    let { allSelected, selectedCount, selectedRows } = selected;
    if(selectedCount > 0 && !tableActionButtonsActive)
      setTableActionButtonsActive(true);
    else if (selectedCount === 0 && tableActionButtonsActive)
      setTableActionButtonsActive(false);
    setSelectedRows(selectedRows);
  }
  return (
    <Page isMobile={props.isMobile} sideNavOpenState={props.sideNavOpenState}>
      <div className={"relative min-h-screen"} style={{ width: "inherit" }}>
        <div className="flex flex-col box-border w-full relative overflow-x-hidden">
          <div className={"mx-4 mt-4"}>
            <Header> Inventory Items
              <div className="fixed inset-0 flex items-center justify-center">
              </div>
            </Header>
          </div>
          <div className="flex flex-col box-border overflow-x-clip w-full relative px-2">
            <div className="flex box-border overflow-x-hidden w-full flex-col px-2">
              {
                < DataTableBase
                  filterItems={filterItems}
                  headerButtons={[<TransparentButton btntype={"SUCCESS"} key={0} onClick={() => { navigate(`/${entityId}/inventories/register`); setModalIsOpen(true) }} starticon={<FaPlus />}>New Inventory</TransparentButton>]}
                  tableActionButtons={[
                    <TransparentButton btntype={"WARNING"} starticon={<FiArchive />} key={0} disabled={!tableActionButtonsActive}>Archive</TransparentButton>,
                    <TransparentButton btntype={"ERROR"} starticon={<FaTrashAlt />} key={1} disabled={!tableActionButtonsActive}>Delete</TransparentButton>
                  ]}
                  tableProp={{
                    progressPending: loading ? loading : false,
                    progressComponent: <TableLoadingView children={"Fetching Inventories ..."} />,
                    pagination: true,
                    paginationServer: true,
                    paginationTotalRows: totalRows,
                    title: "",
                    fixedHeaderScrollHeight: "300px",
                    subHeaderWrap: true,
                    expandableRows: true,
                    defaultSortFieldId: 1,
                    defaultSortAsc: true,
                    subHeaderAlign: Alignment.CENTER,
                    data: inventories,
                    columns: columns,
                    direction: Direction.AUTO,
                    expandableRowsComponent: expandedComponent as any,
                    onSelectedRowsChange: onSelectedRowsChange,
                    // conditionalRowStyles: [
                    //   {
                    //     when: (row: InventoryItem) => {
                    //       return row.uid === "bc5cd447-6653-4a16-9bdd-8c71daa9e2a5";
                    //     },
                    //     classNames: ["inventoryItemLowQty"],
                    //   }
                    // ],
                    onChangePage: handlePageChange,
                    onChangeRowsPerPage: handlePerRowsChange,

                    onRowClicked: (row: InventoryItem, e: React.MouseEvent<Element, MouseEvent>) => {
                      setQuickViewActiveItem(null);
                      setQuickViewActiveItem(row);
                    }
                  }}
                />
              }

            </div>
          </div>
        </div>
        {/* <Outlet /> */}
        {/* {showQuickView && quickViewActiveItem != null ? <InventoryQuickViewer inventory={quickViewActiveItem} close={() => { setQuickViewActiveItem(null) }} /> : ""} */}
        <Modal openState={[modalIsOpen, setModalIsOpen]} />
      </div>
    </Page>
  )
};

export default InventoriesPage;
