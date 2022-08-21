import axios, { AxiosResponse } from "axios";
import { User } from "../Models/User";
import { ObjectRequestHandler } from "./ObjectRequestHandler";
import create from "zustand";
import { persist } from "zustand/middleware";
const UserController = (
  entityId?: string,
  abortController?: AbortController
): ObjectRequestHandler<User> => {
  const save = (user: User, state?: any[]) => {
    return new Promise<User>((resolve, reject) => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}/user`,
        data: user,
      })
        .then((value: AxiosResponse<any, any>) => {
          console.log(value);
          resolve(value as any);
        })
        .catch((reason: any) => {
          resolve(reason as any);
          console.log(reason);
        });
    });
  };
  return {
    save: save,
  } as ObjectRequestHandler<User>;
};
interface UserStoreType{
    user: User;
    update: (_user: User) => void;
    delete: () => void;
}
const useUserStore = create(
  persist((set) => {
    return {
      user: undefined as any as User,
      update: (_user: User) => set({ user: _user }),
      delete: () => set({ user: undefined }),
    };
  },{
    name:"currentUserDetails"
  })
);
export type { UserStoreType };
export default UserController;
export { useUserStore };
