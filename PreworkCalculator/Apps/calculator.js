import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
  AsyncStorage
} from 'react-native';
/*Import Segment Control*/
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Col, Row, Grid } from "react-native-easy-grid";
export default class Cal extends Component {
  constructor() {
    super()
    this.state = {
      segmentSelectedIndex: 0,
      billAmount: 0,
      result: 0,
      tipAmount: 0,
    };
  }
  async componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

    console.log('test');
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    alert('Keyboard Shown');
  }

  _keyboardDidHide() {
    alert('Keyboard Hidden');
  }

  componentDidMount() {
    this.getSceneTransition();
  }

  async getSceneTransition() {
    try {
      let TIP_PERCENTAGE_0 = await AsyncStorage.getItem("TIP_PERCENTAGE_0") || '10%';
      let TIP_PERCENTAGE_1 = await AsyncStorage.getItem("TIP_PERCENTAGE_1") || '15%';
      let TIP_PERCENTAGE_2 = await AsyncStorage.getItem("TIP_PERCENTAGE_2") || '50%';
      // Store value to State
      this.setState({
        TIP_PERCENTAGE_0: TIP_PERCENTAGE_0,
        TIP_PERCENTAGE_1: TIP_PERCENTAGE_1,
        TIP_PERCENTAGE_2: TIP_PERCENTAGE_2,
      });
    } catch (error) {
      console.log("Hmm, something when wrong when get data..." + error);
    }
  }

  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      segmentSelectedIndex: index,
    });
    this.onChangeCalculateTotal(this.state.billAmount, index)
  }
  onChangeCalculateTotal(bill, index) {
    this.setState({
      billAmount: bill
    })
    if (!index && index != 0) {
      index = this.state.segmentSelectedIndex;
    }
    bill = parseFloat(bill);
    var percent = this.segmentValues()[index]; // will return value [10%,15%,50%]
    percent = parseFloat(percent).toFixed(2) / 100;

    var result = bill + (bill * percent);
    this.setState({
      result: result,
      tipAmount: parseFloat(bill * percent).toFixed(2)
    })
  }
  segmentValues() {
    console.log("statement " + this.state.TIP_PERCENTAGE_0);
    return [this.state.TIP_PERCENTAGE_0, this.state.TIP_PERCENTAGE_1, this.state.TIP_PERCENTAGE_2];
  }
  render() {
    return (

      <View style={styles.container}>


        <View style={styles.row}>
          <View style={[styles.box]}>
            <Text style={{ textAlign: 'center', fontSize: 18 }}>
              Tip Calculator
          </Text>
          </View>
        </View>



        <View style={styles.row}>
          <View style={[styles.box, styles.box2]} ><Text>Bill Amount </Text></View>
          <View style={[styles.box, styles.two]} >
            <TextInput style={{ height: 30, borderColor: 'black', borderWidth: 1 }}
              onChangeText={(billAmount) => this.onChangeCalculateTotal(billAmount)}
              autoFocus={true}
              keyboardType='numeric'
              maxLength={10}
              multiline={true}
            />
          </View>

        </View>

        <View style={styles.row}>
          <View style={[styles.box]}>
            <SegmentedControlTab
              values={this.segmentValues()}
              selectedIndex={this.state.segmentSelectedIndex}
              onTabPress={this.handleIndexChange}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.box]}>
            <Text>Bill input: {this.state.billAmount}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.box]}>
            <Text>Tip amount: {this.state.tipAmount}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.box]}>
            <Text>Segment control {this.segmentValues()[this.state.segmentSelectedIndex]}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.box]}>
            <Text style={[styles.bold]}>Result: {this.state.result}</Text>
          </View>
        </View>


        <View style={styles.row}>

        </View>

      </View>
    )
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
module.export = Cal
