import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { questions } from '../data';
import { useNavigation } from '@react-navigation/native';

const QuestionPage = () => {
const navigation=useNavigation()
const route = useRoute();
const {ques,ans,similar_ques}=route.params
const [question,setQuestion]=useState([])
const [up,setUp]=useState(false)
const [down,setDown]=useState(false)
const handle=(title)=>{
    if(title=="up"){
        setUp(!up)
        setDown(false)
    }else{
        setDown(!down)
        setUp(false)
    }
}
useEffect(()=>{
    let array=[]
    console.log(questions)
    for(let i=0;i<similar_ques.length;i++){
        
        for(let j=0;j<questions.length;j++){
            if(questions[j].id==similar_ques[i]) array.push(questions[j])

        }
    }
    setQuestion(array)
},[])
  return (
    <View styles={styles.container}>
        <View style={styles.header}>
            <Text style={styles.question}>{ques}</Text>
            <Text style={styles.answer}>{ans}</Text>
            <View style={styles.feedbackContainer}>
                <Text style={{fontSize:16,fontWeight:'bold',color:'gray'}}>Was This Helpful</Text>
                <View style={{flexDirection:'row',alignItems:'center',gap:10,}}>
                    {
                        !up?
                        <Ionicons name="thumbs-up-outline" size={20} color='green' fontWeight="bold" onPress={()=>handle("up")}/>  :<Ionicons name="thumbs-up" size={20} color='green' fontWeight="bold" onPress={()=>handle("up")}/>             
                    }
                    {
                        !down?
                        <Ionicons name="thumbs-down-outline" size={20} color='red' fontWeight="bold" onPress={()=>handle("down")}/>  :<Ionicons name="thumbs-down" size={20} color='red' fontWeight="bold" onPress={()=>handle("down")}/>             
                    }
                </View>
            </View>
        </View>
        <Text style={{fontWeight:500,fontSize:16,color:'#575957',fontSize:16,margin:10}}>Related Questions</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.similar} >
            {
                question.map((q)=>{
                    return (
                        <TouchableOpacity style={{padding:10,backgroundColor:'white',marginHorizontal:10,borderWidth:1,borderColor:'gray',borderRadius:5,flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:200}}
                            onPress={()=>
                                navigation.replace("QuestionPage",{
                                    ques:q.question,
                                    ans:q.answer,
                                    similar_ques:q.similar_ques
                                })
                            }
                            key={q.id}
                        >
                            <Text>{q.question}</Text>
                            <Ionicons name="chevron-forward-outline" size={20} color='gray' fontWeight="bold" onPress={()=>handle("up")}/>
                        </TouchableOpacity>
                    )
                })   
            }
        </ScrollView>
        <View style={styles.support}>
            <View>
                <Text style={{fontSize:16,fontWeight:600}}>Need more support?</Text>
                <Text style={{fontSize:14,fontWeight:400}}>Send us a message</Text>
            </View>
            <TouchableOpacity style={{flexDirection:'row',gap:10,backgroundColor:"green",padding:10,borderRadius:5,}}>
                <Ionicons name="logo-whatsapp" size={20} color='white' fontWeight="bold"/> 
                <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Contact Us</Text>
            </TouchableOpacity>
        </View>
      
    </View>
  )
}

export default QuestionPage

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        backgroundColor:'white',
        padding:20,
    },
    question:{
        fontSize:18,
        fontWeight:600,
        marginBottom:10,
    },
    answer:{
        fontSize:16,
        fontWeight:400,
        marginBottom:10,
    },
    feedbackContainer:{
        padding:20,
        borderColor:'gray',
        borderWidth:1,
        borderRadius:5,
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center'
    },
    support:{
        margin:10,
        padding:15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'white'
    },
    similar:{   
    marginVertical:10
    }

})