import { Switch } from "@headlessui/react";
import { FC, useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { ButtonStatus, DangerButton, StatusButton, SuccessButton } from "../../../components/Button/Button";
import FormControl, { FormError, FormInput, FormLabel, FormSelect } from "../../../components/FormControl/FormControl";
import InventoryFeatureController from "../../../Controllers/InventoryControllers/InventoryFeatureController";
import { FeatureType, FeatureValue, InventoryFeature } from "../../../Models/Inventory/InventoryFeature";

interface RegisterInventoryFeatureProps {
}

const RegisterInventoryFeature: FC<RegisterInventoryFeatureProps> = (props) => {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [valuesError, setValuesError] = useState("");
    const [selectedInventoryCategoryId, setSelectedInventoryCategoryId] = useState(FeatureType.VALUE);
    const [values, setValues] = useState([] as any as FeatureValue[]);
    const [minValue, setMinValue] = useState(0);
    const [minValueError, setMinValueError] = useState("");
    const [maxValue, setMaxValue] = useState(0);
    const [maxValueError, setMaxValueError] = useState("");
    const { entityId } = useParams();
    const [featureStatus, setFeatureStatus] = useState(ButtonStatus.IDLE);
    const setValuesMain = (vals: FeatureValue[]) => {
        setValues(vals);
        inputVerifier.values(vals);
    }
    const inputVerifier = {
        name: (name: string) => {
            if (!name || name === "") {
                setNameError("name Cant be empty")
                return false;
            }
            setNameError("")
            return true;
        },
        values: (values: FeatureValue[]) => {
            if (!values || values.length <= 0) {
                setValuesError("no value has been added to the values list");
                return false;
            }
            setValuesError("");
            return true;
        },
        minValues: (value: number) => {
            if (!value || value < 0) {
                setMinValueError("value cannot be less than 0");
                return false;
            }
            setMinValueError("");
            return true;
        },
        maxValues: (value: number) => {
            if (!value) {
                setMaxValueError("max value cant be empty");
                return false;
            } else if (value < minValue) {
                setMaxValueError("max value cant be less than min value");
                return false;
            }
            setMaxValueError("");
            return true;
        },
        all: () => {
            if (inputVerifier.name(name)) {
                if (selectedInventoryCategoryId === FeatureType.VALUE && inputVerifier.values(values)) {
                    return true;
                } else if (selectedInventoryCategoryId === FeatureType.NUMBER && inputVerifier.minValues(minValue) && inputVerifier.maxValues(maxValue)) {
                    return true;
                }
            } else return false;
        }
    };

    const saveFeature = () => {
        if (!inputVerifier.all()) {
            return;
        }
        InventoryFeatureController(entityId).save({
            name: name,
            type: selectedInventoryCategoryId,
            values: values,
            minValue: minValue,
            maxValue: maxValue
        }, [featureStatus, setFeatureStatus]).then((value: InventoryFeature) => {
            console.log(value);
        })
            .catch((reason: any) => {
                console.log(reason);
            })
    }

    return (
        <form className={"flex flex-col gap-2 mt-4 px-8"}>
            <FormControl label={<FormLabel>Name</FormLabel>}>

                <FormInput placeholder="Name eg. Color, Screen size, Ram size, HDD size, etc" value={name} setter={(value: any) => {
                    setName(value);
                    inputVerifier.name(value);
                }} required />

                {nameError ? <FormError>{nameError}</FormError> : ""}
            </FormControl>
            <div className="flex flex-col gap-2">
                <FormControl label={<FormLabel>Type</FormLabel>}>
                    {/* <Switch checked className={"aaa"} /> */}
                    <FormSelect setter={setSelectedInventoryCategoryId} options={[{ id: FeatureType.VALUE, value: "value" }, { id: FeatureType.NUMBER, value: "number" }]} />
                </FormControl>
                {
                    (selectedInventoryCategoryId === FeatureType.VALUE) ?
                        <span>
                            <RegisterValues setter={setValuesMain} currentValues={values} />
                            {valuesError ? <FormError>{valuesError}</FormError> : ""}
                        </span>
                        :
                        <div className={"flex gap-2"}>
                            <FormControl>
                                <FormLabel> Min value</FormLabel>
                                <FormInput placeholder={"min value"} type={"number"} setter={setMinValue} value={minValue} required />
                                {minValueError ? <FormError>{minValueError}</FormError> : ""}
                            </FormControl>
                            <FormControl>
                                <FormLabel>Max value</FormLabel>
                                <FormInput placeholder={"max value"} type={"number"} setter={setMaxValue} value={maxValue} required />
                                {maxValueError ? <FormError>{maxValueError}</FormError> : ""}
                            </FormControl>
                        </div>
                }

            </div>
            <div className={"mt-2 w-full flex justify-end"}>
                <StatusButton buttonstatus={ButtonStatus.IDLE} starticon={<FiUploadCloud />} onClick={() => { saveFeature() }}>Save Feature</StatusButton>
            </div>
        </form>
    )
}

interface RegisterValuesProps {
    currentValues: FeatureValue[];
    setter: Function;
}
const RegisterValues: FC<RegisterValuesProps> = (props) => {
    const [currentValue, setCurrentValue] = useState({} as any as FeatureValue);
    const [nameError, setNameError] = useState("");
    const [rawValueError, setRawValueError] = useState("");
    const addValues = () => {
        if (!verify.all()) { return; }
        var vals = props.currentValues.map((value: FeatureValue, index: number, array: FeatureValue[]) => (value));
        vals.push(currentValue);
        props.setter(vals);
    }
    const setVal = (val: string) => {
        setCurrentValue({
            name: val,
            rawValue: currentValue.rawValue
        });
        verify.name(val);
    }
    const setRawVal = (val: string) => {
        setCurrentValue({
            name: currentValue.name,
            rawValue: val
        });
        verify.rawValue(val);
    }
    const verify = {
        name: (value: string) => {
            if (value === undefined || value.trim() === "") {
                setNameError("value cant be empty");
                return false;
            }
            setNameError(undefined as any);
            return true;
        },
        rawValue: (value: string) => {
            if (value === undefined || value.trim() === "") {
                setRawValueError("raw value cant be empty");
                return false;
            }
            setRawValueError(undefined as any);
            return true;
        },
        all: () => {
            if (verify.name(currentValue.name) && verify.rawValue(currentValue.rawValue)) {
                return true;
            } return false;
        }
    }
    const removeFromList = (index: number) => {
        var vals = props.currentValues.map((value: FeatureValue, index: number, array: FeatureValue[]) => (value));
        vals.splice(index, 1);
        props.setter(vals);
    }
    return (
        <div className={"mt-0"}>
            <FormLabel>Values</FormLabel>
            <div className="flex flex-col gap-2">
                {props.currentValues.map((value: FeatureValue, index: number) => {
                    return <div className={"w-full flex items-stretch gap-4"} key={index}>
                        <div className={"bg-primary-600 text-primary-200 cursor-pointer w-full rounded-md p-2 duration-300"}>
                            <h1 className={"font-bold"}>{value.name}</h1>
                            <p>{value.rawValue}</p>
                        </div>

                        <DangerButton buttontype={"TRANSPARENT"} onClick={() => {
                            removeFromList(index);
                        }}><FaTrash /></DangerButton>
                    </div>;
                })}

            </div>
            <div className={"border-[1px] border-secondary-300 m-4 rounded-md mt-2 p-4 flex flex-col gap-2"}>
                <FormControl label={<FormLabel>Value</FormLabel>}>
                    <FormInput placeholder={"Name eg. red, green, pink, indigo, orange, etc"} setter={setVal} />
                    {nameError ? <FormError>{nameError}</FormError> : ""}
                </FormControl>
                <FormControl label={<FormLabel>Raw Value</FormLabel>}>

                    <FormInput placeholder="eg. #ffffff, #erg87e, #rw443d, #000000, #f2654f, etc" setter={setRawVal} />
                    {rawValueError ? <FormError>{rawValueError}</FormError> : ""}
                </FormControl>
                <div className={"w-full flex justify-center pt-4"}><SuccessButton buttontype="SOLID" starticon={<FaPlus />} onClick={() => { addValues() }} >Add Value</SuccessButton></div>
            </div>
        </div>
    )
}


export default RegisterInventoryFeature;