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
      .catch(e => console.log(e));
  }

  eliminar() { }

  render() {
    return (

      <View style={styles.container}>
        <Text style={styles.titulo}>PROFILE</Text>
        <Text style={styles.usuario}> Hola! {this.state.usuario}</Text>
        <Text style={styles.email}> {this.state.email} </Text>

        <Text style={styles.subtitulo}>Mis posteos:</Text>

        <FlatList
          data={this.state.posteos}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) =>
            <View style={styles.post}>
              <Text >{item.data.mensaje}</Text>
              
            </View>
          }

        />
        <Pressable style={styles.botonLogout} onPress={() => this.logout()}>
          <Text>LogOut </Text>
        </Pressable>

      </View>


    )
  }
}
const styles = StyleSheet.create({
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
    fontSize: 24,
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
    color: "#F8C7C7",
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
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 25,
    marginBottom: 15,
    alignSelf: "center",
    width: "80%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
  },
  textoBotonCerrar: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
})



export default Profile;