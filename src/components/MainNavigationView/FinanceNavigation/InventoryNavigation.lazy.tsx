import React, { lazy, Suspense } from 'react';
import SideNavVisibilityProp from '../SideNavVisibilityProp';

const LazyFinanceNavigation = lazy(() => import('./FinanceNavigation'));

const FinanceNavigation = (props: SideNavVisibilityProp) => (
  <Suspense fallback={null}>
    <LazyFinanceNavigation {...props} />
  </Suspense>
);

export default FinanceNavigation;
