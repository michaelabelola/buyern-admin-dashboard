import React, { lazy, Suspense } from 'react';
import SideNavVisibilityProp from '../SideNavVisibilityProp';

const LazyUsersNavigation = lazy(() => import('./UsersNavigation'));

const UsersNavigation = (props: SideNavVisibilityProp) => (
  <Suspense fallback={null}>
    <LazyUsersNavigation {...props} />
  </Suspense>
);

export default UsersNavigation;
