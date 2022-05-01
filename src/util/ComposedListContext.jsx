import * as React from "react";

export const ComposedListContext = React.createContext();

export const ComposedListProvider = (props) => {
  const [list, SetList] = React.useState([]);
  return (
    <ComposedListContext.Provider value={[list, SetList]}>
      {props.children}
    </ComposedListContext.Provider>
  );
};
