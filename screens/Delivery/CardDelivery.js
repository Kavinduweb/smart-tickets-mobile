import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardDelivery = ({navigation}) => {
    
    const [uniqueID, setUniqueID] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [province, setProvince] = useState("");
  
    useEffect((e) => {
      //Runs on every render
  
      try {
       
        AsyncStorage.getItem('vjs').then((value) => 
            

            
         axios.post('http://192.168.8.113:5000/user/view', {token: value})
        .then((res) => {
            console.log(res.data)
           setUniqueID(res.data.uniqueID)


        })    
        );

    

        } catch (error) {
        console.log(error);
        }
    });
  
    const addUser = async (e) => {
     try {
        if (address === "" || city === "" || province === "" || phone === "" || postalCode === "") {
            alert("Please provide all the fields");
            return false;
        }
        
        
        const newStudent = {
            uniqueID,
            address,
            city,
            phone,
            postalCode,
            province

        };

  
        await axios
          .post("http://192.168.8.113:5000/delivery/add", newStudent)
          .then((res) => {
            alert("Delivery Address Added");
            console.log(res.data);
          });

      }catch (error) {
        console.log(error);
        }
    };
     
  
   
  

  return (
    <ScrollView style={styles.container}>
          
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Address"
          onChangeText={(e) => setAddress(e)}
          value={address}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="City"
          onChangeText={(e) => setCity(e)}
          value={city}
        />
      </View>
     

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Phone"
          onChangeText={(e) => setPhone(e)}
          value={phone}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="province"
          onChangeText={(e) => setProvince(e)}
          value={province}
        />
      </View>


      <View style={styles.inputGroup}>
        <TextInput
          placeholder="postalCode"
          onChangeText={(e) => setPostalCode(e)}
          value={postalCode}
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

export default CardDelivery;
