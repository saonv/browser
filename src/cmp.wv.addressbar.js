import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

export default class WvAddressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {url: props.url};
  }
  onSubmit = ({nativeEvent}) => {
    const {onSubmit} = this.props;
    const {text} = nativeEvent;
    if (onSubmit) {
      onSubmit(text);
    }
  };
  onBlur = () => {
    this.setState({focus: false});
  };
  onFocus = () => {
    this.setState({focus: true});
  };
  updateAddr(newAddr) {
    this.setState({url: newAddr});
  }
  render() {
    const {url, focus = false} = this.state;
    return (
      <View style={LocalStyles.container}>
        <View style={LocalStyles.addrInputC}>
          <TextInput
            value={url}
            style={LocalStyles.addrInput}
            placeholder="Type web address"
            returnKeyType="go"
            onChangeText={text => this.setState({url: text})}
            onSubmitEditing={this.onSubmit}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            selection={focus ? null : {start: 0}}
            autoCapitalize="none"
          />
        </View>
      </View>
    );
  }
}

const LocalStyles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  addrInputC: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
  },
  addrInput: {
    flex: 1,
    marginHorizontal: 10,
  },
});
