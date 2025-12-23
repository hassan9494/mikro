declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '*.gif';
declare module '*.webp';
declare module 'stylis-plugin-rtl' {
  const noTypesYet: any;
  export default noTypesYet;
}

declare module 'react-intl' {
  import type { ComponentType } from 'react';

  export const FormattedMessage: ComponentType<any>;
  export const IntlProvider: ComponentType<any>;
  export function useIntl(): {
    formatMessage: (descriptor: { id: string; defaultMessage?: string }, values?: Record<string, any>) => string;
    [key: string]: any;
  };
}
