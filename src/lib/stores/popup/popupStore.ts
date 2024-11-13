import { createStore } from 'zustand';
import {
  ClearPopupExceptType,
  ClosePopupType,
  OpenPopupType,
} from '@/src/lib/types/UsePopupType';

interface Popups<T = any> {
  Component: React.ComponentType<T>;
  props: T;
}

interface PopupState {
  popups: Popups[];
}

interface PopupAction {
  setPopups: (updater: (prevPopups: Popups[]) => Popups[]) => void;
  openPopup: OpenPopupType;
  closePopup: ClosePopupType;
  clearPopupExcept: ClearPopupExceptType;
}

export type PopupStoreType = PopupState & PopupAction;

export const defaultInitState: PopupState = {
  popups: [],
};

export function createPopupStore(initState: PopupState = defaultInitState) {
  return createStore<PopupStoreType>()((set) => ({
    ...initState,
    setPopups: (updater) => set((state) => ({ popups: updater(state.popups) })),
    openPopup: (Component, props) => {
      set((state) => {
        const isAlreadyOpen = state.popups.some(
          (popup) => popup.Component === Component,
        );

        if (isAlreadyOpen) {
          return state;
        }

        return {
          popups: [
            ...state.popups,
            {
              Component,
              props: {
                ...props,
                open: true,
                close: () => state.closePopup(Component),
              },
            },
          ],
        };
      });
    },
    clearPopupExcept: (Component) => {
      set((state) => ({
        popups: state.popups.map((popup) => {
          if (popup.props.closeOnNavigation && popup.Component !== Component) {
            return {
              Component: popup.Component,
              props: { ...popup.props, open: false },
            };
          }
          return popup;
        }),
      }));

      setTimeout(() => {
        set((state) => ({
          popups: state.popups.filter((popup) => popup.props.open),
        }));
      }, 200);
    },
    closePopup: (Component) => {
      set((state) => {
        const newPopups = state.popups.filter(
          (popup) => popup.Component !== Component,
        );
        return { popups: newPopups };
      });
    },
  }));
}
