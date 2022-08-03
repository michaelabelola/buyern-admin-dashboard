import { Inventory } from "./Inventory";
import { InventoryMedia } from "./InventoryMedia";
import { InventoryCategory } from "./InventoryCategory";
import { InventoryItemFeature } from "./InventoryFeature";
import { InventorySubCategory } from "./InventorySubCategory";
import { Promo } from "../Promo";

interface InventoryItem {
  uid?: string;
  name?: string;
  entityId?: string;
  about?: string;
  timeAdded?: Date;
  addedBy?: number;
  qty?: number;
  unit?: number;
  price?: number;
  promos?: Promo[];
  image?: string;
  media?: InventoryMedia[];
  category?: InventoryCategory;
  subCategory?: InventorySubCategory;
  features?: InventoryItemFeature[];
  parent?: Inventory;
  listings?:String[];
}
interface InventoryItemWithFiles extends InventoryItem {
  imageFile?: File;
  mediaFiles?: File[];
}
export type { InventoryItem, InventoryItemWithFiles };
