import React, { Component } from 'react';
import { View, Text, StyleSheet,AsyncStorage,ScrollView,Modal,Image,TouchableWithoutFeedback,TextInput } from 'react-native';
import moment from 'moment';
import {isIphoneX} from '../ScreenUtil.js'

var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
let times = moment().format('YYYY MM DD');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
var ScreenScale = Dimensions.get('window').scale;

export default class detail extends Component {
    constructor(props){
        super(props)
        this.setModalVisible = this.setModalVisible.bind(this)
        this.state={
            text:'',
            ids:moment(times,'YYYY MM DD').unix(),
            detail:'',
            title:'',
            width:0,
            height:0,
            modalVisible:false,
        }
    }
    componentDidMount(){
        const { navigate,state } = this.props.navigation;        
        this.props.navigation.setParams({ setModalVisible:this.setModalVisible})
        this.getDetail();//获取日记详情
    }
    getDetail(){
        const { navigate,state } = this.props.navigation;     
        let screenWidth = Dimensions.get('window').width;
        let screenHeight = Dimensions.get('window').height;   
        storage.load({
            key: 'photo',
            id: state.params.noteId
          }).then(ret => {
            // 如果找到数据，则在then方法中返回
            Image.getSize(ret.photo.uri,(width,height) => {
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
            this.setState({
                detail:ret,
                title:ret.title,
                text:ret.val
            })
            console.log(JSON.stringify(ret),'-----res');
          }).catch(err => {
            // 如果没有找到数据且没有sync方法，
            // 或者有其他异常，则在catch中返回
            console.log(err,'-------err')
          })
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    save(){
        if(this.state.text){
          const { navigate,goBack,state } = this.props.navigation;
          // let ids =  (Math.random()*10000000).toString(16).substr(0,4)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5)
          const _this = this;
            storage.save({
                key: 'photo',  // 注意:请不要在key中使用_下划线符号!
                id: state.params.noteId,   // 注意:请不要在id中使用_下划线符号!
                data:Object.assign(this.state.detail,{'val':this.state.text,'title':this.state.title||moment().format('YYYY 年 MM 月 DD 日')})
            });
            this.getDetail();
            this.setModalVisible(!this.state.modalVisible)
        }
    }
    render(){
        return(
            <ScrollView style={{backgroundColor:'#fbfbfb'}}>
                <View style={styles.content}>
                    <Text style={styles.title}>{this.state.detail.title}</Text>
                    <Text style={styles.val}>{this.state.detail.val}</Text>
                    <Image source={this.state.detail.photo}  style={{width:this.state.width,height:this.state.height,borderRadius:5,justifyContent:"center",marginTop:10}} />
                </View>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    >
                    <View style={{marginTop: isIphoneX()?55:33}}>
                        <View style={{flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            height:50
                        }}>
                            <View style={{width: 50, height: 50}}>
                                <TouchableWithoutFeedback onPress={()=>{this.setModalVisible(!this.state.modalVisible)}} style={{width:24,height:24,marginRight: 10,justifyContent:'center'}}>
                                    <Image style={{width:24,height:24,marginLeft: 15}} source={require('../../images/close.png')} />
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={{height: 50}}>
                                <Text style={{fontSize:17,fontWeight:'500'}}>
                                    {this.state.detail.title}
                                </Text>
                            </View>
                            <View style={{width: 50, height: 50}} >
                                <TouchableWithoutFeedback style={{marginRight: 10}} onPress={()=>{this.save()}}>
                                    <Image style={{width:20,height:20,marginLeft: 10}} source={require('../../images/check.png')} />
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <View style={{marginTop: 20,padding:20}}>
                            <TextInput
                                style={{lineHeight:26,color:'#12203b',fontWeight:'300',letterSpacing:0.4,fontSize:24}}
                                placeholder="标题"
                                underlineColorAndroid="transparent"
                                autoFocus={true}
                                value={this.state.detail.title}
                                onChangeText={(text) => {this.setState({title:text}); console.log(this.state.text)} }
                            />
                            <TextInput
                                style={{lineHeight:20,color:'#12203b',fontWeight:'300',letterSpacing:0.4,}}
                                placeholder="记录每一天的点滴！"
                                underlineColorAndroid="transparent"
                                multiline={true}
                                value={this.state.detail.val}
                                onChangeText={(text) => {this.setState({text}); console.log(this.state.text)} }
                            />
                            <Image source={this.state.detail.photo}  style={{width:this.state.width,height:this.state.height,borderRadius:5,justifyContent:"center",marginTop:10}} />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    title:{
        marginBottom: 24,
        fontSize: 30,
        fontWeight: '200',
    },
    content:{
        backgroundColor:'#fbfbfb',
        padding:20
    },
    val:{
        lineHeight:24,
        letterSpacing:0.4,
        fontWeight: '100',
        color:'#414141'
    }
}) 