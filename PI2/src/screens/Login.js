import React, { Component } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { auth } from "../Firebase/Config";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('Menu');
            }
        });
    }
    onSubmit(email, password) {
        console.log(this.state);


        auth.signInWithEmailAndPassword(email, password)
            .then((response) => {
                console.log(response);
                this.props.navigation.navigate('Menu')
            })
            .catch(error => {
                console.log(error.message);

                if (error.message == "The password must be 6 characters long or more.") {
                    this.setState({
                        error: "La contraseña debe tener una longitud mínima de 6 digitos"
                    })
                }
                if (error.message == "The email address is badly formatted.") {
                    this.setState({
                        error: "El email esta mal formateado"
                    })

                }
                if (error.message.includes("INVALID_LOGIN_CREDENTIALS")) {
                    this.setState({
                        error: "Credenciales incorrectas"
                    })

                }
            })


    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Ingresar</Text>



                <TextInput style={styles.input}
                    keyboardType='email-address'
                    placeholder='Ingrese su email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email} />


                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder='Ingrese su contraseña'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password} />

                <Text>{this.state.error}</Text>

                <Pressable style={styles.boton} onPress={() => this.onSubmit(this.state.email, this.state.password)}>
                    <Text style={styles.texto}> Iniciar sesión </Text>
                </Pressable>

                <Pressable style={styles.botonB} onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.texto}> No tengo cuenta </Text>
                </Pressable>


            </View >

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

});

export default Login;
