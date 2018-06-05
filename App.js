/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Swipeout from 'react-native-swipeout';
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  View,ImageBackground,
  SectionList,Button,
  TouchableWithoutFeedback,
  TouchableHighlight,
  FlatList,
  StatusBar,AsyncStorage,
  TextInput,DeviceInfo
} from 'react-native';
import moment from 'moment';
let times = moment().format('YYYY MM DD')
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

export default class App extends Component{
  constructor(props){
    super(props)
    this.addNote = this.addNote.bind(this)
    this.state={
      list :''
    }
  }
  componentDidMount(){
    this.getList();
  }
  getList(){
    function sortList(a,b){
      return b.createTime - a.createTime
    }
    storage.getAllDataForKey('drop').then(drop => {
      let list = drop.sort(sortList)
      this.setState({
        list:list
      })
      console.log(JSON.stringify(list),'----list----');
    });
  }
  deleteList(id){
    console.log(id,'------idsssss')
    storage.remove({
      key: 'drop',
      id: id
    });
    this.getList();
  }
  showDetail(){
    alert('detail')
  }
  showList(item){
    const { navigate } = this.props.navigation;
    const swipeoutBtns = [
        {
          text: '删除',
          backgroundColor: 'red',
          onPress: ()=>{
              this.deleteList(item.id);
          }
        }
    ];
    return(
      <TouchableWithoutFeedback onPress={()=> {navigate('NoteDetail',{'noteId':item.id,callback:()=>{
          console.log('callback')
          this.getList();
        }})} }>
        <View style={styles.contList}>
          <Text style={styles.key}>{item.title}</Text>
          <Text style={styles.val}  numberOfLines={1}>{item.val}</Text>  
        </View>
      </TouchableWithoutFeedback>
    )
  }
  addNote(){
    const { navigate } = this.props.navigation;
    storage.load({
      key: 'drop',
      id: moment(times,'YYYY MM DD').unix()
    }).then(ret => {
      // 如果找到数据，则在then方法中返回
      console.log(ret,'-----ddd');
      alert('每日一条哦~')
    }).catch(err => {
      // 如果没有找到数据且没有sync方法，
      // 或者有其他异常，则在catch中返回
      // console.warn(err.message);
      navigate('Write',{
        callback:()=>{
          console.log('callback')
          this.getList();
        }
      })
    })
  }
  render() {
    const { navigate } = this.props.navigation;
    let pic = {
      uri:'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    }
    return (
        <View style={styles.container}>
          <View style={{width:Dimensions.get('window').width, //窗口宽度
            justifyContent:'center',
            alignItems:'center',
            position:'absolute', //定位
            zIndex:2,
            bottom:40}}
          >
            <TouchableHighlight style={styles.create} underlayColor="#e25259" onPress={this.addNote}>
              <Text style={styles.jia}>
                +
              </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.content}>
            <FlatList data={this.state.list}
              renderItem={({item}) => this.showList(item)}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 22
   },
   content:{
    flex:1,
    backgroundColor:'#f1f0ec',
   },
   contList:{
     marginTop:7,
     height:90,
     padding:20,
     backgroundColor:'#fbfbfb'
   },
   item: {
    fontSize: 20*(1.0/DeviceInfo.Dimensions.screen.fontScale),
    color:'#42454e'
  },
  key:{
    fontSize:18,
    fontWeight: '200',    
  },
  val:{
    fontSize: 12*(1.0/DeviceInfo.Dimensions.screen.fontScale),
    marginTop:10,
    color:'#5f6267',
    width:width-60,
    letterSpacing:0.4,
  },
   sectionHeader: {
     paddingTop: 2,
     paddingLeft: 10,
     paddingRight: 10,
     paddingBottom: 2,
     fontSize: 14,
     fontWeight: 'bold',
     backgroundColor: 'rgba(247,247,247,1.0)',
   },
   jia:{
    color:'#ffffff',textAlign:'center',fontSize:44,fontWeight: '500',height:60,textAlignVertical:'center'
   },
   create:{
    width:60,height:60,borderRadius:35,backgroundColor:'#fb5d64', justifyContent: 'center'
   }
});