import axios, { AxiosError, AxiosResponse } from 'axios';
import { FC, useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button2';
import { CardBody, CardTitle } from '../../components/Card/Card';
import Card from '../../components/Card/Card.lazy';
import FormControl2, { FieldState, FormInput2, FormSwitch } from '../../components/FormControl/FormControl2';
import StateModal from '../../components/Modal/StateModal';
import { RequestStatus } from '../../Controllers/ObjectRequestHandler';
import { UserStoreType, useUserStore } from '../../Controllers/UserController';
import { ResponseDTO } from '../../Models/ResponseDTO';
import { User } from '../../Models/User';

interface LoginPageProps { }

const LoginPage: FC<LoginPageProps> = () => {
  const navigate = useNavigate();
  // const userStore = useUserStore((state: UserStoreType | any) => state.user);
  const setUserStore = useUserStore((state: UserStoreType | any) => state.update);
  const stateModal = new StateModal(useState(false), useState(RequestStatus.IDLE as RequestStatus), useState("" as any));
  const fields = {
    email: {
      message: useState("" as any),
      value: useState(""),
      fieldState: useState(FieldState.DEFAULT),
      verifier: (newValue: string) => {
        if (!newValue || newValue === "") {
          fields.email.message[1]("can't be empty");
          fields.email.fieldState[1](FieldState.INVALID);
          return false;
        } else if (!newValue.match("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")) {

          fields.email.message[1]("not a valid email");
          fields.email.fieldState[1](FieldState.INVALID);
          return false;
        }
        fields.email.message[1](undefined);
        fields.email.fieldState[1](FieldState.VALID);
        return true;
      }
    },
    password: {
      message: useState("" as any),
      value: useState(""),
      fieldState: useState(FieldState.DEFAULT),
      verifier: (newValue: string) => {
        if (!newValue || newValue === "") {
          fields.password.message[1]("can't be empty");
          fields.password.fieldState[1](FieldState.INVALID);
          return false;
        } else if (newValue.length < 8) {
          fields.password.message[1]("password must be 8+ characters");
          fields.password.fieldState[1](FieldState.INVALID);
          return false;
        }
        fields.password.message[1](undefined);
        fields.password.fieldState[1](FieldState.VALID);
        return true;
      }
    },
    rememberMe: {
      message: useState("" as any),
      value: useState(false),
      fieldState: useState(FieldState.DEFAULT),
      verifier: (newValue: boolean) => {
        return true;
      }
    }
  }
  const submitForm = () => {

    let fieldKeys = Object.keys(fields);
    let isReady: boolean = true;
    fieldKeys.forEach(fieldKey => {
      if ((fields as any)[fieldKey].verifier) {
        if (!(fields as any)[fieldKey].verifier((fields as any)[fieldKey].value[0])) isReady = false;
      }

      var data: FormData = new FormData();
      data.append('username', fields.email.value[0]);
      data.append('password', fields.password.value[0]);

      stateModal.setStatus(RequestStatus.PROCESSING, <span>Signing In as <b>{fields.email.value[0]} ...</b></span>, true);
      axios({
        method: "post",
        url: `${process.env.REACT_APP_USER_AUTH_SERVER}/signIn`,
        data: data
      })
        .then((value: AxiosResponse<any, any>) => {
          console.log(document.cookie);
          let response: ResponseDTO<User> = value.data;
          console.log(response);
          if (response.code ==="00" && response.data) {
            setUserStore(response.data);
            stateModal.setStatus(RequestStatus.SUCCESSFUL, <div className='text-center items-center'>{`Hi ${response.data.firstName} 😁. redirecting ...`}</div>, undefined, undefined, () => {
              navigate("../", { replace: true });
            })
          } else {
            stateModal.setStatus(RequestStatus.PROCESSING, `Email Or Password Invalid`, undefined, -1)
          }
        })
        .catch((reason: AxiosError) => {
          console.log(reason);
          stateModal.setStatus(RequestStatus.PROCESSING, `Error Signing In`, undefined, -1)
        });
    });
    console.log(isReady);
  }
  return (
    <div className='min-h-screen w-screen flex items-center justify-center overflow-hidden'>
      <div className={"w-screen h-screen opacity-70 scale-110 blur grayscale brightness-50"}><img src={`${process.env.REACT_APP_STORAGE_SERVER}/images/backgrounds%2Fsignup_bg.jpg`} className={"w-full h-full object-cover"} alt='bg' /></div>
      <Card classNames={"w-[80%] sm:w-[55%] md:w-[45%] lg:w-[35%] xl:w-[30%] 2xl:w-[25%] absolute"} childClassNames={"p-10 h-fit max-h-[95vh]"}>
        <div className={"flex justify-center mb-8"}>
          <img src={`${process.env.REACT_APP_STORAGE_SERVER}/images/logo.jpeg`} alt={"logo"} className={"w-12 h-12 rounded-full border-2"} />
        </div>
        <CardTitle><h5 className="text-secondary-500 text-xl font-medium mb-8">Login User</h5></CardTitle>
        <CardBody>
          <form className="w-full justify-center gap-8 flex flex-col" onSubmit={() => (false)}>
            <FormControl2 state={fields.email} label={"* Email"}>
              <FormInput2 state={fields.email} placeholder="E-Mail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" type={"email"} required />
            </FormControl2>
            <FormControl2 state={fields.password} label={"* Password"}>
              <FormInput2 state={fields.password} placeholder="Password" type={"password"} required />
            </FormControl2>
            <div className={"w-full"}>
              <FormControl2 state={fields.rememberMe} label={"Remember Me"} inline>
                <FormSwitch state={fields.rememberMe} />
              </FormControl2>
            </div>
            <div className={"flex justify-center"}>
              <Button type='button' onClick={() => { submitForm() }}>
                <FaSignInAlt />Sign In
              </Button>
            </div>
          </form>
          <div className={"flex justify-between cursor-pointer mt-2"}>
            <a href={"/forgotPassword"} className={"text-secondary-500 hover:underline cursor-pointer"}>
              <div>Forgot Password</div>
            </a>
            <a href={"/signup"} className={"text-secondary-500 hover:underline cursor-pointer"}>
              <div>Sign Up</div>
            </a>
          </div>
        </CardBody>
      </Card>
      {stateModal.view()}
    </div>
  )
};

export default LoginPage;
