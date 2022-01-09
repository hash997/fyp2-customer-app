import React, { Dispatch, Reducer } from "react";
import { useReducer, useContext, createContext } from "react";
import { CurrentInquiry } from "../current-inquiry-type";

const initialState: CurrentInquiry = {
  currentStep: 0,
} as CurrentInquiry;
interface Action {
  type: string;
  payload?: CurrentInquiry;
}

const CurrentInquiryStateContext = createContext(initialState);
const CurrentInquiryDispatchContext = createContext<Dispatch<Action>>(
  {} as Dispatch<Action>
);

const reducer = (currentInquiry: CurrentInquiry, action: Action) => {
  switch (action.type) {
    case "update":
      if (!action.payload) throw new Error("payload is empty");
      return (currentInquiry = action.payload);
    case "clear":
      return (currentInquiry = initialState);
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const CurrentInquiryProvider: React.FC = ({ children }) => {
  const [currentInquiry, dispatch] = useReducer(reducer, initialState);
  return (
    <CurrentInquiryDispatchContext.Provider value={dispatch}>
      <CurrentInquiryStateContext.Provider value={currentInquiry}>
        {children}
      </CurrentInquiryStateContext.Provider>
    </CurrentInquiryDispatchContext.Provider>
  );
};

export const useCurrentInquiry = () => useContext(CurrentInquiryStateContext);
export const useDispatchCurrentInquiry = () =>
  useContext(CurrentInquiryDispatchContext);
