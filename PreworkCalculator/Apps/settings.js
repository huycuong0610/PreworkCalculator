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
  AsyncStorage,

} from 'react-native';

var SCENE_SELECTED = '@AsyncStorageAnimation:key';

export default class Settings extends Component {
  constructor() {
    super();
    console.log('debug');
    this.state = {
      sceneTransition: "FloatFromLeft",
    };
  }


  // this method will be called when scene loaded
  componentDidMount() {
    this.getSceneTransition();
  }

  setSelectSceneTransition(scene) {
    try {
      this.setSceneTransition(scene);
      this.setState({
        scene: scene
      });
      console.log("setSelectSceneTransition", scene);
    } catch (error) {
      console.log("Oop!! Something went wrong !!!" + error);
    }
  }

  async getSceneTransition() {
    try {
      let sceneTransitionValue = await AsyncStorage.getItem(SCENE_SELECTED);
      let TIP_PERCENTAGE_0 = await AsyncStorage.getItem("TIP_PERCENTAGE_0") || '10%';
      let TIP_PERCENTAGE_1 = await AsyncStorage.getItem("TIP_PERCENTAGE_1") || '15%';
      let TIP_PERCENTAGE_2 = await AsyncStorage.getItem("TIP_PERCENTAGE_2") || '50%';
      if (!sceneTransitionValue)
        sceneTransitionValue = 'FloatFromLeft';
      console.log(sceneTransitionValue);
      // Store value to State
      this.setState({
        sceneTransition: sceneTransitionValue,
        TIP_PERCENTAGE_0: TIP_PERCENTAGE_0,
        TIP_PERCENTAGE_1: TIP_PERCENTAGE_1,
        TIP_PERCENTAGE_2: TIP_PERCENTAGE_2,
      });
    } catch (error) {
      console.log("Hmm, something when wrong when get data..." + error);
    }
  }

  async setSceneTransition(scene) {
    try {
      await AsyncStorage.setItem(SCENE_SELECTED, scene);
      this.setState({
        sceneTransition: scene
      })

    } catch (error) {
      console.log(error);
      console.log("Hmm, something when wrong when set data..." + error);
    }
  }

  async onChangeCalculateTotal(value, index) {
    try {

      if (!index && index != 0) {
        index = this.state.segmentSelectedIndex;
      }
      await AsyncStorage.setItem('TIP_PERCENTAGE_' + index, value);
    }

    catch (error) {
      console.log(error);
    }

  }

  render() {

    return (

      <View style={{ marginTop: 50, padding: 10 }}>
        <View>
          <Text style={{ fontSize: 25 }}>Scene Transitions</Text>
          <Picker
            selectedValue={this.state.sceneTransition}
            onValueChange={(scene) => this.setSelectSceneTransition(scene)}>
            <Picker.Item label="FloatFromRight" value="FloatFromRight" />
            <Picker.Item label="FloatFromLeft" value="FloatFromLeft" />
            <Picker.Item label="FloatFromBottom" value="FloatFromBottom" />
            <Picker.Item label="FloatFromBottomAndroid" value="FloatFromBottomAndroid" />
            <Picker.Item label="SwipeFromLeft" value="SwipeFromLeft" />
            <Picker.Item label="HorizontalSwipeJump" value="HorizontalSwipeJump" />
            <Picker.Item label="HorizontalSwipeJumpFromRight" value="HorizontalSwipeJumpFromRight" />
          </Picker>
        </View>

        <View>
          <Text style={{ fontSize: 25 }}>Tip Percentage</Text>
        </View>

        <View style={styles.row}>
          <View style={[styles.box, styles.box2]} ><Text>Percentage 1 </Text></View>
          <View style={[styles.box, styles.two]} >
            <TextInput style={{ height: 30, borderColor: 'black', borderWidth: 1 }}
              defaultValue={this.state.TIP_PERCENTAGE_0}
              onChangeText={(value) => this.onChangeCalculateTotal(value, 0)}
              autoFocus={true}
              keyboardType='numeric'
              maxLength={10}
              multiline={true}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.box, styles.box2]} ><Text>Percentage 2 </Text></View>
          <View style={[styles.box, styles.two]} >
            <TextInput style={{ height: 30, borderColor: 'black', borderWidth: 1 }}
              defaultValue={this.state.TIP_PERCENTAGE_1}
              onChangeText={(value) => this.onChangeCalculateTotal(value, 1)}
              autoFocus={true}
              keyboardType='numeric'
              maxLength={10}
              multiline={true}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.box, styles.box2]} ><Text>Percentage 3 </Text></View>
          <View style={[styles.box, styles.two]} >
            <TextInput style={{ height: 30, borderColor: 'black', borderWidth: 1 }}
              defaultValue={this.state.TIP_PERCENTAGE_2}
              onChangeText={(value) => this.onChangeCalculateTotal(value, 2)}
              autoFocus={true}
              keyboardType='numeric'
              maxLength={10}
              multiline={true}
            />
          </View>
        </View>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  container: {
    marginTop: 20,
  },
  box: {
    flex: 1,
    height: 150,
  },
  box2: {
  },
  box3: {
  },
  two: {
    flex: 2
  },
  bold: {
    fontWeight: 'bold',
  }
});

module.export = Settings