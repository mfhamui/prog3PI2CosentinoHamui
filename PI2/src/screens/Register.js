import React, { Component } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { auth, db } from "../Firebase/Config";


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: "",
      password: "",
      error: ""
    }
  }


  onSubmit(email, password, usuario) {
    console.log(this.state);

    if (this.state.userName.length < 1) {
      this.setState({ error: "introducir un nombre de usuario es OBLIGATORIO" })
      return
    }

    auth.createUserWithEmailAndPassword(email, password)

      .then(response => {
        console.log(response);
        db.collection('users').add({
          email: email,
          userName: usuario,
          createdAt: Date.now(),
        })
          .then()
          .catch(e => console.log(e))

        this.props.navigation.navigate('Login')
      })

      .catch(error => {
        console.log(error.message);

        if (error.message == "The email address is badly formatted.") {
          this.setState({
            error: "el email esta mal formateado"
          })

        }
        if (error.message == "The email address is already in use by another account.") {
          this.setState({
            error: "el email ya esta en uso"
          })
        }

        if (error.message == "The password must be 6 characters long or more.") {
          this.setState({
            error: "la contraseña debe tener una longitud minima de 6 digitos"
          })
        }
        console.log(error);

      })




  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Registrarse</Text>


        <TextInput style={styles.input}
          keyboardType='email-address'
          placeholder='Ingrese su email'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email} />

        <TextInput style={styles.input}
          keyboardType='default'
          placeholder='Ingrese su userName'
          onChangeText={text => this.setState({ userName: text })}
          value={this.state.userName} />

        <TextInput style={styles.input}
          keyboardType='default'
          placeholder='Ingrese su contraseña'
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password} />

        <Text>{this.state.error}</Text>
        <Pressable style={styles.boton} onPress={() => this.onSubmit(this.state.email, this.state.password, this.state.userName)}>
          <Text style={styles.texto}> Registrarse </Text>
        </Pressable>

        <Pressable style={styles.botonB} onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.texto}> Ya tengo cuenta </Text>
        </Pressable>



      </View>

    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10
  },
  botonB: {
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    margin: 10
  },
  boton: {
    backgroundColor: "#A7D2F2",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: "center"
  },
  texto: {
    color: "black"
  },
  input: {
    height: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderCurve: 6,
    marginVertical: 10,
    borderStyle: "solid"
  }

})


export default Register;
