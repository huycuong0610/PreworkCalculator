import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Navigator,
    Picker,
    Button,
    TouchableOpacity
} from 'react-native';

var NavigationBarRouteMapper = {
  LeftButton: (route, navigator, index, navState) =>{
    return
  },
  RightButton: (route, navigator, index, navState) => {
    if(route.id != 'CalculatorPage'){
      return (
        <TouchableOpacity style={stylesCSS.tabbarHeadr} onPress={() => navigator.pop({id:"CalculatorPage"})}>
          <Text>Save</Text>
        </TouchableOpacity>
      );
    }else{
      return (
        <TouchableOpacity style={stylesCSS.tabbarHeadr} onPress={() => navigator.push({id: 'SettingPage'})}>
          <Text style={stylesCSS.headerFontSize}>Setting</Text>
        </TouchableOpacity>
      );
    }
  },
  Title: (route, navigator, index, navState) => {
    return;
  },
}
const stylesCSS = StyleSheet.create({
    tabbarHeadr :{

    },
    headerFontSize :{
        fontSize: 14
    }
});
// export this component
module.exports = (
  <Navigator.NavigationBar
    routeMapper={NavigationBarRouteMapper} />
)