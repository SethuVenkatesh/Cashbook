import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { questions } from '../data';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { TouchableHighlight } from 'react-native';


const Question=({ques,ans,similar_ques})=>{
    const navigation=useNavigation()
    
    const handleQuestion=()=>{
        navigation.navigate("QuestionPage",{
            ques:ques,
            ans:ans,
            similar_ques:similar_ques
        })
    }

    return (
        <Pressable style={styles.questionCard} onPress={()=>handleQuestion()}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontWeight:500,fontSize:16,color:'#575957'}}>{ques}</Text>
                <Ionicons name="chevron-forward-outline" size={20} color='gray' fontWeight="bold" />                
            </View>
        </Pressable>
    )
}
const chipData=["All","Basics","Business Profile","Back Up","Entry Field","Search","Passbook"]
const Chip=({text,chipName,setChipName,setAllQuestion})=>{
    const handleChange=()=>{
        setChipName(text)
        if(text=='All'){
            setAllQuestion(questions)
        }
        else
        setAllQuestion(questions.filter((q)=>q.category==text))
    }
    return (
        <TouchableHighlight style={[chipName==text?styles.selectedChip:styles.notselectedChip]} onPress={()=>
        handleChange()
        }>
            <Text style={[chipName==text?styles.selectedChipText:styles.notselectedChipText]}>{text}</Text>
        </TouchableHighlight>
    )
}
const Help = () => {
    const [chipName,setChipName]=useState("All")
    const [allquestion,setAllQuestion]=useState(questions)
  return (
    <View style={styles.container}>  
        <Text style={{fontWeight:500,fontSize:16,color:'#575957',fontSize:16,margin:10}}>Categories</Text>
        <View style={{margin:10}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    chipData.map((c)=>{
                        return <Chip text={c} key={c} chipName={chipName} setChipName={setChipName} setAllQuestion={setAllQuestion} />
                    })
                }
            </ScrollView>
        </View>
      {
        allquestion.map((data)=>{
            return <Question ques={data.question} ans={data.answer} key={data.id} similar_ques={data.similar_ques}/>
        })
      }
      <View style={{marginBottom:10}}>

      </View>
    </View>
  )
}

export default Help

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:10,
    },
    questionCard:{
        padding:10,
        paddingVertical:15,
        borderBottomColor:'lightgray',
        borderBottomWidth:1,
        backgroundColor:'white'
    },
    chip:{
        flexDirection:'row',flex:1,
    },
    selectedChip:{
        borderRadius:20,
        backgroundColor:'#e1e6f7',
        padding:5,
        paddingHorizontal:10,
        marginHorizontal:5,
        borderWidth:1,
        borderColor:'#1a4ae8'
    },
    selectedChipText:{
        color:"#1a4ae8",
        fontWeight:600,
        fontSize:16
    },
    notselectedChip:{
        borderRadius:20,
        backgroundColor:'#dcdde0',
        padding:5,
        paddingHorizontal:10,
        marginHorizontal:5,
        borderWidth:1,
        borderColor:'#87888a'
    },
    notselectedChipText:{
        color:"#87888a",
        fontWeight:600,
        fontSize:16
    }

})