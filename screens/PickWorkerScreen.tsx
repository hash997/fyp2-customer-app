import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Platform } from "react-native";
import { workersByCity } from "../src/graphql/queries";
import { Worker } from "../src/API";
import { useJobRequest } from "../state-store/job-request-state";
import WorkerProfile from "../components/home/WorkerProfile";
import DateTimePicker, {
  WindowsDatePickerChangeEvent,
} from "@react-native-community/datetimepicker";
import { appStyles } from "../styles";
import { dayToString, months } from "../helpers/time";

const PickWorkerScreen = (props: any) => {
  const [nearByWorkers, setNearByWorkers] = useState<Worker[] | undefined>();
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState<Date | undefined>(undefined);
  const [step, setStep] = useState(0);
  const { job } = useJobRequest();
  // const [date, setDate] = useState(
  //   new Date(
  //     `new Date().getFullYear(),
  //     new Date().getMonth(),
  //     new Date().getDay() + 1`
  //   )
  // );
  // prettier-ignore
  const [date, setDate] = useState(new Date(new Date(`${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate() + 2}`).setHours(10, 0, 0, 0)));

  const onChange = (
    event: WindowsDatePickerChangeEvent,
    selectedDate: Date
  ) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const getNearByWorkers = async () => {
    try {
      const workersRes: any = API.graphql({
        query: workersByCity,
        variables: {
          city: "Cyberjaya",
          speciality: "HANDYMAN",
        },
      });
      const workersData = await workersRes;
      setNearByWorkers(workersData?.data?.workersByCity);
    } catch (error) {}
  };

  useEffect(() => {
    getNearByWorkers();
  }, []);

  if (loading || !nearByWorkers) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Getting near by workers...</Text>
      </View>
    );
  }
  if (nearByWorkers?.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No near by workers...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
      {step === 0 && (
        <>
          <View
            style={{
              width: "100%",
              display: "flex",
              marginBottom: 20,
            }}
          >
            <View>
              <Text style={appStyles.title}>Pick Date </Text>
            </View>
            <View
              style={{
                marginBottom: 10,
              }}
            >
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={"date"}
                maximumDate={
                  new Date(
                    new Date().getFullYear(),
                    new Date().getMonth() + 1,
                    new Date().getDate() + 1
                  )
                }
                minimumDate={new Date()}
                // @ts-ignore
                onChange={onChange}
              />
            </View>

            <View
              style={{
                display: "flex",
                justifyContent: "flex-start",
                // marginRight: 100,
              }}
            >
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={"time"}
                is24Hour={true}
                // @ts-ignore
                onChange={onChange}
              />
            </View>
          </View>
        </>
      )}

      <View style={{ marginBottom: 20 }}>
        <Text style={appStyles.title}>Choose Worker</Text>
      </View>
      <ScrollView>
        {nearByWorkers.map((worker) => (
          <WorkerProfile
            worker={worker}
            key={worker.id}
            navigation={props.navigation}
            jobDate={date}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default PickWorkerScreen;
