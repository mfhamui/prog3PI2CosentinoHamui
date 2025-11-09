
import React, { Component } from "react";

import { View, Text, StyleSheet, Pressable } from "react-native";
import { auth, db} from "../Firebase/Config";
import firebase from "firebase";

class Post extends Component {
  constructor(props) {
    super(props);
      this.state = {
            texto: true,
            
        }

  }
  
   likearPost() {
     if (this.props.likes.includes(auth.currentUser.email)) {
      db.collection("posts")
        .doc(this.props.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
        })
        .then(() =>
          this.setState({ texto: true })
        )
        .catch((e) => console.log(e));
    } 
   
    else {
      db.collection("posts")
        .doc(this.props.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
        })
        .then(() =>
          this.setState({ texto: false })
        )
        .catch((e) => console.log(e));
    }
  }




  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.email}>{this.props.email}</Text>
        <Text style={styles.mensaje}>{this.props.mensaje}</Text>
        
        <View style={styles.elementos}>

         <Pressable style={styles.gustar} onPress={() => this.likearPost()}>
          <Text> {this.state.texto ? "dar me gusta" : "eliminar me gusta"}</Text>
        </Pressable>
        <Text> numero de likes: {this.props.likes.length  > 0? this.props.likes.length: 0 }</Text>
                
        </View>
        <Pressable style={styles.botonAzul} onPress={() => this.props.navigation.navigate('Comentar')}>
          <Text> Comentar </Text>
        </Pressable>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  FlatList: {
    flex: 1,
    width: "100%"
  },
  container: {
    
    marginVertical: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#f89f9fff",
    borderRadius: 20,
    backgroundColor: "#ffffff",
  
  },
  
  email: {
    fontWeight: "bold",
    marginBottom: 4,
    alignSelf: "center",
    fontSize:20,

  },
  mensaje: {
    fontSize: 16,
    marginBottom: 4,
  },
  elementos: {
   flexDirection: "row",          
  justifyContent: "space-between", 
  alignItems: "center",          
  marginTop: 5,

  }

});

export default Post;