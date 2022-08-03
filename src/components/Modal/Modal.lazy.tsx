import React, { lazy, Suspense } from 'react';
import { ModalProps } from './Modal';

const LazyModal = lazy(() => import('./Modal'));

const Modal = (props: ModalProps & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyModal {...props} />
  </Suspense>
);

export default Modal;
