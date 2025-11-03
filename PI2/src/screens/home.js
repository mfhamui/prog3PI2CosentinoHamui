import  React, {Component}  from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import { db } from "../firebase/config";
import { post } from "../components/post";


class Home extends Component {
    constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };}

  componentDidMount(){
      db.collection('posts').onSnapshot(docs => {
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

    render(){
    return(
        <View style= {StyleSheet.container}>
           <Text style={style.titulo}>HOME</Text>
                
            <Text>Bienvenido!</Text>
             <DynamicForm/>
        <View style= {StyleSheet.FlatList}>
             <FlatList 
             data={this.state.posts}
          keyExtractor={item=> item.id.toString()}
          renderItem={({ item }) => (
            <Post
              email={item.data.email}
              mensaje={item.data.mensaje}
              createdAt={item.data.createdAt}
              />
         
          )} />
          </View>
        
      </View>
        
    )}
}


const style= StyleSheet.create({
  FlatList: {
    flex:1,
     width: "100%"
  },
    container: {
    flex: 1, 
    paddingHorizontal: 10,
    marginTop:20,
    width: "100%"
    }, 

      titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },

})

export default Home;