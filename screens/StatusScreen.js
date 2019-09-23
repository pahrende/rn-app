import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';

export default class StatusScreen extends React.Component {

  state = {
    inputValue: '',
    todos: [],
    nextID: 0,
  };

  addItem = () => {
    const inputValue = this.state.inputValue;
    const newID = this.state.nextID + 1;
    if(inputValue !== ''){   

      const newToDo = {
        id: newID,
        title: inputValue,
        createdAt: Date.now(),        
      };
      const todos = this.state.todos.concat(newToDo);

      this.setState({
        todos: todos,
        inputValue: '',
        nextID: newID,
      });

    }
  };

  changeText = value => {
    this.setState({
      inputValue: value
    });
  };

  render(){
    const inputValue = this.state.inputValue;
    const todos = this.state.todos.map((todo, key) =>
    <View style={{ flexDirection: 'row', marginTop: 20 }} key={todo.id}>
      <TouchableOpacity style={{width:20, height: 20, borderRadius:15, borderWidth: 3, borderColor: 'grey', margin: 15}} />
      <Text style={{ paddingLeft: 5, marginTop: 10, fontSize: 28, color: 'black'}}>
        {todo.title}  
      </Text>       
    </View>)

    return (
      <View style={styles.container}>
        <StatusBar hidden/>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>


          <View style={styles.welcomeContainer}>
            <Text style={styles.getStartedText}>Something somtehing!</Text>
          </View>
          <View>
            <TextInput style={styles.input}
              onSubmitEditing={this.addItem}
              onChangeText={this.changeText}
              placeholder="Type here to add a todo."
              value={inputValue}
              multiline={true}
              autoCapitalize="sentences"
              underlineColorAndroid="transparent"
              selectionColor={'black'}
              maxLength={30}
              returnKeyType="done"
              autoCorrect={false}
              blurOnSubmit={true}
            />
          </View>
          <View>{todos}</View>
        </ScrollView>

      </View>
    );
  }
}

StatusScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex:1,
  }, 
  input:
  {
    marginTop: 30,
    paddingTop: 10,
    paddingRight: 15,
    paddingLeft: 15,
    fontSize: 34,
    color: 'black',
    fontWeight: '500'
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});
