import React, { lazy, Suspense } from 'react';
import { TabMenuProps } from './TabMenu';

const LazyTabMenu = lazy(() => import('./TabMenu'));

const TabMenu = (props: TabMenuProps) => (
  <Suspense fallback={null}>
    <LazyTabMenu {...props} />
  </Suspense>
);

export default TabMenu;
