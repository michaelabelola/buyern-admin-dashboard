import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { FaCheck, FaPlus, FaSpinner } from 'react-icons/fa';

enum ButtonStatus {
  IDLE = 1, PROCESSING = 2, SUCCESS= 3, ERROR= 4
}
interface ButtonProps extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  callbackClick?:(id?:number, value?:any)=>void;
  buttontype?: "SOLID" | "OUTLINE" | "TRANSPARENT" | "CUSTOM";
  classnamecolors?: HTMLAttributes<HTMLButtonElement>["className"];
  children?: any;
  starticon?: any;

}

const Button: FC<ButtonProps> = (props) => {
  let classNameGen = "" as HTMLAttributes<HTMLButtonElement>["className"];
  switch (props.buttontype) {
    case "OUTLINE":
      classNameGen =
        "inline-block px-4 py-2 border-2 font-medium text-xs leading-tight uppercase rounded hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out " as HTMLAttributes<HTMLButtonElement>["className"]
        + (props.classnamecolors ? (" " + props.classnamecolors) : ("border-blue-600 text-blue-600 hover:bg-black" as any));
      break;
    case "TRANSPARENT":
      classNameGen =
        "inline-block px-4 py-2 font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out " as HTMLAttributes<HTMLButtonElement>["className"]
        + (props.classnamecolors ? (" " + props.classnamecolors) : ("bg-transparent text-blue-600 hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200" as any));
      break;
    case "CUSTOM":
      classNameGen = props.classnamecolors;
      break;
    case "SOLID":
    default:
      classNameGen =
        "inline-block px-4 py-2.5 font-medium text-xs leading-tight uppercase rounded shadow-md focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out disabled:cursor-default " as HTMLAttributes<HTMLButtonElement>["className"]
        + (props.classnamecolors ? (" " + props.classnamecolors) : ("bg-primary-600 text-white hover:bg-primary-700 focus:bg-primary-700 active:bg-primary-800 disabled:opacity-40 disabled:hover:bg-primary-600 disabled:focus:bg-primary-600" as any));
  }
  return (
    <button
      {...props}
      type="button"
      className={`flex items-center justify-center` + classNameGen}>
      {props.starticon ? <span className={"text-xl inline-block mr-2"}>{props.starticon}</span> : ""}
      {props.children}
    </button>);

};

const SuccessButton: FC<ButtonProps> = (props) => {
  const generateColorClasses = (buttontype?: string) => {
    switch (buttontype) {
      case "OUTLINE":
        return "border-green-600 text-green-600 hover:bg-black";
      case "TRANSPARENT":
        return "bg-transparent text-green-600 hover:text-green-700 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200";
      case "SOLID":
      default:
        return "bg-green-200 text-green-700 hover:bg-green-400 focus:bg-green-300 active:bg-green-500 active:text-green-100 disabled:opacity-40 disabled:hover:bg-green-600 disabled:focus:bg-green-600";

    }
  }


  return (<Button {...props} buttontype={"SOLID"} classnamecolors={generateColorClasses(props.buttontype)} />);

};
const DangerButton: FC<ButtonProps> = (props) => {
  const generateColorClasses = (buttontype?: string) => {
    switch (buttontype) {
      case "OUTLINE":
        return "border-red-600 text-red-600 hover:bg-black";
      case "TRANSPARENT":
        return "bg-transparent text-red-600 hover:text-red-700 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200";
      case "SOLID":
      default:
        return "bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-800 disabled:opacity-40 disabled:hover:bg-red-600 disabled:focus:bg-red-600";

    }
  }


  return (<Button {...props} buttontype={"SOLID"} classnamecolors={generateColorClasses(props.buttontype)} />);

};
interface TransparentButtonProps extends ButtonProps {
  btntype?: "SUCCESS" | "ERROR" | "WARNING";
}
const TransparentButton: FC<TransparentButtonProps> = (props) => {

  const generateColorClasses = () => {
    switch (props.btntype) {
      case "SUCCESS": {
        return "bg-transparent text-green-600 hover:text-green-100 hover:bg-green-500 focus:b-1 focus:border-green-100 hover:focus:bg-green-500 hover:focus:text-green-100 active:bg-green-200 active:text-green-500 disabled:cursor-not-allowed disabled:text-green-200 disabled:hover:bg-transparent disabled:hover:text-green-200 disabled:focus:bg-transparent disabled:hover:text-focus-200" as HTMLAttributes<HTMLButtonElement>["className"];
      }
      case "WARNING": {
        return "bg-transparent text-amber-600 hover:text-amber-100 hover:bg-amber-500 focus:bg-amber-100 hover:focus:bg-amber-500 hover:focus:text-amber-100 active:bg-amber-200 active:text-amber-500 disabled:cursor-not-allowed disabled:text-amber-200 disabled:hover:bg-transparent disabled:hover:text-amber-200" as HTMLAttributes<HTMLButtonElement>["className"];
      }
      case "ERROR": {
        return "bg-transparent text-red-600 hover:text-red-100 hover:bg-red-500 focus:bg-red-100 hover:focus:bg-red-500 hover:focus:text-red-100 active:bg-red-200 active:text-red-500 disabled:cursor-not-allowed disabled:text-red-200 disabled:hover:bg-transparent disabled:hover:text-red-200" as HTMLAttributes<HTMLButtonElement>["className"];
      }
      default: {
        return "bg-transparent text-primary-600 hover:text-primary-100 hover:bg-primary-500 focus:bg-primary-100 hover:focus:bg-primary-500 hover:focus:text-primary-100 active:bg-primary-200 active:text-primary-500 disabled:cursor-not-allowed disabled:text-primary-200 disabled:hover:bg-transparent disabled:hover:text-primary-200" as HTMLAttributes<HTMLButtonElement>["className"];
      }
    }
  }
  return (
    <Button {...props} buttontype={"TRANSPARENT"} classnamecolors={generateColorClasses()}> {props.children} </Button>
  )
}
interface StatusButtonProps extends ButtonProps {
  buttonstatus?: ButtonStatus;
  children?: any;
}
const StatusButton: FC<StatusButtonProps> = (props) => {
  var startIcon: any = props.starticon;
  const generateColorClasses = (btnStatus?: ButtonStatus) => {
    switch (btnStatus) {
      case ButtonStatus.SUCCESS: {
        startIcon = <FaCheck />;
        return "bg-green-500 text-white hover:bg-green-600 focus:bg-green-600 active:bg-green-700" as HTMLAttributes<HTMLButtonElement>["className"];
      }
      case ButtonStatus.PROCESSING: {
        startIcon = <FaSpinner />;
        return "bg-amber-500 text-white hover:bg-amber-600 focus:bg-amber-600 active:bg-amber-700" as HTMLAttributes<HTMLButtonElement>["className"];
      }
      case ButtonStatus.ERROR: {
        startIcon = <FaPlus className={"rotate-45"} />;
        return "bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-800" as HTMLAttributes<HTMLButtonElement>["className"];
      }
      case ButtonStatus.IDLE:
      default: {
        return "bg-primary-600 text-white hover:bg-primary-700 focus:bg-primary-700 active:bg-primary-800 disabled:opacity-40 disabled:hover:bg-primary-600 disabled:focus:bg-primary-600 disabled:cursor-default" as HTMLAttributes<HTMLButtonElement>["className"];
      }
    }
  }
  return (
    <Button {...props} classnamecolors={generateColorClasses(props.buttonstatus)}> {props.children} </Button>
  )
};

export default Button;
export { StatusButton, ButtonStatus, TransparentButton, SuccessButton, DangerButton };
