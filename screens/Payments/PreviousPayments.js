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

const PreviousPayments = ({navigation}) => {

  const [bookings, setBookings] = useState();
  const [message, setMessage] = useState();
    

  const onLoad = async () => {

    const place_ref = await  axios.get('http://192.168.8.113:5000/inquiry/').then(res => {
      setBookings(res.data)    
     })
     
    
  }


  useEffect((e) => {
    //Runs on every render

    try {
     
      AsyncStorage.getItem('vjs').then((value) => 
          

          
       axios.post('http://192.168.8.113:5000/user/view', {token: value})
      .then((res) => {
        console.log(res.data.uniqueID);
        const ids = res.data.uniqueID;

        axios.get(`http://192.168.8.113:5000/payment/book/${ids}`).then((res) => {
          if (res.data.length != 0) {
            setBookings(res.data);
          } else {
          }

          console.log(res.data);
        });


      })    
      );

  

      } catch (error) {
      console.log(error);
      }
  },[]);

       
        const deleteBooking = async (id) => {
            try {
                await axios.delete(`http://192.168.8.113:5000/payment/${id}`)
                alert("Booking Deleted Successfully")

                AsyncStorage.getItem('vjs').then((value) => 
          

          
       axios.post('http://192.168.8.113:5000/user/view', {token: value})
      .then((res) => {
        console.log(res.data.uniqueID);
        const ids = res.data.uniqueID;

        axios.get(`http://192.168.8.113:5000/payment/book/${ids}`).then((res) => {
          if (res.data.length != 0) {
            setBookings(res.data);
          } else {
          }

          console.log(res.data);
        });


      })    
      );
                

                
                





            } catch (error) {

                console.log(error)
            }
          }






  return (
    <ScrollView  >
    <View>
        <Text>Payment History</Text>
      
           

        </View>
        
     
        {bookings && bookings.map((booking , index) => (
            
            <View key={index}>
                <Text>{index+1}</Text>
                <Text>{booking.price}</Text>
                
                
                <Text>{booking.card}</Text>
                <Text>{booking.info}</Text>
               
               
                <Button title="delete" onPress={()=> deleteBooking(booking._id)}> del</Button>
              
                <Text>--------------------</Text>
                
                </View>
                
        ))}
    </ScrollView>



  )
}

export default PreviousPayments

