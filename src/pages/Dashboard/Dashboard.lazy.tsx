import React, { lazy, Suspense } from 'react';
import SideNavVisibilityProp from '../../components/MainNavigationView/SideNavVisibilityProp';

const LazyDashboard = lazy(() => import('./Dashboard'));

const Dashboard = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; } & SideNavVisibilityProp) => (
  <Suspense fallback={null}>
    <LazyDashboard {...props} />
  </Suspense>
);

export default Dashboard;
