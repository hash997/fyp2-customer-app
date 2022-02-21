import { API } from "aws-amplify";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { dayToString, formatAMPM, monthToString } from "../../helpers/time";
import { AppointmentStatus, Offer, OfferStatus } from "../../src/API";
import { createAppointment, updateOffer } from "../../src/graphql/mutations";
import { useAuth } from "../../state-store/auth-state";

const OfferCard = ({ offer }: { offer: Offer }) => {
  const { user } = useAuth();

  if (!offer) {
    return <Text>No job request for this job</Text>;
  }

  const handleAcceptOffer = async () => {
    if (!user || !offer.id) return;
    try {
      const updateOfferRes = await API.graphql({
        query: updateOffer,
        variables: {
          updateOfferInput: {
            id: offer.id,
            status: OfferStatus.ACCEPTED,
          },
        },
      });

      const createAptRes = await API.graphql({
        query: createAppointment,
        variables: {
          createAppointmentInput: {
            status: AppointmentStatus.UPCOMING,
            offerId: offer.id,
            customerId: user.id,
            workerId: offer.workerId,
          },
        },
      });
    } catch (error) {}
  };
  return (
    <View
      style={{
        width: "100%",
        borderColor: "#0C4160",
        borderWidth: 1,
        maxHeight: "50%",
        marginVertical: 10,
        borderRadius: 10,
        padding: 15,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 5,
        }}
      >
        <View style={{ width: "50%" }}>
          <Text style={{ fontWeight: "800", fontSize: 20, color: "#0C4160" }}>
            Offer price
          </Text>
          <Text style={{ fontWeight: "500", fontSize: 20, color: "#0C4160" }}>
            RM{offer?.price}
          </Text>
        </View>
        <View
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              marginLeft: 10,
              fontSize: 20,
              color: "#0C4160",
            }}
          >
            {/* at {formatAMPM(new Date(offer?.suggestedTime))} */}
            {dayToString(new Date(offer.suggestedTime).getDay())}{" "}
            {formatAMPM(new Date(offer.suggestedTime))}
          </Text>
          <Text
            style={{
              fontWeight: "500",
              color: "#0C4160",
              marginLeft: 10,
              fontSize: 20,
            }}
          >
            {/* at {formatAMPM(new Date(offer?.suggestedTime))} */}
            {monthToString(new Date(offer.suggestedTime).getMonth())}{" "}
            {new Date(offer.suggestedTime).getDate()}
          </Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          maxHeight: "40%",
          // overflow: "hidden",
        }}
      >
        <View style={{}}>
          <Text style={{ fontWeight: "800", fontSize: 15, color: "#0C4160" }}>
            {offer?.jobRequest?.title}
          </Text>
          <Text style={{ fontWeight: "800", fontSize: 15, color: "#0C4160" }}>
            Vendor's location: {offer?.vendorsLocation}
          </Text>
          <Text style={{ fontWeight: "500", fontSize: 15, color: "#0C4160" }}>
            {offer.jobRequest?.description}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor:
              offer.status === OfferStatus.ACCEPTED ? "green" : "#0C4160",
            padding: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={handleAcceptOffer}
        >
          <Text style={{ color: "white", fontSize: 20 }}>
            {offer.status === OfferStatus.ACCEPTED
              ? "Offer Accepted"
              : "Accept offer"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OfferCard;
