import { FC, useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import Button, { ButtonStatus, StatusButton, TransparentButton } from '../../../components/Button/Button';
import FormControl, { FormError, FormImage, FormInput, FormLabel, FormSelect, FormTextArea, TitleView } from '../../../components/FormControl/FormControl';
import Header from '../../../components/Header/Header.lazy';
import SideNavVisibilityProp from '../../../components/MainNavigationView/SideNavVisibilityProp';
import { NotificationModal, NotificationStep } from '../../../components/Modal/Modal';
import Page from '../../../components/Page/Page';
import ProgressStepMonitor from '../../../components/ProgressStepMonitor';
import InventoryCategoryController from '../../../Controllers/InventoryControllers/InventoryCategoryController';
import InventoryController from '../../../Controllers/InventoryControllers/InventoryController';
import InventorySubCategoryController from '../../../Controllers/InventoryControllers/InventorySubCategoryController';
import { RequestStatus } from '../../../Controllers/ObjectRequestHandler';
import { Inventory } from '../../../Models/Inventory/Inventory';
import { InventoryCategory } from '../../../Models/Inventory/InventoryCategory';
import { FeatureType, FeatureValue, InventoryFeature } from '../../../Models/Inventory/InventoryFeature';
import { InventoryItemWithFiles } from '../../../Models/Inventory/InventoryItem';
import { InventorySubCategory } from '../../../Models/Inventory/InventorySubCategory';
import { MediaWithFile } from '../../../Objects/Media';
import inputVerifier from './InventoryRegistrationInputVerifier';
import RegisterVariationModal from './RegisterVariationModal';
import SelectFeatureModal from './SelectFeatureModalView';
import VariationsUploader from './VariationsUploader';


interface RegisterInventoryPageProps extends SideNavVisibilityProp { }

const RegisterInventoryPage: FC<RegisterInventoryPageProps> = (props) => {
  const { entityId } = useParams();
  const [inventoryCategories, setInventoryCategories] = useState([] as InventoryCategory[]);
  const [selectedInventoryCategoryId, setSelectedInventoryCategoryId] = useState(0);
  const [selectedSubInventoryCategoryId, setSelectedSubInventoryCategoryId] = useState(0);
  const [inventorySubCategories, setInventorySubCategories] = useState([] as InventorySubCategory[]);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [about, setAbout] = useState("");
  const [aboutError, setAboutError] = useState("");
  const [price, setPrice] = useState(0.00);
  const [priceError, setPriceError] = useState("");
  const [selectedImage, setSelectedimage] = useState(undefined as any as File)
  const [variations, setVariations] = useState([] as InventoryItemWithFiles[])
  const [imageError, setImageError] = useState("");
  const [selectedMedia, setSelectedMedia] = useState([] as any as File[])
  const [selectedInventoryFeatures, setSelectedInventoryFeatures] = useState([] as InventoryFeature[]);
  const [inventoryStatus, setInventoryStatus] = useState({} as ButtonStatus);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [notifModalIsOpen, setNotifModalIsOpen] = useState(false);
  const [registrationStepsMonitor, setRegistrationStepsMonitor] = useState([] as NotificationStep[]);
  const [addVariationModalIsOpen, setAddVariationModalIsOpen] = useState(false);
  const categoryRequestTracker = useState(RequestStatus.IDLE);
  const subCategoryRequestTracker = useState(RequestStatus.IDLE);
  var progressStepMonitor: ProgressStepMonitor = new ProgressStepMonitor([notifModalIsOpen, setNotifModalIsOpen], [registrationStepsMonitor, setRegistrationStepsMonitor]);
  var saveInventory: any = () => {
    // saveInventoryMedia("abdab776-5618-41b2-988c-bb714c91dbe4");
    // return;
    // progressStepMonitor.addStep({
    //   text: "dada", status: RequestStatus.SUCCESSFUL
    // })
    // progressStepMonitor.updateLastStepInMonitor({
    //   text: "butter", status: RequestStatus.FAILED
    // })

    let inventory: Inventory = {
      name: name,
      entityId: entityId,
      about: about,
      addedBy: 73,
      price: price,
      // image: string;
      // media: InventoryMedia[],
      category: {
        id: selectedInventoryCategoryId
      },
      subCategory: {
        id: selectedSubInventoryCategoryId
      },
      features: selectedInventoryFeatures.map((value: InventoryFeature) => ({ id: value.id })) as InventoryFeature[],
    }
    progressStepMonitor.addStep({
      text: "Creating Inventory... ", status: RequestStatus.PROCESSING
    })
    setNotifModalIsOpen(true);
    setRegistrationStepsMonitor([
      ...registrationStepsMonitor,
      {
        text: ""
      }
    ])
    // console.log(inventory);
    // console.log(variations);
    InventoryController(entityId).save(inventory, [inventoryStatus, setInventoryStatus]).then((newInventory: Inventory) => {
      console.log(newInventory);

      progressStepMonitor.addStep({
        text: "inventory created sucessfully", status: RequestStatus.SUCCESSFUL
      })
      progressStepMonitor.addStep({
        text: "Uploading inventory image... ", status: RequestStatus.PROCESSING
      })
      if (newInventory.uid) {
        // save Inventory Image
        InventoryController(entityId).saveInventoryImage(newInventory.uid, selectedImage).then((value: Inventory) => {
          progressStepMonitor.addStep({
            text: "inventory image uploaded sucessfully ", status: RequestStatus.SUCCESSFUL
          })
          // save Inventory media
          if (newInventory.uid)
            saveInventoryMedia(newInventory.uid);
        })
          .catch((reason: any) => {
            console.log(reason);
          })
      }
    })
      .catch((reason: any) => {
        console.log(reason);
      })
  }
  const saveInventoryMedia = (inventoryId: string) => {
    var _media: MediaWithFile[] = selectedMedia.map((file: File, index: number, array: File[]) => {
      return {
        tag: "lol",
        file: file
      }
    })
    saveInventoryMedia2(inventoryId, _media, 0);
  }
  const saveInventoryMedia2 = (inventoryId: string, _media: MediaWithFile[], currentItemIndex: number) => {
    if (!_media[currentItemIndex]) {
      if (_media.length > 0) {
        console.log("Media: All Media uploaded successfully");
        if (entityId) {
          variations.forEach((value: InventoryItemWithFiles, index: number, array: InventoryItemWithFiles[]) => {
            value.category = {
              id: selectedInventoryCategoryId
            };
            value.subCategory = {
              id: selectedSubInventoryCategoryId
            }
          });
          var variationsUploader = new VariationsUploader(entityId, inventoryId, variations, progressStepMonitor);
          variationsUploader.save();
        }
      } else {
        progressStepMonitor.addStep({
          text: `Media: No media selected`, status: RequestStatus.IDLE
        })
        if (entityId)
          new VariationsUploader(entityId, inventoryId, variations, progressStepMonitor).save();
      }
    } else {

      progressStepMonitor.addStep({
        text: `Media (${currentItemIndex}): Uploading... `, status: RequestStatus.PROCESSING
      })
      InventoryController(entityId).saveInventoryMedia(inventoryId, _media[currentItemIndex]).then((value: Inventory) => {
        console.log(``);
        progressStepMonitor.addStep({
          text: `Media (${currentItemIndex}) : Uploaded`, status: RequestStatus.SUCCESSFUL
        })
        saveInventoryMedia2(inventoryId, _media, currentItemIndex + 1);
      })
        .catch((reason: any) => {
          progressStepMonitor.addStep({
            text: `Media (${currentItemIndex}) : error uploading - ${reason}`, status: RequestStatus.FAILED
          })
        })
    }
  }
  const selectedMediaSetter = (file: File, position: number) => {
    let cc = selectedMedia.map((value: File, index: number) => {
      return value;
    });
    if (!file) {
      cc.splice(position, 1);
    } else {
      cc[position] = file;
    }
    setSelectedMedia(cc);
  };
  function removeVariation(index: number) {
    index = index ? index : 0;
    if (variations) {
      let sVariations = variations.map((value: InventoryItemWithFiles, index: number, array: InventoryItemWithFiles[]) => {
        return value;
      });
      sVariations.splice(index, 1);
      setVariations(sVariations);
    }
  }
  function removeFromFeatureList(index: number) {
    index = index ? index : 0;
    if (selectedInventoryFeatures) {
      let sFeature = selectedInventoryFeatures.map((value: InventoryFeature, index: number, array: InventoryFeature[]) => {
        return value;
      });
      sFeature.splice(index, 1);
      setSelectedInventoryFeatures(sFeature);
    }
  }
  var categoryAbortController = new AbortController();
  const fetchCategories = () => {
    if (selectedSubInventoryCategoryId && inventorySubCategories && inventorySubCategories.length > 0 && inventorySubCategories[1].categoryId === selectedInventoryCategoryId) {
    } else InventoryCategoryController(entityId, categoryAbortController).fetchAll(categoryRequestTracker).then((value: InventoryCategory[]) => {
      setInventoryCategories(value);
      if (value) setSelectedInventoryCategoryId(value[0].id as any);
      if (value[0].id) fetchSubCategories(value[0].id);
    }, (reason: any) => console.log(reason));
  }
  // (categoryId: number) => { setSelectedInventoryCategoryId(categoryId); }
  const fetchSubCategories = (categoryId: number) => {
    InventorySubCategoryController(entityId).fetchAllByCategoryId(categoryId, subCategoryRequestTracker).then((value: InventorySubCategory[]) => { setInventorySubCategories(value); if (value) setSelectedSubInventoryCategoryId(value[0] ? value[0].id : undefined as any) }, (reason: any) => { console.log(reason); setSelectedSubInventoryCategoryId(undefined as any) });
  }
  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <Page {...props}>
      <div className="flex flex-col box-border w-full relative overflow-x-hidden">
        <div className="flex box-border overflow-x-clip w-full justify-center px-2">
          <form className="lg:full xl:w-[30vw] lg:w-8/12 md:w-8/12 w-full px-16 md:px-4 justify-center" onSubmit={() => (false)}>
            <div className=' mt-4'>
            <Header>Register Inventory</Header>
            </div>
            <div className="mb-3 w-full xl:w-full flex flex-col gap-4 justify-center items-baseline">
              <TitleView titlestyle={1}>Details</TitleView>
              <FormControl label={<FormLabel children={"name"} />}>
                <FormInput placeholder="Name" defaultValue={name} setter={(value: any) => {
                  setName(value);
                  inputVerifier.name(value, setNameError);
                }} required />
                {nameError ? <FormError>{nameError}</FormError> : ""}
              </FormControl>
              <FormControl label={<FormLabel>About</FormLabel>}>
                <FormTextArea placeholder="About Inventory" value={about} setter={(value: any) => {
                  setAbout(value);
                  inputVerifier.about(value, setAboutError);
                }} required />
                {aboutError ? <FormError>{aboutError}</FormError> : ""}
              </FormControl>

              <FormControl label={<FormLabel>Select Category</FormLabel>} stateTracker={categoryRequestTracker}>
                <FormSelect setter={(value: number) => {
                  fetchSubCategories(value); setSelectedInventoryCategoryId(value)
                }} required options={inventoryCategories ? inventoryCategories.map((category: InventoryCategory, index: number, array: InventoryCategory[]) => {
                  return (
                    { id: category.id, value: category.name }
                  )
                }) : []} />
              </FormControl>
              <FormControl label={<FormLabel>Select Clothing Category</FormLabel>} stateTracker={subCategoryRequestTracker}>
                <FormLabel children={""} />
                <FormSelect setter={setSelectedSubInventoryCategoryId} required options={inventorySubCategories.map((subCategory: InventorySubCategory, index: number, array: InventorySubCategory[]) => {
                  return (
                    { id: subCategory.id, value: subCategory.name }
                  )
                })} />
              </FormControl>
              <FormControl label={<FormLabel>Price</FormLabel>}>

                <FormInput placeholder="Price" type={"number"} defaultValue={price} setter={(value: any) => {
                  setPrice(value);
                  inputVerifier.price(value, setPriceError);
                }} required />
                {priceError ? <FormError>{priceError}</FormError> : ""}
              </FormControl>
              <TitleView titlestyle={1}>Media</TitleView>
              <FormControl label={<FormLabel>Image</FormLabel>}>

                <FormImage val={selectedImage} setter={(file: File) => {
                  setSelectedimage(file);
                  inputVerifier.image(file, setImageError);
                }} />
                {imageError ? <FormError>{imageError}</FormError> : ""}
              </FormControl>

              <FormControl label={<FormLabel>Additional Images / Media</FormLabel>}>

                <div className={"flex overflow-x-hidden gap-4 flex-wrap content-around justify-start min-h-[8rem]"}>
                  {selectedMedia.map((value: File, index: number, array: File[]) => {
                    return <FormImage key={index} position={index} val={value} setter={selectedMediaSetter} closer={() => { }} />
                  })
                  }
                  {/* <FormImage closer={() => {  }} /> */}
                </div>

                <div className={"flex overflow-x-hidden gap-4 pt-4 flex-wrap justify-around"}>
                  {selectedMedia.length < 4 ?
                    <TransparentButton btntype={'SUCCESS'} starticon={<FiPlus />} onClick={() => {
                      let cc = selectedMedia.map((value: File, index: number) => {
                        return value;
                      });
                      cc.push(undefined as any as File);
                      setSelectedMedia(cc);
                    }}>Add Media
                    </TransparentButton>
                    :
                    <TransparentButton btntype={'ERROR'} starticon={<FiPlus />} onClick={() => { setSelectedMedia([]) }}>Clear All</TransparentButton>
                  }
                </div>
              </FormControl>

              <TitleView titlestyle={1}>Features</TitleView>

              {selectedInventoryFeatures.map((value: InventoryFeature, index: number, array: InventoryFeature[]) => (
                <div key={index} className={"flex w-full flex-row gap-4"}>
                  <div key={index} className={"hover:bg-primary-700 hover:text-primary-200 bg-primary-200 cursor-pointer w-full rounded-md p-2 duration-300 overflow-x-hidden"}>
                    <h1 className={"font-semibold w-full text-left"}>{value.name}</h1>

                    {(value.type === FeatureType.VALUE) ?
                      <p className="whitespace-nowrap overflow-ellipsis px-2 w-full text-left">{value.values?.map((featureValue: FeatureValue, i: number, array: FeatureValue[]) => {
                        return `${featureValue.name}, `;
                      })}</p>
                      : ""}
                    {(value.type === FeatureType.NUMBER) ?
                      <p className="whitespace-nowrap overflow-ellipsis px-2 w-full text-left">{`Min: ${value.minValue} - max: ${value.maxValue}`}</p>
                      : ""
                    }
                  </div>
                  <StatusButton buttonstatus={ButtonStatus.ERROR} onClick={() => { removeFromFeatureList(index) }} buttontype={"TRANSPARENT"} starticon={<FaTrashAlt />}></StatusButton>
                </div>
              ))
              }
              <div className={"w-full flex justify-center"}>
                <TransparentButton btntype={'SUCCESS'} starticon={<FiPlus />} onClick={() => { setModalIsOpen(true) }} >
                  Add Features
                </TransparentButton>
              </div>

              <TitleView titlestyle={1}>Variations {variations ? (variations.length !== 0 ? `(${variations.length} variations)` : "") : ""}</TitleView>
              <div className={"w-full justify-center flex flex-col gap-4"}>
                {
                  variations.map((value: InventoryItemWithFiles, index: number) => {
                    return (
                      <div key={index} className={"bg-primary-200 cursor-pointer w-full rounded-md p-2 duration-300 overflow-x-hidden flex flex-col gap-2"}>
                        <div className={"w-full"}>
                          <h1 className={"font-semibold w-full text-left"}>name</h1>
                          <p className="whitespace-nowrap overflow-ellipsis px-2 w-full text-left">{value.name ? value.name : "inherit"}</p>
                        </div>
                        <hr />
                        <div className={"w-full"}>
                          <h1 className={"font-semibold w-full text-left"}>About</h1>
                          <p className="whitespace-nowrap overflow-ellipsis px-2 w-full text-left">{value.about ? value.about : "inherit"}</p>
                        </div>
                        <hr />
                        <div className={"w-full"}>
                          <h1 className={"font-semibold w-full text-left"}>price</h1>
                          <p className="whitespace-nowrap overflow-ellipsis px-2 w-full text-left">{value.name ? value.name : "inherit"}</p>
                        </div>
                        <hr />
                        <div className={"w-full"}>
                          <h1 className={"font-semibold w-full text-left"}>main Image</h1>
                          {
                            value.imageFile ?
                              <div className={"flex gap-4 mt-2"}>
                                <div onClick={() => { }} className="w-32 bg-primary-200 hover:bg-primary-400 active:bg-primary-200 aspect-square rounded-lg flex items-center justify-center cursor-pointer border-8 transition ease-in-out border-primary-400 hover:border-primary-200 active:border-primary-400">
                                  <img src={URL.createObjectURL(value.imageFile)} alt={"inventory main"} className='w-full h-full object-cover object-center' />
                                </div>
                              </div>
                              :
                              <p className="whitespace-nowrap overflow-ellipsis px-2 w-full text-left">inherit</p>
                          }

                        </div>
                        <hr />
                        <div className={"w-full"}>
                          <h1 className={"font-semibold w-full text-left"}>Additional Media</h1>
                          {
                            (!value.mediaFiles || value.mediaFiles.length === 0) ?
                              <p className="whitespace-nowrap overflow-ellipsis px-2 w-full text-left">inherit</p>
                              :
                              (
                                <div className={"flex gap-4 flex-wrap mt-2"}>

                                  {value.mediaFiles.map((val: File, index: number) => {
                                    return (
                                      <div key={index} onClick={() => { }} className="w-32 bg-primary-200 hover:bg-primary-400 active:bg-primary-200 aspect-square rounded-lg flex items-center justify-center cursor-pointer border-8 transition ease-in-out border-primary-400 hover:border-primary-200 active:border-primary-400">
                                        <img src={URL.createObjectURL(val)} alt={"inventory main"} className='w-full h-full object-cover object-center' />
                                      </div>
                                    )
                                  })}
                                </div>
                              )

                          }

                        </div>
                        <div className={"w-full justify-end mt-4"}>
                          <TransparentButton btntype={"ERROR"} onClick={() => { removeVariation(index) }} starticon={<FaTrashAlt />}>Delete</TransparentButton>
                        </div>
                      </div>
                    );
                  })
                }

                <div className={"w-full flex justify-center"}>
                  <TransparentButton btntype={'SUCCESS'} starticon={<FiPlus />} onClick={() => { setAddVariationModalIsOpen(true) }} >
                    Add Variation
                  </TransparentButton>
                </div>
              </div>
              <hr className={"w-full border-primary-400"} />
              <div className={"flex gap-4 w-full justify-end"}>
                <Button onClick={(ev: any) => { saveInventory() }}>
                  Save And Live
                </Button>
                {/* <StatusButton starticon={<FiUploadCloud />} status={inventoryStatus} onClick={() => { saveInventory() }} >Save</StatusButton> */}
                {/* <Button btntype={ButtonType.TYPE3} onClick={(ev: any) => { modalState.show() }}>
                Save And Live
              </Button> */}
              </div>
            </div>
          </form>
        </div>

        <SelectFeatureModal selectedInventoryFeatures={[selectedInventoryFeatures, setSelectedInventoryFeatures]} openState={[modalIsOpen, setModalIsOpen]} />
        <RegisterVariationModal inventoryVariations={[variations, setVariations]} selectedInventoryFeatures={selectedInventoryFeatures} openState={[addVariationModalIsOpen, setAddVariationModalIsOpen]} />
        <NotificationModal progressStepMonitor={progressStepMonitor} title={"Inventory Registration"} />
      </div>
    </Page>
  );
};

export default RegisterInventoryPage;