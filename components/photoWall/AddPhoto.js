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
      title:'',
      width:0,
      height:0
    }
  }
  componentWillMount(){
    const { navigate,goBack,state } = this.props.navigation;
    
    let screenWidth = Dimensions.get('window').width;
    let screenHeight = Dimensions.get('window').height;
    Image.getSize(state.params.ImageUri.uri,(width,height) => {
      //width 图片的宽度
      //height 图片的高度
      if(width<screenWidth&&screenWidth-width>40){
        this.setState({
          width:width,
          height:height
        })
      }else{
        this.setState({
          width: screenWidth-40,
          height: Math.floor(screenWidth/width*height)-40
        })
      }
      console.log(width,height,'-----width')
    })
  }
  componentDidMount(){  
    //在static中使用this方法  
    this.props.navigation.setParams({ save:this.save })  
  }  
  save(){
    if(this.state.text){
      const { navigate,goBack,state } = this.props.navigation;
      let ids =  (Math.random()*10000000).toString(16).substr(0,4)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5)
      const _this = this;
      storage.save({
        key: 'photo',  // 注意:请不要在key中使用_下划线符号!
        id: ids,   // 注意:请不要在id中使用_下划线符号!
        data:{
          title:this.state.title?this.state.title:moment().format('YYYY 年 MM 月 DD 日'),
          val:this.state.text,
          photo:state.params.ImageUri,
          id:ids,
          createTime:new Date().getTime()
        },
      });
      state.params.callback();
      goBack();
    }
  }
  render() {
    const { navigate,goBack,state } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <View>
            <TextInput
                style={{lineHeight:20,color:'#12203b',fontWeight:'300',letterSpacing:0.4,}}
                placeholder="标题"
                underlineColorAndroid="transparent"
                autoFocus={true}
                onChangeText={(text) => {this.setState({title:text}); console.log(this.state.text)} }
            />
            <TextInput
              style={{lineHeight:20,color:'#12203b',fontWeight:'300',letterSpacing:0.4,marginTop:10}}
              placeholder="请书写你美好的记忆..."
              underlineColorAndroid="transparent"
              multiline={true}
              onChangeText={(text) => {this.setState({text}); console.log(this.state.text)} }
            />
            <Image source={state.params.ImageUri}  style={{width:this.state.width,height:this.state.height,borderRadius:5,justifyContent:"center",marginTop:10}} />
        </View>
      </ScrollView>
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