import { View, Text, Button, StyleSheet , ScrollView, TextInput, TouchableOpacity} from 'react-native'
import React, { useState,useEffect} from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({navigation}) => {

    
    const [email, setEmail] = useState('');
   
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const [name, setName] = useState('');
   
let STORAGE_KEY = '@user_input';

    const handleSubmit = async () => {
        try {
            if (email === '' || password === '' ) {
                alert('Please provide all the fields')
                return false
            }
        
            else {
                const data = {
                    
                    email,
                  
                    password,
                    
                    
                }
                await axios.post('http://192.168.8.113:5000/user/login', data)
                .then((res) => {
                    console.log(res.data)


                    if (res.data.token) {
     
                        AsyncStorage.setItem('vjs', res.data.token);
                       
                        alert('Data Saved');
                        
                      } else {
                        alert('Please fill data');
                        
                    
                    alert('Login Successfully')


                    // const value =  AsyncStorage.getItem(STORAGE_KEY)
                    // if(value !== null) {
                    //     console.log(value)
                       
                        
                    // }

                



                }}
                )

                

                
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {

        try {
       
            AsyncStorage.getItem('vjs').then((value) => 
                
    
                
             axios.post('http://192.168.8.113:5000/user/view', {token: value})
            .then((res) => {
                console.log(res.data)
                setName(res.data.name)


            })    
            );
    
        
    
            } catch (error) {
            console.log(error);
            }



    },[])


    // const getValueFunction = async () => {

    //     try {
       
    //     AsyncStorage.getItem('vjs').then((value) => 
            

            
    //      axios.post('http://192.168.8.113:5000/user/view', {token: value})
    //     .then((res) => {
    //         console.log(res.data)
    //     })

            
            
    //     );

    //     // const len = token.length
    //     // const result = token.slice(1,len-1)
    //     // const abc = {token:result}
        



    //     // const value =  AsyncStorage.getItem('any_key_here')
    //     // if(value !== null) {
    //     //     console.log(value)

    //     //     setToken(value)
    //     // }


    //     } catch (error) {
    //     console.log(error);
    //     }
    //   };

             

     








  return (
    

      <ScrollView style={styles.container}>
      
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="User Email"
          onChangeText={(e) => setEmail(e)}
          value={email}
        />
      </View>
      

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="User password"
          onChangeText={(e) => setPassword(e)}
          value={password}
        />
      </View>



      <View style={styles.inputGroup}>
        <Button title="Save User" onPress={() => handleSubmit()} />
      </View>

      <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}> GET VALUE </Text>
        </TouchableOpacity>
        <Text style={styles.textStyle}> {token} </Text>
        <Text style={styles.textStyle}> {name} </Text>



        
        



    </ScrollView>



  
  )
}

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

export default Login