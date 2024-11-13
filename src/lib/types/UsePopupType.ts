import { ComponentProps, FunctionComponent } from 'react';

export type OpenPopupType = <T extends FunctionComponent<any>>(
  Component: T,
  props?: Omit<ComponentProps<T>, 'open' | 'close'>,
) => void;

export type ClosePopupType = <T extends FunctionComponent<any>>(
  Component: T,
  unmountTime?: number,
) => void;

export type ClearPopupExceptType = <T extends FunctionComponent<any>>(
  Component?: T,
) => void;
