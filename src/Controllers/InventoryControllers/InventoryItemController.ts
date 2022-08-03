import { InventoryItem } from "../../Models/Inventory/InventoryItem";
import ResponseCodes from "../../Models/ResponseCodes";
import { PageableResponseData, PageableResponseDTO, ResponseDTO } from "../../Models/ResponseDTO";
import { MediaWithFile } from "../../Objects/Media";
import { ObjectRequestHandler, RequestStatus } from "../ObjectRequestHandler";

interface RequestHandlerType extends ObjectRequestHandler<InventoryItem> {
  saveImage: (
    itemId: string,
    image: File,
    state?: any[]
  ) => Promise<InventoryItem>;
  //   save one media
  saveMedia: (
    inventoryId: string,
    media: MediaWithFile,
    state?: any[]
  ) => Promise<InventoryItem>;
  saveInventoryItem: (
    inventoryItem: InventoryItem,
    parentId: string,
    hasMedia: boolean,
    state?: any[]
  ) => Promise<InventoryItem>;
}

const InventoryItemController = (entityId?: string): RequestHandlerType => {
  const fetchAll = (state?: any[]) => {
    return new Promise<InventoryItem[]>((resolve, reject) => {
      var requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow"
      };

      fetch(
        `${process.env.REACT_APP_INVENTORY_BASEURL}/admin/${entityId}/inventory/items`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          let response: ResponseDTO<InventoryItem[]> = JSON.parse(result);

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
        .catch((reason: any) => {
          if (state) {
            state[1](RequestStatus.SUCCESSFUL);
            setTimeout(() => {
              state[1](RequestStatus.IDLE);
            }, 4000);
            state[1](RequestStatus.FAILED);
          }
          reject(reason);
        });
    });
  };
    const fetchAllPagable = (page: number, perPage: number, state?: any[]) => {
      return new Promise<PageableResponseData<InventoryItem[]>>(
        (resolve, reject) => {
          var requestOptions: RequestInit = {
            method: "GET",
            redirect: "follow",
          };

          fetch(
            `${process.env.REACT_APP_INVENTORY_BASEURL}/admin/${entityId}/inventory/items?page=${page}&perPage=${perPage}`,
            requestOptions
          )
            .then((response) => response.text())
            .then((result) => {
              let response: PageableResponseDTO<InventoryItem[]> =
                JSON.parse(result);

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
        }
      );
    };
  const saveInventoryItem = (inventoryItem: InventoryItem, parentId:string, hasMedia: boolean, state?: any[]) => {
    return new Promise<InventoryItem>((resolve, reject) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(inventoryItem),
        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_INVENTORY_BASEURL}/admin/${entityId}/inventory/item?inventoryId=${parentId}&hasMedia=${hasMedia}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          let response: ResponseDTO<InventoryItem> = JSON.parse(result);
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

  const saveInventoryItemImage = (
    itemId: string,
    image: File,
    state?: any[]
  ) => {
    return new Promise<InventoryItem>((resolve, reject) => {
      var formdata: FormData = new FormData();
      formdata.append("image", image);
       formdata.append("itemId", itemId);

      // formdata.append("image", fileInput.files[0], "/D:/abelm/Pictures/1.png");

      var requestOptions: RequestInit = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_INVENTORY_BASEURL}/admin/${entityId}/inventory/item/image`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          console.log(result);

          let response: ResponseDTO<InventoryItem> = JSON.parse(result);
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

  const saveInventoryMedia = (
    itemId: string,
    media: MediaWithFile,
    state?: any[]
  ) => {
    console.log(entityId);
    console.log(itemId);
    console.log(media);

    return new Promise<InventoryItem>((resolve, reject) => {
      if (!media.file) return;
      var formdata = new FormData();
      formdata.append("itemId", itemId);
      formdata.append("media", media.file);

      var requestOptions: RequestInit = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_INVENTORY_BASEURL}/admin/${entityId}/inventory/item/media`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          // console.log(result);

          let response: ResponseDTO<InventoryItem> = JSON.parse(result);
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
    fetchAllPagable: fetchAllPagable,
    saveInventoryItem: saveInventoryItem,
    saveImage: saveInventoryItemImage,
    saveMedia: saveInventoryMedia,
  } as any as RequestHandlerType;
};
export default InventoryItemController;
