import { InventoryFeature } from "../../Models/Inventory/InventoryFeature";
import ResponseCodes from "../../Models/ResponseCodes";
import { ResponseDTO } from "../../Models/ResponseDTO";
import { ObjectRequestHandler, RequestStatus } from "../ObjectRequestHandler";

const InventoryFeatureController = (
  entityId?: string
): ObjectRequestHandler<InventoryFeature> => {
  const fetchAll = (state?: any[]) => {
    return new Promise<InventoryFeature[]>((resolve, reject) => {
      var requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_INVENTORY_BASEURL}/admin/${entityId}/feature/all`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          let response: ResponseDTO<InventoryFeature[]> = JSON.parse(result);

          if (response.code === ResponseCodes.SUCCESS) {
            if (state) {
              state[1](RequestStatus.SUCCESSFUL);
              setTimeout(() => {
                state[1](RequestStatus.IDLE);
              }, 4000);
            }
            if (response.data || response.data) {
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
  const save = (feature: InventoryFeature, state?: any[]) => {
    console.log(feature);
    return new Promise<InventoryFeature>((resolve, reject) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify(feature);
      var requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      if (state) state[1]({ requestStatus: RequestStatus.PROCESSING });
      fetch(
        `${process.env.REACT_APP_INVENTORY_BASEURL}/admin/${entityId}/feature`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          let response: ResponseDTO<InventoryFeature> = JSON.parse(result);
          if (response.code === ResponseCodes.SUCCESS) {
            if (state) {
              state[1]({ requestStatus: RequestStatus.SUCCESSFUL });
              setTimeout(() => {
                state[1]({ requestStatus: RequestStatus.IDLE });
              }, 4000);
            }
            resolve(response.data);
          } else {
            if (state) {
              state[1]({ requestStatus: RequestStatus.SUCCESSFUL });
              setTimeout(() => {
                state[1]({ requestStatus: RequestStatus.IDLE });
              }, 4000);
              state[1]({ requestStatus: RequestStatus.FAILED });
            }
            reject(response.message);
          }
        })
        .catch(() => {
          if (state) {
            state[1]({ requestStatus: RequestStatus.SUCCESSFUL });
            setTimeout(() => {
              state[1]({ requestStatus: RequestStatus.IDLE });
            }, 4000);
            state[1]({ requestStatus: RequestStatus.FAILED });
          }
          reject("error contacting server");
        });
    });
  };
  return {
    fetchAll: fetchAll,
    save: save,
  } as ObjectRequestHandler<InventoryFeature>;
};
export default InventoryFeatureController;
  // const fetchAllByParentId = (parentId: string, state?: any[]) => {
  //   return new Promise<ResponseDTO<InventoryItem[]>>((resolve, reject) => {
  //     var requestOptions: RequestInit = {
  //       method: "GET",
  //       redirect: "follow",
  //     };

  //     fetch(
  //       `${process.env.REACT_APP_INVENTORY_BASEURL}/admin/${entityId}/inventoryFeature?parentId=${parentId}`,
  //       requestOptions
  //     )
  //       .then((response) => response.text())
  //       .then((result) => {
  //         let response: ResponseDTO<InventoryItem[]> = JSON.parse(result);

  //         if (response.code === ResponseCodes.SUCCESS) {
  //           if (state) {
  //             state[1](RequestStatus.SUCCESSFUL);
  //             setTimeout(() => {
  //               state[1](RequestStatus.IDLE);
  //             }, 4000);
  //           }
  //           resolve(response);
  //         } else {
  //           if (state) {
  //             state[1](RequestStatus.SUCCESSFUL);
  //             setTimeout(() => {
  //               state[1](RequestStatus.IDLE);
  //             }, 4000);
  //             state[1](RequestStatus.FAILED);
  //           }
  //           reject(response.message);
  //         }
  //       })
  //       .catch(() => {
  //         if (state) {
  //           state[1](RequestStatus.SUCCESSFUL);
  //           setTimeout(() => {
  //             state[1](RequestStatus.IDLE);
  //           }, 4000);
  //           state[1](RequestStatus.FAILED);
  //         }
  //         reject("error contacting to server");
  //       });
  //   });
  // };