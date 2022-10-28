import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View , TextInput ,Button, ToastAndroid, SafeAreaView , Image, TouchableOpacity, DrawerButton, Pressable} from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'



const Stack = createNativeStackNavigator();


import CreateUserScreen from './screens/CreateUserScreen'
import UsersList from './screens/UsersList'
import UserDetailScreen from './screens/UserDetailScreen';
import Register from './screens/Users/Register';
import Login from './screens/Users/Login';
import Example from './screens/Users/Example';
import AddJourney from './screens/Journey/AddJourney';
import ViewJourney from './screens/Journey/ViewJourney';
import PayForCard from './screens/Payments/PayForCard';
import RechargePay from './screens/Payments/RechargePay';
import PreviousPayments from './screens/Payments/PreviousPayments';
import CardDelivery from './screens/Delivery/CardDelivery';



function MyStack(){
  return (
  



      <Stack.Navigator>
        <Stack.Screen name="CardDelivery" component={CardDelivery} options={{title: 'Card Delivery'}}/>
        <Stack.Screen name="PreviousPayments" component={PreviousPayments} options={{ title: 'Previous Payment'}}/>

        <Stack.Screen name="RechargePay" component={RechargePay} options={{ title : 'Recharge Pay'}}/>
        <Stack.Screen name="PayForCard" component={PayForCard} options={{title: 'Pay For Card'}} />

        {/* <Stack.Screen name="Example" component={Example} options={{ title: 'ex' }} /> */}

        <Stack.Screen name="ViewJourney" component={ViewJourney} options={{ title: 'View Journey' }} />

        <Stack.Screen name="AddJourney" component={AddJourney} options={{ title: 'Add Journey' }} />

        <Stack.Screen name="Login" component={Login} 
          // options={{

          //   headerStyle: {
          //     backgroundColor: '#f4511e',
          //   },
          //   headerTintColor: '#fff',

          //   headerLeft: () => (
          //     <DrawerButton onPress={() => navigation.toggleDrawer()} />
          //   ),
        
           
          // }}


          options={({ navigation }) => ({
            title: 'Login',
            headerRight: () => (
              // <Button  style={styles.button}
              
              
              // onPress={() => navigation.navigate('Register')} title="UserList" color="#fff" />
              
              <Pressable style={styles.button} onPress={() => navigation.navigate('Register')} title="UserList" >
              <Text style={styles.text}>Register</Text>
            </Pressable>
            
            )
          })}
        

          
          

        
        />
        <Stack.Screen name="Register" component={Register} options={{title: 'Reg'}} />
                <Stack.Screen name="UsersList" component={UsersList}/> 

      <Stack.Screen name="CreateUserScreen" component={CreateUserScreen}/> 

      
      
      <Stack.Screen name="UserDetailScreen" component={UserDetailScreen}/> 


      </Stack.Navigator>



          


  


  )

}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});




export default function App() {
  
  


 
 

  return (


<NavigationContainer>
    <MyStack/>


  </NavigationContainer>
    

  )
   
    

}

