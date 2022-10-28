import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";


const CreateUserScreen = ({navigation}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiry, setInquiry] = useState("");

  const addUser = async (props) => {
    try {
    if (name === "" || email === "" || inquiry === "") {
      alert("Please provide all the fields");
    } else {
      const data = {
        name,
        email,
        inquiry,
      };
      await axios
        .post("http://192.168.8.113:5000/inquiry/add", data)
        .then((res) => {
          console.log(res.data);
        });
        alert("User Created Successfully");

        await axios.get('http://192.168.8.113:5000/inquiry/')

        navigation.navigate("UsersList");
    }
    } catch (error) {
        console.log(error);
        }

  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="User Name"
          onChangeText={(e) => setName(e)}
          value={name}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="User Email"
          onChangeText={(e) => setEmail(e)}
          value={email}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="User Phone"
          onChangeText={(e) => setInquiry(e)}
          value={inquiry}
        />
      </View>

      <View style={styles.inputGroup}>
        <Button title="Save User" onPress={() => addUser()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});

export default CreateUserScreen;
