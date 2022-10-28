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

const PayForCard = ({navigation}) => {
    

    const [uniqueID, setUniqueID] = useState("");
    const [info, setInfo] = useState("");
    const [card, setCard] = useState("");
    const [expire, setExpire] = useState("");
    const [cvv, setCvv] = useState("");
    const [price, setPrice] = useState(1000);
  
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
  
    const addPayment = async (e) => {
     try {
        if (card === "" || expire === "" || cvv === "") {
            alert("Please provide all the fields");
        }
        
        
        const newPay = {
            uniqueID,
            info:"One Time Payment for Smart Card",
            card,
            expire,
            cvv,
            price
        };

  
        await axios
          .post("http://192.168.8.113:5000/payment/add", newPay)
          .then((res) => {
            alert("Payment Added");
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
          placeholder="Enter Card Number"
          onChangeText={(e) => setCard(e)}
          value={card}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Enter Expire Date"
          onChangeText={(e) => setExpire(e)}
          value={expire}
        />
      </View>
     

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Enter CVV"
          onChangeText={(e) => setCvv(e)}
          value={cvv}
        />
      
      </View>

      


      

      <View style={styles.inputGroup}>
        <Button title="Save User" onPress={() => addPayment()} />
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

export default PayForCard;
