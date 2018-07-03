import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,LayoutAnimation,Animated,PanResponder,TouchableWithoutFeedback,Image,TextInput
} from 'react-native';

var dimensions =  require('Dimensions') ;  
var bgHeight = dimensions.get('window').height;  
var bgWidth = dimensions.get('window').width;  
var viewHeight = 200;  
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

import SimpleSwiper from './components/GestureSwiper'
import Demos from './components/Demos'

export default class App extends Component {
    constructor(props){
      super(props)
      this._onPress = this._onPress.bind(this)
      this._rotates = this._rotates.bind(this)
      this.state={
        index:0,w: width, h: 400,rotates:0,
        transformView: new Animated.Value(0),  
        text:''
      }
    }
    _rotates(value){
      this.setState({rotates:value})
    }
    _onPress(bool) {
    //   if(bool){
    //     LayoutAnimation.configureNext({
    //         duration: 700,   //持续时间
    //         create: {
    //             type: 'linear',
    //             property: 'opacity'
    //         },
    //         update: {
    //             type: 'spring',
    //             springDamping: 1
    //         }
    //     });
    //     this.setState({w: this.state.w-50, h: this.state.h-50})
    //   }else{
    //     LayoutAnimation.configureNext({
    //         duration: 700,   //持续时间
    //         create: {
    //             type: 'linear',
    //             property: 'opacity'
    //         },
    //         update: {
    //             type: 'spring',
    //             springDamping: 1
    //         }
    //     });
    //     this.setState({w: this.state.w + 50, h: this.state.h + 50})
    //   }
    }
    componentDidMount() {
        Animated.timing(this.state.transformView,{toValue:1,duration:1000}).start();
    }
      
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{height:height,justifyContent: 'center',backgroundColor:'#eae9e5',
           flex:1}}>
                {/* -------滑动组件------ */}
                <SimpleSwiper
                    style={styles.swiper}
                    index={this.state.index}
                    _onPress={this._onPress}
                    // _rotates={this._rotates}
                    onChange={(index)=> {
                        console.log(index)
                        this.setState({
                            index: index
                        })
                    }}
                >
                    <View style={[styles.item,{'height':400}]}>
                        <TouchableWithoutFeedback onPress={()=>{navigate('NoteList',{callback:()=>{
                            console.log('日记')
                        }})}}>
                            <View style={[styles.TouchableWithoutFeedback]}> 
                                <Image source={require('./images/WechatIMG2092.jpeg')}
                                    style={styles.image}
                                />
                                <View style={styles.texts}>
                                    <Text style={{color:'#000000',fontSize:16}}>
                                        日记
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={[styles.item,{'height':400}]}>
                        <TouchableWithoutFeedback onPress={()=>{navigate('PhotoList',{callback:()=>{
                            console.log('照片')
                        }})}}>
                            <View style={[styles.TouchableWithoutFeedback]}> 
                                <Image source={require('./images/WechatIMG2095.jpeg')}
                                    style={styles.image}
                                />
                                <View style={styles.texts}>
                                    <Text style={{color:'#000000'}}>
                                        回忆录
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </SimpleSwiper>
                {/* <Demos></Demos> */}

                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pages:{
        width:width/2,height:400,backgroundColor:'#ccc',borderRadius: 10,position:'absolute',top:0,left:100,borderWidth:1,borderColor:'#ffffff'
    },
    bgViewLayout:{  
        width:bgWidth * 0.3,  
        height:viewHeight,  
        top: 100,  
        left:100,  
        backgroundColor:'red',  
        shadowColor:'gray',  
        shadowOffset:{width:1,height:0},  
        shadowRadius:10,  
        shadowOpacity:0.8  
    },  
    lineLayout:{  
        width:bgWidth,  
        height:0.5,  
        top:100,  
        backgroundColor:'black'  
    },  
    bgLayout:{  
        width:100,  
        height:100,  
        top:250,  
        left:50,  
        backgroundColor:'green',  
        overflow:'hidden'  
    },  
    imageLayout:{  
        width:100,  
        height:200,  
        top:-100,  
        left:0  
    } ,
    content: {
        backgroundColor: 'deepskyblue',
        borderWidth: 1,
        borderColor: 'dodgerblue',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
    swiper: {
        alignSelf:'center',
        // marginVertical: 250,
        overflow:'visible',
        width: width-70,
    },
    book:{
      position:'absolute',
      top: 0,
      left: 0,
    },
    active:{
      height:200
    },  
    item : {
        justifyContent: 'center',
        alignItems: 'center',
        height:400,
        backgroundColor:'#e5c8a6',
        width: width-1110,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 10,
        shadowColor:'black',
        shadowOffset:{width:2,height:2},
        shadowOpacity:0.5,
        shadowRadius:2,
        // overflow:'hidden'
    },
    TouchableWithoutFeedback:{
        justifyContent: 'center',
        alignItems: 'center',
        height:400,
        backgroundColor:'#e5c8a6',
        overflow:'hidden',
        width: width-110,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 10,
    },
    image:{
        flex:1,width: width-110
    },
    texts:{
        position:'absolute',height:60,backgroundColor:'rgba(255, 255, 255, 1)',width:width-110,bottom:0,justifyContent: 'center',
        alignItems:'center'
    }
});