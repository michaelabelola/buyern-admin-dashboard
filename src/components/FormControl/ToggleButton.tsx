import { FC } from 'react'
import { Switch } from '@headlessui/react'
interface CheckBoxSwitchProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    selectedState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    customsize?: "sm" | "md" | "lg";
    customOnClick?: (value: boolean) => {}
}

const CheckBox: FC<CheckBoxSwitchProps> = (props) => {
    // useEffect(() => {
    //     enabled

    //   return () => {
    //   }
    // }, []);
    const toggleEnabled = () => {
        if (props.onClick) {
        }
        if (props.selectedState[0]) {
            props.selectedState[1](false);
            if (props.customOnClick) props.customOnClick(false);
        } else
            props.selectedState[1](true);
        if (props.customOnClick) props.customOnClick(true);
    }
    return (
        <Switch
            checked={props.selectedState[0]}
            onChange={toggleEnabled}
            className={`relative inline-flex h-[2rem] w-[4rem] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75
            ${props.selectedState[0] ? 'bg-secondary-500' : 'bg-primary-100'} ${props.customsize === "sm" ? 'h-[1rem] w-[2rem]' : ""}`}
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={`${props.selectedState[0] ? 'translate-x-4' : 'translate-x-0'}
            pointer-events-none inline-block h-[1.7rem] w-[1.7rem] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out  ${props.customsize === "sm" ? 'h-[0.7rem] w-[0.7rem]' : ""}`}
            />
            <input type={"checkbox"}
                // className="form-control block w-full px-3 py-1.5 text-base font-normal text-primary-800 bg-primary-200 bg-clip-padding  outline-none border-transpatrent transition ease-in-out m-0 focus:text-primary-700 rounded-md focus:bg-primary-100 border focus:border-primary-700 focus:outline-none"
                className={"w-full px-3 hidden py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid placeholder:text-primary-400 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-secondary-600 focus:outline-none"}
                checked={props.selectedState[0]}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                    // if (props.onChange) props.onChange(ev);
                }} />
        </Switch>
    )
}
export default CheckBox;