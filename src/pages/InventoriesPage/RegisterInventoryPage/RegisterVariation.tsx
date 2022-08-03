import { FC, useEffect, useState } from "react";
import { FiPlus, FiSave } from "react-icons/fi";
import { SuccessButton, TransparentButton } from "../../../components/Button/Button";
import FormControl, { FormError, FormImage, FormInput, FormLabel, FormNumberInput, FormSelect, FormTextArea, TitleView } from "../../../components/FormControl/FormControl";
import CheckBox from "../../../components/FormControl/ToggleButton";
import { FeatureType, FeatureValue, InventoryFeature, InventoryItemFeature } from "../../../Models/Inventory/InventoryFeature";
import { InventoryItemWithFiles } from "../../../Models/Inventory/InventoryItem";

interface RegisterVariationProps {
    add: (iV: InventoryItemWithFiles) => void;
    features?: InventoryFeature[];
}
const RegisterVariation: FC<RegisterVariationProps> = (props) => {
    const [name, setName] = useState("");
    const [inheritName, setInheritName] = useState(true);
    const [inheritAbout, setInheritAbout] = useState(true);
    const [inheritPrice, setInheritPrice] = useState(true);
    const [qty, setQty] = useState(0);
    const [inheritMainImage, setInheritMainImage] = useState(true);
    const [inheritMainMedia, setInheritMedia] = useState(true);
    const [nameError, setNameError] = useState("");
    const [about, setAbout] = useState("");
    const [aboutError, setAboutError] = useState("");
    const [price, setPrice] = useState(0.00);
    const [priceError, setPriceError] = useState("");
    const [selectedImage, setSelectedimage] = useState(undefined as any as File)
    const [imageError, setImageError] = useState("");
    const [selectedMedia, setSelectedMedia] = useState([] as any as File[])
    const [selectedFeatures, setSelectedFeatures] = useState([] as any as InventoryItemFeature[]);
    const [features, setFeatures] = useState([] as any as InventoryFeature[]);
    useEffect(() => {
        if (props.features) {
            setFeatures(props.features);
        };

        return () => {
        }
    }, [props.features])
    const selectFeature = (featureArrayIndexNumber: number, featureValueId: string) => {
        if (features[featureArrayIndexNumber].values?.length === undefined) {
            return;
        }
        if (!features[featureArrayIndexNumber].values) {
            return;
        }
        let selectedFeatureValue: FeatureValue = {} as any;
        features[featureArrayIndexNumber].values?.forEach((value: FeatureValue, index: number) => {
            if (value.id === featureValueId) {
                selectedFeatureValue = value;
            }
        })
        let inventoryItemFeature: InventoryItemFeature = {
            ...features[featureArrayIndexNumber],
            value: selectedFeatureValue
        };
        // @ts-ignore
        delete inventoryItemFeature["values" as unknown];
        if (!selectedFeatures || selectedFeatures.length === 0) {
            setSelectedFeatures([...selectedFeatures, inventoryItemFeature]);
            return;
        }
        // let sFeatures: InventoryItemFeature[] = [...selectedFeatures];
        let added: boolean = false;
        selectedFeatures.forEach((value: InventoryItemFeature, index: number, array: InventoryItemFeature[]) => {
            if (value.id === inventoryItemFeature.id) {
                array[index] = inventoryItemFeature;
                console.log("b");
                setSelectedFeatures(array);
                added = true;
                return;
            }
        })
        if (!added) {
            setSelectedFeatures([...selectedFeatures, inventoryItemFeature]);
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

    const inputVerifier = {
        name: (name: string) => {
            if (!name || name === "") {
                //error: name cant be empty
                setNameError("name Cant be empty")
                return false;
            }
            setNameError("")
            return true;
        },
        about: (about: string) => {
            if (!about || about === "") {
                // cant be null
                setAboutError("about Cant be empty")
                return false;
            }
            setAboutError("")
            return true;
        },
        price: (value: number) => {
            if (!value) {
                //error: name cant be empty
                setPriceError("Price cant be empty")
                return false;
            }
            setPriceError("")
            return true;
        },
        image: (image: File) => {
            if (!image) {
                // cant be null
                setImageError("image Cant be empty")
                return false;
            }
            setImageError("")
            return true;
        },
        all: () => {
            if (inputVerifier.name(name) && inputVerifier.about(about) && inputVerifier.image(selectedImage)) return true; else return false;
        }

    }
    const saveVariation = () => {
        let variation: InventoryItemWithFiles = {
            name: !inheritName?name:undefined,
            about: !inheritAbout ? about:undefined,
            addedBy: 16,
            qty: qty,
            price: !inheritPrice ? price:undefined,
            features: selectedFeatures,
            imageFile: selectedImage,
            mediaFiles: selectedMedia
        }
        console.log(variation);

        if (props.add) props.add(variation);
        // InventoryWithFiles
    }
    return <div className="flex w-full justify-center">
        <form className="flex w-full sm:w-full md:w-full lg:w-10/12 xl:w-9/12 justify-center">
            <div className="mb-3 w-full flex flex-col gap-4 justify-center items-baseline">
                <TitleView titlestyle={2}>Details</TitleView>
                <FormControl label={<FormLabel>
                    <div className="flex gap-4 content-center">
                        Name
                        <div className="w-fit">
                            <CheckBox selectedState={[inheritName, setInheritName]} customsize={"sm"} type={"checkbox"} required />
                        </div>
                    </div>
                </FormLabel>}>
                    {
                        !inheritName ?
                            <FormInput placeholder="Name" value={name} setter={(value: any) => {
                                setName(value);
                                inputVerifier.name(value);
                            }} required />
                            : ""
                    }

                    {nameError ? <FormError>{nameError}</FormError> : ""}
                </FormControl>
                <FormControl label={
                    <FormLabel>
                        <div className="flex gap-4 content-center">
                            About
                            <div className="w-fit">
                                <CheckBox selectedState={[inheritAbout, setInheritAbout]} customsize={"sm"} type={"checkbox"} required />
                            </div>
                        </div>
                    </FormLabel>
                }>
                    {
                        !inheritAbout ?
                            <FormTextArea placeholder="About Variation" value={about} setter={(value: any) => {
                                setAbout(value);
                                inputVerifier.about(value);
                            }} required />
                            : ""
                    }

                    {aboutError ? <FormError>{aboutError}</FormError> : ""}
                </FormControl>
                <FormControl label={
                    <FormLabel>
                        <div className="flex gap-4 content-center">
                            Quantity
                        </div>
                    </FormLabel>
                }>
                    <FormNumberInput placeholder="Quantity" type={"number"} defaultValue={qty} setter={(value: any) => {
                        setQty(value);
                    }} required />
                    {priceError ? <FormError>{priceError}</FormError> : ""}
                </FormControl>

                <FormControl label={
                    <FormLabel>
                        <div className="flex gap-4 content-center">
                            Price
                            <div className="w-fit">
                                <CheckBox selectedState={[inheritPrice, setInheritPrice]} customsize={"sm"} type={"checkbox"} required />
                            </div>
                        </div>
                    </FormLabel>
                }>
                    {
                        !inheritPrice ?
                            <FormNumberInput placeholder="Price" type={"number"} defaultValue={price} setter={(value: number) => {
                                setPrice(value);
                                inputVerifier.price(value);
                            }} required />
                            : ""
                    }

                    {priceError ? <FormError>{priceError}</FormError> : ""}
                </FormControl>
                <TitleView titlestyle={2}>Media</TitleView>
                <FormControl label={
                    <FormLabel>
                        <div className="flex gap-4 content-center">
                            Main Image
                            <div className="w-fit">
                                <CheckBox selectedState={[inheritMainImage, setInheritMainImage]} customsize={"sm"} type={"checkbox"} required />
                            </div>
                        </div>
                    </FormLabel>
                }>
                    {
                        !inheritMainImage ?
                            <FormImage val={selectedImage} setter={
                                (file: File, position: number) => { setSelectedimage(file); inputVerifier.image(file); }
                            } />
                            : ""
                    }

                    {imageError ? <FormError>{imageError}</FormError> : ""}
                </FormControl>

                <FormControl label={
                    <FormLabel>
                        <div className="flex gap-4 content-center">
                            Additional Images / Media
                            <div className="w-fit">
                                <CheckBox selectedState={[inheritMainMedia, setInheritMedia]} customsize={"sm"} type={"checkbox"} required />
                            </div>
                        </div>
                    </FormLabel>
                }>
                    {
                        !inheritMainMedia ?
                            <span>
                                <div className={"flex overflow-x-hidden gap-4 flex-wrap content-around justify-evenly min-h-[8rem]"}>
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
                            </span>
                            : ""
                    }
                </FormControl>

                <TitleView titlestyle={2}>Features</TitleView>
                {
                    features.map((_feature: InventoryFeature, index: number) => {
                        if (_feature.type === FeatureType.VALUE) {
                            return <FormControl key={index}>
                                <FormLabel>{_feature.name}</FormLabel>
                                <FormSelect setter={(featureValueId: string) => {
                                    selectFeature(index, featureValueId)
                                }} options={_feature.values?.map((value: FeatureValue, index: number) => ({ id: value.id ? value.id : 0, value: value.name }))} />
                            </FormControl>
                        } else {
                            return (
                                <div key={index}>
                                    <FormLabel>{_feature.name}</FormLabel>
                                    <div className={"flex gap-4 w-full"}>
                                        <FormControl label={
                                            <FormLabel>
                                                <div className="flex gap-4 content-center">
                                                    About
                                                    <div className="w-fit">
                                                        <CheckBox selectedState={[inheritAbout, setInheritAbout]} customsize={"sm"} type={"checkbox"} required />
                                                    </div>
                                                </div>
                                            </FormLabel>
                                        }>
                                            <FormLabel>min value</FormLabel>
                                            <FormInput type={"number"} placeholder={"min value"} value={name} />
                                        </FormControl>
                                        <FormControl label={
                                            <FormLabel>
                                                <div className="flex gap-4 content-center">
                                                    About
                                                    <div className="w-fit">
                                                        <CheckBox selectedState={[inheritAbout, setInheritAbout]} customsize={"sm"} type={"checkbox"} required />
                                                    </div>
                                                </div>
                                            </FormLabel>
                                        }>
                                            <FormLabel>max value</FormLabel>
                                            <FormInput type={"number"} placeholder={"max value"} value={name} />
                                        </FormControl>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
                {/* <FormControl>
                    <FormLabel children={"Select Category"} />
                    <FormSelect options={features.map((category: InventoryCategory, index: number, array: InventoryCategory[]) => {
                        return (
                            { id: category.id, value: category.name }
                        )
                    })} />
                </FormControl> */}
                {/* <div className={"w-full justify-center"}>
                    <Button btntype={ButtonType.SUCCESS} onClick={() => { addFeatureModalState.show() }} >
                        Add Feature
                    </Button>
                </div> */}
                <div className={"w-full justfy-end"}><SuccessButton starticon={<FiSave />} onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    saveVariation();
                }}> Save</SuccessButton></div>
            </div>
        </form>
    </div>
}
export default RegisterVariation;