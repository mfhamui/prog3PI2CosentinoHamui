
import React, { Component } from "react";

import { View, Text, StyleSheet, Pressable } from "react-native";
import { auth, db } from "../Firebase/Config";
import firebase from "firebase";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texto: true,

    }

  }

  componentDidMount() {
  if (this.props.likes.includes(auth.currentUser.email)) {
    this.setState({ texto: false });
  } else {
    this.setState({ texto: true });
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
        <Text> numero de likes: {this.props.likes.length > 0 ? this.props.likes.length : 0}</Text>
       
        <View style={styles.elementos}>

          <Pressable onPress={() => this.likearPost()}>
            <Text style={styles.gustar}> {this.state.texto ? "Dar me gusta" : "Eliminar me gusta"}</Text>
          </Pressable>
          <Pressable style={styles.comentario} onPress={() => this.props.navigation.navigate('Comentar', { comentarios: this.props.comentarios, likes: this.props.likes, email:this.props.email, mensaje: this.props.mensaje, id: this.props.id})}>
            <Text > Comentar </Text>
          </Pressable>

        </View>

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
    borderColor: "#F8C7C7",
    borderRadius: 20,
    backgroundColor: "#ffffff"
  },

  email: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 20,
    marginBottom: 10
  },
   mensaje: {
    fontSize: 16,
    marginBottom: 7,
    marginVertical: 6,
    backgroundColor: "#fafafa",
    padding:5,
    borderRadius: 10
  },
  elementos: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  comentario: {
    marginVertical: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "#A7D2F2",
    alignSelf: "center",
    marginTop: 15

  },
  gustar: {
    marginVertical: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "#F8C7C7",
    alignSelf: "center",
    marginTop: 15
  }

});

export default Post;