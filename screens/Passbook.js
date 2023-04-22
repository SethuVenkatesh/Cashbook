import { View,Text,StyleSheet, Pressable } from "react-native";
import ShareExample from "../components/dummy";
import { useContext,useState,useEffect } from "react";
import { onSnapshot,doc } from "firebase/firestore";
import {db} from '../firebase/firebase'
import { AuthContext } from "../context/AuthContext";
import { ScrollView } from "react-native";
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
import reactNativeHTMLtoPDF from 'react-native-html-to-pdf';


const generateHTML = () => {
    return `
      <html>
        <head>
          <style>
            // add any necessary styles here
          </style>
        </head>
        <body>
          <div>
            // your React Native component goes here
          </div>
        </body>
      </html>
    `;
  };
  const handleGeneratePDF = () => {
    
    // const options = {
    //   html: generateHTML(),
    //   fileName: 'MyPDF',
    // };
    // console.log(options)
    // const file = await reactNativeHTMLtoPDF.convert(options);
    // alert(file.filePath);    
  };
    

const PassbookCard=({book})=>{
    return(
        <View style={styles.card}>
            <Text style={styles.text}>{book.name}</Text>
            <Pressable onPress={()=>handleGeneratePDF()}>
                <Text style={styles.generate}>
                    Generate PDF
                </Text>
            </Pressable>
        </View>
    )
}

export default function Passbook(){
    const {user}=useContext(AuthContext)
    const [cashBook,setcashBook]=useState();
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
      }, [user.uid])

    return(
         <ScrollView style={styles.container}>
                {
                    cashBook && 
                        cashBook.map((book)=>(
                            <PassbookCard book={book} key={book.id}/>
                        ))
                }
        </ScrollView>
    )
}
const styles=StyleSheet.create({
    container:{
        marginTop:10,
    },
    card:{
        padding:10,
        borderBottomColor:'lightgray',
        borderBottomWidth:1,
        backgroundColor:'white',
        alignItems:"center",
        flexDirection:'row',
        justifyContent:'space-around'
    },
    text:{
        fontSize:16,
        fontWeight:'bold',
        color:'gray'
    },
    generate:{
        paddingVertical:5,
        paddingHorizontal:10,
        backgroundColor:'crimson',
        borderRadius:5,
        color:'white',
        fontWeight:'bold'
    }

})