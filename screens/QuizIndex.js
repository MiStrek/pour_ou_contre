import React from "react";
import { ScrollView, StatusBar } from "react-native";

import Question1 from "../data/liste1";
import { RowItem } from "../components/RowItem";


function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;}


export default ({ navigation }) => (
  <ScrollView>
    <StatusBar barStyle="dark-content" />
    <RowItem
      name="Liste 1"
      color="#36b1f0"
      onPress={() =>
        navigation.navigate("Quiz", {
          title: "Liste 1",
          questions: getRandom(Question1,3),
          color: "#36b1f0"
        })
      }
    />
  </ScrollView>
);
