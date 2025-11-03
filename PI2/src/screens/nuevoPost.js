import  React, {Component}  from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { db, auth } from "../firebase/config"


class nuevoPost extends Component {
    constructor(props) {
       super(props);
       this.state = {
         Mensaje:"",
           
       }}
   
     
     onSubmit(mensaje) {
      db.collection('posts').add({
      email: auth.currentUser.email,
      mensaje: mensaje,
      createdAt: Date.now(),
    })
    .then((response) => {
     console.log(response);
     this.props.navigation.navigate('home')
     
    })
    .catch(error => console.log(error));
       
         }
           
                
     
       render(){
        console.log(auth);
        
       return(
          <View style= {StyleSheet.container}>
            <Text style={style.titulo}>Publicar:</Text>
           
         
         
           <TextInput  style={style.input} 
               keyboardType='default'
               placeholder='mensaje'
               onChangeText={ text => this.setState({Mensaje:text}) }
               value={this.state.Mensaje} />
           
           
           <Pressable style={style.boton} onPress={() => this.onSubmit( this.state.Mensaje)}>
           <Text style={style.texto}> Guardar posts </Text> 
           </Pressable> 
   
   
           <Pressable style={style.botonAzul}  onPress={ ()=> this.props.navigation.navigate('login')}>
               <Text>Ir al Login </Text>
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
   
     input: {
       height:20,
       paddingHorizontal: 10,
       paddingVertical: 15,
       borderWidth:1,
       borderColor: "#ccc", 
       borderCurve: 6, 
       marginVertical: 10, 
       borderStyle: "solid"
     },
   
     boton: {
       backgroundColor: "#28a745",
       paddingHorizontal:10,
       paddingVertical:6, 
       textAlign: "center",
       alignItems: "center",
       borderRadius: 4, 
       borderWidth: 1, 
       borderStyle: "solid",
       borderColor: "#28a745"
     },
     texto : {color: "#fff",
   },
   
   
       botonAzul: {
       backgroundColor: "#7dc5f5",
       borderRadius: 4,
       alignItems: "center",
      paddingHorizontal:10,
       paddingVertical:6, 
       marginTop: 10,
      
     },
   
   })

export default nuevoPost;