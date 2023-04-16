import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { useLayoutEffect ,useState} from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { db } from '../firebase/firebase';
import { v4 as uuid } from "uuid";
import { 
  arrayUnion,
  doc,
  setDoc,
  getDoc,
  Timestamp,
  updateDoc,
 } from 'firebase/firestore';

const CashEntry = ({navigation}) => {
    const {user}=useContext(AuthContext)
    const route = useRoute();
    const [date, setDate] = useState(new Date());
    const [bookId,setbookId]=useState("")
    const [allbookDetails,setallbookDetails]=useState()
    const [bookDetails,setbookDetails]=useState();
    const [bookIndex,setbookIndex]=useState();
    const [entry,setEntry]=useState({
      type:'',
      amount:'',
      remarks:'',
      category:'',
      paymentMode:'cash',
      currentBalance:''
    })
    const handleCategoryChange = (value) => {
      setEntry({...entry,paymentMode:value})
    };
    const currentDate=new Date()
    const timeString = currentDate.toLocaleTimeString('en-US', {hour12: false});
    useLayoutEffect(() => {
      const {name,color}=route.params
      const {bookId}=route.params
      setbookId(bookId)
      navigation.setOptions({
      title: name,
      headerTitleStyle:{color:color},
      headerRight:()=>(
        <View style={{flexDirection:'row',gap:15}}>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={20} color='blue' fontWeight="bold"/>                
          </TouchableOpacity>
        </View>
      )
    });
    if(color=='green'){
      entry.type='cashIn'
    }else{
      entry.type='cashOut'
    }
    getCashBookData(user.uid,bookId)
  }, [navigation]);

  const getCashBookData=async (userId,bookId)=>{
    const docRef = doc(db, "cashbooks", userId);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      const dataArray=docSnap.data().cashbooks
      setallbookDetails(dataArray)
      const particularBookIndex=dataArray.findIndex((obj)=>obj.id==bookId)
      setbookIndex(particularBookIndex)
      setbookDetails(dataArray[particularBookIndex])

    }else{
      console.log("No data")
    }

  }
  const handleSave=async (redirect)=>{
    try {
      if(entry.type=='cashIn'){
        allbookDetails[bookIndex].balance=allbookDetails[bookIndex].balance+parseInt(entry.amount)
        allbookDetails[bookIndex].cashIn=allbookDetails[bookIndex].cashIn+parseInt(entry.amount)
      }else{
        allbookDetails[bookIndex].balance=allbookDetails[bookIndex].balance-parseInt(entry.amount)
        allbookDetails[bookIndex].cashOut=allbookDetails[bookIndex].cashOut+parseInt(entry.amount)
      }
      entry.currentBalance=allbookDetails[bookIndex].balance
      await updateDoc(doc(db,"cashbooks",user.uid),{
        cashbooks:allbookDetails
      })
       await updateDoc(doc(db, "entry", user.uid+bookId), {
          entry: arrayUnion({
          id: uuid(),
          entry:entry,
          date: date.toDateString(),
          time:timeString
        }),        
       });
       if(redirect){
         navigation.goBack()
       }

     } catch (err) {
       console.log(err)
    }
  }

  const handleDateChange = (event, selectedDate) => 
  {
  
  };
 
  const handleTimePick=()=>
  {
        
  }
  return (
    <>

    <View style={styles.container}>
      <View style={styles.dateTime}>
        <TouchableOpacity onPress={()=>{}} style={styles.headerPicker}>
            <Ionicons name="calendar-outline" size={20} color='gray' fontWeight="bold"/> 
            <Text>{date.toDateString()}</Text>       
            <Ionicons name="caret-down-outline" size={20} color='gray' fontWeight="bold"/>                        
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{}} style={styles.headerPicker}>
            <Ionicons name="time-outline" size={20} color='gray' fontWeight="bold"/>    
            <Text>{timeString}</Text>    
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
          onChangeText={(value) => 
            {
                setEntry({...entry,amount:value})
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
          onChangeText={(value) => 
            {
                setEntry({...entry,remarks:value})
            }
          }
          />
           <TextInput
          style={styles.input}
          placeholder=" Category"
          maxLength={15}
          caretColor="black"
          selectionColor='blue'
          onChangeText={(value) => 
            {
                setEntry({...entry,category:value})
            }
          }
          />
          <View>
            <Text>Payment Mode</Text>
            <View style={{flexDirection:'row',gap:10}}>
                {
                    entry.paymentMode =='cash' ? 
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
        <TouchableOpacity style={styles.saveAndAddNew} onPress={()=>handleSave(false)}>
            <Text style={{fontWeight:'bold',color:'blue',textTransform:'uppercase'}}>Save and add New</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.save} onPress={()=>handleSave(true)}>
            <Text style={{fontWeight:'bold',color:'white',textTransform:'uppercase'}}>Save</Text>
        </TouchableOpacity>
    </View>
    </>
  )
}

export default CashEntry

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
    buttonContainer:{
        height:70,
        borderTopWidth:1,
        borderTopColor:'lightgray',
        flexDirection:'row',
        paddingVertical:10,
        alignItems:'center',
        justifyContent:'space-around',
    },
    saveAndAddNew:{
        borderWidth:1,
        borderColor:'blue',
        paddingHorizontal:20,
        paddingVertical:15,
        alignItems:'center',
        borderRadius:5,
        width:"60%",
       
    },
    save:{
        borderWidth:1,
        borderColor:'blue',
        paddingHorizontal:20,
        paddingVertical:15,
        alignItems:'center',
        borderRadius:5,
        width:'30%',
        backgroundColor:'blue',
       

    }


})