import { Dialog } from "@headlessui/react";
import { FC } from "react"
import { FaThumbsUp } from "react-icons/fa";
import { TransparentButton } from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import { InventoryFeature } from "../../../Models/Inventory/InventoryFeature";
import { InventoryItemWithFiles } from "../../../Models/Inventory/InventoryItem";
import RegisterVariation from "./RegisterVariation";

interface SelectFeatureModalViewProps {
    openState: any[];
    selectedInventoryFeatures: InventoryFeature[];
    inventoryVariations: [InventoryItemWithFiles[], React.Dispatch<React.SetStateAction<InventoryItemWithFiles[]>>
    ];
}
const RegisterVariationModal: FC<SelectFeatureModalViewProps> = (props) => {
    const setSelectedInventoryVariationMain = (val: InventoryItemWithFiles) => {
        if (props.inventoryVariations) {
            let sFeature = props.inventoryVariations[0].map((value: InventoryItemWithFiles, index: number) => {
                return value;
            });
            if (val) {
                sFeature.push(val);
                props.inventoryVariations[1](sFeature);
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
                <button type="button"
                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                    data-bs-dismiss="modal" aria-label="Close"></button>
            </Dialog.Title>

            {/* MODAL BODY */}
            <div className={"h-full overflow-y-auto customScrollBar mb-4"}>
                <RegisterVariation add={(_variation: InventoryItemWithFiles) => {
                    let _var = props.inventoryVariations[0].map((value: InventoryItemWithFiles, index: number) => {
                        return value;
                    })
                    _var.push(_variation);
                    setSelectedInventoryVariationMain(_variation);
                }} features={props.selectedInventoryFeatures ? props.selectedInventoryFeatures : []
                } />
            </div>

            {/*MODAL FOOTER */}
            <div
                className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md gap-4">
                <TransparentButton btntype={"ERROR"} onClick={closeModal}>
                    Close
                </TransparentButton>
                <TransparentButton btntype={"SUCCESS"} onClick={closeModal} starticon={<FaThumbsUp />}>
                    Done
                </TransparentButton>
            </div>
        </Modal>

    )
}
export default RegisterVariationModal;
