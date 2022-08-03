import React, { lazy, Suspense } from 'react';
import SideNavVisibilityProp from '../../components/MainNavigationView/SideNavVisibilityProp';

const LazyInventoriesPage = lazy(() => import('./InventoriesPage'));

const InventoriesPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; } & SideNavVisibilityProp) => (
  <Suspense fallback={null}>
    <LazyInventoriesPage {...props} />
  </Suspense>
);

export default InventoriesPage;
