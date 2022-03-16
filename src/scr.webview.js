import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  BackHandler,
} from 'react-native';
import {WebView} from 'react-native-webview';
import WvAddressBar from './cmp.wv.addressbar';
import ScrBase from './scr.base';
import {genUrl} from './utils';
export default class ScrWebview extends ScrBase {
  constructor(props) {
    super(props);
    this.state = {scrollH: 0, canGoBack: false};
  }
  onScrollLayout = ({nativeEvent}) => {
    this.setState({scrollH: nativeEvent.layout.height});
  };
  onRefresh = () => {
    if (this.webview) {
      this.webview.reload();
      this.setState({isRefresh: true});
    }
  };
  onLoaded = () => {
    this.setState({isRefresh: false});
  };
  onLoadError = () => {
    this.setState({isRefresh: false});
  };
  onWVScroll = ({nativeEvent}) => {
    this.setState({refreshEnable: nativeEvent.contentOffset.y === 0});
  };
  onLoad = url => {
    this.setState({url: genUrl(url)});
  };
  onLoadStart = ({nativeEvent}) => {
    this.setState({url: nativeEvent.url, canGoBack: nativeEvent.canGoBack});
    if (this.addrBar) {
      this.addrBar.updateAddr(nativeEvent.url);
    }
  };
  onBack = () => {
    const {canGoBack} = this.state;
    if (this.webview) {
      this.webview.goBack();
    }
    return canGoBack;
  };
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBack,
    );
  }
  componentWillUnmount() {
    if (this.backHandler) {
      this.backHandler.remove();
    }
  }

  render() {
    const {
      scrollH,
      isRefresh = false,
      refreshEnable = true,
      url = 'google.com',
    } = this.state;
    return (
      <View style={LocalStyles.container}>
        <WvAddressBar
          ref={ref => (this.addrBar = ref)}
          onSubmit={this.onLoad}
          url={url}
        />
        <ScrollView
          style={LocalStyles.scrollview}
          onLayout={scrollH > 0 ? null : this.onScrollLayout}
          refreshControl={
            <RefreshControl
              onRefresh={this.onRefresh}
              refreshing={isRefresh}
              enabled={refreshEnable}
            />
          }>
          <View style={{height: scrollH}}>
            <WebView
              ref={ref => (this.webview = ref)}
              source={{uri: url}}
              style={{height: '100%'}}
              onLoadEnd={this.onLoaded}
              onError={this.onLoadError}
              onScroll={this.onWVScroll}
              onLoadStart={this.onLoadStart}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const LocalStyles = StyleSheet.create({
  container: {
    height: '100%',
  },
  scrollview: {
    flex: 1,
  },
});
