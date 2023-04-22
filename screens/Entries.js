import { StyleSheet, Text, View } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native';
import React, { useLayoutEffect,useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import EntryCard from '../components/EntryCard';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { updateDoc,doc, onSnapshot,getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const Entries = ({navigation}) => {
  const {user}=useContext(AuthContext)
  // let bookDetails,entryDetails
  const [bookDetails,setbookDetails]=useState()
  const [entryDetails,setentryDetails]=useState()
  const route = useRoute();
  const {name,bookId}=route.params
  const handleClick=(pageName,color)=>{
    navigation.navigate("CashEntry",{
      name:pageName,
      color:color,
      bookId:bookId
    })
  }
  const getCashbook =async () => {
    const docRef = doc(db, "cashbooks", user.uid);
    const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        const allBooks=docSnap.data().cashbooks
        setbookDetails(allBooks[allBooks.findIndex((obj)=>obj.id==bookId)])
      }
  };
  const getEntries = async () => {
    const docRef = doc(db, "entry", user.uid+bookId);
    const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        const allentry=docSnap.data().entry
        if(allentry){
          setentryDetails(allentry.sort((entry1,entry2)=>
          {
            const date1=new Date(Date.parse(entry2.date))
            const date2=new Date(Date.parse(entry1.date))
            var timeParts = entry2.time.split(":"); 
            date1.setHours(timeParts[0]); // set the hours of the date to the first part of the time string
            date1.setMinutes(timeParts[1]); // set the minutes of the date to the second part of the time string
            date1.setSeconds(timeParts[2]);
            var timeParts1 = entry1.time.split(":"); 
            date2.setHours(timeParts1[0]); // set the hours of the date to the first part of the time string
            date2.setMinutes(timeParts1[1]); // set the minutes of the date to the second part of the time string
            date2.setSeconds(timeParts1[2]);
            return date1.getTime()-date2.getTime() 
          }))
        }
        // setentryDetails(allentry)
      }

  };
  useEffect(() => {
      onSnapshot(doc(db, "cashbooks", user.uid), (doc) => {
        if(doc.exists()){
          const allBooks=doc.data().cashbooks
          setbookDetails(allBooks[allBooks.findIndex((obj)=>obj.id==bookId)])
        } 
      });
      onSnapshot(doc(db, "entry", user.uid+bookId), (doc) => {
        if(doc.exists()){
          const allentry=doc.data().entry
          console.log(allentry)
          if(allentry){

            setentryDetails(allentry.sort((entry1,entry2)=>
            {
              const date1=new Date(Date.parse(entry2.date))
              const date2=new Date(Date.parse(entry1.date))
              var timeParts = entry2.time.split(":"); 
              date1.setHours(timeParts[0]); // set the hours of the date to the first part of the time string
              date1.setMinutes(timeParts[1]); // set the minutes of the date to the second part of the time string
              date1.setSeconds(timeParts[2]);
              var timeParts1 = entry1.time.split(":"); 
              date2.setHours(timeParts1[0]); // set the hours of the date to the first part of the time string
              date2.setMinutes(timeParts1[1]); // set the minutes of the date to the second part of the time string
              date2.setSeconds(timeParts1[2]);
              return date1.getTime()-date2.getTime() 
            }))
          }
          // setentryDetails(allentry.sort((entry1,entry2)=>new Date(Date.parse(entry2.date)).getTime()-new Date(Date.parse(entry1.date)).getTime()))
          // setentryDetails(allentry)
        } 
      });

  }, []);
  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerRight:()=>(
        <View style={{flexDirection:'row',gap:15}}>
          <TouchableOpacity>
            <Ionicons name="document-text-outline" size={25} color='blue' fontWeight="bold"/>                
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="person-add-outline" size={25} color='blue' fontWeight="bold"/>                
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={25} color='blue' fontWeight="bold"/>                
          </TouchableOpacity>
        </View>
      )
    });
    getCashbook();
    getEntries();
  }, []);
 return(
    bookDetails && (
      <View style={styles.container}>
      <View style={styles.searchContainer}> 
          <Ionicons name="search-outline" size={25} color='blue' fontWeight="bold"/>  
          <TextInput
             style={styles.input}
             placeholder="Search By Remarks or Amount"
             maxLength={15}
          />
      </View>
      <ScrollView>
        <View  style={styles.filterContainer} >
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.filterItem}>
              <Ionicons name="funnel-outline" size={15} color='blue' fontWeight="bold"/>  
            </View>
            <View style={styles.filterItem}>
              <Ionicons name="calendar-outline" size={15} color='gray' fontWeight="bold"/>  
              <Text style={{marginLeft:10,marginRight:5}}>Select Date</Text>
              <Ionicons name="caret-down-outline" size={15} color='gray' fontWeight="bold"/>  
            </View>
            <View style={styles.filterItem}>
              <Text style={{marginRight:5}}>Entry-Type</Text>
              <Ionicons name="caret-down-outline" size={15} color='gray' fontWeight="bold"/>  
            </View>
            <View style={styles.filterItem}>
              <Text style={{marginRight:5}}>Members</Text>
              <Ionicons name="caret-down-outline" size={15} color='gray' fontWeight="bold"/>  
            </View>
            <View style={styles.filterItem}>
              <Text style={{marginRight:5}}>Party</Text>
              <Ionicons name="caret-down-outline" size={15} color='gray' fontWeight="bold"/>  
            </View>
            <View style={styles.filterItem}>
              <Text style={{marginRight:5}}>Category</Text>
              <Ionicons name="caret-down-outline" size={15} color='gray' fontWeight="bold"/>  
            </View>
            <View style={styles.filterItem}>
              <Text style={{marginRight:5}}>Payment Mode</Text>
              <Ionicons name="caret-down-outline" size={15} color='gray' fontWeight="bold"/>  
            </View>
        </ScrollView>
      </View>
      <View style={styles.reportContainer}>
        <View style={styles.reportCard}>
            <View style={styles.cardHeader}>
              <Text style={{fontWeight:'600',fontSize:16}}>Net Balance</Text>
              <Text style={{fontWeight:'600',fontSize:14}}>{bookDetails.balance}</Text>
            </View>
            <View style={styles.cardText}>
                <Text style={{fontWeight:'500',fontSize:14}}>Total In (+)</Text>
                <Text style={{color:'green',fontWeight:'bold'}}>{bookDetails.cashIn}</Text>
            </View>
            <View style={styles.cardText}>
                <Text style={{fontWeight:'500',fontSize:14}}>Total Out (-)</Text>
                <Text style={{color:'red',fontWeight:'bold'}}>{bookDetails.cashOut}</Text>
            </View>
            <View style={styles.cardFooter}>
              <Text style={{color:'blue',fontSize:16,fontWeight:'bold',textTransform:'uppercase'}}>View Reports</Text>
              <Ionicons name="chevron-forward-outline" size={20} color='blue' fontWeight="bold"/>  
            </View>
        </View>
      </View>
      <View style={styles.entryContainer}> 
          {
            entryDetails && entryDetails.map((entry)=><EntryCard key={entry.id} entry={entry.entry} date={entry.date} time={entry.time} entryId={entry.id} bookId={bookId}/>)
          }
      </View>
      </ScrollView>

      <View style={styles.footer}>
          <TouchableOpacity style={[styles.button,{backgroundColor:'green'}]} onPress={()=>handleClick("Add Cash Out Entry",'green')}>
              <Ionicons name="add-outline" size={30} color='white' fontWeight="bold"/>  
              <Text style={{color:'white',fontSize:16,fontWeight:'bold',textTransform:'uppercase'}}>Cash In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{backgroundColor:'red'}]} onPress={()=>handleClick("Add Cash Out Entry",'red')}>
              <Ionicons name="remove-outline" size={30} color='white' fontWeight="bold"/>  
              <Text style={{color:'white',fontSize:16,fontWeight:'bold',textTransform:'uppercase'}}>Cash Out</Text>
          </TouchableOpacity>
      </View>

    </View>
    )
 )
}

