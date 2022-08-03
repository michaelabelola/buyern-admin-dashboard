import { InventoryCategory } from "../../Models/Inventory/InventoryCategory";
import { InventorySubCategory } from "../../Models/Inventory/InventorySubCategory";
import ResponseCodes from "../../Models/ResponseCodes";
import { ResponseDTO } from "../../Models/ResponseDTO";
import { ObjectRequestHandler, RequestStatus } from "../ObjectRequestHandler";
interface typz extends ObjectRequestHandler<InventorySubCategory> {
  fetchAllByCategoryId: any;
}
const InventorySubCategoryController = (entityId?: string): typz => {
  const fetchAllByCategoryId = (categoryId: number, state?: any[]) => {
    return new Promise<InventoryCategory[]>((resolve, reject) => {
      if (state) state[1](RequestStatus.PROCESSING);
      var requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        process.env.REACT_APP_INVENTORY_BASEURL +
          "/subCategories/byCategoryId?categoryId=" +
          categoryId,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          let response: ResponseDTO<InventorySubCategory[]> =
            JSON.parse(result);

          if (response.code === ResponseCodes.SUCCESS) {
            if (state) {
              state[1](RequestStatus.SUCCESSFUL);
              setTimeout(() => {
                state[1](RequestStatus.IDLE);
              }, 4000);
            }
            resolve(response.data?response.data:[]);
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
    fetchAllByCategoryId: fetchAllByCategoryId,
  } as any as typz;
};
export default InventorySubCategoryController;
