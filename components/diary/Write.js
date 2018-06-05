/**
 * Sample React Native App
 * yaowei
 * @write
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  View,ImageBackground,
  SectionList,Button,
  TouchableHighlight,
  FlatList,
  StatusBar,
  AsyncStorage,
  TextInput,DeviceInfo
} from 'react-native';
import moment from 'moment';
var Dimensions = require('Dimensions');
let times = moment().format('YYYY MM DD');

export default class Write extends Component{
  constructor(props){
    super(props)
    this.save = this.save.bind(this)
    this.state={
      text:'',
      title:new Date()
    }
  }
  componentDidMount(){  
    //在static中使用this方法  
    this.props.navigation.setParams({ save:this.save })  
  }  
  save(){
    if(this.state.text){
      const { navigate,goBack,state } = this.props.navigation;
      // let ids =  (Math.random()*10000000).toString(16).substr(0,4)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5)
      let idsTime = moment(times,'YYYY MM DD').unix() // 日记每天只能有一条
      const _this = this;
      storage.save({
        key: 'drop',  // 注意:请不要在key中使用_下划线符号!
        id: idsTime,   // 注意:请不要在id中使用_下划线符号!
        data:{
          title:moment().format('YYYY 年 MM 月 DD 日'),
          val:this.state.text,
          id:idsTime,
          createTime:new Date().getTime()
        },
      });
      state.params.callback();
      goBack();
    }
  }
  render() {
    const { navigate,goBack } = this.props.navigation;
    let pic = {
      uri:'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    }
    return (
      <View style={styles.container}>
          <TextInput
            style={{lineHeight:20,color:'#12203b',fontWeight:'300',letterSpacing:0.4,}}
            placeholder="记录每一天的点滴！"
            underlineColorAndroid="transparent"
            autoFocus={true}
            multiline={true}
            onChangeText={(text) => {this.setState({text}); console.log(this.state.text)} }
          />
      </View>
    );
  }
}
var { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    paddingTop: 10,
    backgroundColor:'#fbfbfb' //f1f0eb
   },
   
});