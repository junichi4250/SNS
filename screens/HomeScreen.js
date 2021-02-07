import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, TextInput } from "react-native";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";

const URL = "https://us-central1-random-qiita-api-be836.cloudfunctions.net/get";

export default function HomeScreen() {
  const [articles, setArticles] = useState("");
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(URL);
      setArticles(response.data.url);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{articles}</Text>
    </View>
  );
}
