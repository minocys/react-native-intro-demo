'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  ListView,
  View,
  } = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding:10
  },
  message: {
    color: 'black',
    padding: 10
  },
  text_input: {
    height: 25,
    width: 100,
    padding: 4,
    fontSize: 13
  }
});

//app variables
var messageStore = ['Hello World!'];
var inputValue = null;

var MessageInput = React.createClass({
  updateInputValue: function(event) {
    inputValue = event.nativeEvent.text;
  },

  handleSubmit: function() {
    this.props.updateMessages();
    inputValue=null;
  },

  render: function() {
    return (
      <View>
        <TextInput
          style={styles.text_input}
          placeholder='type a message'
          onChange= {this.updateInputValue}
        />
        <TouchableHighlight>
          <Text onPress={this.handleSubmit}>Submit</Text>
        </TouchableHighlight>
      </View>
    )
  }

});

var MessageView = React.createClass({
  getInitialState: function() {
    var messageState = new ListView.DataSource({
      rowHasChanged: function(row1, row2) {
        return row1 !== row2;
      }
    });
    return {
      messages: messageState.cloneWithRows(messageStore)
    }
  },

  updateMessages: function() {
    messageStore.push(inputValue);
    var newState = this.state.messages.cloneWithRows(messageStore);
    this.setState({
      messages: newState
    })
  },

  renderMessages: function(rowData) {
    return (
      <View>
        <Text style={styles.message}> {rowData} </Text>
      </View>
    )
  },

  render: function() {
    return (
      <View>
        <ListView
          dataSource={this.state.messages}
          renderRow={this.renderMessages.bind(this)}
        />
        <MessageInput updateMessages={this.updateMessages}/>
      </View>

    )
  }
});

var rnativedemo = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <MessageView/>
      </View>
    );
  }
});

AppRegistry.registerComponent('rnativedemo', () => rnativedemo);
