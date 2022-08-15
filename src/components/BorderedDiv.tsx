import { FC } from "react";

interface BorderedDivProps {
    titletext?: string;
    children?: any;
}

const BorderedDiv: FC<BorderedDivProps> = (props) => {
    return (
        <div className={"border-[1px] border-secondary-300 rounded-lg p-4 flex flex-col gap-6"}>
            {props.titletext ?
                <h3 className={"font-semibold text-secondary-500 w-100 text-left -mb-3"}>{props.titletext}</h3>
                :
                ""}
            {props.children}
        </div>
    )
}
export default BorderedDiv;