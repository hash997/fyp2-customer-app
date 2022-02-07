import { Hub, HubCallback } from "@aws-amplify/core";
import { API, Auth } from "aws-amplify";
import React, { Dispatch, Reducer, useEffect } from "react";
import { useReducer, useContext, createContext } from "react";
import { AuthState, JobRequest, JobRequestState } from "../job-request-types";
import { customerById } from "../src/graphql/queries";

const initialState: AuthState = {
  user: undefined,
  congnitoUser: undefined,
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

  const getUser = async (userId: string) => {
    try {
      const userRes: any = await API.graphql({
        query: customerById,
        variables: { customerId: userId },
      });

      const userResData = await userRes;

      dispatch({
        type: "update",
        payload: {
          ...currentUser,
          user: userResData?.data?.customerById,
        },
      });
    } catch (error) {
      dispatch({
        type: "clear",
      });
    }
  };

  const authListener: HubCallback = async ({ payload: { event, data } }) => {
    switch (event) {
      case "signIn":
        getUser(data.attributes["custom:userId"]);

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
        getUser(data.attributes["custom:userId"]);

        dispatch({
          type: "update",
          payload: {
            ...currentUser,
            congnitoUser: data,
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
