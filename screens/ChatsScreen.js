import { StyleSheet, Text, View ,ScrollView, Pressable} from "react-native";
import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import { UserType } from "../UserContext";
import { useNavigation ,useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import UserChat from "../components/UserChat";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const ChatsScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const focus = useIsFocused();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Swift Chat</Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons onPress={() => navigation.navigate("Users")} name="person-add-outline" size={17} color="black" ></Ionicons>
          <MaterialIcons
            onPress={() => navigation.navigate("Friends")}
            name="people-outline"
            size={24}
            color="black"
          />
          <Text style={{ fontSize: 10, fontWeight: "bold" }}
          onPress={() => {
            AsyncStorage.removeItem("authToken");
            navigation.navigate("Login")
          }}
          >
            Logout
          </Text>
        </View>
      ),
    });
  }, []);
  
  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      axios
        .get(`http://192.168.197.253:8000/users/${userId}`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log("error retrieving users", error);
        });
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const acceptedFriendsList = async () => {
      try {
        const response = await fetch(
          `http://192.168.197.253:8000/accepted-friends/${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          setAcceptedFriends(data);
        }
      } catch (error) {
        console.log("error showing the accepted friends", error);
      }
    };

    acceptedFriendsList();
    if(focus == true){
      acceptedFriendsList();
   }
  }, [focus]);

  console.log("friends",acceptedFriends)
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable>
          {acceptedFriends.map((item,index) => (
              <UserChat key={index} item={item}/>
          ))}
      </Pressable>
    </ScrollView>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
