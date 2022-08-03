import create from "zustand";
import { persist } from "zustand/middleware";
import EntityState from "../enums/EntityState";
import EntityType from "../enums/EntityType";

interface Entity {
  id: number;
  entityId: string;
  name: string;
  about: string;
  type: EntityType;
  registeredWithGovt: true;
  dateEstablished: Date;
  state: EntityState;
  category: {
    id: number;
    name: string;
    value: string;
  };
  parentId: number;
  email: string;
  phone: string;
  location: Location;
  hq: true;
  preferences: {
    id: number;
    color: string;
    colorDark: string;
    logo: string;
    logoDark: string;
    coverImage: string;
    coverImageDark: string;
  };
  registererId: string;
  isLive: true;
}
type ActiveEntityStoreState = {
  activeEntityId: number;
  setEntityIdActive: (entityId: string) => void;
  setEntityActive: (entity: Entity) => void;
  unsetEntity: () => void;
};
const useActiveEntityStore = create<ActiveEntityStoreState | any>(
  persist(
    (set) => ({
      activeEntityId: undefined as any as number,
      setEntityIdActive: (entityId: string) =>
        set(() => ({ activeEntityId: entityId })),
      setEntityActive: (entity: Entity) =>
        set(() => ({ activeEntityId: entity.entityId })),
      unsetEntity: () => set({ activeEntityId: undefined }),
    }),
    {
      name: "activeEntityId",
    }
  )
);
type EntitiesState = {
  entities: Entity[];
  setEntities: (entities: Entity[]) => void;
  removeAllEntities: () => void;
};
const useEntitiesStore = create<EntitiesState | any>(
  persist(
    (set) => ({
      entities: [] as any as Entity[],
      setEntities: (entities: Entity[]) => set(() => ({ entities: entities })),
      removeAllEntities: () => set({ entities: undefined }),
    }),
    {
      name: "entities",
    }
  )
);
export default Entity;
export { useActiveEntityStore, useEntitiesStore };
export type { ActiveEntityStoreState };
