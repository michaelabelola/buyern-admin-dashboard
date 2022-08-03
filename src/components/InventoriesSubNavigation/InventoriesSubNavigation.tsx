import React, { FC } from 'react';
import { FiBox } from 'react-icons/fi';
import { Location, NavLink, useParams } from 'react-router-dom';
import { InventoryListing } from '../../Models/Listing';


interface InventoriesSubNavigationProps { }

const InventoriesSubNavigation: FC<InventoriesSubNavigationProps> = () => {
  return (
    <div>
      <h1 className={"text-lg font-semibold"}>Inventories</h1>
    </div>
  );
}
const InventoriesGroupsSubNavigation: FC<InventoriesSubNavigationProps> = () => {
  return (
    <div>
      <h1 className={"text-lg font-semibold"}>Groups</h1>
    </div>
  );
}

const InventoriesListingsSubNavigation: FC<InventoriesSubNavigationProps> = () => {
  var items: InventoryListing[] = [
    {
      id: 0,
      name: "Public Listing",
      isActive: true,
      isPrivate: false
    }
  ]
  return (
    <div>
      <div className={"py-4"}>
        <h1 className={"text-lg font-semibold"}>Listings</h1>
      </div>
      <div className={"flex flex-col gap-2 px-2"}>
        {
          items.map((item: InventoryListing, index: number) => {
            return <ListItem key={index} item={item} />
          })
        }
      </div>
    </div>
  );
}


const ListItem: FC<{ item: InventoryListing }> = (props) => {
  const { entityId } = useParams();
  return (
    <NavLink to={`/${entityId}/inventories/listings/${props.item.id}`} className={({ isActive }) => {
      return isActive ?
        'h-12 w-full rounded-md duration-300 cursor-pointer bg-primary-500 text-primary-100 flex items-center'
        :
        'h-12 w-full rounded-md duration-300 cursor-pointer text-primary-500 hover:bg-primary-500 hover:text-primary-100 flex items-center';
    }}>
      <FiBox className='scale-125 w-12' />
      <div>
        <h3 className={"font-semibold"}>{props.item.name}</h3>
        <small><div>{props.item.isPrivate?"Private": "Public"}</div></small>
      </div>
    </NavLink>
  );
}
export { InventoriesSubNavigation, InventoriesGroupsSubNavigation, InventoriesListingsSubNavigation };
