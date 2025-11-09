
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
        
         <Pressable style={styles.botonAzul} onPress={() => this.likearPost()}>
          <Text> {this.state.texto ? "dar me gusta" : "eliminar me gusta"}</Text>
        </Pressable>
        <Text> numero de likes: {this.props.likes.length  > 0? this.props.likes.length: 0 }</Text>
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
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginVertical: 5,
    width: "100%"
  },
  email: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  mensaje: {
    fontSize: 16,
    marginBottom: 4,
  },

});

export default Post;