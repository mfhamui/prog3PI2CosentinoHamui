import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import { db } from "../Firebase/Config";
import  Post  from "../components/Post" 


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

        <Text>Bienvenido!</Text>
        
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
              />

            )} />
        

      </View>

    )
  }
}


const style = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 20,
    width: "100%"
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },

})

export default Home;
