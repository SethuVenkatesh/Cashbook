import React, { useEffect, useState } from 'react'
import { Text,View,StyleSheet, Modal,Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableWithoutFeedback,TouchableHighlight } from 'react-native';
import { updateDoc,doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export default Menu=({top,isMenuOpened,setisMenuOpened,renameRBSheet,setrenameId,renameId})=>{
  const {user}=useContext(AuthContext)
  const [cashBook,setcashBook]=useState()
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "cashbooks", user.uid), (doc) => {
        doc.exists() && setcashBook(doc.data().cashbooks);
      });

      return () => {
        unsub();
      };
    };

    user.uid && getChats();
  }, [user.uid]);
  const handleDelete=async (renameId)=>{
    const newCashBook=cashBook.filter((book)=>book.id!=renameId)
    await updateDoc(doc(db, "cashbooks",user.uid), {
        cashbooks: newCashBook
      });
    setcashBook(cashBook)
    renameRBSheet.current.close();
  }
    return (
        <Modal transparent={true} visible={isMenuOpened} animationType={'fade'}> 
          <View style={{
            backgroundColor:'white',
            position:'absolute',
            top:top,
            right:30,
            zIndex:20,
            borderRadius:10,
            shadowOpacity:1,
            shadowColor: '#000',
            elevation:10,
          }}>
            <TouchableHighlight style={styles.menuItem} underlayColor="#e8e6e1" onPress={()=>{
                renameRBSheet.current.open()
                setrenameId(renameId)
                setisMenuOpened(!isMenuOpened)
                }}>
              <>
                <Ionicons name="create-outline" size={25} color='gray' fontWeight="bold" />                
                <Text style={styles.menuText}>Rename</Text>
              </>
            </TouchableHighlight>
            <TouchableHighlight style={styles.menuItem} underlayColor="#e8e6e1" onPress={()=>setisMenuOpened(!isMenuOpened)}>
              <>
                <Ionicons name="copy-outline" size={25} color='gray' fontWeight="bold"/>                
                <Text style={styles.menuText}>Duplicate Book</Text>
              </>
            </TouchableHighlight>
            <TouchableHighlight style={styles.menuItem} underlayColor="#e8e6e1" onPress={()=>setisMenuOpened(!isMenuOpened)}>
              <>
                <Ionicons name="person-add-outline" size={25} color='gray' fontWeight="bold"/>                
                <Text style={styles.menuText}>Add Members</Text>
              </>
            </TouchableHighlight >
            <TouchableHighlight style={styles.menuItem} underlayColor="#e8e6e1" onPress={()=>setisMenuOpened(!isMenuOpened)}>
              <>
                <Ionicons name="enter-outline" size={25} color='gray' fontWeight="bold"/>                
                <Text style={styles.menuText}>Move Book</Text>
              </>
            </TouchableHighlight>
            <TouchableHighlight style={styles.menuItem} underlayColor="#e8e6e1" onPress={()=>{
              handleDelete(renameId)
              setisMenuOpened(!isMenuOpened)
            }
            }>
              <>
                <Ionicons name="trash-outline" size={25} color='red' fontWeight="bold"/>                
                <Text style={styles.menuText}>Delete Book</Text>
              </>
            </TouchableHighlight>
          </View>
        </Modal>
    )
  };
  const styles=StyleSheet.create({
    menuContainer:{
      backgroundColor:'white',
      position:'absolute',
      // top:modalPosition.top,
      // right:modalPosition.left,
      zIndex:20,
      borderRadius:10,
      shadowOpacity:1,
      shadowColor: '#000',
      elevation:10,
    },
    menuItem: {
      flexDirection:'row',
      alignItems:'center',
      paddingVertical:10,
      paddingHorizontal:15,
      borderRadius:10,
    },
    menuText:{
      fontSize: 16,
      marginLeft:10,
    }
  })