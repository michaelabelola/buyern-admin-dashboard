import React, { FC, ReactElement, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RequestStatus } from "../../Controllers/ObjectRequestHandler";
import {
  FaCheck,
  FaExclamation,
  FaPlus,
  FaSpinner,
} from "react-icons/fa";



const View: FC<{
  title?: ReactElement | string;
  openState?: any[];
  status?: RequestStatus;
}> = (props) => {
  function closeModal() {
    // if (props.openState) props.openState[1](false);
  }
  return (
    <Transition appear show={props.openState ? props.openState[0] : false} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70 w-[100%]" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                tabIndex={-1}
                className={`w-full max-w-md transform overflow-hidden rounded-2xl bg-white border-2 text-secondary-500 border-secondary-400 p-6 text-left align-middle shadow-xl transition-all flex flex-col items-center gap-4 justify-center  ${props.status === RequestStatus.PROCESSING ||
                    props.status === RequestStatus.WARNING
                    ? "border-amber-500"
                    : ""
                  } ${props.status === RequestStatus.SUCCESSFUL
                    ? "border-green-500"
                    : ""
                  } ${props.status === RequestStatus.FAILED ? "border-red-500" : ""
                  }`}
              >
                <div className="mt-2 text-lg">
                  {props.status === RequestStatus.PROCESSING ? (
                    <FaSpinner
                      className={
                        "duration-500 animate-spin ease-in-out text-amber-500"
                      }
                    />
                  ) : (
                    ""
                  )}
                  {props.status === RequestStatus.FAILED ? (
                    <FaPlus className={"duration-500 rotate-45 text-red-500"} />
                  ) : (
                    ""
                  )}
                  {props.status === RequestStatus.WARNING ? (
                    <FaExclamation
                      className={"duration-500 scale-110 text-amber-500"}
                    />
                  ) : (
                    ""
                  )}
                  {props.status === RequestStatus.SUCCESSFUL ? (
                    <FaCheck
                      className={"duration-500 scale-110 text-green-500"}
                    />
                  ) : (
                    ""
                  )}
                </div>

                <Dialog.Title
                  as="h3"
                  className={`text-lg font-medium leading-6 ${props.status === RequestStatus.PROCESSING ||
                      props.status === RequestStatus.WARNING
                      ? "text-amber-500"
                      : ""
                    } ${props.status === RequestStatus.SUCCESSFUL
                      ? "text-green-500"
                      : ""
                    } ${props.status === RequestStatus.FAILED ? "text-red-500" : ""
                    }`}
                >
                  {props.title ? (
                    props.title
                  ) : (
                    <span>
                      {props.status === RequestStatus.PROCESSING
                        ? "Processing ..."
                        : ""}
                      {props.status === RequestStatus.FAILED ? "Failed" : ""}
                      {props.status === RequestStatus.WARNING ? "Warning" : ""}
                      {props.status === RequestStatus.SUCCESSFUL
                        ? "Success"
                        : ""}
                    </span>
                  )}
                </Dialog.Title>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

class StateModal {
  isOpen: boolean;
  _open: React.Dispatch<React.SetStateAction<boolean>>;
  status: RequestStatus;
  _setStatus: React.Dispatch<React.SetStateAction<RequestStatus>>;
  messageState?: [string | ReactElement, React.Dispatch<React.SetStateAction<string | ReactElement>>];
  /**
   * 
   * @param isOpen the useState to be used for setting modal visibility
   * @param status the useState to be used for setting the current status (mostly of requests)
   * @param _messageState the useState to be used for setting the message to be displayed
   */
  constructor(isOpen: [boolean, React.Dispatch<React.SetStateAction<boolean>>], status: [RequestStatus, React.Dispatch<React.SetStateAction<RequestStatus>>], _messageState?: [string | ReactElement, React.Dispatch<React.SetStateAction<string | ReactElement>>]) {
    this.isOpen = isOpen[0];
    this._open = isOpen[1];
    this.status = status[0];
    this._setStatus = status[1];
    this.messageState = _messageState;
  }
  open = () => {
    this._open(true);
  }
  close = () => {
    this._open(false);
  }
  setStatus = (__status: RequestStatus, message?: string | ReactElement, open?: boolean, delay?: number) => {
    if (message && this.messageState) {
      this.messageState[1](message);
    }
    this._setStatus(__status);
    if (open === undefined || (open === this.isOpen)) {
      return;
    } else {
      this.open();
    }
    if (delay) {
      setTimeout(() => {
        this.close()
      }, (delay === -1) ? 3000 : delay);
    }
  }
  view = () => (<View title={this.messageState ? this.messageState[0] : undefined} openState={[this.isOpen, this._open]} status={this.status} />)

}

export default StateModal;