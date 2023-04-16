import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import React, { useState,useEffect,useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { updateDoc,doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { AuthContext } from '../context/AuthContext';

const Rename = ({renameRBSheet,renameId,setcashBook,cashBook}) => {
    const [newName,setnewName]=useState("")
    const {user}=useContext(AuthContext)
    useEffect(()=>{
        objIndex = cashBook.findIndex((obj => obj.id == renameId));
        setnewName(cashBook[objIndex].name)
    },[])
    
  const handleFormSubmit=async ()=>{
    objIndex = cashBook.findIndex((obj => obj.id == renameId));
    cashBook[objIndex].name=newName.trim()
    await updateDoc(doc(db, "cashbooks",user.uid), {
        cashbooks: cashBook
      });
    setcashBook(cashBook)

    renameRBSheet.current.close();
  }  
  
  return (
    <View style={{width:'90%',height:"100%"}}>
      <View style={styles.modalHeader}>
          <Ionicons name="close-outline" size={30} color='black' fontWeight="bold" style={styles.modalHeaderIcon} onPress={()=> renameRBSheet.current.close()}/>
          <Text style={styles.modalHeaderText}>Rename CashBook</Text>
      </View>
      <View style={styles.modalBody}>
          <TextInput
          style={styles.input}
          maxLength={15}
          placeholder="Name"
          value={newName}
          onChangeText={(value) => 
            {
                setnewName(value)
            }
        }
          />
            <TouchableOpacity style={styles.submitButton} onPress={()=>handleFormSubmit()} >
                <Ionicons name="add-outline" size={30} color='white' fontWeight="bold"/>
                <Text style={styles.submitButtonText}>Save</Text>
            </TouchableOpacity>
      </View>
    </View>
  )
}

export default Rename

const styles = StyleSheet.create({
    modalHeader:{
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:1,
        paddingTop:10,
        paddingBottom:10,
        borderColor:'gray',
        flexDirection:'row'
      },
      modalHeaderText:{
          fontWeight:'bold',
          fontSize:20,
      },
      modalHeaderIcon:{
          position:'absolute',
          left:0,
      },
      modalBody:{
          flex:1,
          marginTop:10,
          paddingTop:10,
          paddingBottom:10,
          alignItems:'center',
      },
      input:{
          padding:10,
          borderColor:'black',
          borderWidth:1,
          width:'100%',
          height:40,
          borderRadius:5,
          marginBottom:10,   
      },
      suggestionsHeading:{
          marginRight:'auto',
          fontSize:14,
          fontWeight:"bold",
          color:'gray',
          textTransform:'capitalize',
          marginBottom:10,
    
      },
      suggestions:{
          width:'100%',
          flexDirection:'row',
          flexWrap:"wrap",
          gap:20,
      },
      suggestionsText:{
          backgroundColor:'#e9edf7',
          borderRadius:20,
          minWidth:40,
          paddingHorizontal:10,
          paddingVertical:5,
          color:'#3e62b0',
          borderColor:'#3e62b0',
          borderWidth:1,
          fontSize:14,
          fontWeight:600,
    
      },
      submitNotButton:{
        marginTop:30,
        width:'100%',
        paddingHorizontal:5,
        paddingVertical:10,
        borderRadius:5, 
        backgroundColor:"lightgray",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    
      },
      submitNotButtonText:{
        color:'gray',
        fontWeight:'bold',
        textTransform:'uppercase',
        fontSize:16,
      },
      submitButton:{
          marginTop:30,
          width:'100%',
          paddingHorizontal:5,
          paddingVertical:10,
          backgroundColor:"blue",
          borderRadius:5, 
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'center'
      },
      submitButtonText:{
          color:'white',
          fontWeight:'bold',
          textTransform:'uppercase',
          fontSize:16,
      }
})