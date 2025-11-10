import React, { Component } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { db, auth } from "../Firebase/Config"


class NuevoPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Mensaje: "",

    }
  }


  onSubmit(mensaje) {
    db.collection('posts').add({
      email: auth.currentUser.email,
      mensaje: mensaje,
      createdAt: Date.now(),
      likes: [], 
      comentarios: []
    })
      .then((response) => {
        console.log(response);
        this.props.navigation.navigate('NavegacionComentar', {screen: "Home"})
        this.setState({
          Mensaje: ""
        })

      })
      .catch(error => console.log(error));

  }



  render() {
    console.log(auth);

    return (
      <View style={style.container}>
        <Text style={style.titulo}>Crear nuevo post:</Text>

        <TextInput style={style.input}
          keyboardType='default'
          placeholder='Escriba aqui su mensaje...'
          onChangeText={text => this.setState({ Mensaje: text })}
          value={this.state.Mensaje} />

        <Pressable style={style.boton} onPress={() => this.onSubmit(this.state.Mensaje)}>
          <Text style={style.texto}> Publicar post </Text>
        </Pressable>
      </View>

    )
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center"
  },
  input: {
    alignSelf: "center",
    textAlign: "center",
    textAlignVertical: "top",
    justifyContent: "flex-start",
    width: "85%",
    height: 120,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingTop: 0,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  boton: {
    backgroundColor: "#F8C7C7",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
  },
  texto: {
    fontSize: 16,
    color: "#000",
  },

})

export default NuevoPost;
