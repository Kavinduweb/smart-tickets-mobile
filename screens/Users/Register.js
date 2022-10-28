import { View, Text, Button, StyleSheet , ScrollView, TextInput} from 'react-native'
import React, { useState,useEffect} from 'react'
import axios from 'axios';


const Register = ({navigation}) => {

    const [name , setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleSubmit = async () => {
        try {
            if (name === '' || email === '' || phone === '' || password === '' || confirmPass === '') {
                alert('Please provide all the fields')
                return false
            }
        
            else {
                const data = {
                    name,
                    email,
                    phone,
                    password,
                    confirmPass
                    
                }
                await axios.post('http://192.168.8.113:5000/user/reg', data)
                .then((res) => {
                    console.log(res.data)
                    alert('User Created Successfully')
                })
                

                
            }
        } catch (error) {
            console.log(error)
        }
    }

             
     






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
          onChangeText={(e) => setPhone(e)}
          value={phone}
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
        <TextInput
          placeholder="confirm pw"
          onChangeText={(e) => setConfirmPass(e)}
          value={confirmPass}
        />
      </View>







      <View style={styles.inputGroup}>
        <Button title="Save User" onPress={() => handleSubmit()} />
      </View>
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

export default Register