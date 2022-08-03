import { InventoryCategory } from "./InventoryCategory";
import { InventoryFeature } from "./InventoryFeature";
import { InventoryItem } from "./InventoryItem";
import { InventoryMedia } from "./InventoryMedia";
import { InventorySubCategory } from "./InventorySubCategory";
interface Inventory {
  id?: number;
  uid?: string;
  name?: string;
  entityId?: string;
  about?: string;
  timeAdded?: number;
  addedBy?: number;
  qty?: number;
  price?: number;
  image?: string;
  media?: InventoryMedia[];
  category?: InventoryCategory;
  subCategory?: InventorySubCategory;
  customCategories?: InventoryCategory[];
  features?: InventoryFeature[];
  inventoryItems?: InventoryItem;
}

interface InventoryWithFiles extends Inventory {
  imageFile?: File;
  mediaFiles?: File[];
}

export type { Inventory, InventoryWithFiles };
