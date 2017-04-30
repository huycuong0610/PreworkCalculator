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
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
/**/
import CustomNavBar from '../Apps/customNavBar.js';
import Settings from '../Apps/settings.js';
import Calculator from '../Apps/calculator.js';
/**/
var SCENE_SELECTED = '@AsyncStorageAnimation:key';
export default class PowerRanger extends Component {
    constructor() {
        super()
        this.state = {
            sceneTransition: 'SwipeFromLeft'
        };

    }
    // this method will be called when scene loaded
    componentDidMount() {
        this.getSceneTransition();
    }
    renderScene(route, navigator) {
        switch (route.id) {
            case 'CalculatorPage':
                return (
                    <Calculator navigator={navigator} />
                );
                break;
            case 'SettingPage':
                return (
                    <Settings navigator={navigator} />
                );
                break;
            default:
                break;
        }
    }
    async getSceneTransition() {
        try {
            let SCENE_SELECTED = await AsyncStorage.getItem(SCENE_SELECTED) || 'FloatFromRight';
            console.log("statement " + this.state.TIP_PERCENTAGE_0);
            // Store value to State
            this.setState({
                SCENE_SELECTED: SCENE_SELECTED,
            });
        } catch (error) {
            console.log("Hmm, something when wrong when get data..." + error);
        }
    }
    configureScene(route, routeStack) {
        //@Todo, change to scene transition from Asynstorage vale
        return Navigator.SceneConfigs.FloatFromRight;
    }
    render() {

        return (
            <Navigator
                initialRoute={{ id: 'CalculatorPage' }}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route) => {
                    if (route.sceneConfig) {
                        return route.sceneConfig;
                    }
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
                navigationBar={CustomNavBar}
               // configureScene={this.configureScene.bind(this)}
            />
        );
    }

}

module.export = PowerRanger