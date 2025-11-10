import React, { Component } from "react";
import { StyleSheet, Text, View, Pressable, TextInput, FlatList } from "react-native";

import { auth, db } from "../Firebase/Config";
import firebase from "firebase";


class Comentar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comentario: "",
            comentarios: []

        }
    }
    componentDidMount() {
        this.setState({
            comentarios: this.props.route.params.comentarios
        })
    }
    onSubmit() {
        console.log(this.state);
        db.collection("posts")
            .doc(this.props.route.params.id)
            .update({
                comentarios: firebase.firestore.FieldValue.arrayUnion({ comentario: this.state.comentario, email: auth.currentUser.email })
            })
            .then(() =>
                // this.props.navigation.navigate('Login')
                this.setState({
                    comentarios: this.state.comentarios.concat({ comentario: this.state.comentario, email: auth.currentUser.email }),
                    comentario: ""
                })
            )
            .catch((e) => console.log(e));



    }
    render() {
        console.log(this.props);

        return (
            <View style={styles.container}>

                <View style={styles.perfil}>
                    <Text style={styles.email}>{this.props.route.params.email}</Text>
                    <Text style={styles.mensaje}>{this.props.route.params.mensaje}</Text>
                    <Text> numero de likes: {this.props.route.params.likes.length > 0 ? this.props.route.params.likes.length : 0}</Text>

                </View>

                <View style={styles.box}>
                    <TextInput style={styles.input}
                        keyboardType='default'
                        placeholder='Comenta aquí el post...'
                        onChangeText={text => this.setState({ comentario: text })}
                        value={this.state.comentario} />

                    <Pressable style={styles.boton} onPress={() => this.onSubmit()}>
                        <Text style={styles.texto}> Publicar comentario </Text>
                    </Pressable>
                </View>
                <Text style={styles.subtitulo}>Otros comentarios:</Text>
                <FlatList
                    data={this.state.comentarios}
                    keyExtractor={item => item.comentario}
                    renderItem={({ item }) =>
                        <View style={styles.comentar}>
                            <Text style={styles.usuario}> {item.email} </Text>
                            <Text style={styles.mensaje}> {item.comentario} </Text>

                        </View>
                    }
                />

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
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
        backgroundColor: "#ffffff",
    },
    perfil: {
        marginVertical: 8,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderWidth: 2,
        borderColor: "#A7D2F2",
        borderRadius: 20,
        backgroundColor: "#ffffff"
    },

    comentar: {
        marginVertical: 8,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: "#A7D2F2",
        borderRadius: 20,
        backgroundColor: "#ffffff"
    },
    box: { marginVertical: 30, },


    usuario: {
        fontSize: 16,
        fontWeight: "bold",


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
        borderRadius: 20
    },
    input: {
        alignSelf: "center",
        textAlign: "center",
        textAlignVertical: "top",
        justifyContent: "flex-start",
        width: "85%",
        height: 80,
        borderWidth: 1,
        borderColor: "#A7D2F2",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingTop: 0,
        marginBottom: 20,
        backgroundColor: "#fff",
    },
    boton: {
        backgroundColor: "#A7D2F2",
        borderRadius: 20,
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
        width: "85%",
        alignSelf: "center",
        textAlign: "center",
    },
    texto: {
        fontSize: 16,
        color: "#000",
    },
    subtitulo: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 14,
        color: "#A7D2F2",
    }
});

export default Comentar;
