import * as React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { appStyles } from "../styles";

import { RootStackScreenProps } from "../types";
import { Formik } from "formik";

import * as Yup from "yup";
import Auth from "@aws-amplify/auth";
import { useState } from "react";

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8)
    .required()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Must Contain One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

const SignIn = ({ navigation }: RootStackScreenProps<"SignIn">) => {
  const [error, setError] = useState<string | undefined>(undefined);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={appStyles.container}>
          <View style={appStyles.TitlTxtCntr}>
            <Text style={appStyles.title}>Sign In</Text>
          </View>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={SigninSchema}
            onSubmit={async (values) => {
              console.log(values);
              try {
                const signInRes = await Auth.signIn({
                  username: values.email,
                  password: values.password,
                });
                console.log("signInRes =>", signInRes);
              } catch (error) {
                console.log("shit went south signing in =>", error);
                // setError(error?.message);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View
                  style={[
                    appStyles.txtInputCntr,
                    {
                      borderColor:
                        errors.email && touched.email ? "red" : "#ABC7E3",
                    },
                  ]}
                >
                  <TextInput
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholder={"Email"}
                    style={appStyles.txtInput}
                    keyboardType="email-address"
                  />
                </View>
                <Text style={{ color: "red", width: "100%" }}>
                  {errors.email && touched.email && errors.email}
                </Text>
                <View
                  style={[
                    appStyles.txtInputCntr,
                    {
                      borderColor:
                        errors.password && touched.password ? "red" : "#ABC7E3",
                    },
                  ]}
                >
                  <TextInput
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    placeholder={"Password"}
                    secureTextEntry={true}
                    style={appStyles.txtInput}
                  />
                </View>
                <Text style={{ color: "red", width: "100%" }}>
                  {errors.password && touched.password && errors.password}
                </Text>

                <Text style={{ color: "red", width: "100%" }}>{error}</Text>
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={appStyles.btnCntr}
                >
                  <Text style={appStyles.btnTxt}>SignIn</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
          <TouchableOpacity
            onPress={() => navigation.replace("SignUp")}
            style={{ width: "100%", marginTop: 10 }}
          >
            <Text style={appStyles.linkText}>Sign Up instead?</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
