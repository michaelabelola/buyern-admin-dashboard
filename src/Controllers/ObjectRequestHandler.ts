import { PageableResponseData } from "../Models/ResponseDTO";

enum RequestStatus {
  IDLE = 1,
  PROCESSING = 2,
  SUCCESSFUL = 3,
  FAILED = 4,
  CONCLUDED = 5,
}

interface ObjectRequestHandler<T> {
  fetch: (id?: string | number) => T;
  fetchAll: (
    state?: [RequestStatus, React.Dispatch<React.SetStateAction<RequestStatus>>]
  ) => Promise<T[]>;
  fetchAllPagable: (
    page: number,
    perPage: number,
    state?: any[]
  ) => Promise<PageableResponseData<T[]>>;
  updateAll: () => {};
  save: (feature: T, state?: any[]) => Promise<T>;
  saveAll: () => {};
  deleteAll: (id?: string[] | number[]) => boolean;
  delete: (id?: string | number) => T;
  updateOne: (id?: string | number, object?: T) => T;
}

export type { ObjectRequestHandler };
export { RequestStatus };
