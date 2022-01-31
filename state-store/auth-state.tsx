import { Hub, HubCallback } from "@aws-amplify/core";
import { Auth } from "aws-amplify";
import React, { Dispatch, Reducer, useEffect } from "react";
import { useReducer, useContext, createContext } from "react";
import { AuthState, JobRequest, JobRequestState } from "../job-request-types";

const initialState: AuthState = {
  user: undefined,
};
interface Action {
  type: string;
  payload?: AuthState;
}

const AuthStateContext = createContext(initialState);
const AuthDispatchContext = createContext<Dispatch<Action>>(
  {} as Dispatch<Action>
);

const reducer = (currentUser: AuthState, action: Action) => {
  switch (action.type) {
    case "update":
      if (!action.payload) throw new Error("payload is empty");
      return (currentUser = action.payload);
    case "clear":
      return (currentUser = initialState);
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, dispatch] = useReducer(reducer, initialState);

  const authListener: HubCallback = async ({ payload: { event, data } }) => {
    switch (event) {
      case "signIn":
        dispatch({
          type: "update",
          payload: {
            user: data,
          },
        });
        break;
      case "signOut":
        dispatch({
          type: "clear",
        });
        break;
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    Hub.listen("auth", authListener);

    Auth.currentAuthenticatedUser()
      .then((data) => {
        dispatch({
          type: "update",
          payload: {
            user: data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "clear",
        });
      });
    return () => {
      Hub.remove("auth", authListener);
      abortController.abort();
    };
  }, []);

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={currentUser}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export const useAuth = () => useContext(AuthStateContext);
export const useDispatchAuth = () => useContext(AuthDispatchContext);
