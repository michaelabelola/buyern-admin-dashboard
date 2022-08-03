import React, { lazy, Suspense } from 'react';
import SideNavVisibilityProp from '../../../components/MainNavigationView/SideNavVisibilityProp';

const LazyRegisterInventoryPage = lazy(() => import('./RegisterInventoryPage'));

const RegisterInventoryPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; } & SideNavVisibilityProp) => (
  <Suspense fallback={null}>
    <LazyRegisterInventoryPage {...props} />
  </Suspense>
);

export default RegisterInventoryPage;
