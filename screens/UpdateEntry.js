import { StyleSheet, Text, View,TouchableOpacity,TextInput } from 'react-native'
import React from 'react'
import { useEffect,useState } from 'react';
import { useRoute } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase/firebase';
import { 
    arrayUnion,
    doc,
    setDoc,
    getDoc,
    Timestamp,
    updateDoc,
   } from 'firebase/firestore';

const UpdateEntry = ({navigation}) => {
    const route=useRoute()
    const {user}=useContext(AuthContext)
    const {entry,date,time,entryId,bookId}=route.params
    const [newentry,setnewEntry]=useState(entry)
    const [allentry,setAllEntry]=useState()
    const [bookIndex,setbookIndex]=useState()
    const [allBooks,setallBooks]=useState()
    const [index,setIndex]=useState()

  useEffect(() => {
    navigation.setOptions({
      title: "Entry Details",
      headerRight:()=>(
        <View style={{flexDirection:'row',gap:15,alignItems:'center'}}>
          <TouchableOpacity onPress={()=>handleDelete()}>
            <Ionicons name="trash" size={25} color='red' fontWeight="bold"/>                
          </TouchableOpacity>
        </View>
      )
    });
    getEntryDetails()
    getCashBookDetails()
  }, []);

  const getEntryDetails=async ()=>{
    const docRef = doc(db, "entry", user.uid+bookId);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      const dataArray=docSnap.data().entry
      const newIndex=dataArray.findIndex((obj)=>obj.id==entryId)
      setIndex(newIndex)
      setAllEntry(dataArray)
    }else{
      console.log("No data")
    }
  }
  const getCashBookDetails=async ()=>{
    const docRef = doc(db, "cashbooks", user.uid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      const dataArray=docSnap.data().cashbooks
      const newIndex=dataArray.findIndex((obj)=>obj.id==bookId)
      setbookIndex(newIndex)
      setallBooks(dataArray)

    }else{
      console.log("No data")
    }
  }

  const handleCategoryChange = (value) => {
    setnewEntry({...newentry,paymentMode:value})
  };
  const handleTypeChange = (value) => {
    setnewEntry({...newentry,type:value})
  };
  const handleUpdate=async ()=>{
    if(newentry.type=='cashIn'&&entry.type=='cashIn'){
      newentry.currentBalance=newentry.currentBalance-parseInt(entry.amount)
      newentry.currentBalance=newentry.currentBalance+parseInt(newentry.amount)
    }
    else if(newentry.type=='cashOut'&&entry.type=='cashOut'){
      newentry.currentBalance=newentry.currentBalance+parseInt(entry.amount)
      newentry.currentBalance=newentry.currentBalance-parseInt(newentry.amount)
    }
    else if(newentry.type=='cashOut'&&entry.type=='cashIn'){
      newentry.currentBalance=newentry.currentBalance-parseInt(entry.amount)
      newentry.currentBalance=newentry.currentBalance-parseInt(newentry.amount)
    }
    else{
      newentry.currentBalance=newentry.currentBalance+parseInt(entry.amount)
      newentry.currentBalance=newentry.currentBalance+parseInt(newentry.amount)
    }
    allentry[index].entry=newentry
    let prevBalance=newentry.currentBalance
    for(let i=index+1;i<allentry.length;i++){
      if(allentry[i].entry.type=='cashIn'){
        allentry[i].entry.currentBalance=parseInt(allentry[i].entry.amount)+prevBalance
      }
      else{
        allentry[i].entry.currentBalance=prevBalance-parseInt(allentry[i].entry.amount)
      }
      prevBalance=allentry[i].entry.currentBalance
    }
    await updateDoc(doc(db, "entry",user.uid+bookId), {
        entry: allentry,
      });
    allBooks[bookIndex].balance=prevBalance
    let cashIn=0
    let cashOut=0
    for(let i=0;i<allentry.length;i++){
      if(allentry[i].entry.type=='cashIn'){
        cashIn+=parseInt(allentry[i].entry.amount)
      }else{
        cashOut+=parseInt(allentry[i].entry.amount)
      }
    }
    allBooks[bookIndex].cashIn=cashIn
    allBooks[bookIndex].cashOut=cashOut
      await updateDoc(doc(db, "cashbooks",user.uid), {
        cashbooks: allBooks,
      });
    navigation.goBack()
  }
  const handleDelete=async ()=>{
    let cashIn=0
    let cashOut=0
    let prevBalance=0
    for(let i=0;i<allentry.length;i++){
      if(allentry[i].id!=entryId){
        if(allentry[i].entry.type=='cashIn'){
          cashIn+=parseInt(allentry[i].entry.amount)
          allentry[i].entry.currentBalance=parseInt(allentry[i].entry.amount)+prevBalance
          prevBalance=prevBalance+parseInt(allentry[i].entry.amount)
        }
        else{
          cashOut+=parseInt(allentry[i].entry.amount)
          allentry[i].entry.currentBalance=parseInt(allentry[i].entry.amount)-prevBalance
          prevBalance=prevBalance-parseInt(allentry[i].entry.amount)

        }
      }
    }
    let newArray=allentry.filter((entry)=>(entry.id!=entryId))
    await updateDoc(doc(db, "entry",user.uid+bookId), {
        entry: newArray,
      });
    allBooks[bookIndex].balance=prevBalance
    allBooks[bookIndex].cashIn=cashIn
    allBooks[bookIndex].cashOut=cashOut

      await updateDoc(doc(db, "cashbooks",user.uid), {
        cashbooks: allBooks,
      });
    navigation.goBack()
  }
  return (
    <>
    <View style={{flexDirection:'row',gap:10,margin:10}}>
        {
            newentry.type =='cashIn' ? 
            (
            <>
                <TouchableOpacity onPress={()=>handleTypeChange('cashIn')}>
                    <Text style={styles.cashInselected}>Cash In</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handleTypeChange('cashOut')}>
                    <Text style={styles.categoryItemNotSelected}>Cash Out</Text>
                </TouchableOpacity>
            </>
            ):
            (
            <>
                <TouchableOpacity onPress={()=>handleTypeChange('cashIn')}>
                    <Text style={styles.categoryItemNotSelected}>Cash In</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handleTypeChange('cashOut')}>
                    <Text style={styles.cashOutselected}>Cash Out</Text>
                </TouchableOpacity>
            </>
            )

        }
    </View>
    <View style={styles.container}>
      <View style={styles.dateTime}>
        <TouchableOpacity onPress={()=>{}} style={styles.headerPicker}>
            <Ionicons name="calendar-outline" size={20} color='gray' fontWeight="bold"/> 
            <Text>{date}</Text>       
            <Ionicons name="caret-down-outline" size={20} color='gray' fontWeight="bold"/>                        
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{}} style={styles.headerPicker}>
            <Ionicons name="time-outline" size={20} color='gray' fontWeight="bold"/>    
            <Text>{time}</Text>    
            <Ionicons name="caret-down-outline" size={20} color='gray' fontWeight="bold"/>      
        </TouchableOpacity>
      </View>

      <View style={styles.dataEntry}>
         <TextInput
          style={styles.input}
          placeholder="Amount"
          maxLength={15}
          caretColor="black"
          keyboardType="numeric"
          selectionColor='blue'
          value={newentry.amount}
          onChangeText={(value) => 
            {
                setnewEntry({...newentry,amount:value})
            }
          }
          />
           <TextInput
          style={styles.input}
          placeholder="Party (Customer/Supplier)"
          maxLength={15}
          caretColor="black"
          selectionColor='blue'

          />
           <TextInput
          style={styles.input}
          placeholder="Remark (Item, Person Name,Quantity..)"
          maxLength={15}
          caretColor="black"
          selectionColor='blue'
          value={newentry.remarks}

          onChangeText={(value) => 
            {
                setnewEntry({...newentry,remarks:value})
            }
          }
          />
           <TextInput
          style={styles.input}
          placeholder=" Category"
          maxLength={15}
          caretColor="black"
          selectionColor='blue'
          value={newentry.category}
          onChangeText={(value) => 
            {
                setnewEntry({...newentry,category:value})
            }
          }
          />
          <View>
            <Text>Payment Mode</Text>
            <View style={{flexDirection:'row',gap:10}}>
                {
                    newentry.paymentMode =='cash' ? 
                    (
                    <>
                        <TouchableOpacity onPress={()=>handleCategoryChange('cash')}>
                            <Text style={styles.categoryItem}>Cash</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>handleCategoryChange('online')}>
                            <Text style={styles.categoryItemNotSelected}>Online</Text>
                        </TouchableOpacity>
                    </>
                    ):
                    (
                 <>
                        <TouchableOpacity onPress={()=>handleCategoryChange('cash')}>
                            <Text style={styles.categoryItemNotSelected}>Cash</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>handleCategoryChange('online')}>
                            <Text style={styles.categoryItem}>Online</Text>
                        </TouchableOpacity>
                    </>
                    )
                }
            </View>
          </View>
      </View>
    </View>
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.delete} onPress={()=>handleDelete()}>
                <Text style={{fontWeight:'bold',color:'white',textTransform:'uppercase'}}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.update} onPress={()=>handleUpdate()}>
            <Text style={{fontWeight:'bold',color:'white',textTransform:'uppercase'}}>Update</Text>
        </TouchableOpacity>
    </View>
    </>
  )
}

