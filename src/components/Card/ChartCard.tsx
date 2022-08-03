import React, { FC } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TransparentButton } from '../Button/Button';


interface CardProps {
  fullWidth?: boolean;
}

const ChartCard: FC<CardProps> = (props) => {
  const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300,
      "amt": 2100
    }
  ];
  return (
    <div className={`flex justify-center ${props.fullWidth ? "w-full" : ""}`}>
      <div className={`rounded-lg shadow-lg bg-white w-full ${props.fullWidth ? "w-full" : ""}`}>
        <div className="p-0 pb-4">
          <div className='-ml-8 pt-8'>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart width={730} height={250} data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>

          </div>
          <div className='px-4'>
            {/* <h5 className="text-gray-900 text-xl font-medium mb-2">Card title</h5> */}
            <p className="text-gray-700 text-base mb-4">New Customers</p>
          </div>
          <TransparentButton btntype={'SUCCESS'} >View</TransparentButton>
                </div>
      </div>
    </div>
  )
};

export default ChartCard;
