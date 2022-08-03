import { RequestStatus } from "../Controllers/ObjectRequestHandler";
import { NotificationStep } from "./Modal/Modal";

class ProgressStepMonitor {
  isModalOpen: boolean;
  private setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  status: RequestStatus;
  notificationSteps: NotificationStep[];
  private setNotificationSteps: React.Dispatch<
    React.SetStateAction<NotificationStep[]>
  >;
  constructor(
    modalState: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    notifSteps: [
      NotificationStep[],
      React.Dispatch<React.SetStateAction<NotificationStep[]>>
    ]
  ) {
    this.isModalOpen = modalState[0];
    this.setModalOpen = modalState[1];
    this.notificationSteps = notifSteps[0];
    this.setNotificationSteps = notifSteps[1];
    this.status = RequestStatus.IDLE;
  }
  stepsCount = (): number =>
    this.notificationSteps ? this.notificationSteps.length : 0;
  updateLastStepInMonitor = (step: NotificationStep) => {
    if (!this.notificationSteps || this.notificationSteps.length < 1) {
      this.setNotificationSteps([step]);
    }
    let allSteps = [...this.notificationSteps];
    allSteps[allSteps.length - 1] = step;
    this.setNotificationSteps(allSteps);
  };
  addStep = (step: NotificationStep) => {
    // if (!this.notificationSteps || this.notificationSteps.length < 1) {
    //   this.setNotificationSteps([step]);
    // }
    // this.setNotificationSteps([...this.notificationSteps, step]);
    this.setNotificationSteps([step]);
  };
  show = () => {
    this.setModalOpen(true);
  };
  hide = () => {
    this.setModalOpen(false);
  };
  toggle = () => {
    this.isModalOpen ? this.setModalOpen(false) : this.setModalOpen(true);
  };
}
export default ProgressStepMonitor;