export default UpdateEntry

const styles = StyleSheet.create({
    container:{
        padding:10,
        flex:1,
    },
    dateTime:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:50,
        alignItems:'center',
    },
    headerPicker:{
        flexDirection:'row',
        gap:10,
    },
    dataEntry:{
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
    categoryItem:{
        color:'white',
        backgroundColor:'blue',
        fontSize:14,
        fontWeight:'bold',
        padding:7,
        paddingHorizontal:20,
        borderRadius:20,
    },
    categoryItemNotSelected:{
        color:'#474644',
        backgroundColor:'#d9d8d4',
        fontSize:14,
        fontWeight:'bold',
        padding:7,
        paddingHorizontal:20,
        borderRadius:20,
    },
    cashInselected:{
        color:'#11a839',
        backgroundColor:'#83fca4',
        fontSize:14,
        fontWeight:'bold',
        padding:7,
        paddingHorizontal:20,
        borderRadius:20,
    },
    cashOutselected:{
        color:'#b3100b',
        backgroundColor:'#f7aba8',
        fontSize:14,
        fontWeight:'bold',
        padding:7,
        paddingHorizontal:20,
        borderRadius:20,

    },
    buttonContainer:{
        borderTopWidth:1,
        borderTopColor:'lightgray',
        paddingVertical:10,
        alignItems:'center',
        justifyContent:'space-around',
        gap:10

    },
    update:{
        borderWidth:1,
        borderColor:'blue',
        paddingHorizontal:20,
        paddingVertical:15,
        alignItems:'center',
        borderRadius:5,
        width:'90%',
        backgroundColor:'blue',   
    },
    delete:{
      borderWidth:1,
      borderColor:'#db270f',
      paddingHorizontal:20,
      paddingVertical:15,
      alignItems:'center',
      borderRadius:5,
      width:'90%',
      backgroundColor:'#db270f',  
    }
})