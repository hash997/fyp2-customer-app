import Amplify from "aws-amplify";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import awsmobile from "./src/aws-exports";
import { JobRequestProvider } from "./state-store/job-request-state";
import { AuthProvider } from "./state-store/auth-state";
import { OfferProvider } from "./state-store/offers-provider";
Amplify.configure(awsmobile);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthProvider>
          <OfferProvider>
            <JobRequestProvider>
              <Navigation colorScheme={colorScheme} />
            </JobRequestProvider>
          </OfferProvider>
        </AuthProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
