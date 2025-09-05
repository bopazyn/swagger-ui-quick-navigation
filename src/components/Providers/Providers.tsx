import { type ReactNode } from 'react';
import { StyleSheetManager } from 'styled-components';
import { type InsertionTarget } from 'styled-components/dist/types';

interface ProvidersProps {
  children: ReactNode;
  target?: InsertionTarget;
}

export const Providers = (props: ProvidersProps) => (
  <StyleSheetManager target={props.target}>
    {props.children}
  </StyleSheetManager>
);
