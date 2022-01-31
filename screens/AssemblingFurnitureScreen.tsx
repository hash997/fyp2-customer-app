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
  useJobRequest,
  useDispatchJobRequest,
} from "../state-store/job-request-state";
import { MaterialIcons } from "@expo/vector-icons";

const items = [1, 2, 3, 4];
const furnitureArr = ["Desk or Table", "Bed Frame", "Chair", "Other"];

const AssemblingFurnitureScreen = (props: any) => {
  const currentJobRequest = useJobRequest();
  const dispatchCurrentInquiry = useDispatchJobRequest();

  const [noOfItems, setNoOfItems] = useState(0);
  const [selectedFurniture, setSelectedFurniture] = useState<
    number | undefined
  >();
  const [furniture, setFurniture] = useState<string>("");
  const [otherFur, setOtherFur] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<number | undefined>(
    undefined
  );
  const [isUrgent, setIsUrgent] = useState<string | undefined>();

  useEffect(() => {}, [currentJobRequest]);
  useEffect(() => {
    // dispatchCurrentInquiry({
    //   type: "clear",
    // });
    dispatchCurrentInquiry({
      type: "update",
      payload: {
        ...currentJobRequest,
        currentStep: 1,
      },
    });
  }, []);

  console.log("length of other furn => ", currentJobRequest);
  return (
    <View style={styles.container}>
      <View style={{ marginTop: "30%" }}>
        {currentJobRequest.currentStep === 1 && (
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
                    console.log("i =>", i);
                    setSelectedItem(i);
                    setNoOfItems(i + 1);
                  }}
                >
                  <Text style={styles.boxTxt}>{item > 3 ? "other" : item}</Text>
                </Pressable>
              );
            })}
            {noOfItems > 3 && (
              <TextInput
                style={[styles.txtInpt, { width: "100%" }]}
                placeholder="How many Items"
                keyboardType="numeric"
                onChangeText={(value) => {
                  const val = +value;
                  console.log("fucking val =>", val);
                  if (val < 3) {
                    setNoOfItems(val - 1);
                    setSelectedItem(val - 1);
                    return;
                  }
                  setNoOfItems(+value);
                }}
              />
            )}
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                if (currentJobRequest.currentStep === 3) {
                  props.navigation.navigate("PickLocation");
                  return;
                }
                setNoOfItems(0);
                dispatchCurrentInquiry({
                  type: "update",
                  payload: {
                    ...currentJobRequest,
                    currentStep: currentJobRequest.currentStep + 1,
                    job: {
                      ...currentJobRequest.job,
                      numberOfItem: noOfItems,
                    },
                  },
                });
              }}
            >
              <Text style={styles.btnTxt}>Continue</Text>
            </TouchableOpacity>
          </>
        )}

        {currentJobRequest.currentStep === 2 && (
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
            {noOfItems > 3 && (
              <>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TextInput
                    style={styles.txtInpt}
                    placeholder="please specify what furniture..."
                    value={furniture}
                    onChangeText={(value) => {
                      setFurniture(value);
                    }}
                  />
                  <TouchableOpacity
                    style={[
                      styles.txtInptBtn,
                      {
                        opacity:
                          otherFur &&
                          otherFur.length === currentJobRequest.job.numberOfItem
                            ? 0.5
                            : 1,
                      },
                    ]}
                    disabled={
                      otherFur &&
                      otherFur.length === currentJobRequest.job.numberOfItem
                    }
                    onPress={() => {
                      if (
                        (otherFur &&
                          otherFur.length ===
                            currentJobRequest.job.numberOfItem) ||
                        furniture.length == 0
                      )
                        return;
                      setOtherFur((prev) => [...prev, furniture]);
                      setFurniture("");
                    }}
                  >
                    <MaterialIcons name="add" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </>
            )}
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                if (selectedFurniture === undefined) return;
                if (currentJobRequest.currentStep === 3) {
                  props.navigation.navigate("PickLocation");
                  return;
                }
                setNoOfItems(0);
                dispatchCurrentInquiry({
                  type: "update",
                  payload: {
                    ...currentJobRequest,
                    currentStep: currentJobRequest.currentStep + 1,
                    job: {
                      ...currentJobRequest.job,
                      items:
                        otherFur.length > 0
                          ? otherFur
                          : [furnitureArr[selectedFurniture]],
                    },
                  },
                });
              }}
            >
              <Text style={styles.btnTxt}>Continue</Text>
            </TouchableOpacity>
          </>
        )}

        {currentJobRequest.currentStep === 3 && (
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
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                if (currentJobRequest.currentStep === 3) {
                  props.navigation.navigate("PickLocation");
                  return;
                }
              }}
            >
              <Text style={styles.btnTxt}>Continue</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "grey" }]}
          onPress={() => {
            dispatchCurrentInquiry({
              type: "update",
              payload: {
                ...currentJobRequest,
                currentStep: currentJobRequest.currentStep - 1,
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
  txtInpt: {
    marginVertical: 5,
    width: "80%",
    height: 50,
    borderWidth: 2,
    borderColor: "#eee",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  txtInptBtn: {
    marginVertical: 5,
    width: "17%",
    height: 50,
    // borderWidth: 2,
    // borderColor: "#eee",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#0C4160",
  },
});

export default AssemblingFurnitureScreen;