export default Entries

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ebe9e4'
  },
  searchContainer:{
    flexDirection:'row',
    height:50,
    alignItems:'center',
    paddingHorizontal:20,
    paddingVertical:10,
    backgroundColor:'white',
    justifyContent:'space-between',
    borderBottomColor:'lightgray',
    borderBottomWidth:1,
  },
  input:{
    padding:10,
    width:'90%',
    borderColor:'transparent',
    borderWidth:1,
    height:40,
    borderRadius:5,
  },
  filterContainer:{
    paddingHorizontal:10,
    flexDirection:'row',
    paddingVertical:10,
    width:"100%",
    height:60,
  },
  filterItem:{
    flexDirection:'row',
    padding:10,
    height:40,
    backgroundColor:'white',
    borderRadius:15,
    alignItems:'center',
    justifyContent:'space-between',
    marginHorizontal:10,
  },
  reportContainer:{
    paddingHorizontal:20,
  },
  reportCard:{
    backgroundColor:'white',
    padding:10,
    borderRadius:5,
    shadowOpacity:0.5,
    shadowColor: '#000',
    elevation:10,
  },
  cardHeader:{
    borderBottomWidth:1,
    borderBottomColor:'lightgray',
    flexDirection:'row',
    paddingVertical:10,
    alignItems:'center',
    justifyContent:'space-between'
  },
  cardText:{
    flexDirection:'row',
    paddingVertical:10,
    alignItems:'center',
    justifyContent:'space-between'
  },
  cardFooter:{
    borderTopWidth:1,
    borderTopColor:'lightgray',
    flexDirection:'row',
    paddingVertical:10,
    alignItems:'center',
    justifyContent:'center',
    gap:1,
  },
  entryContainer:{
    flex:1,
    margin:10,
    marginTop:20,
  },
  footer:{
    padding:10,
    backgroundColor:'white',
    height:70,
    borderColor:'lightgray',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    borderWidth:1,
    shadowOpacity:0.5,
    shadowColor: '#000',
    elevation:10,
  },
  button:{
    borderRadius:5,
    width:'42%',
    paddingVertical:5,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  
  }

  
})