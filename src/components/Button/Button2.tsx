import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

interface ButtonProps extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    callbackClick?: (id?: number, value?: any) => void;
    classNames?: HTMLAttributes<HTMLButtonElement>["className"];
    children?: any;
    starticon?: any;

}
const Button: FC<ButtonProps> = (props) => {
    return <button className={`flex items-center font-normal text-lg  justify-center rounded-md px-4 py-2 gap-2 bg-secondary-500 text-white w-fit uppercase shadow-md hover:bg-secondary-600 hover:shadow-lg focus:bg-secondary-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-secondary-600 active:shadow-lg transition duration-150 ease-in-out ${props.classNames}`} {...props}> {props.children} </button>
}

export default Button;