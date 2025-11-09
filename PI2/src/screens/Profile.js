import React, { Component } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import { auth, db } from "../Firebase/Config"

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      email: "",
      posteos: [],
    };
  }

  componentDidMount() {

    db.collection("users")
      .where("email", "==", auth.currentUser.email)
      .onSnapshot(docs => {
        docs.forEach(doc => {
          this.setState({
            usuario: doc.data().userName,
            email: doc.data().email,
          });
        });
      });


    db.collection("posts")
      .where("email", "==", auth.currentUser.email)
      .onSnapshot(docs => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          posteos: posts,
        });
      });
  }

  
  logout() {
    auth.signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
      })
      .catch( e => console.log(e));
    }

    eliminar(){}

  render() {
    return (

      <View style={style.container}>
        <Text style={style.titulo}>PROFILE</Text>
        <Text style={style.usuario}> Hola! {this.state.usuario}</Text>
        <Text style={style.email}> {this.state.email} </Text>

        <Text style={style.subtitulo}>Mis posteos:</Text>

                       <FlatList
                        data= {this.state.posteos}
                        keyExtractor={item=> item.id.toString()}
                        renderItem={({item})=> 
                        <View style={style.post}> 
                        <Text style= {style.mensaje}>{item.data.mensaje}</Text>

                         <Pressable   onPress={() => this.eliminar(item.id)}>
                          <Text style={style.eliminar}>Eliminar</Text>
                         </Pressable>
                        </View>
                      }
                                    
                />   
                     <Pressable style={style.botonLogout} onPress={ ()=> this.logout()}>
                             <Text>LogOut </Text>
                    </Pressable>
                


      </View>


    )
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: "#ffffff",
  },
  usuario: {
    fontSize: 20,
    marginBottom: 2,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 2,
   
  },
  email: {
    fontSize: 15,
    color: "#555555",
    marginBottom: 18,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 14,
    color:  "#F8C7C7",
  },
  post: {
    marginVertical: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#999999",
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },
  botonLogout: {
    backgroundColor: "#F8C7C7",
    borderRadius: 18,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 25,
    marginBottom: 15,
    alignSelf: "center",
    width: "80%",
  },
  textoBotonCerrar: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
 mensaje: {
    fontSize: 16,
    marginBottom: 7,
     marginVertical: 6,
    backgroundColor: "#fafafa",
  },

  eliminar:{
     fontWeight: "500",
     fontStyle:"italic", 
     color: "#fd7272ff",
  },
})



export default Profile;