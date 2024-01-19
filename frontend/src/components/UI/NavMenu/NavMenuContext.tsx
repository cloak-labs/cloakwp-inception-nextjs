import React from 'react';

/**
 * React Context for NavMenus. Provides composable parts with parent context,
 * enabling children parts to style themselves based on parent context, etc..
 */

export type NavMenuContextValue = {
  orientation?: 'vertical' | 'horizontal';
  triggerContentOnClick?: boolean;
  hasTrigger?: boolean;
};

const NavMenuContext = React.createContext<NavMenuContextValue>(
  {} as NavMenuContextValue
);

export const NavMenuProvider: React.FC<
  React.PropsWithChildren<{ value: NavMenuContextValue }>
> = ({ value, children }) => {
  const existingValue = useNavMenuContext();
  return (
    <NavMenuContext.Provider value={{ ...existingValue, ...value }}>
      {children}
    </NavMenuContext.Provider>
  );
};

export const useNavMenuContext = () => {
  const navContext = React.useContext(NavMenuContext);
  if (!navContext)
    throw new Error(
      '`useNavMenuContext` should only be used within <NavMenu> and its composable parts.'
    );

  return navContext;
};
