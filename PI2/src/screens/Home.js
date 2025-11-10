import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import { db } from "../Firebase/Config";
import Post from "../components/Post"


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(docs => {
      let posteos = [];
      docs.forEach(doc => {
        posteos.push({
          id: doc.id,
          data: doc.data()
        });
      });
      this.setState({
        posts: posteos,
      });
    });
  }


  render() {
    return (
      <View style={style.container}>
        <Text style={style.titulo}>HOME</Text>


        <FlatList
          data={this.state.posts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Post
              id={item.id}
              email={item.data.email}
              mensaje={item.data.mensaje}
              createdAt={item.data.createdAt}
              navigation={this.props.navigation}
              likes={item.data.likes ? item.data.likes : []}
              comentarios={item.data.comentarios ? item.data.comentarios : []}
            />)}
        />

      </View>

    )
  }
}


const style = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: "#ffffff",

  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center"
  },


})

export default Home;
