import React, { lazy, Suspense } from 'react';
import { NavigationViewProps } from './NavigationView';

const LazyNavigationView = lazy(() => import('./NavigationView'));

const NavigationView = (props: NavigationViewProps) => (
  <Suspense fallback={null}>
    <LazyNavigationView {...props} />
  </Suspense>
);

export default NavigationView;
