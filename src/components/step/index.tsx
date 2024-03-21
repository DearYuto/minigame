import React from 'react';

type Props = {
  shouldRender: boolean;
  children: React.ReactNode;
};

export default function Step({ shouldRender, children }: Props) {
  if (shouldRender === true) return children;

  return null;
}
