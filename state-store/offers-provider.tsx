import { API } from "aws-amplify";
import React, { Dispatch, Reducer, useEffect } from "react";
import { useReducer, useContext, createContext } from "react";
import { Offer } from "../src/API";
import { offersByCustomerId } from "../src/graphql/queries";
import { useAuth } from "./auth-state";

export interface OffersState {
  offers: Offer[] | [];
}

const initialState: OffersState = {
  offers: [],
};
interface Action {
  type: string;
  payload?: OffersState;
}

export enum ActionType {
  ADD_TO_NEW_OFFER = "ADD_TO_NEW_OFFER",
  CLEAR = "CLEAR",
}

const OfferStateContext = createContext(initialState);
const OfferDispatchContext = createContext<Dispatch<Action>>(
  {} as Dispatch<Action>
);

const reducer = (currentOffer: OffersState, action: Action) => {
  switch (action.type) {
    case ActionType.ADD_TO_NEW_OFFER:
      if (!action.payload) throw new Error("payload is empty");

      return { ...currentOffer, offers: action.payload?.offers };

    case ActionType.CLEAR:
      return (currentOffer = initialState);

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const OfferProvider: React.FC = ({ children }) => {
  const [currentOffer, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuth();

  const getOffers = async () => {
    if (!user) return;
    try {
      const offersRes: any = await API.graphql({
        query: offersByCustomerId,
        variables: {
          customerId: user.id,
        },
      });

      dispatch({
        type: ActionType.ADD_TO_NEW_OFFER,
        payload: {
          ...currentOffer,
          offers: offersRes.data.offersByCustomerId,
        },
      });
    } catch (error) {
      dispatch({
        type: "clear",
      });
    }
  };

  useEffect(() => {
    if (!user) return;
    getOffers();
  }, [user]);

  return (
    <OfferDispatchContext.Provider value={dispatch}>
      <OfferStateContext.Provider value={currentOffer}>
        {children}
      </OfferStateContext.Provider>
    </OfferDispatchContext.Provider>
  );
};

export const useOffer = () => useContext(OfferStateContext);
export const useDispatchOffer = () => useContext(OfferDispatchContext);
