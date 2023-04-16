import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const EntryCard = ({entry,date,time,entryId,bookId}) => {

  const navigation=useNavigation()
  const handleClick=()=>{
    navigation.navigate("EntryDetails",{
      entry:entry,
      date:date,
      time:time,
      entryId:entryId,
      bookId:bookId
    })
  }
  return (
    <TouchableOpacity onPress={()=>{
    handleClick()
    }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.side}>
              <Text style={{color:'#1779e8',backgroundColor:'#cfe5ff',padding:5,borderRadius:5,textAlign:'center',fontWeight:'600',marginBottom:15,textTransform:'capitalize'}}>{entry.paymentMode}</Text>
              <Text style={{color:'#595a5c',fontWeight:'500'}}>{entry.remarks}</Text>
          </View>
          <View style={styles.side}>
              {
                entry.type=='cashOut' ? (<Text style={{marginBottom:15,textAlign:'right',color:'red',fontWeight:'bold'}}>{entry.amount}</Text>):(<Text style={{marginBottom:15,textAlign:'right',color:'green',fontWeight:'bold'}}>{entry.amount}</Text>)
              }
              <Text style={{color:'#595a5c',fontWeight:'600'}}>Balance:<Text>{entry.currentBalance}</Text></Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={{color:'#1414e3',fontWeight:'bold',marginRight:10}}>Entry by You</Text>
          <Text style={{color:'#595a5c',fontWeight:'500'}}>{date}-{time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default EntryCard

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        marginBottom:10,
        padding:10,
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    side:{
        marginBottom:10,
    },
    footer:{
        flexDirection:'row',
        borderTopColor:'lightgray',
        borderTopWidth:1,
        paddingVertical:5,
    }
})