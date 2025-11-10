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
    componentDidMount(){
        this.setState({
            comentarios: this.props.route.params.comentarios
        })
    }
    onSubmit() {
        console.log(this.state);
        db.collection("posts")
            .doc(this.props.route.params.id)
            .update({
                comentarios: firebase.firestore.FieldValue.arrayUnion({comentario: this.state.comentario, email: auth.currentUser.email})
            })
            .then(() =>
                // this.props.navigation.navigate('Login')
                this.setState ({
                    comentarios: this.state.comentarios.concat({comentario: this.state.comentario, email: auth.currentUser.email}),
                    comentario: ""
                })
        )
            .catch((e) => console.log(e));



    }
    render() {
        console.log(this.props);
        
        return (
            <View style={styles.container}>
                <Text style={styles.email}>{this.props.route.params.email}</Text>
                <Text style={styles.mensaje}>{this.props.route.params.mensaje}</Text>
                <Text> numero de likes: {this.props.route.params.likes.length > 0 ? this.props.route.params.likes.length : 0}</Text>

                


                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder='Comenta aquí el post'
                    onChangeText={text => this.setState({ comentario: text })}
                    value={this.state.comentario} />

                <Pressable style={styles.boton} onPress={() => this.onSubmit()}>
                    <Text style={styles.texto}> Publicar comentario </Text>
                </Pressable>

                <FlatList 
                data={this.state.comentarios}
                keyExtractor={item => item.comentario}
                renderItem={({item}) => 
                 <View>
                    <Text> {item.email} </Text>
                    <Text> {item.comentario} </Text>

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
        height: 100,
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
