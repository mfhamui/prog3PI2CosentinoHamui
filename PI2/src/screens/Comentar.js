import React, { Component } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";

import { auth, db } from "../Firebase/Config";
import firebase from "firebase";


class Comentar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comentario: ""

        }
    }
    onSubmit() {
        console.log(this.state);
        this.props.navigation.navigate('Login')
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.email}>{this.props.email}</Text>
                <Text style={styles.mensaje}>{this.props.mensaje}</Text>
                <Text> numero de likes: {this.props.likes.length > 0 ? this.props.likes.length : 0}</Text>

                <View style={styles.post}>
                    <Text style={styles.usuario}>{this.props.usuario}</Text>
                    <Text style={styles.comentario}>{this.props.comentario}</Text>
                </View>


                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder='comentario'
                    onChangeText={text => this.setState({ comentario: text })}
                    value={this.state.comentario} />

                <Pressable style={styles.boton} onPress={() => this.onSubmit()}>
                    <Text style={styles.texto}> enviar </Text>
                </Pressable>

            </View>

        )
    }

}
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
    post: {
        marginVertical: 8,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: "#F8C7C7",
        borderRadius: 20,
        backgroundColor: "#ffffff",
    },
    comentario: {
        marginBottom: 4,
        fontSize: 20,
        marginBottom: 10,
        backgroundColor: "#fafafa",
    },
    usuario: {
        fontSize: 16,
        marginBottom: 7,
        marginVertical: 6,
        padding: 5,
        borderRadius: 10
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
        padding: 5,
        borderRadius: 10
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
    }

});

export default Comentar;
