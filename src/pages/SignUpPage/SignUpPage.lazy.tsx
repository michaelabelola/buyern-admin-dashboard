import React, { lazy, Suspense } from 'react';

const LazySignUpPage = lazy(() => import('./SignUpPage'));

const SignUpPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySignUpPage {...props} />
  </Suspense>
);

export default SignUpPage;
