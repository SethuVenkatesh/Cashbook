import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react'
import { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
const EntryDetails = ({navigation}) => {
  const route=useRoute()
  const {entry,date,time,entryId,bookId}=route.params
  useEffect(() => {
    navigation.setOptions({
      title: "Entry Details",
      headerRight:()=>(
        <View style={{flexDirection:'row',gap:15,alignItems:'center'}}>
          <TouchableOpacity>
            <Ionicons name="cloud-done" size={25} color='green' fontWeight="bold"/>                
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={20} color='gray' fontWeight="bold"/>                
          </TouchableOpacity>
        </View>
      )
    });
  }, []);
  const handleEdit=()=>{
    navigation.navigate("UpdateEntry",{
      entry:entry,
      date:date,
      time:time,
      entryId:entryId,
      bookId:bookId
    })
  }
  return (
    <View style={styles.container}>
      <View style={[styles.card,entry.type=='cashIn' && styles.cashIn]}>
        <View style={styles.cardHeader}>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{textTransform:'uppercase',color:'gray',fontWeight:'bold'}}>{entry.type}</Text>
            <Text style={{color:'gray',fontWeight:'bold'}}>{date} - {time}</Text>
          </View>
          {
            entry.type=='cashOut' ? (<Text style={{marginTop:15,fontSize:20,color:'red',fontWeight:'bold'}}>{entry.amount}</Text>):(<Text style={{marginTop:15,fontSize:20,color:'green',fontWeight:'bold'}}>{entry.amount}</Text>)
          }

        </View>
        <View style={styles.cardBody}>
          <Text>{entry.remarks}</Text>
          <Text style={{color:'#1779e8',backgroundColor:'#cfe5ff',padding:5,borderRadius:5,textAlign:'center',fontWeight:'600',marginBottom:15,textTransform:'capitalize',width:60}}>{entry.paymentMode}</Text>
        </View>
        <TouchableOpacity style={styles.cardFooter} onPress={()=>handleEdit()}>
              <Ionicons name="pencil-outline" size={20} color='blue' fontWeight="bold"/>  
              <Text style={{color:'blue',fontSize:16,fontWeight:'bold',textTransform:'uppercase'}}>Edit Entry</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop:20,backgroundColor:'white',padding:10,paddingVertical:15,width:'100%',gap:10}}>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
          <Text style={{color:'gray',fontWeight:'bold'}}>Created by</Text>
          <Text style={{color:'#1414e3',fontWeight:'bold'}}>You</Text>
        </View>
        <Text style={{color:'gray',textAlign:'right',fontWeight:'500'}}>{date} - {time}</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="logo-whatsapp" size={25} color='white' fontWeight="bold"/>                
          <Text style={{color:'white',fontWeight:'bold',fontSize:16}}>Share Entry</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EntryDetails

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ebe9e4',
    alignItems:'center'
  },
  card:{
    borderTopWidth:4,
    borderTopColor:'brown',
    marginTop:20,
    width:'90%',
    backgroundColor:'white',
    borderRadius:5,
  },
  cashIn:{
    borderTopWidth:4,
    borderTopColor:'green',
  },
  cardHeader:{
    padding:10

  },
  cardBody:{
    paddingTop:10,
    margin:10,
    gap:10,
    borderTopWidth:1,
    borderTopColor:'lightgray',
  },
  cardFooter:{
    borderTopWidth:1,
    borderTopColor:'lightgray',
    width:"100%",
    padding:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  footer:{
    borderTopColor:'lightgray',
    borderTopWidth:1,
    backgroundColor:'white',
    position:'absolute',
    alignItems:'center',
    bottom:0,
    width:'100%',
  },
  button:{
    marginTop:10,
    width:'90%',
    paddingVertical:10,
    backgroundColor:"green",
    borderRadius:5, 
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:10,
  }
})