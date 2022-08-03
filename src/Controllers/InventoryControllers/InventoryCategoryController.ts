import { InventoryCategory } from "../../Models/Inventory/InventoryCategory";
import ResponseCodes from "../../Models/ResponseCodes";
import { ResponseDTO } from "../../Models/ResponseDTO";
import { ObjectRequestHandler, RequestStatus } from "../ObjectRequestHandler";

const InventoryCategoryController = (
  entityId?: string,
  abortController?: AbortController
): ObjectRequestHandler<InventoryCategory> => {
  const fetchAll = (state?: any[]) => {
    return new Promise<InventoryCategory[]>((resolve, reject) => {
      if(state)        
      state[1](RequestStatus.PROCESSING);
      var requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow",
        signal: abortController?.signal,
      };

      fetch(
        process.env.REACT_APP_INVENTORY_BASEURL + "/categories",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          let response: ResponseDTO<InventoryCategory[]> = JSON.parse(result);

          if (response.code === ResponseCodes.SUCCESS) {
            if (state) {
              state[1](RequestStatus.SUCCESSFUL);
              setTimeout(() => {
                state[1](RequestStatus.IDLE);
              }, 4000);
            }
            resolve(response.data);
          } else {
            if (state) {
              state[1](RequestStatus.FAILED);
              setTimeout(() => {
                state[1](RequestStatus.IDLE);
              }, 4000);
            }
            reject(response.message);
          }
        })
        .catch(() => {
          if (state) {
            state[1](RequestStatus.FAILED);
            setTimeout(() => {
              state[1](RequestStatus.IDLE);
            }, 4000);
          }
          reject("error contacting to server");
        });
    });
  };
  return {
    fetchAll: fetchAll,
  } as ObjectRequestHandler<InventoryCategory>;
};
export default InventoryCategoryController;
