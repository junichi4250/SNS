import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, FlatList, SafeAreaView } from "react-native";
import { SearchBar } from "react-native-elements";
import axios from "axios";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchBar: {
    backgroundColor: "#fff",
    borderTopColor: "#fff",
    borderBottomColor: "#fff",
  },
  inputSearchBar: {
    //backgroundColor: "gray",
  },
});

const ListItem = ({ imageUrl, title, author, onPress }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.leftContainer}>
        {!!imageUrl && (
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: imageUrl }}
          />
        )}
      </View>
      <View style={styles.rightContainer}>
        <Text numberOfLines={3} style={styles.text}>
          {title}
        </Text>
        <Text style={styles.subText}>{author}</Text>
      </View>
    </TouchableOpacity>
  );
};

const URL =
  "https://newsapi.org/v2/top-headlines?country=jp&category=business&apiKey=b00bd4c115e142f9b3816c60673b3792";

export const SearchScreen = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(URL);
      console.log(response);
      setArticles(response.data.articles);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.inputSearchBar}
        placeholder="search"
        round="true"
      />
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtracror={(item) => item.id}
      />
    </SafeAreaView>
  );
};
