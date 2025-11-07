import  React, {Component}  from "react";
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

    logout(){
    auth.signOut()
      .then(() => {
        this.props.navigation.navigate("Login"); 
      })
      .catch( e => console.log(e));
    }

    render(){
    return(
        
            <View style= {style.container}>
                  <Text style={style.titulo}>Profile</Text>
                  <Text> Hola! {this.state.usuario}</Text>
                    <Text> email:  {this.state.email} </Text>    

                    <Text style={style.subtitulo}>Mis posteos:</Text>  

                       <FlatList
                        data= {this.state.posteos}
                        keyExtractor={item=> item.id.toString()}
                        renderItem={({item})=> <Text>{item.data.mensaje}</Text>}
                                    
                />   
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
    marginTop: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitulo: {
    marginTop: 20,
    fontWeight: "bold",
  },
  post: {
    marginVertical: 5,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
 
  botonAmarillo: {
    backgroundColor: "#f0de3dff",
    borderRadius: 4,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 10,
  },
})



export default Profile;