enum FeatureType {
  VALUE = "VALUE",
  NUMBER = "NUMBER",
}
interface FeatureValue {
  id?: string;
  name: string;
  rawValue: string;
}
interface MeasurementUnit {
  uid: string;
  name: string;
  shortName: string;
  conversion: string;
}
interface InventoryFeature {
  id?: number;
  name?: string;
  values?: FeatureValue[];
  type?: FeatureType;
  minValue?: number;
  maxValue?: number;
  measurementUnit?: MeasurementUnit;
  entityId?: string;
  categoryId?: number;
  subCategoryId?: number;
  visible?: boolean;
  parentFeature?: InventoryFeature;
}

interface InventoryItemFeature {
  id?: number;
  name?: string;
  value?: FeatureValue;
  type?: FeatureType;
  minValue?: number;
  maxValue?: number;
  measurementUnit?: MeasurementUnit;
  entityId?: string;
  categoryId?: number;
  subCategoryId?: number;
  visible?: boolean;
  parentFeature?: InventoryFeature;
}
export type {
  InventoryFeature,
  MeasurementUnit,
  FeatureValue,
  InventoryItemFeature,
};
export { FeatureType };
