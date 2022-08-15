import React, { lazy, Suspense } from 'react';
import { CardProps } from './Card';

const LazyCard = lazy(() => import('./Card'));

const Card = (props: JSX.IntrinsicAttributes & CardProps) => (
  <Suspense fallback={null}>
    <LazyCard {...props} />
  </Suspense>
);

export default Card;
