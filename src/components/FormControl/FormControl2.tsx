import { Listbox, Switch, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import { FaCaretDown, FaCheck, FaExclamation, FaSpinner } from "react-icons/fa";

enum FieldState {
    DEFAULT = 1, WARNING = 2, VALID = 3, INVALID = 4, PROCESSING = 5
}
const FormControl2: FC<{
    children?: any;
    classNames?: any;
    inline?: boolean;
    label?: string | Element;
    state: {
        message?: [string, React.Dispatch<React.SetStateAction<string>>],
        // value: [string, React.Dispatch<React.SetStateAction<string>>],
        fieldState: [FieldState, React.Dispatch<React.SetStateAction<FieldState>>]
    }
}> = (props) => {
    return (
        <div className={`w-full flex justify-start items-start text-secondary-500 ${props.state.fieldState[0] === FieldState.INVALID ? "text-red-500 " : ""} ${props.state.fieldState[0] === FieldState.WARNING || props.state.fieldState[0] === FieldState.PROCESSING ? "text-amber-500 " : ""} ${props.state.fieldState[0] === FieldState.VALID ? "text-green-500 " : ""}`}>
            <div className={`w-full ${props.inline ? "flex-row flex items-baseline gap-2" : "flex-col"}`}>
                {props.label ? <FormLabel2 stateTracker={props.state.fieldState[0]}>{props.label}</FormLabel2> : ""}
                {props.children}
                {props.state.message ? <FormError2 fieldState={props.state.fieldState[0]}>{props.state.message[0]}</FormError2> : ""}
            </div>
        </div>
    )
}

const FormLabel2: FC<{ children?: any; stateTracker?: FieldState; }> = (props) => (
    <div className="flex items-center gap-2 whitespace-nowrap">
        <label className="form-label inline-block mb-1 font-normal capitalize">
            {props.children}
        </label>
        {
            props.stateTracker ?
                <span className={"duration-1000 transition-all ease-in-out"}>
                    {props.stateTracker === FieldState.PROCESSING ? <FaSpinner className='duration-500 animate-spin ease-in-out text-amber-500' /> : ""}
                    {props.stateTracker === FieldState.VALID ? <FaCheck className='text-green-500' /> : ""}
                    {props.stateTracker === FieldState.INVALID ? <FaExclamation className='text-red-500 rotate-[22deg]' /> : ""}
                </span>
                :
                ""
        }
    </div>
);
interface FormInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    placeholder?: string;
    state: {
        value: [string, React.Dispatch<React.SetStateAction<string>>],
        fieldState: [FieldState, React.Dispatch<React.SetStateAction<FieldState>>],
        verifier: (newValue: string, event: React.ChangeEvent<HTMLInputElement>) => boolean
    }
}
const FormInput2: FC<FormInputProps> = (props) => {
    return (
        <input type={props.type ? props.type : "text"}
            className={`w-full px-3 py-2 text-base font-normal text-gray-600 bg-transparent focus:shadow-md active:shadow-md shadow-secondary-300 duration-300 bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:outline-none focus:text-gray-700 focus:bg-white placeholder:text-secondary-300 border-secondary-200 focus:border-secondary-500 ${props.state.fieldState[0] === FieldState.INVALID ? "border-red-200 focus:border-red-500 shadow-red-300 text-red-600 focus:text-red-700 focus:bg-red-50 bg-red-50 placeholder:text-red-300 " : ""} ${props.state.fieldState[0] === FieldState.WARNING || props.state.fieldState[0] === FieldState.PROCESSING ? "border-amber-200 focus:border-amber-500 shadow-amber-300 text-amber-600 focus:text-amber-700 focus:bg-amber-100 bg-amber-50 placeholder:text-amber-300 " : ""} ${props.state.fieldState[0] === FieldState.VALID ? "border-green-200 focus:border-green-500 shadow-green-300 text-green-600 focus:text-green-700 focus:bg-green-100 bg-green-50 placeholder:text-green-300 " : ""}`}
            placeholder={props.placeholder}
            required={props.required}
            value={props.value}
            checked={props.checked}
            width={props.width}
            height={props.height}
            name={props.name}
            id={props.id}
            defaultValue={props.defaultValue}
            disabled={props.disabled}
            onBlur={props.onBlur}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                if (props.state) props.state.value[1](ev.currentTarget.value);
                if (props.state.verifier) props.state.verifier(ev.currentTarget.value, ev);
                if (props.onChange) props.onChange(ev);
            }} />
    )
};

interface FormChechBoxInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    placeholder?: string;
    state: {
        value: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
        fieldState: [FieldState, React.Dispatch<React.SetStateAction<FieldState>>]
    }
}
const FormCheck: FC<FormChechBoxInputProps> = (props) => {
    return (
        <input type={"checkbox"}
            className={"w-fit px-3 py-2 text-base font-normal text-white bg-transparent focus:shadow-md active:shadow-md cursor-pointer shadow-secondary-300 duration-300 bg-clip-padding border border-solid placeholder:text-secondary-200 border-secondary-200 rounded transition ease-in-out m-0 focus:text-white focus:bg-white focus:border-secondary-500 focus:outline-none"}
            placeholder={props.placeholder}
            required={props.required}
            value={props.value}
            checked={props.checked}
            width={props.width}
            height={props.height}
            defaultValue={props.defaultValue}
            disabled={props.disabled}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                props.state.value[1](ev.currentTarget.checked)
                if (props.onChange) props.onChange(ev);

            }} />
    )
};

