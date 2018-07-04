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
  AppRegistry,
  AlertIOS,
  View,ImageBackground,
  SectionList,Button,
  TouchableWithoutFeedback,
  TouchableHighlight,
  FlatList,
  StatusBar,AsyncStorage,
  TextInput,DeviceInfo,Alert
} from 'react-native';
import moment from 'moment';
import RNFetchBlob from 'react-native-fetch-blob';

//图片选择器
var ImagePicker = require('react-native-image-picker');
 
//图片选择器参数设置
var options = {
  title: '请选择图片来源',
  cancelButtonTitle:'取消',
  takePhotoButtonTitle:'拍照',
  chooseFromLibraryButtonTitle:'相册图片',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

let times = moment().format('YYYY MM DD')
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

export default class NoteList extends Component{
  constructor(props){
    super(props)
    this.addNote = this.addNote.bind(this)
    this.choosePic = this.choosePic.bind(this)
    this.state={
      list :'',
      avatarSource: null
    }
  }
  componentDidMount(){
    this.getList();
  }
  getList(){
    function sortList(a,b){
      return b.createTime - a.createTime
    }
    storage.getAllDataForKey('photo').then(photo => {
      let list = photo.sort(sortList)
      this.setState({
        list:list
      })
      console.log(JSON.stringify(list),'----list----');
    });
  }
  deleteList(id){
    console.log(id,'------idsssss')
    storage.remove({
      key: 'photo',
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
      <TouchableWithoutFeedback onLongPress={()=>{
        Alert.alert(
          '',
          '确定要删除该条回忆吗？',
          [
            {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: '确定', onPress: () =>  this.deleteList(item.id)},
          ],
          { cancelable: false }
        )
      }} onPress={()=> {navigate('PhotoDetail',{'noteId':item.id,callback:()=>{
          console.log('callback')
          this.getList();
        }})} }>
        <View style={styles.contList}>
          <View style={{overflow: 'hidden',height:200,borderRadius:5}}>
            <Image source={item.photo} style={{flex:1,width:width-80,borderRadius:5}} />
          </View>
          <Text style={styles.key}>{item.title}</Text>
          <Text style={styles.val}  numberOfLines={1}>{item.val}</Text> 

        </View>
      </TouchableWithoutFeedback>
    )
  }
  addNote(){
    const { navigate } = this.props.navigation;
      navigate('AddPhoto',{
        callback:()=>{
          console.log('callback')
          this.getList();
        }
      })
  }
  //选择照片按钮点击
  choosePic() {
    const { navigate } = this.props.navigation;

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('用户取消了选择！');
      }
      else {
        let source = { uri: response.uri };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          avatarSource: source
        },()=>{
          navigate('AddPhoto',{'ImageUri':source,
            callback:()=>{
              console.log('callback')
              this.getList();
            }
          })
        });
      }
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
            <TouchableHighlight style={styles.create} underlayColor="#e25259" onPress={this.choosePic}>
              <View>
                <Text style={styles.jia}>
                  +
                </Text>
              </View>
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
    paddingBottom:20 ,
    backgroundColor:'#eae9e5',
   },
   content:{
    flex:1,
    backgroundColor:'#eae9e5',
   },
   contList:{
     marginTop:20,
     marginRight: 20,
     marginLeft: 20,
     borderRadius:6,
     height:300,
     padding:20,
     backgroundColor:'#ffffff'
   },
   item: {
    fontSize: 20*(1.0/DeviceInfo.Dimensions.screen.fontScale),
    color:'#42454e'
  },
  key:{
    fontSize:18,
    marginTop:15,
    fontWeight: '200',    
  },
  val:{
    fontSize: 12*(1.0/DeviceInfo.Dimensions.screen.fontScale),
    marginTop:10,
    color:'#5f6267',
    width:width-120,
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