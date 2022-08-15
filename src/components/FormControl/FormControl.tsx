import React, { FC, ReactElement, ReactNode, useRef, useState } from 'react';
import { FaCheck, FaImage, FaPlus, FaSpinner } from 'react-icons/fa';
import { RequestStatus } from '../../Controllers/ObjectRequestHandler';
enum FieldState {
  DEFAULT, LOADING, SUCESSFUL
}
const FormControl: FC<{
  children?: any;
  /**
   * either fieldState or stateTracker should be set be set, not both.
   * if both are set, stateTracker is used
   */
  fieldState?: FieldState;
  stateTracker?: [RequestStatus, React.Dispatch<React.SetStateAction<RequestStatus>>];
  label?: ReactElement;
}> = (props) => {
  const [fieldState] = useState(props.fieldState);

  return (
    <div className={"w-full flex flex-col justify-start items-start"}>
      <div className="w-full flex flex-col items-baseline">
        <div className="flex items-center gap-2">{props.label}
          {
            props.stateTracker ?
              <span className={"duration-1000 transition-all ease-in-out"}>
                {props.stateTracker[0] === RequestStatus.PROCESSING ? <FaSpinner className='duration-500 animate-spin ease-in-out text-amber-500' /> : ""}
                {props.stateTracker[0] === RequestStatus.SUCCESSFUL ? <FaCheck className='text-green-500' /> : ""}
                {props.stateTracker[0] === RequestStatus.FAILED ? <FaPlus className='rotate-45 text-red-500' /> : ""}
              </span>
              :
              <span className={"duration-1000 transition-all ease-in-out"}>
                {fieldState === FieldState.LOADING ? <FaSpinner className='duration-500 animate-spin ease-in-out text-amber-500' /> : ""}
                {fieldState === FieldState.SUCESSFUL ? <FaCheck className='text-green-500' /> : ""}
              </span>
          }
        </div>
        <div className='w-full flex flex-col'>
          {props.children}
        </div>
      </div>
    </div>

    // <div className='w-full flex'>
    //   <FaSpinner className=' duration-500 animate-spin ease-in-out' />
  )
};

interface FormInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> { setter?: any; placeholder?: string; }
const FormInput: FC<FormInputProps> = (props) => {
  return (
    <input type={props.type ? props.type : "text"}
      // className="form-control block w-full px-3 py-1.5 text-base font-normal text-primary-800 bg-primary-200 bg-clip-padding  outline-none border-transpatrent transition ease-in-out m-0 focus:text-primary-700 rounded-md focus:bg-primary-100 border focus:border-primary-700 focus:outline-none"
      className={"w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid placeholder:text-primary-400 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-secondary-600 focus:outline-none"}
      placeholder={props.placeholder}
      required={props.required}
      value={props.value}
      checked={props.checked}
      width={props.width}
      height={props.height}
      defaultValue={props.defaultValue}
      disabled={props.disabled}
      onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) props.onChange(ev);
        if (props.setter) props.setter(ev.currentTarget.value);
      }} />
  )
};
const FormNumberInput: FC<FormInputProps> = (props) => {
  return (
    <input type={"number"}
      // className="form-control block w-full px-3 py-1.5 text-base font-normal text-primary-800 bg-primary-200 bg-clip-padding  outline-none border-transpatrent transition ease-in-out m-0 focus:text-primary-700 rounded-md focus:bg-primary-100 border focus:border-primary-700 focus:outline-none"
      className={"w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid placeholder:text-primary-400 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-secondary-600 focus:outline-none"}
      placeholder={props.placeholder}
      required={props.required}
      value={props.value}
      checked={props.checked}
      width={props.width}
      height={props.height}
      defaultValue={props.defaultValue}
      disabled={props.disabled}
      onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) props.onChange(ev);
        if (props.setter) {
          if (!isNaN(ev.currentTarget.valueAsNumber)) {
            props.setter(ev.currentTarget.valueAsNumber)
          }


        };
      }} />
  )
};

interface FormSelectProps {
  options?: {
    id?: string | number;
    value?: string | number;
    inActive?: boolean;
  }[];
  setter?: Function;
  required?: boolean;
}
const FormSelect: FC<FormSelectProps> = (props) => {
  var dd = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (props.setter) props.setter(event.currentTarget.value)
  }
  return (
    <select required={props.required}
      disabled={(props.options && props.options.length !== 0) ? false : true}
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { dd(event) }}
      className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300
      rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none disabled:cursor-wait"
      aria-label="Default select example"
    >
      {props.options?.map((value: any, index: number, array: any) => {
        return <option value={value.id} key={index}> {value.value}</option>
      })}
    </select>
  );
}



