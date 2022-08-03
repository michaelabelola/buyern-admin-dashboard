import React, { lazy, Suspense } from 'react';

const LazyInventoryOrdersPage = lazy(() => import('./InventoryOrdersPage'));

const InventoryOrdersPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyInventoryOrdersPage {...props} />
  </Suspense>
);

export default InventoryOrdersPage;
