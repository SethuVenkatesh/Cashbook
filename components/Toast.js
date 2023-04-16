import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';


const Toast = ({text}) => {

  return (
        <View style={styles.container}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Ionicons name="alert-circle-outline" size={24} color='#0eaac9' fontWeight="bold"/> 
                <Text style={{color:'white',fontWeight:'600',fontSize:16}}>{text}</Text>
            </View>
          <Ionicons name="close-circle-outline" size={24} color='red' fontWeight="bold"/> 
        </View>    
  )
}
export default Toast

const styles = StyleSheet.create({
    container:{
        padding:10,
        backgroundColor:'#6e6a69',
        borderRadius:5,
        width:'90%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        position:'absolute',
        top:50,
        zIndex:5,
    }

})