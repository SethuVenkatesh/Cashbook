import React from 'react';
import { View, StyleSheet,Text,TextInput,TouchableOpacity } from 'react-native';
import { useState,useContext } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {db} from '../firebase/firebase'
import { AuthContext } from '../context/AuthContext';

import { arrayUnion,
  doc,
  Timestamp,
  updateDoc,
  setDoc,
 } from 'firebase/firestore';
const BottomSheetForm = ({refRBSheet,setcashBook,cashBook}) => {
  const [newCashBook,setnewCashBook]=useState("");
  const {user}=useContext(AuthContext)

  const handleFormSubmit = async (name) => {
    // Generate a random ID
    const randomId = () => {
      return Math.random().toString(36).substr(2, 10);
    };

    // Usage
    const bookId = randomId();
    console.log(bookId);

    if(name!==undefined){
        try{
          await updateDoc(doc(db, "cashbooks",user.uid), {
            cashbooks: arrayUnion({
              id:bookId,
              name:name,
              cashIn:0,
              cashOut:0,
              balance:0,
              date: Timestamp.now(),
            }),
          });
          await setDoc(doc(db, "entry", user.uid+bookId), {});
        }
        catch(err){
          console.log(err)
        }  
    }
    else{

        await updateDoc(doc(db, "cashbooks",user.uid), {
          cashbooks: arrayUnion({
            id: bookId,
            name:newCashBook,
            cashIn:0,
            cashOut:0,
            balance:0,
            date: Timestamp.now(),
          }),
        });
        await setDoc(doc(db, "entry", user.uid+bookId), {});       
    }
    refRBSheet.current.close();
};

  return (
    <View>
      <View style={styles.modalHeader}>
          <Ionicons name="close-outline" size={30} color='black' fontWeight="bold" style={styles.modalHeaderIcon} onPress={()=> refRBSheet.current.close()}/>
          <Text style={styles.modalHeaderText}>Add New Book</Text>
      </View>
      <View style={styles.modalBody}>
          <TextInput
          style={styles.input}
          placeholder="Name"
          maxLength={15}
          onChangeText={(value) => 
            {
                setnewCashBook(value)
            }
        }
          />
          <Text style={styles.suggestionsHeading}>suggestions</Text>
          <View style={styles.suggestions}>
              <Text style={styles.suggestionsText}  onPress={(e)=>handleFormSubmit(e._dispatchInstances.memoizedProps.children)}>March Expenses</Text>
              <Text style={styles.suggestionsText}  onPress={(e)=>handleFormSubmit(e._dispatchInstances.memoizedProps.children)}>Personal Expenses</Text>
              <Text style={styles.suggestionsText}  onPress={(e)=>handleFormSubmit(e._dispatchInstances.memoizedProps.children)}>Project Book</Text>
              <Text style={styles.suggestionsText}  onPress={(e)=>handleFormSubmit(e._dispatchInstances.memoizedProps.children)}>Client Record</Text>    
          </View>
          {
            newCashBook.trim().length==0 ?(
                <TouchableOpacity style={styles.submitNotButton} onPress={()=>handleFormSubmit()}  disabled={true} >
                    <Ionicons name="add-outline" size={30} color='gray' fontWeight="bold"/>
                    <Text style={styles.submitNotButtonText}>Add New Book</Text>
                </TouchableOpacity>
            ):(
                <TouchableOpacity style={styles.submitButton} onPress={()=>handleFormSubmit()} >
                    <Ionicons name="add-outline" size={30} color='white' fontWeight="bold"/>
                    <Text style={styles.submitButtonText}>Add New Book</Text>
                </TouchableOpacity>
            )
          }
         
      </View>
    </View>
  );
};

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

export default BottomSheetForm;