interface FormTextAreaProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> { setter?: Function; placeholder?: string; }

const FormTextArea: FC<FormTextAreaProps> = (props) => (
  <textarea value={props.value} onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => { if (props.setter) props.setter(ev.currentTarget.value); }} placeholder={props.placeholder}
    className={"w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid placeholder:text-primary-400 border-gray-300 min-h-[10rem] rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-secondary-600 focus:outline-none"}
  />
);

interface FormImageProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  closer?: Function;
  setter?: Function;
  val?: File;
  position?: number;
}

const FormImage: FC<FormImageProps> = (props) => {
  const inputRef = useRef(null as any as HTMLInputElement);
  const [imageFile, setImageFile] = useState(undefined as any as File);
  const viewOnClick = () => {
    inputRef.current.click();
  }

  const clearImage = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setImageFile(undefined as any as File);
    if (props.setter) props.setter(undefined as any as File, props.position);
    inputRef.current.files = null;
    if (props.closer) props.closer();
  }
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageFile(event.target.files[0]);
      if (props.setter) props.setter(event.target.files[0], props.position);
      if (props.closer) props.closer();
      // setimageLocation(URL.createObjectURL(event.target.files[0]));
    }
  }
  return (
    <div className={"flex gap-4"}>
      <div onClick={() => { viewOnClick() }} className="w-32 bg-primary-200 hover:bg-primary-400 active:bg-primary-200 aspect-square rounded-lg flex items-center justify-center cursor-pointer border-8 transition ease-in-out border-primary-400 hover:border-primary-200 active:border-primary-400">
        {!imageFile ?
          <FaImage className="text-5xl" />
          :
          <img src={props.val ? URL.createObjectURL(props.val) : ""} alt={"inventory main"} className='w-full h-full object-cover object-center' />
        }
      </div>
      <div onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => { clearImage(event) }} className={'w-fit h-fit rounded-md duration-300 cursor-pointer bg-red-600 hover:bg-primary-200 text-primary-200 hover:text-primary-600 flex justify-evenly gap-2 items-center px-2 py-2'}><FaPlus className={"rotate-45"} /></div>
      {/* {imageFile ?
        <div onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => { clearImage(event) }} className={'w-fit h-fit rounded-md duration-300 cursor-pointer bg-red-600 hover:bg-primary-200 text-primary-200 hover:text-primary-600 flex justify-evenly gap-2 items-center px-2 py-2'}><FaPlus className={"rotate-45"} /></div>
        : null} */}


      <input accept={"image/*"} ref={inputRef} type={"file"} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { onInputChange(event) }} placeholder={"select inventory Image"} className="hidden" />
    </div>
  )
};

interface TitleViewProps {
  children?: ReactNode;
  titlestyle?: number;
  left?: boolean;
  hidelines?: boolean;
}
const TitleView: FC<TitleViewProps> = (props) => {
  switch (props.titlestyle) {
    case 1:
    default: return (
      <div className="w-full flex flex-col align-start pt-4 font-semibold text-[1.05rem]">
        <hr className={"w-full border-primary-400"} />
        <h3 className="p-4 text-left uppercase">{props.children}</h3>
        <hr className={"w-full border-primary-400"} />
      </div>
    );
    case 0:
      return (
        <div className="w-full flex flex-col align-middle">
          {/* <hr className={"w-full border-primary-400" + props.hidelines?" hidden":""} /> */}
          <div className="w-full flex items-center">
            <hr className={"w-full border-primary-400" + props.hidelines ? " hidden" : ""} />
            <h3 className="p-4">{props.children}</h3>
            <hr className={"w-full border-primary-400" + props.hidelines ? " hidden" : ""} />
          </div>
          {/* <hr className={"w-full border-primary-400" + props.hidelines?" hidden":""} /> */}
        </div>
      );
  }
}

const FormLabel: FC<{ children?: any; }> = (props) => (
  <label className="form-label inline-block mb-1 w-fit text-primary-700 font-semibold capitalize">
    {props.children}
  </label>
);

const FormError: FC<{ children?: any; }> = (props) => (<small className={'w-full flex bg-transparent text-red-400 pl-2'}><b>{props.children}</b></small>)

export default FormControl;
export { FormInput, FormNumberInput, FormTextArea, FormSelect, FormImage, TitleView, FormLabel, FormError, FieldState };
