import { View,Text ,ScrollView,StyleSheet,Image,TouchableOpacity} from "react-native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {signOut} from "firebase/auth"
import { auth } from "../firebase/firebase";
import Popup from "../components/Popup";
export default function Settings(){
    const { user } = useContext(AuthContext);
    console.log("user",user)
    const handleSubmit=()=>{
        signOut(auth)
    }
    return(
        <ScrollView style={styles.container}>
            <View style={styles.profileContainer}>
                <Text style={{width:40,height:40,backgroundColor:'green',borderRadius:20,textAlign:'center',textTransform:'capitalize',color:'white',fontSize:18,fontWeight:500,textAlignVertical:"center"}}>
                    {user.email[0]}
                </Text>
                <Text style={{padding:10,fontSize:16,fontWeight:'bold',color:'gray'}}>{user.email}</Text>
            </View>
            <View style={{marginTop:10}}>

                <View style={styles.card}>
                    <View style={{width:40,height:40,borderRadius:100,backgroundColor:'#c4d7f5',alignItems:'center',justifyContent:"center"}}>
                        <Ionicons name="people-circle-outline" size={25} color='#075be3' fontWeight="bold" />                
                    </View>
                    <View style={{}}> 
                        <Text style={{fontSize:18,fontWeight:'bold'}}>Business Team</Text>
                        <Text style={{fontSize:14,fontWeight:400,color:'gray'}}>Add, remove or change role</Text>
                    </View>
                    <View style={{position:'absolute',right:10}}>
                        <Ionicons name="chevron-forward-outline" size={25} color='gray' fontWeight="bold" />                
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={{width:40,height:40,borderRadius:100,backgroundColor:'#c4d7f5',alignItems:'center',justifyContent:"center"}}>
                        <Ionicons name="git-compare-outline" size={25} color='#075be3' fontWeight="bold" />                
                    </View>
                    <View style={{}}> 
                        <Text style={{fontSize:18,fontWeight:'bold'}}>Requests</Text>
                        <Text style={{fontSize:14,fontWeight:400,color:'gray'}}>Approve or deny requests</Text>
                    </View>
                    <View style={{position:'absolute',right:10}}>
                        <Ionicons name="chevron-forward-outline" size={25} color='gray' fontWeight="bold" />                
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={{width:40,height:40,borderRadius:100,backgroundColor:'#c4d7f5',alignItems:'center',justifyContent:"center"}}>
                        <Ionicons name="business-outline" size={25} color='#075be3' fontWeight="bold" />                
                    </View>
                    <View style={{}}> 
                        <Text style={{fontSize:18,fontWeight:'bold'}}>Business Settings</Text>
                        <Text style={{fontSize:14,fontWeight:400,color:'gray'}}>Settings specific to this business</Text>
                    </View>
                    <View style={{position:'absolute',right:10}}>
                        <Ionicons name="chevron-forward-outline" size={25} color='gray' fontWeight="bold" />                
                    </View>
                </View>
            </View>
            <Text style={{padding:10,color:'#6e7073',fontWeight:500}}>
                Do more with CashBook
            </Text>
            <View style={{flexDirection:'row',padding:10,justifyContent:'space-around'}}>
                <View style={{backgroundColor:'white',padding:5,borderRadius:10,width:"30%",alignItems:'center',paddingBottom:10}}>
                    <Image
                    source={{ uri: 'https://thumbs.dreamstime.com/b/business-identity-card-blue-icon-user-office-id-use-commercial-print-media-web-any-type-design-projects-186784713.jpg' }}
                    style={{ width: 80, height: 80 }}
                    />
                    <Text style={{color:'gray',fontSize:14,fontWeight:500,textAlign:'center'}}>Business Card</Text>
                </View>
                <View style={{backgroundColor:'white',padding:5,borderRadius:10,width:"30%",alignItems:'center',paddingBottom:10}}>
                    <Image
                    source={{ uri: 'https://images.vexels.com/media/users/3/128243/isolated/preview/a1a5b9494d50bb3754bba547f2d88487-computer-monitor-flat-icon.png' }}
                    style={{ width: 80, height: 80 }}
                    />
                    <Text style={{color:'gray',fontSize:14,fontWeight:500,textAlign:'center'}}>CashBook For PC</Text>
                </View>
                <View style={{backgroundColor:'white',padding:5,borderRadius:10,width:"30%",alignItems:'center',paddingBottom:10}}>
                    <Image
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZycSXW2TLEjErGhjEJ8tssyl5ZtmgNxdVGg&usqp=CAU' }}
                    style={{ width: 80, height: 80 }}
                    />
                    <Text style={{color:'gray',fontSize:14,fontWeight:500,textAlign:'center'}}>Share App</Text>
                </View>
            </View>
            <Text style={{padding:10,color:'#6e7073',fontWeight:500}}>
                General Settings
            </Text>
            <View style={{marginTop:10}}>
                <View style={styles.card}>
                    <View style={{width:40,height:40,borderRadius:100,backgroundColor:'#c4d7f5',alignItems:'center',justifyContent:"center"}}>
                        <Ionicons name="phone-portrait-outline" size={25} color='#075be3' fontWeight="bold" />                
                    </View>
                    <View style={{}}> 
                        <Text style={{fontSize:18,fontWeight:'bold'}}>App Settings</Text>
                        <Text style={{fontSize:14,fontWeight:400,color:'gray'}}>Language, Theme, Security, Backup</Text>
                    </View>
                    <View style={{position:'absolute',right:10}}>
                        <Ionicons name="chevron-forward-outline" size={25} color='gray' fontWeight="bold" />                
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={{width:40,height:40,borderRadius:100,backgroundColor:'#c4d7f5',alignItems:'center',justifyContent:"center"}}>
                        <Ionicons name="people-circle-outline" size={25} color='#075be3' fontWeight="bold" />                
                    </View>
                    <View style={{}}> 
                        <Text style={{fontSize:18,fontWeight:'bold'}}>Your Profile</Text>
                        <Text style={{fontSize:14,fontWeight:400,color:'gray'}}>Name, Mobile Number, Email</Text>
                    </View>
                    <View style={{position:'absolute',right:10}}>
                        <Ionicons name="chevron-forward-outline" size={25} color='gray' fontWeight="bold" />                
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={{width:40,height:40,borderRadius:100,backgroundColor:'#c4d7f5',alignItems:'center',justifyContent:"center"}}>
                        <Ionicons name="alert-circle-outline" size={25} color='#075be3' fontWeight="bold" />                
                    </View>
                    <View style={{}}> 
                        <Text style={{fontSize:18,fontWeight:'bold'}}>About Cashbook</Text>
                        <Text style={{fontSize:14,fontWeight:400,color:'gray'}}>Privacy Policy, T&C, About Us</Text>
                    </View>
                    <View style={{position:'absolute',right:10}}>
                        <Ionicons name="chevron-forward-outline" size={25} color='gray' fontWeight="bold" />                
                    </View>
                </View>
                
                </View>
                <TouchableOpacity style={{marginTop:10,marginBottom:40,padding:10,alignItems:'center',flexDirection:'row',backgroundColor:'white',gap:10}} onPress={()=>handleSubmit()}>
                    <Ionicons name="exit-outline" size={25} color='#db270f' fontWeight="bold" />                
                    <Text style={{textAlign:'center',fontWeight:'bold',fontSize:16,color:'#db270f',textAlign:'center'}}>
                        Logout
                    </Text>
                </TouchableOpacity>
        </ScrollView>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ede9e8'
    },
    profileContainer:{
        padding:10,
        backgroundColor:'white',
        marginTop:10,
        flexDirection:'row',
    },
    card:{
        padding:15,
        borderBottomColor:'lightgray',
        borderBottomWidth:1,
        backgroundColor:'white',
        flexDirection:'row',
        gap:10,
        alignItems:'center',
    }


})