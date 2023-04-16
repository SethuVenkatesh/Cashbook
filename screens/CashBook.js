import { useState,useRef, useEffect,useContext } from "react";
import { View,Text,StyleSheet, ScrollView,Modal,Button,Dimensions ,TouchableOpacity, TextInput,KeyboardAvoidingView} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CashBookCard } from "../components/CashBookCard";
import RBSheet from "react-native-raw-bottom-sheet";
import BottomSheetForm from "../components/BottomSheetForm";
import Rename from "../components/Rename";
import { onSnapshot,doc } from "firebase/firestore";
import {db} from '../firebase/firebase'
import { AuthContext } from "../context/AuthContext";
export default function CashBook(){
    const [cashBook,setcashBook]=useState();
    const [renameId,setrenameId]=useState()
    const refRBSheet = useRef();
    const renameRBSheet = useRef();
    const {user}=useContext(AuthContext)
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
 
    return(
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={{fontWeight:"600",color:"gray"}}>Your Books</Text>
                <View style={{flexDirection:"row",gap:20}}>
                    <Ionicons name="filter-outline" size={25} color='blue' fontWeight="bold" />
                    <Ionicons name="search-outline" size={25} color='blue' fontWeight="bold" />                
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {
                 cashBook && cashBook.map((book)=>(
                        <CashBookCard name={book.name} key={book.id} renameRBSheet={renameRBSheet} setrenameId={setrenameId} renameId={book.id} cashBook={cashBook} id={book.id} balance={book.balance}></CashBookCard>
                        ))
                }
            </ScrollView>
            <View style={{height:100}}>

            </View>
           <TouchableOpacity style={styles.addNewButton} onPress={()=>refRBSheet.current.open()}>
                <Ionicons name="add-outline" size={30} color='white' fontWeight="bold"/>
                <Text style={styles.addNewButtonText}>ADD NEW BOOK</Text>
            </TouchableOpacity>
            <RBSheet
            ref={refRBSheet}
            height={300}
            openDuration={250}
            customStyles={{
                container: {
                justifyContent: "center",
                alignItems: "center"
                }
            }}
            >
                <BottomSheetForm refRBSheet={refRBSheet} setcashBook={setcashBook} cashBook={cashBook}/>
            </RBSheet>  
            <RBSheet
            ref={renameRBSheet}
            height={200}
            openDuration={250}
            customStyles={{
                container: {
                justifyContent: "center",
                alignItems: "center"
                }
            }}
            >
                <Rename renameRBSheet={renameRBSheet} renameId={renameId} setcashBook={setcashBook} cashBook={cashBook}></Rename>      
            </RBSheet>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        height:'100%',
    },
    scrollContainer:{
        padding:4, 
        paddingBottom:50,  
    },
    headingContainer:{
        flexDirection:"row",
        padding:10,
        justifyContent:"space-between",
        paddingHorizontal:20,
        borderBottomWidth:1,
        borderColor:"gray",

    },
    addNewButton:{
        backgroundColor:'blue',
        position:'absolute',
        paddingHorizontal:15,
        paddingVertical:10,
        bottom:10,
        right:20,
        borderRadius:50,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'


    },
    addNewButtonText:{
        color:'white',
        fontWeight:'bold'

    },
    addBookContainer:{

    },
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
    submitButton:{
        marginTop:30,
        width:'100%',
        paddingHorizontal:5,
        paddingVertical:10,
        borderRadius:5, 
        backgroundColor:'blue',
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