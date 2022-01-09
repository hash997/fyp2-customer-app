import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import {
  useCurrentInquiry,
  useDispatchCurrentInquiry,
} from "../state-store/current-inquiry-state";

const items = [1, 2, 3, 4];
const furnitureArr = ["Desk or Table", "Bed Frame", "Chair", "Other"];

const AssemblingFurnitureScreen = (props: any) => {
  const currentInquiry = useCurrentInquiry();
  const dispatchCurrentInquiry = useDispatchCurrentInquiry();

  const [noOfItems, setNoOfItems] = useState(0);
  const [selectedFurniture, setSelectedFurniture] =
    useState<number | undefined>();
  const [selectedItem, setSelectedItem] =
    useState<number | undefined>(undefined);
  const [isUrgent, setIsUrgent] = useState<string | undefined>();

  useEffect(() => {}, [currentInquiry]);
  useEffect(() => {
    dispatchCurrentInquiry({
      type: "update",
      payload: {
        ...currentInquiry,
        currentStep: 1,
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: "30%" }}>
        {currentInquiry.currentStep === 1 ? (
          <>
            <Text style={styles.title}>How many Items need assembly?</Text>
            {items.map((item, i) => {
              return (
                <Pressable
                  key={item}
                  style={[
                    styles.box,
                    { borderColor: selectedItem === i ? "darkblue" : "#eee" },
                  ]}
                  onPress={() => {
                    setSelectedItem(i);
                    setNoOfItems(i + 1);
                  }}
                >
                  <Text style={styles.boxTxt}>{item > 3 ? "other" : item}</Text>
                </Pressable>
              );
            })}
            {noOfItems > 3 ? (
              <TextInput
                style={styles.box}
                placeholder="How many Items"
                keyboardType="numeric"
                onChangeText={(value) => {
                  const val = +value;
                  if (val < 3) return;
                  setNoOfItems(+value);
                }}
              />
            ) : undefined}
          </>
        ) : undefined}

        {currentInquiry.currentStep === 2 ? (
          <>
            <Text style={styles.title}>
              What kind of furniture would like assembled?
            </Text>
            {furnitureArr.map((item, i) => {
              return (
                <Pressable
                  key={item}
                  style={[
                    styles.box,
                    {
                      borderColor:
                        selectedFurniture === i ? "darkblue" : "#eee",
                    },
                  ]}
                  onPress={() => {
                    setSelectedItem(i);
                    setSelectedFurniture(i);
                    setNoOfItems(i + 1);
                  }}
                >
                  <Text style={styles.boxTxt}>{i > 3 ? "other" : item}</Text>
                </Pressable>
              );
            })}
            {noOfItems > 3 ? (
              <TextInput
                style={styles.box}
                placeholder="please specify what furniture..."
                onChangeText={(value) => {
                  const val = +value;
                  if (val < 3) return;
                  setNoOfItems(+value);
                }}
              />
            ) : undefined}
          </>
        ) : undefined}

        {currentInquiry.currentStep === 3 ? (
          <>
            <Text style={styles.title}>Booking Type</Text>

            <Pressable
              style={[
                styles.box,
                {
                  height: "auto",
                  paddingVertical: 18,
                  borderColor: isUrgent === "urgent" ? "darkblue" : "#eee",
                },
              ]}
              onPress={() => {
                setIsUrgent("urgent");
              }}
            >
              <Text style={styles.bookingTypeTxt}>Urgent</Text>
              <Text style={styles.bookingTypeSmlTxt}>
                Your request will be sent to all the vendors in your area, and
                as someone accepts the job we'll notify you.
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.box,
                {
                  height: "auto",
                  paddingVertical: 18,
                  borderColor: isUrgent === "bookApt" ? "darkblue" : "#eee",
                },
              ]}
              onPress={() => {
                setIsUrgent("bookApt");
              }}
            >
              <Text style={styles.bookingTypeTxt}>Book Appointment </Text>
              <Text style={styles.bookingTypeSmlTxt}>
                Picking this option will allow you to view all the top vendors
                in your city, and allows you to choose the one.
              </Text>
            </Pressable>
          </>
        ) : undefined}

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (currentInquiry.currentStep === 3) {
              props.navigation.navigate("PickLocation");
              return;
            }
            setNoOfItems(0);
            dispatchCurrentInquiry({
              type: "update",
              payload: {
                ...currentInquiry,
                currentStep: currentInquiry.currentStep + 1,
              },
            });
          }}
        >
          <Text style={styles.btnTxt}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "grey" }]}
          onPress={() => {
            dispatchCurrentInquiry({
              type: "update",
              payload: {
                ...currentInquiry,
                currentStep: currentInquiry.currentStep - 1,
              },
            });
          }}
        >
          <Text style={styles.btnTxt}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", paddingHorizontal: 15 },
  title: {
    fontSize: 25,
    color: "#0C4160",
    fontWeight: "700",
    marginBottom: 10,
  },
  box: {
    marginVertical: 5,
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderColor: "#eee",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  boxTxt: {
    color: "#0C4160",
    fontWeight: "400",
    fontSize: 16,
  },
  btn: {
    marginTop: 15,
    marginBottom: 10,
    width: "100%",
    height: 50,
    backgroundColor: "#0C4160",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btnTxt: {
    fontSize: 25,
    color: "white",
    fontWeight: "700",
  },
  bookingTypeTxt: {
    fontWeight: "500",
    color: "#0C4160",
    fontSize: 22,
  },
  bookingTypeSmlTxt: {
    marginTop: 10,
    color: "#0C4160",
    opacity: 0.6,
  },
});

export default AssemblingFurnitureScreen;
