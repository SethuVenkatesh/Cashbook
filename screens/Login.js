import { auth, db, storage } from "../firebase/firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { View, Text,StyleSheet, TextInput,ActivityIndicator } from 'react-native'
import React from 'react'
import { TouchableOpacity } from "react-native";
import BackGroundImage from '../assets/main.png'
import { useNavigation } from "@react-navigation/native";
import Toast from "../components/Toast";
const Login = () => {
  const [loading,setLoading]=useState(false)
  const [toast,setToast]=useState(false)
  const [toastMsg,settoastMsg]=useState("")
  const navigation=useNavigation()
    const [user,setUser]=useState({
        email:"",
        password:""
    })
    
  const handleSubmit = async () => {
    console.log(loading)
    if(!user.email.length>=1){
        setToast(true)
        settoastMsg("email cannot be empty")
        setTimeout(()=>{
          setToast(false)
        },3000)
        return
    }
    
    if(!user.password.length>=1){
      setToast(true)
      settoastMsg("password cannot be empty")
      setTimeout(()=>{
        setToast(false)
      },3000)
      return
    }
    
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      setLoading(false)
      console.log("logged in succesfully")
      console.log(loading)

    } catch (err) {
      setLoading(false);
      setToast(true)
      settoastMsg("Invalid user credentials")
      setTimeout(()=>{
        setToast(false)
      },3000)
      console.log("error")
      console.log(err)
    }
  };
  const handleRedirect=()=>{
    navigation.navigate('Register')
  }
  return (
    loading ? (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <ActivityIndicator size='large' color="#0000ff"/>
      </View>
    ):(
      
      <View style={styles.container}>
        {
          toast && <Toast text={toastMsg}/>
        }

        <Text style={{color:'white',fontWeight:'bold',fontSize:24,textTransform:'uppercase',marginBottom:10}}>CashBook</Text>
        <View style={styles.registerContainer}>
          <Text style={{color:'red',fontWeight:'bold',fontSize:20,textTransform:'uppercase',textAlign:'center'}}>Login</Text>
          <TextInput
          style={styles.input}
          placeholder="email"
          name='email'
          onChangeText={(value) => 
          {
              setUser({...user,email:value})
            }
          }
          />
          <TextInput
          style={styles.input}
          placeholder="password"
          name='password'
          onChangeText={(value) => 
          {
              setUser({...user,password:value})
          }
          }
          />
        <TouchableOpacity style={styles.button} onPress={()=>handleSubmit()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textLink} onPress={()=>handleRedirect()}>
          <Text style={{fontWeight:'bold',textAlign:'right',fontSize:16,color:'blue'}}>Regsiter</Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        position:'relative',
        backgroundColor:'lightgray'
    },
    registerContainer:{
        borderRadius:5,
        padding:20,
        borderRadius:5,
        width:'50%',
        backgroundColor:'whitesmoke',
        shadowOpacity:1,
        shadowColor: '#000',
        elevation:10,
        width:'60%',
    },
    input:{
        padding:10,
        borderColor:'gray',
        borderWidth:1,
        width:'100%',
        height:40,
        borderRadius:5,
        marginBottom:10,   
    },
    button:{
        padding:10,
        backgroundColor:'#5b96f5',
        borderRadius:10,
    },
    buttonText:{
        textAlign:'center',
        color:'white',
        fontSize:16,
        fontWeight:'bold',
    },
    textLink:{
      marginTop:10,
    }
})
export default Login