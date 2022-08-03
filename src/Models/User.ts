import { Location } from "./Location";

interface User{
uid?:string;
firstName?:string;
lastName?:string;
email?:string;
phone?:string;
address?:string;
rating?:number;
location?: Location;
status?:string;
workStatus?:string;
}
export type {User};