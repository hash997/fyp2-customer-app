import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { workersByCity } from "../src/graphql/queries";
import { Worker } from "../src/API";
import { useJobRequest } from "../state-store/job-request-state";
import WorkerProfile from "../components/home/WorkerProfile";

const PickWorkerScreen = (props: any) => {
  const [nearByWorkers, setNearByWorkers] = useState<Worker[] | undefined>();
  const { job } = useJobRequest();

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

  if (!nearByWorkers) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
      <ScrollView>
        {nearByWorkers.map((worker) => (
          <WorkerProfile
            worker={worker}
            key={worker.id}
            navigation={props.navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default PickWorkerScreen;
