import  React, {Component}  from "react";
import { View, Text, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { auth } from "../Firebase/Config"

class Profile extends Component {
    constructor(props) {
    super(props);}

    logout(){
    auth.signOut()
    }

    render(){
    return(
        
            <View style= {StyleSheet.container}>
                  <Text style={style.titulo}>Profile</Text>
                                    
                     <Pressable style={style.botonAmarillo} onPress={ ()=> this.logout()}>
                             <Text>LogOut </Text>
                    </Pressable>
                

                   
            </View>
          
        
    )}
}
const style= StyleSheet.create({
    container: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    paddingHorizontal: 10,
    marginTop:20,
    }, 

      titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },


    
  botonAmarillo: {
    backgroundColor: "#f0de3dff",
    borderRadius: 4,
    alignItems: "center",
    paddingHorizontal:10,
    paddingVertical:6, 
    marginTop:10,
  }
})



export default Profile;