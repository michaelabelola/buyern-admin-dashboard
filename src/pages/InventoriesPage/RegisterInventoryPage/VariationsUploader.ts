import ProgressStepMonitor from "../../../components/ProgressStepMonitor";
import InventoryItemController from "../../../Controllers/InventoryControllers/InventoryItemController";
import { RequestStatus } from "../../../Controllers/ObjectRequestHandler";
import {
  InventoryItem,
  InventoryItemWithFiles,
} from "../../../Models/Inventory/InventoryItem";
import { MediaWithFile } from "../../../Objects/Media";

class VariationsUploader {
  entityId: string;
  inventoryUid: string;
  rawVariations: InventoryItemWithFiles[];
  progressStepMonitor: ProgressStepMonitor;
  constructor(
    entityId: string,
    inventoryUid: string,
    rawVariations: InventoryItemWithFiles[],
    progressStepMonitor: ProgressStepMonitor
  ) {
    this.entityId = entityId;
    this.inventoryUid = inventoryUid;
    this.rawVariations = rawVariations;
    this.progressStepMonitor = progressStepMonitor;
    // console.log(this.rawVariations);
  }
  save() {
    this.saveVariationData(0);
  }
  saveVariationData(variationIndex: number) {
    if (!this.rawVariations[variationIndex]) {
      this.progressStepMonitor.addStep({
        text: `Items: All items has been uploaded or no item selected`,
        status: RequestStatus.SUCCESSFUL,
      });
      this.progressStepMonitor.addStep({
        text: `DONE`,
        status: RequestStatus.SUCCESSFUL,
      });
      this.progressStepMonitor.status = RequestStatus.CONCLUDED;
      console.log("");
      return;
    }
    // split data
    let prepVariation: InventoryItem = {
      ...this.rawVariations[variationIndex],
    };
    // prepVariation.parent = {
    //   id: 31,
    //   uid: this.inventoryUid,
    // };
    // @ts-ignore
    delete prepVariation["imageFile"];
    // @ts-ignore
    delete prepVariation["mediaFiles"];

    this.progressStepMonitor.addStep({
      text: `Items: saving item ... (${variationIndex + 1})`,
      status: RequestStatus.IDLE,
    });
    //save prep variation to inventory item
    InventoryItemController(this.entityId)
      .saveInventoryItem(
        prepVariation,
        this.inventoryUid,
        this.rawVariations[variationIndex].mediaFiles ? true : false
      )
      .then((value: InventoryItem) => {
        this.progressStepMonitor.addStep({
          text: `Item (${value.uid}): saved sucessfully`,
          status: RequestStatus.SUCCESSFUL,
        });
        // console.log(value);
        if (value.uid) this.uploadImage(value?.uid, variationIndex);
      })
      .catch((reason: any) => {
        console.log(reason);
      });
    // on success upload image
    // uploadImage();
  }
  uploadImage(itemId: string, variationIndex: number) {
    let item = this.rawVariations[variationIndex];
    if (!item.imageFile) {
      this.handleMedia(itemId, variationIndex);
      return;
    }
    this.progressStepMonitor.addStep({
      text: `Item (${itemId}) image: uploading ...`,
      status: RequestStatus.PROCESSING,
    });
    InventoryItemController(this.entityId)
      .saveImage(itemId, item.imageFile)
      .then((value: InventoryItem) => {
        this.progressStepMonitor.addStep({
          text: `Item (${itemId}) image: uploaded sucessfully`,
          status: RequestStatus.SUCCESSFUL,
        });
        this.handleMedia(itemId, variationIndex);
        // console.log(value);
      })
      .catch((reason: any) => {
        this.progressStepMonitor.addStep({
          text: `Item (${itemId}) image: Error uploading`,
          status: RequestStatus.FAILED,
        });
        this.handleMedia(itemId, variationIndex);
      });
    // onSuccess
    // this.handleMedia(0);
  }
  handleMedia(itemId: string, variationIndex: number) {
    let item = this.rawVariations[variationIndex];
    if (!item.mediaFiles) {
      this.progressStepMonitor.addStep({
        text: `Item (${itemId}) - media: No item media selected`,
        status: RequestStatus.IDLE,
      });
      return;
    }
    var _media: MediaWithFile[] = item.mediaFiles.map(
      (file: File, index: number, array: File[]) => {
        return {
          tag: "lol",
          file: file,
        };
      }
    );

    this.saveInventoryMedia2(itemId, _media, variationIndex, 0);
    // upload media and recall fn
  }

