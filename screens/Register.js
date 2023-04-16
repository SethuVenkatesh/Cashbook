import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase/firebase"
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { View, Text,StyleSheet, TextInput,ActivityIndicator } from 'react-native'
import React from 'react'
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "../components/Toast";

const Register = () => {
  const navigation=useNavigation()
  const [toast,setToast]=useState(false)
  const [toastMsg,settoastMsg]=useState("")
    const [loading,setLoading]=useState(false)
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:""
    })
    const handleRedirect=()=>{
      navigation.navigate('Login')
    }
    const handleSubmit = async () => {
      if(!user.name.length>=1){
        setToast(true)
        settoastMsg("name cannot be empty")
        setTimeout(()=>{
          setToast(false)
        },3000)
        return
      }
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
        return;
      }
        setLoading(true);    
        try {
               const res = await createUserWithEmailAndPassword(auth, user.email, user.password);
                await setDoc(doc(db, "users", res.user.uid), {
                  uid: res.user.uid,
                  userName:user.name,
                  email:user.email,
                  password:user.password,
                });
                console.log("user created successfully")
                await setDoc(doc(db, "cashbooks", res.user.uid), {});
                setLoading(false);
              } catch (err) {
                setLoading(false);
                console.log(err)
              }
      };
  return (
    loading ?(
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <ActivityIndicator size='large' color="#0000ff"/>
      </View>
    ):(
    <View style={styles.container}>
      {
        toast&&<Toast text={toastMsg}/>
      }
      <Text style={{color:'white',fontWeight:'bold',fontSize:24,textTransform:'uppercase',marginBottom:10}}>CashBook</Text>
      <View style={styles.registerContainer}>
        <Text style={{color:'red',fontWeight:'bold',fontSize:20,textTransform:'uppercase',textAlign:'center'}}>Register</Text>
        <TextInput
        style={styles.input}
        placeholder="Name"
        name='name'
        onChangeText={(value) => 
        {
            setUser({...user,name:value})
        }
        }
        />
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
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.textLink} onPress={()=>handleRedirect()}>
        <Text style={{fontWeight:'bold',textAlign:'right',fontSize:14,color:'blue'}}>Already Have an account</Text>
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
        backgroundColor:'lightgray'
    },
    registerContainer:{
        padding:20,
        borderRadius:5,
        width:'50%',
        shadowOpacity:1,
        backgroundColor:'whitesmoke',
        shadowColor: '#000',
        elevation:10,
        gap:5,
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
export default Register