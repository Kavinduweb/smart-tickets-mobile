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

const AddJourney = ({navigation}) => {

    const [uniqueID, setUniqueID] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [distance, setDistance] = useState("");
    const [price, setPrice] = useState("");
  
    const [validated, setValidated] = useState(false);
  
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
  
    const addJourney = async (e) => {
     try {
        if (start === "" || end === "" || distance === "") {
            alert("Please provide all the fields");
        }
        
        
        const newStudent = {
          uniqueID,
          start,
          end,
          distance,
        price,
        };

  
        await axios
          .post("http://192.168.8.113:5000/journey/add", newStudent)
          .then((res) => {
            alert("Journey Booked");
            console.log(res.data);
          });

      }catch (error) {
        console.log(error);
        }
    };
     
  
    const calcDistance = (e) => {
      const price = distance * 50;
  
      setPrice(price);
    };
  

  return (
    <ScrollView style={styles.container}>
          {price && <Text>Price : Rs.{price}/=</Text>}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Starting Point"
          onChangeText={(e) => setStart(e)}
          value={start}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Destination"
          onChangeText={(e) => setEnd(e)}
          value={end}
        />
      </View>
     

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Distance"
          onChangeText={(e) => setDistance(e)}
          value={distance}
        />
        <Button title="Calculate Vala" value={distance}  onPress={(e) => calcDistance(e.target.value)}/>
      </View>

      


      

      <View style={styles.inputGroup}>
        <Button title="Save User" onPress={() => addJourney()} />
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

export default AddJourney;
