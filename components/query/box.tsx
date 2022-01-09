import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface BoxProps {
  step: number;
  index: number;
  selected: number | undefined;
  setSelectedItem: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const Box = (props: BoxProps) => {
  const { selected, setSelectedItem, index, step } = props;
  return (
    <>
      <Pressable
        style={[
          styles.box,
          { borderColor: selected === index ? "darkblue" : "#eee" },
        ]}
        onPress={() => {}}
      >
        <Text style={styles.boxTxt}></Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    marginVertical: 5,
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderColor: "#eee",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    paddingLeft: 20,
  },
  boxTxt: {
    color: "#0C4160",
    fontWeight: "400",
    fontSize: 16,
  },
});
export default Box;
