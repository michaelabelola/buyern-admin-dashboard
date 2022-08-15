import React, { FC, useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import BorderedDiv from '../../components/BorderedDiv';
import Button from '../../components/Button/Button2';
import { CardBody, CardTitle } from '../../components/Card/Card';
import Card from '../../components/Card/Card.lazy';
import FormControl2, { FormInput2, FormSelect, FieldState } from '../../components/FormControl/FormControl2';
import StateModal from '../../components/Modal/StateModal';
import { RequestStatus } from '../../Controllers/ObjectRequestHandler';

interface SignUpPageProps { }

const SignUpPage: FC<SignUpPageProps> = () => {
  const fields = {
    firstName: {
      message: useState("" as any),
      value: useState(""),
      fieldState: useState(FieldState.DEFAULT),
      verifier: (newValue: string) => {
        if (!newValue || newValue === "") {
          fields.firstName.message[1]("can't be empty");
          fields.firstName.fieldState[1](FieldState.INVALID);
          return false;
        }
        fields.firstName.message[1](undefined);
        fields.firstName.fieldState[1](FieldState.VALID);
        return true;
      }
    },
    lastName: {
      message: useState("" as any),
      value: useState(""),
      fieldState: useState(FieldState.DEFAULT),
      verifier: (newValue: string) => {
        if (!newValue || newValue === "") {
          fields.lastName.message[1]("can't be empty");
          fields.lastName.fieldState[1](FieldState.INVALID);
          return false;
        }
        fields.lastName.message[1](undefined);
        fields.lastName.fieldState[1](FieldState.VALID);
        return true;
      }
    },
    phone: {
      message: useState("" as any),
      value: useState(""),
      fieldState: useState(FieldState.DEFAULT),
      verifier: (newValue: string) => {
        if (!newValue || newValue === "") {
          fields.phone.message[1]("can't be empty");
          fields.phone.fieldState[1](FieldState.INVALID);
          return false;
        } else if (newValue.length < 11) {
          fields.phone.message[1]("not a valid phone number");
          fields.phone.fieldState[1](FieldState.INVALID);
          return false;
        }
        fields.phone.message[1](undefined);
        fields.phone.fieldState[1](FieldState.VALID);
        return true;
      }
    },
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
    gender: {
      value: useState(1) as any,
      fieldState: useState(FieldState.DEFAULT)
    },
    dob: {
      message: useState("" as any),
      value: useState(""),
      fieldState: useState(FieldState.DEFAULT),
      verifier: (newValue: string) => {
        if (!newValue || newValue === "") {
          fields.dob.message[1]("can't be empty");
          fields.dob.fieldState[1](FieldState.INVALID);
          return false;
        } else if (monthsDiff(new Date(newValue), new Date()) < 216) {
          fields.dob.message[1]("must be 18+");
          fields.dob.fieldState[1](FieldState.INVALID);
          return false;
        }
        fields.dob.message[1](undefined);
        fields.dob.fieldState[1](FieldState.VALID);
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
    confirmPassword: {
      message: useState("" as any),
      value: useState(""),
      fieldState: useState(FieldState.DEFAULT),
      verifier: (newValue: string) => {
        if (!newValue || newValue === "") {
          fields.confirmPassword.message[1]("can't be empty");
          fields.confirmPassword.fieldState[1](FieldState.INVALID);
          return false;
        } else if (newValue !== fields.password.value[0]) {
          fields.confirmPassword.message[1]("passwords doesn't match");
          fields.confirmPassword.fieldState[1](FieldState.INVALID);
          return false;
        }
        fields.confirmPassword.message[1](undefined);
        fields.confirmPassword.fieldState[1](FieldState.VALID);
        return true;
      }
    },
    image: {
      message: useState("" as any),
      file: File,
      value: useState(""),
      fieldState: useState(FieldState.DEFAULT),
      verifier: (newValue: string, ev: React.ChangeEvent<HTMLInputElement>) => {
        if (!ev && !newValue) {
          fields.image.message[1]("No image selected");
          fields.image.fieldState[1](FieldState.INVALID);
          return false;
        }
        if (!ev.currentTarget.files || !ev.currentTarget.files[0]) {
          fields.image.message[1]("No image selected");
          fields.image.fieldState[1](FieldState.INVALID);
          return false;
        } else if (ev.currentTarget.files[0].type !== "image/jpeg" && ev.currentTarget.files[0].type !== "image/png") {
          fields.image.message[1]("No image selected");
          fields.image.fieldState[1](FieldState.INVALID);
        }
        fields.image.file = ev.currentTarget.files[0] as any;
        console.log(fields.image.file);

        fields.image.message[1](undefined);
        fields.image.fieldState[1](FieldState.VALID);
        return true;
      }
    },
    address: {
      message: useState("" as any),
      value: useState(""),
      fieldState: useState(FieldState.DEFAULT),
      verifier: (newValue: string) => {
        if (!newValue || newValue === "") {
          fields.address.message[1]("can't be empty");
          fields.address.fieldState[1](FieldState.INVALID);
          return false;
        }
        fields.address.message[1](undefined);
        fields.address.fieldState[1](FieldState.VALID);
        return true;
      }
    },
    address2: {
      message: useState("" as any),
      value: useState(""),
      fieldState: useState(FieldState.DEFAULT),
      verifier: (newValue: string) => {
        return true;
      }
    },
    state: {
      value: useState(0) as any,
      fieldState: useState(FieldState.DEFAULT),
    },
    city: {
      value: useState(0) as any,
      fieldState: useState(FieldState.DEFAULT),
    },
    country: {
      value: useState(0) as any,
      fieldState: useState(FieldState.DEFAULT),
    },
  }
  function yearsDiff(d1: Date, d2: Date) {
    let date1 = new Date(d1);
    let date2 = new Date(d2);
    let yearsDiff = date2.getFullYear() - date1.getFullYear();
    return yearsDiff;
  }
  function monthsDiff(d1: Date, d2: Date) {
    let date1 = new Date(d1);
    let date2 = new Date(d2);
    let years = yearsDiff(d1, d2);
    let months = (years * 12) + (date2.getMonth() - date1.getMonth());
    console.log(months);
    return months;
  }
  const stateModal = new StateModal(useState(false), useState(RequestStatus.IDLE as RequestStatus), useState("" as any));
  const submitForm = () => {
    registerAccount();
    stateModal.setStatus(RequestStatus.PROCESSING, "Registering User", true);
    setTimeout(() => {
      stateModal.setStatus(RequestStatus.SUCCESSFUL, "User Registered Sucessfully", true, -1);
    }, 5000);
  }

  const registerAccount = () => {
    let fieldKeys = Object.keys(fields);
    let isReady: boolean = true;
    fieldKeys.forEach(fieldKey => {
      if ((fields as any)[fieldKey].verifier) {
        if (!(fields as any)[fieldKey].verifier((fields as any)[fieldKey].value[0])) isReady = false;
        console.log(fieldKey);
      }
    });
console.log(isReady);

    // axios({
    //   method: 'post',
    //   url: `${process.env.REACT_APP_BASEURL}/user`,
    //   data: {
    //     firstName: 'Fred',
    //     lastName: 'Flintstone'
    //   }
    // })
    //   .then((value: AxiosResponse<any, any>) => {

    //   })
    //   .catch((reason: any) => {

    //   });
  }

  return (
    <div className='min-h-screen w-screen flex items-center justify-center overflow-hidden'>
      <div className={"w-screen h-screen opacity-70 scale-110 blur grayscale brightness-50"}><img src='http://127.0.0.1:10000/devstoreaccount1/test/bg%2FBojoRiver_ROW2280567335_1920x1080.jpg' className={"w-full h-full object-cover"} alt='bg' /></div>
      <Card classNames={"w-[80%] sm:w-[60%] md:w-[50%] lg:w-[45%] xl:w-[40%] 2xl:w-[35%] absolute"} childClassNames={"p-10 h-fit max-h-[95vh]"}>
        <div className={"flex justify-center mb-8"}>
          <img src='http://127.0.0.1:10000/devstoreaccount1/entities/f07bb90a-202a-4ed3-96c6-2f9b70b04480/logo.png' alt={"logo"} className={"w-12 h-12 rounded-full border-secondary-400 border-2"} />
        </div>
        <CardTitle><h5 className="text-secondary-500 text-xl font-medium mb-8">Register User</h5></CardTitle>
        <CardBody>
          <form className="w-full justify-center gap-8 flex flex-col" onSubmit={() => (false)}>
            <BorderedDiv titletext={"Personal Details"}>
              {/* {nameC.construct()} */}
              <FormControl2 state={fields.firstName} label={"* First Name"}>
                <FormInput2 state={fields.firstName} placeholder="First Name" required />
              </FormControl2>




              <FormControl2 state={fields.lastName} label={"* Last Name"}>
                <FormInput2 state={fields.lastName} placeholder="Last Name" required />
              </FormControl2>
              <FormControl2 state={fields.email} label={"* Email"}>
                {/* <div className={'w-full text-secondary-500 text-left -mt-2'}>
                <small><small>this should be your personal email</small></small>
              </div> */}
                <FormInput2 state={fields.email} placeholder="E-Mail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" type={"email"} required />
              </FormControl2>

              <FormControl2 state={fields.dob} label={"* Date Of Birth"}>
                <FormInput2 state={fields.dob} placeholder={"Date Of Birth"} type={"date"} required />
              </FormControl2>

              <FormControl2 state={fields.phone} label={"* Phone Number"}>
                <FormInput2 state={fields.phone} placeholder={"(234) *** *** ****"} type={"tel"} required />
                {/* {nameError ? <FormError>{nameError}</FormError> : ""} */}
              </FormControl2>
              <FormControl2 state={fields.gender} label={"* Gender"}>
                <FormSelect state={fields.gender} options={[
                  { id: 0, value: "Male" },
                  { id: 1, value: "Female" }
                ]} />
              </FormControl2>
              <FormControl2 state={fields.password} label={"* Password"}>
                <FormInput2 state={fields.password} placeholder="Password" type={"password"} required />
              </FormControl2>
              <FormControl2 state={fields.confirmPassword} label={"* Confirm Password"}>
                <FormInput2 state={fields.confirmPassword} placeholder="Confirm Password" type={"password"} required />
              </FormControl2>
            </BorderedDiv>

            <BorderedDiv titletext={"Location"}>
              <FormControl2 state={fields.address} label={"* Address"}>
                <FormInput2 state={fields.address} placeholder="address" required />
              </FormControl2>
              <FormControl2 state={fields.address2} label={"Address 2"}>
                <FormInput2 state={fields.address2} placeholder="address 2" />
              </FormControl2>
              <FormControl2 state={fields.country} label={"* Country"}>
                <FormSelect state={fields.country} options={[
                  { id: 0, value: "Nigeria" },
                  { id: 1, value: "Ghana" },
                  { id: 2, value: "SA" },
                  { id: 3, value: "Cameroon" },
                  { id: 4, value: "India" },
                  { id: 5, value: "Russia" },
                  { id: 6, value: "Germany" }
                ]} />
              </FormControl2>
              <FormControl2 state={fields.state} label={"* State"}>
                <FormSelect state={fields.state} options={[
                  { id: 0, value: "Lagos" },
                  { id: 1, value: "Abuja" },
                  { id: 2, value: "Ogun" },
                  { id: 3, value: "Ekiti" },
                  { id: 4, value: "Kano" },
                  { id: 5, value: "Kaduna" },
                  { id: 6, value: "Edo" }
                ]} />
              </FormControl2>
              <FormControl2 state={fields.city} label={"* City (nearest)"}>
                <FormSelect state={fields.city} options={[
                  { id: 0, value: "Ikoyi" },
                  { id: 1, value: "Alimosho" },
                  { id: 2, value: "Shasha" },
                  { id: 3, value: "Igando" },
                  { id: 4, value: "Ikotun" },
                  { id: 5, value: "Ipaja" },
                  { id: 6, value: "Ayobo" }
                ]} />
              </FormControl2>
            </BorderedDiv>

            <BorderedDiv titletext={"Media"}>
              <FormControl2 state={fields.image} label={"* Profile Picture"}>
                <FormInput2 state={fields.image} placeholder="Profile Picture" type={"file"} required />
                {/* {nameError ? <FormError>{nameError}</FormError> : ""} */}
              </FormControl2>
            </BorderedDiv>
            <div className={"flex justify-center"}>
            </div>
          </form>

          <Button onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { submitForm() }}>
            <FaSignInAlt />Sign Up
          </Button>
          <a href='/login' className={"flex justify-end text-secondary-500 hover:underline cursor-pointer"}>
            <div>Sign In</div>
          </a>
        </CardBody>
      </Card>
      {stateModal.view()}
    </div>
  )
};

export default SignUpPage;
