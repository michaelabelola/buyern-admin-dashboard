import { FC, useState } from 'react';
import { FaKey, FaSignInAlt } from 'react-icons/fa';
import Button from '../../components/Button/Button2';
import { CardBody, CardTitle } from '../../components/Card/Card';
import Card from '../../components/Card/Card.lazy';
import FormControl2, { FieldState, FormInput2, FormSwitch } from '../../components/FormControl/FormControl2';
import StateModal from '../../components/Modal/StateModal';
import { RequestStatus } from '../../Controllers/ObjectRequestHandler';

interface ResetPasswordPageProps { }

const ResetPasswordPage: FC<ResetPasswordPageProps> = () => {
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
  const stateModal = new StateModal(useState(false), useState(RequestStatus.IDLE as RequestStatus), useState("" as any));
  const submitForm = () => {
    // stateModal.setStatus(RequestStatus.PROCESSING, <span>Signing In as <b>abelmichaelola@gmail.com ...</b></span>, true);
    // setTimeout(() => {
    //   stateModal.setStatus(RequestStatus.SUCCESSFUL, "Signed In Sucessfully", true, -1);
    // }, 5000);

    let fieldKeys = Object.keys(fields);
    let isReady: boolean = true;
    fieldKeys.forEach(fieldKey => {
      if ((fields as any)[fieldKey].verifier) {
        if (!(fields as any)[fieldKey].verifier((fields as any)[fieldKey].value[0])) isReady = false;
      }
    });
    console.log(isReady);
  }
  return (
    <div className='min-h-screen w-screen flex items-center justify-center overflow-hidden'>
      <div className={"w-screen h-screen opacity-70 scale-110 blur grayscale brightness-50"}><img src='http://127.0.0.1:10000/devstoreaccount1/images/backgrounds%2Fsignup_bg.jpg' className={"w-full h-full object-cover"} alt='bg' /></div>
      <Card classNames={"w-[80%] sm:w-[55%] md:w-[45%] lg:w-[35%] xl:w-[30%] 2xl:w-[25%] absolute"} childClassNames={"p-10 h-fit max-h-[95vh]"}>
        <div className={"flex justify-center mb-8 text-secondary-500 font-bold"}>
          <FaKey />
        </div>
        <CardTitle><h5 className="text-secondary-500 text-xl font-medium mb-8">Password Reset Successful</h5></CardTitle>
        <CardBody>
          <div className={"flex justify-end"}>
            <a href={"/login"} className={"text-secondary-500 hover:underline cursor-pointer w-fit"}>
              <div>Proceed To Login</div>
            </a>
          </div>
        </CardBody>
      </Card>
      {stateModal.view()}
    </div>
  )
};

export default ResetPasswordPage;
