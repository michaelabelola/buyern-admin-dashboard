import React, { FC, HTMLAttributes } from 'react';


interface CardProps {
  children?: React.ReactNode;
  classNames?: HTMLAttributes<HTMLDivElement>["className"];
  childClassNames?: HTMLAttributes<HTMLDivElement>["className"];
}

const Card: FC<CardProps> = (props) => (
  <div className={`flex justify-center ${props.classNames}`}>
    <div className={`rounded-lg shadow-lg bg-secondary-100 w-full overflow-y-auto customScrollBar overflow-x-hidden ${props.childClassNames}`}>
   
        {props.children}

        {/* <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button> */}
    </div>
  </div>
);

const CardTitle: FC<{ children?: any; isText?: true }> = (props) => {
  if (props.isText)
    return <h5 className="text-gray-900 text-xl font-medium mb-2">{props.children}</h5>
  else
    return props.children;
}

const CardBody: FC<{ children?: React.ReactNode }> = (props) => (
  <div className="text-gray-700 text-base mb-4">
    {props.children}
  </div>
   )
export type { CardProps };
export { CardTitle, CardBody };
export default Card;