interface FormSelectProps {
    state: {
        value: [{ id?: string | number; value?: string | number; inActive?: boolean; }, React.Dispatch<React.SetStateAction<{ id?: string | number; value?: string | number; inActive?: boolean; }>>],
        fieldState?: [FieldState, React.Dispatch<React.SetStateAction<FieldState>>],
        verifier?: (newValue: string) => boolean
        options?: {
            id?: string | number;
            value?: string | number;
            inActive?: boolean;
        }[],
        onChange?: (value: { id?: string | number; value?: string | number; inActive?: boolean; }) => void
    },
}
const FormSelect: FC<FormSelectProps> = (props) => {
    return (
        <div className="">
            <Listbox value={props.state.value[0]} onChange={(value: { id?: string | number | undefined; value?: string | number | undefined; inActive?: boolean | undefined; }) => {
                props.state.value[1](value as any);
                if (props.state.onChange) {
                    props.state.onChange(value);
                }
            }}>
                <div className="relative h-full">
                    <Listbox.Button className={`form-select appearance-none block w-full px-3 py-2 text-base font-normal text-secondary-500 bg-transparent bg-clip-padding bg-no-repeat border border-solid border-secondary-200 rounded transition ease-in-out duration-300 m-0 focus:text-secondary-600 focus:bg-white focus:border-secondary-600 focus:outline-none disabled:cursor-not-allowed ${props.state.fieldState && (props.state.fieldState[0] === FieldState.INVALID) ? "border-red-200 focus:border-red-500 shadow-red-300 text-red-600 focus:text-red-700 focus:bg-red-50 bg-red-50 placeholder:text-red-300 " : ""} ${props.state.fieldState && (props.state.fieldState[0] === FieldState.WARNING || props.state.fieldState[0] === FieldState.PROCESSING ) ? "border-amber-200 focus:border-amber-500 shadow-amber-300 text-amber-600 focus:text-amber-700 focus:bg-amber-100 bg-amber-50 placeholder:text-amber-300 " : ""} ${props.state.fieldState && (props.state.fieldState[0] === FieldState.VALID) ? "border-green-200 focus:border-green-500 shadow-green-300 text-green-600 focus:text-green-700 focus:bg-green-100 bg-green-50 placeholder:text-green-300 " : ""}`}>
                        <span className="block truncate text-left">{props.state.value[0] ? props.state.value[0].value : ""}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <FaCaretDown
                                className="h-5 w-5 text-secondary-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 duration-300 ease-in-out text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm customScrollBar z-10">
                            {props.state.options?.map((option, index) => (
                                <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 duration-300 ${active ? 'bg-secondary-200 text-secondary-500' : 'text-secondary-500'
                                        }`
                                    }
                                    value={option}
                                >
                                    {({ selected, active, disabled }) => (
                                        <>
                                            <span className={`block truncate text-left duration-300 ${selected ? 'font-medium' : 'font-normal'}`}
                                            >
                                                {option.value}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary-600 duration-300">
                                                    <FaCheck className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )

}
interface FormSwitchProps {
    disabled?: boolean;
    state: {
        value: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
        fieldState: [FieldState, React.Dispatch<React.SetStateAction<FieldState>>],
        verifier: (newValue: boolean) => boolean
    }
}
const FormSwitch: FC<FormSwitchProps> = (props) => {
    const onChange = (checked: boolean) => {
        props.state.value[1](checked)
        props.state.verifier(checked)
    }
    return (
        <Switch
            checked={props.state.value[0]}
            disabled={props.disabled ? props.disabled : false}
            onChange={onChange}
            className={`${props.state.value[0] ? 'bg-secondary-500 hover:hover:bg-secondary-600 ' : 'bg-secondary-300 hover:bg-secondary-400'} relative inline-flex h-[15px] w-[31px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
            {/* ${props.state.value[0] && (props.state.fieldState[0] === FieldState.INVALID) ? 'bg-red-500 hover:hover:bg-red-600' : 'bg-red-300 hover:bg-red-400'}
            ${props.state.value[0] && (props.state.fieldState[0] === FieldState.WARNING) ? 'bg-amber-500 hover:hover:bg-amber-600' : 'bg-amber-300 hover:bg-amber-400'}
            ${props.state.value[0] && (props.state.fieldState[0] === FieldState.VALID) ? 'bg-green-500 hover:hover:bg-green-600' : 'bg-green-300 hover:bg-green-400'} */}
            {/* <span className="sr-only">Use setting</span> */}
            <span
                aria-hidden="true"
                className={`${props.state.value[0] ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-[11px] w-[11px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
        </Switch>
    )
}

const FormError2: FC<{ children?: any; fieldState?: FieldState; }> = (props) => {
    return (
        <small className={`w-full flex bg-transparent pl-2 ${props.fieldState === FieldState.INVALID ? "text-red-500 " : ""} ${props.fieldState === FieldState.WARNING ? "text-amber-500 " : ""} ${props.fieldState === FieldState.VALID ? "text-green-500 " : ""}`}>{props.children}</small>
    )
}

export { FormLabel2, FormInput2, FormCheck, FormError2, FormSelect, FormSwitch, FieldState };
export default FormControl2;