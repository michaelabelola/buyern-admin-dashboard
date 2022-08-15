import React, { FC, ReactElement } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { RequestStatus } from '../../Controllers/ObjectRequestHandler';
import { TransparentButton } from '../Button/Button';
import { FaCaretRight, FaCheck, FaExclamation, FaPlus, FaSpinner } from 'react-icons/fa';
import ProgressStepMonitor from '../ProgressStepMonitor';


interface ModalProps {
  openState?: any[];
  size?: "md" | "lg" | "full";
  disableFixedHeight?: boolean;
  children?: any[];
}

const Modal: FC<ModalProps> = (props) => {
  // let [isOpen, setIsOpen] = useState(props.open ? props.open : false);
  function closeModal() {
    if (props.openState) props.openState[1](false)
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <Dialog.Panel className={`min-w-[40%] max-h-[90vh] w-screen md:w-[80%] lg:w-[60%] xl::w-[50%] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex flex-col ${!props.disableFixedHeight ? "h-[90vh]" : ""}`}>
                {props.children}
              </Dialog.Panel>

            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
};
interface NotificationStep {
  text?: string;
  status?: RequestStatus;
}

interface NotificationModalProps extends ModalProps {
  title?: ReactElement | string;
  progressStepMonitor: ProgressStepMonitor;
}

const NotificationModal: FC<NotificationModalProps> = (props) => {
  function closeModal() {
    props.progressStepMonitor.hide();
  }
  return (
    <Transition appear show={props.progressStepMonitor.isModalOpen ? props.progressStepMonitor.isModalOpen : false} as={Fragment}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white border-2 border-secondary-400 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {props.title}
                </Dialog.Title>
                <div className="mt-2">
                  {
                    props.progressStepMonitor.notificationSteps ?
                      props.progressStepMonitor.notificationSteps?.map((notificationStep: NotificationStep, index: number) => {
                        switch (notificationStep.status) {
                          case RequestStatus.PROCESSING:
                            return (
                              <div key={index} className='flex flex-nowrap w-full duration-300 items-center gap-2 font-semibold text-amber-500'>
                                <div><FaCaretRight className={"text-amber-500"} /></div>
                                <div>{notificationStep.text}</div>
                                <div><FaSpinner rotate={360} className={"duration-500 animate-spin ease-in-out text-amber-500"} /></div>
                              </div>)
                          case RequestStatus.SUCCESSFUL:
                            return (
                              <div key={index} className='flex flex-nowrap duration-300 w-full items-center gap-2 font-semibold text-green-500'>
                                <div><FaCaretRight className={"text-green-500"} /></div>
                                <div>{notificationStep.text}</div>
                                <div><FaCheck className={"ease-in-out text-green-500"} /></div>
                              </div>)
                          case RequestStatus.FAILED:
                            return (
                              <div key={index} className='flex flex-nowrap duration-300 w-full items-center gap-2 font-semibold text-red-500'>
                                <div><FaCaretRight className={"text-red-500"} /></div>
                                <div>{notificationStep.text}</div>
                                <div><FaPlus className='rotate-45 text-red-500' /></div>
                              </div>)
                          default:
                            return (
                              <div key={index} className='flex flex-nowrap duration-300 w-full items-center gap-2 font-semibold'>
                                <div><FaCaretRight /></div>
                                <div>{notificationStep.text}</div>
                              </div>)
                        }

                      })
                      : ""
                  }
                  <div className="flex flex-col mt-2">
                    <p className="text-sm text-gray-500">
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">

                  {
                    props.progressStepMonitor.status === RequestStatus.CONCLUDED ?
                      <TransparentButton btntype={"SUCCESS"} onClick={closeModal} starticon={<FaCheck />}>
                        Completed
                      </TransparentButton>
                      : ""
                  }

                  <TransparentButton btntype={"ERROR"} onClick={closeModal} starticon={<FaPlus className={"rotate-45"} />}>
                    Close
                  </TransparentButton>
                  {/* <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button> */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
};
export default Modal;
export type { ModalProps, NotificationStep };
export { NotificationModal }