import React, { createContext, useContext, ReactNode } from 'react';
import { I18nManager } from 'react-native';

type LocaleContextType = {
  direction: 'ltr' | 'rtl';
  locale: string;
};

const defaultLocale: LocaleContextType = {
  direction: I18nManager.isRTL ? 'rtl' : 'ltr',
  locale: 'en-US',
};

const LocaleContext = createContext<LocaleContextType>(defaultLocale);

export const LocaleProvider = ({
  children,
  direction,
  locale,
}: {
  children: ReactNode;
  direction: 'ltr' | 'rtl';
  locale: string;
}) => {
  return (
    <LocaleContext.Provider value={{ direction, locale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export function useLocale() {
  return useContext(LocaleContext);
}
