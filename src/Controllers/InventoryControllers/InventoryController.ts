import { Inventory } from "../../Models/Inventory/Inventory";
import ResponseCodes from "../../Models/ResponseCodes";
import {
  PageableResponseData,
  PageableResponseDTO,
  ResponseDTO,
} from "../../Models/ResponseDTO";
import { MediaWithFile } from "../../Objects/Media";
import { ObjectRequestHandler, RequestStatus } from "../ObjectRequestHandler";
interface RequestHandlerType extends ObjectRequestHandler<Inventory> {
  saveInventoryImage: (
    inventoryId: string,
    image: File,
    state?: any[]
  ) => Promise<Inventory>;
  saveInventoryMedia: (
    inventoryId: string,
    media: MediaWithFile,
    state?: any[]
  ) => Promise<Inventory>;
}
const InventoryController = (entityId?: string): RequestHandlerType => {
  const fetchAllPagable = (page: number, perPage: number, state?: any[]) => {
    return new Promise<PageableResponseData<Inventory[]>>((resolve, reject) => {
      var requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_INVENTORY_BASEURL}/admin/${entityId}/inventories?page=${page}&perPage=${perPage}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          let response: PageableResponseDTO<Inventory[]> = JSON.parse(result);

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
              state[1](RequestStatus.SUCCESSFUL);
              setTimeout(() => {
                state[1](RequestStatus.IDLE);
              }, 4000);
              state[1](RequestStatus.FAILED);
            }
            reject(response.message);
          }
        })
        .catch(() => {
          if (state) {
            state[1](RequestStatus.SUCCESSFUL);
            setTimeout(() => {
              state[1](RequestStatus.IDLE);
            }, 4000);
            state[1](RequestStatus.FAILED);
          }
          reject("error contacting to server");
        });
    });
  };
  const saveInventory = (inventory: Inventory, state?: any[]) => {
    return new Promise<Inventory>((resolve, reject) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(inventory),
        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_INVENTORY_BASEURL}/admin/${entityId}/inventory`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          let response: ResponseDTO<Inventory> = JSON.parse(result);
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
              state[1](RequestStatus.SUCCESSFUL);
              setTimeout(() => {
                state[1](RequestStatus.IDLE);
              }, 4000);
              state[1](RequestStatus.FAILED);
            }
            reject(response.message);
          }
        })
        .catch(() => {
          if (state) {
            state[1](RequestStatus.SUCCESSFUL);
            setTimeout(() => {
              state[1](RequestStatus.IDLE);
            }, 4000);
            state[1](RequestStatus.FAILED);
          }
          reject("error contacting to server");
        });
    });
  };

  const saveInventoryImage = (
    inventoryId: string,
    image: File,
    state?: any[]
  ) => {
    return new Promise<Inventory>((resolve, reject) => {
      var formdata: FormData = new FormData();
      formdata.append("inventoryId", inventoryId);
      formdata.append("image", image);
      // formdata.append("image", fileInput.files[0], "/D:/abelm/Pictures/1.png");

      var requestOptions: RequestInit = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_INVENTORY_BASEURL}/admin/${entityId}/inventory/image`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          let response: ResponseDTO<Inventory> = JSON.parse(result);
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
              state[1](RequestStatus.SUCCESSFUL);
              setTimeout(() => {
                state[1](RequestStatus.IDLE);
              }, 4000);
              state[1](RequestStatus.FAILED);
            }
            reject(response.message);
          }
        })
        .catch(() => {
          if (state) {
            state[1](RequestStatus.SUCCESSFUL);
            setTimeout(() => {
              state[1](RequestStatus.IDLE);
            }, 4000);
            state[1](RequestStatus.FAILED);
          }
          reject("error contacting to server");
        });
    });
  };

  const saveInventoryMedia = (
    inventoryId: string,
    media: MediaWithFile,
    state?: any[]
  ) => {
    // console.log(entityId);
    // console.log(inventoryId);
    // console.log(media);
    return new Promise<Inventory>((resolve, reject) => {
      if (!media.file) return;
      var formdata = new FormData();
      formdata.append("inventoryId", inventoryId);
      formdata.append("name", media.name ? media.name : (undefined as any));
      formdata.append("tag", media.tag ? media.tag : (undefined as any));
      formdata.append("media", media.file);

      var requestOptions: RequestInit = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_INVENTORY_BASEURL}/admin/${entityId}/inventory/media`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          let response: ResponseDTO<Inventory> = JSON.parse(result);
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
              state[1](RequestStatus.SUCCESSFUL);
              setTimeout(() => {
                state[1](RequestStatus.IDLE);
              }, 4000);
              state[1](RequestStatus.FAILED);
            }
            reject(response.message);
          }
        })
        .catch(() => {
          if (state) {
            state[1](RequestStatus.SUCCESSFUL);
            setTimeout(() => {
              state[1](RequestStatus.IDLE);
            }, 4000);
            state[1](RequestStatus.FAILED);
          }
          reject("error contacting to server");
        });
    });
  };

  return {
    fetchAllPagable: fetchAllPagable,
    save: saveInventory,
    saveInventoryImage: saveInventoryImage,
    saveInventoryMedia: saveInventoryMedia,
  } as RequestHandlerType;
};
export default InventoryController;
