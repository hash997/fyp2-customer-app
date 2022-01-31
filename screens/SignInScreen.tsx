import * as React from "react";
import { RootStackScreenProps } from "../types";
import SignIn from '../components/auth/SignIn'


const SignInScreen = ({ navigation }: RootStackScreenProps<"SignIn">) => {

  return (
    <SignIn navigation={navigation} />
  );
};

export default SignInScreen;