  saveInventoryMedia2 = (
    itemId: string,
    _media: MediaWithFile[],
    variationIndex: number,
    currentItemIndex: number
  ) => {
    if (!_media[currentItemIndex]) {
      if (_media.length > 0) {
        this.progressStepMonitor.addStep({
          text: `Item (${itemId}) - media: All Media uploaded successfully`,
          status: RequestStatus.SUCCESSFUL,
        });
      } else {
        this.progressStepMonitor.addStep({
          text: `Item (${itemId}) - media: will inherit parent media because no media was selected`,
          status: RequestStatus.IDLE,
        });
      }
      this.saveVariationData(variationIndex + 1);
    } else {
      this.progressStepMonitor.addStep({
        text: `Item (${itemId}) - media (${
          currentItemIndex + 1
        }): uploading... `,
        status: RequestStatus.PROCESSING,
      });
      InventoryItemController(this.entityId)
        .saveMedia(itemId, _media[currentItemIndex])
        .then((value: InventoryItem) => {
          this.progressStepMonitor.addStep({
            text: `Item (${itemId}) - media (${
              currentItemIndex + 1
            }): Uploaded Sucessfully `,
            status: RequestStatus.SUCCESSFUL,
          });
          this.saveInventoryMedia2(
            itemId,
            _media,
            variationIndex,
            currentItemIndex + 1
          );
        })
        .catch((reason: any) => {
          this.progressStepMonitor.addStep({
            text: `Item (${itemId}) - media (${
              currentItemIndex + 1
            }): Error Uploading`,
            status: RequestStatus.SUCCESSFUL,
          });

          console.log(
            `Couldnt upload media with array Id: ${currentItemIndex}. REASON: ${reason} `
          );
          this.saveInventoryMedia2(
            itemId,
            _media,
            variationIndex,
            currentItemIndex + 1
          );
        });
    }
  };

  // saveInventoryMedia = (inventoryId: string) => {
  //   var _media: MediaWithFile[] = selectedMedia.map(
  //     (file: File, index: number, array: File[]) => {
  //       return {
  //         tag: "lol",
  //         file: file,
  //       };
  //     }
  //   );
  //   saveInventoryMedia2(inventoryId, _media, 0);
  // };
  // saveInventoryMedia2 = (
  //   inventoryId: string,
  //   _media: MediaWithFile[],
  //   currentItemIndex: number
  // ) => {
  //   if (!_media[currentItemIndex]) {
  //     if (_media.length > 0) {
  //       console.log("All Media uploaded successfully");
  //       if (entityId) {
  //         var variationsUploader = new VariationsUploader(
  //           entityId,
  //           inventoryId,
  //           variations
  //         );
  //       }
  //     } else console.log("No media selected");
  //   }
  //   InventoryController(entityId)
  //     .saveInventoryMedia(inventoryId, _media[currentItemIndex])
  //     .then((value: Inventory) => {
  //       console.log(
  //         `uploaded media with array Id: ${currentItemIndex} Successfully.`
  //       );
  //       saveInventoryMedia2(inventoryId, _media, currentItemIndex + 1);
  //     })
  //     .catch((reason: any) => {
  //       console.log(
  //         `Couldnt upload media with array Id: ${currentItemIndex}. REASON: ${reason} `
  //       );
  //     });
  // };
}
export default VariationsUploader;
