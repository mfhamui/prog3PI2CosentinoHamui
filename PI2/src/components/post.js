
import React, { Component } from "react";

import { View, Text, StyleSheet } from "react-native";

class Post extends Component {
    constructor(props) {
    super(props);
    }
    render(){
        
  return (
    <View style={styles.container}>
      <Text style={styles.email}>{this.props.email}</Text>
      <Text style={styles.mensaje}>{this.props.mensaje}</Text>
     
    </View>
  );}
};

const styles = StyleSheet.create({
     FlatList: {
    flex:1,
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
