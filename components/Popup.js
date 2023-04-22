import { StyleSheet, Text, View,Pressable,Modal } from 'react-native'
import React from 'react'
import { useState } from 'react';
const Popup=({setVisible,callBack})=>{
  return (
      <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Delete Entry</Text>
              <Text style={styles.modalText}>Are you sure do you want to delete entry,the data cannot be retrived</Text>
              <View style={styles.footer}>
                  <Pressable
                      onPress={()=>{
                          setVisible(false)
                          callBack()
                      }}
                  >
                      <Text style={[styles.button,styles.confirm]}>OK</Text>
                  </Pressable>
                  <Pressable
                    onPress={()=>{
                      setVisible(false)
                  }}
                  >
                      <Text style={styles.button}>CANCEL</Text>
                  </Pressable>
              </View>
          </View>
      </View>
  )
}

export default Popup

const styles = StyleSheet.create({
  modalContainer:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.2)',
    position:'absolute',
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center',
    elevation:10,
  },
  modalContent:{
      padding:10,
      backgroundColor:'white',
      borderRadius:5,
      width:300,
      gap:10,
      elevation:10,
  },
  modalHeader:{
      fontSize:18,
      fontWeight:'bold',
  },
  modalText:{
      fontSize:14,
      fontWeight:400,
  },
  footer:{
      flexDirection:'row',
      justifyContent:'space-between',
  },
  button:{
      padding:10,
      backgroundColor:'blue',
      borderRadius:5,
      color:'white',
      fontSize:16,
      fontWeight:'bold',
      textAlign:'center',
      borderWidth:1,
      borderColor:'blue',
      width:120,
  },
  confirm:{
      borderWidth:1,
      borderColor:'blue',
      backgroundColor:'white',
      color:'blue'
  },
})