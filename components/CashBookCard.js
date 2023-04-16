import React, { useEffect, useState } from 'react'
import { Text,View,StyleSheet, Modal,Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableWithoutFeedback,TouchableHighlight } from 'react-native';
import Menu from './Menu';
import { useNavigation } from '@react-navigation/native';
export const CashBookCard = ({name,renameRBSheet,setrenameId,renameId,cashBook,id,balance}) => {
  const [top,setTop]=useState()
  const [isMenuOpened,setisMenuOpened]=useState(false)
  const handleTouch = (event) => {
    event.target.measure( (fx, fy, width, height, px, py) => {
      setTop(py-30)
    })
  };
  const navigation = useNavigation();
  const handleClick=()=>{
    navigation.navigate("Entries",{
      name:name,
      bookId:id
    })
  }
  return (
    <>
    <TouchableHighlight 
      onPress={() => {
        handleClick()
      }}
      style={{width:"100%"}}
      underlayColor="lightgray"
     >

      <View style={styles.container}>
        <View style={{flexDirection:'row'}}>
          <Ionicons name="pricetag-outline" size={20} color='blue' fontWeight="bold" />                
          <Text style={styles.text}>{name}</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center'}}> 
          {
            parseInt(balance)>=0 ? (<Text style={[styles.balance]}>{balance}</Text>) :( <Text style={[styles.balanceNegative]}>{balance}</Text>)

          }
          
          <TouchableHighlight style={{padding:10,borderRadius:10}} underlayColor="lightgray" onPress={
            (event)=>
            {
              handleTouch(event)
              setisMenuOpened(true)
            }
            }>
              <Ionicons name="ellipsis-vertical" size={20} color='gray' fontWeight="bold"/>                
          </TouchableHighlight>
        </View>
      </View>
    </TouchableHighlight>
        {
          isMenuOpened && <Menu top={top} isMenuOpened={isMenuOpened} setisMenuOpened={setisMenuOpened} renameRBSheet={renameRBSheet} setrenameId={setrenameId} renameId={renameId}/>
        }
    </>
  )
}
const styles=StyleSheet.create({
  container:{
    zIndex:1,
    position:'relative',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:"100%",
    padding:20,
    borderBottomWidth:1,
    borderBottomColor:'lightgray'
  },
  text:{
    fontSize:16,
    fontWeight:'bold',
    marginLeft:10,
  },
  balance:{
    fontWeight:'bold',
    fontSize:16,
    color:'green'
  },
  balanceNegative:{
    fontWeight:'bold',
    fontSize:16,
    color:'red'
  }
})