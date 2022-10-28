import React, {useState,useEffect} from 'react'
import {View, Text,ScrollView, Button} from 'react-native'
import axios from 'axios';

const UsersList = ({navigation}) => {

  const [bookings, setBookings] = useState();
  const [message, setMessage] = useState();
    

  const onLoad = async () => {

    const place_ref = await  axios.get('http://192.168.8.113:5000/inquiry/').then(res => {
      setBookings(res.data)    
     })
     
    
  }


    useEffect(() => {
           axios.get('http://192.168.8.113:5000/inquiry/').then(res => {
            setBookings(res.data)    
           })

           const unsubscribe = navigation.addListener("focus", () => {
            onLoad() // Gets fired whenever this screen is in focus
          });
        
           return unsubscribe;





       },[navigation])

       
        const deleteBooking = async (id) => {
            try {
                await axios.delete(`http://192.168.8.113:5000/inquiry/${id}`)
                alert("Booking Deleted Successfully")
                navigation.navigate('UsersList')

                await axios.get('http://192.168.8.113:5000/inquiry/').then(res => {
                  setBookings(res.data)
                })




            } catch (error) {

                console.log(error)
            }
          }






  return (
    <ScrollView  >
    <View>
        <Text>UsersList1</Text>
        <Text>UsersList1</Text>
        <Text>ssss</Text>
        <Text>firt</Text>
      <Button title="ss" onPress={()=> navigation.navigate('CreateUserScreen')}></Button>        

        </View>
        
     
        {bookings && bookings.map((booking , index) => (
            
            <View key={index}>
                <Text>{index+1}</Text>
                <Text>{booking.name}</Text>
                
                
                <Text>{booking.email}</Text>
                <Text>{booking.inquiry}</Text>
                <Button title="view" onPress={()=> navigation.navigate('UserDetailScreen', {
                  inqId : booking._id
                })}></Button>
                <Button title="delete" onPress={()=> deleteBooking(booking._id)}> del</Button>
              
                <Text>--------------------</Text>
                
                </View>
                
        ))}
    </ScrollView>



  )
}

export default UsersList

