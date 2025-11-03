import React, { Component } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";


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
                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder='comentario'
                    onChangeText={text => this.setState({ comentario: text })}
                    value={this.state.comentario} />

                <Pressable style={styles.boton} onPress={() => this.onSubmit()}>
                    <Text style={styles.texto}> enviar </Text>
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
    boton: {
        backgroundColor: "#28a745",
        borderRadius: 4,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#28a745",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center"
    },
    texto: {
        color: "#fff"
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

export default Comentar;
