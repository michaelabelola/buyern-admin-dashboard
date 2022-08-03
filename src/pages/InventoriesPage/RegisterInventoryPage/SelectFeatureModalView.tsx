import { Dialog } from "@headlessui/react";
import { FC, useState } from "react"
import { FaThumbsUp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { TransparentButton } from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import TabMenu, { TabContent } from "../../../components/TabMenu/TabMenu";
import InventoryFeatureController from "../../../Controllers/InventoryControllers/InventoryFeatureController";
// import RegisterInventoryFeature from "../../../components/RegisterInventoryFeature";
// import { TabMenu } from "../../../components/TabMenu";
import { FeatureType, FeatureValue, InventoryFeature } from "../../../Models/Inventory/InventoryFeature";
import RegisterInventoryFeature from "./RegisterInventoryFeature";

interface SelectFeatureModalViewProps {
    openState: any[];
    selectedInventoryFeatures?: any[];
}
const SelectFeatureModal: FC<SelectFeatureModalViewProps> = (props) => {
    const [activeTab, setActiveTab] = useState(1);
    const { entityId } = useParams();
    const [inventoryFeatures, setInventoryFeatures] = useState([] as InventoryFeature[]);
    const onMenuChange = (activeId: number) => {
        setActiveTab(activeId);
        switch (activeId) {
            case 0:
                InventoryFeatureController(entityId).fetchAll().then((value: InventoryFeature[]) => {
                    if (value)
                        setInventoryFeatures(value);
                    else
                        setInventoryFeatures([]);
                })
                    .catch((reason: any) => {
                        console.log(reason);

                    })
                break;
            case 1:
                break;
            default:
                break;
        }
    }
    const setSelectedInventoryFeaturesMain = (val: InventoryFeature) => {
        if (props.selectedInventoryFeatures) {
            let sFeature = props.selectedInventoryFeatures[0].map((value: InventoryFeature, index: number, array: InventoryFeature[]) => {
                return value;
            });
            if (val) {
                sFeature.push(val);
                props.selectedInventoryFeatures[1](sFeature);
            }
        }
    }
    const closeModal = () => {
        props.openState[1](false);
    }
    return (
        <Modal size={"lg"} disableFixedHeight openState={props.openState}>
            <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 w-full flex justify-center"
            >
                <TabMenu dark tabs={[
                    { title: "Select Feature" },
                    { title: "New Feature" }
                ]} fullWidth
                    onMenuChange={onMenuChange}>
                </TabMenu>
                <button type="button"
                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                    data-bs-dismiss="modal" aria-label="Close"></button>
            </Dialog.Title>
            <div className={"h-full overflow-y-auto customScrollBar mb-4"}>
                <TabContent activeTabId={activeTab}>
                    <div className={"w-full mt-2 flex flex-col gap-2"}>
                        {inventoryFeatures.map((value: InventoryFeature, index: number, array: InventoryFeature[]) => (
                            <div key={index} onClick={() => {
                                setSelectedInventoryFeaturesMain(value);
                            }} className={"bg-transparent hover:bg-secondary-200 cursor-pointer w-full rounded-md p-2 duration-300 overflow-x-hidden"}>
                                <h1 className={"font-semibold"}>{value.name}</h1>

                                {(value.type === FeatureType.VALUE) ?
                                    <p className="whitespace-nowrap overflow-ellipsis px-2 w-full">{value.values?.map((featureValue: FeatureValue, i: number, array: FeatureValue[]) => {
                                        return `${featureValue.name}, `;
                                    })}</p>
                                    : ""}
                                {(value.type === FeatureType.NUMBER) ?
                                    <p className="whitespace-nowrap overflow-ellipsis px-2 w-full">{`Min: ${value.minValue} - max: ${value.maxValue}`}</p>
                                    : ""
                                }

                            </div>
                        ))
                        }
                    </div>

                    <RegisterInventoryFeature />
                </TabContent>
            </div>

            <TabContent activeTabId={activeTab}>
                <div
                    className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md gap-4">
                    <TransparentButton btntype={"ERROR"} onClick={closeModal}>
                        Close
                    </TransparentButton>
                    <TransparentButton btntype={"SUCCESS"} onClick={closeModal} starticon={<FaThumbsUp />}>
                        Done
                    </TransparentButton>
                </div>
                <div
                    className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md gap-4">
                    <TransparentButton btntype={"ERROR"} onClick={closeModal}>
                        Close
                    </TransparentButton>
                    {/* <TransparentButton btntype={"SUCCESS"} onClick={closeModal} starticon={<FaCloudUploadAlt />}>
                        Save Feature
                    </TransparentButton> */}
                </div>
            </TabContent>
        </Modal>

    )
}
export default SelectFeatureModal;
