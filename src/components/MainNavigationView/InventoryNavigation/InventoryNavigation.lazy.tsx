import React, { lazy, Suspense } from 'react';
import { InventoryNavigationProps } from './InventoryNavigation';

const LazyInventoryNavigation = lazy(() => import('./InventoryNavigation'));

const InventoryNavigation = (props: InventoryNavigationProps) => (
  <Suspense fallback={null}>
    <LazyInventoryNavigation {...props} />
  </Suspense>
);

export default InventoryNavigation;
