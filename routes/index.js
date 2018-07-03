import React, { Component } from 'react';
import { AppRegistry,View,TouchableOpacity,Text,Button,Icon,Image,AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import moment from 'moment';

import HomeScreen from '../App';
import NoteList from '../components/diary/NoteList';
import WriteScreen from '../components/diary/Write';
import NoteDetail from '../components/diary/NoteDetail'

import AddPhoto from '../components/photoWall/AddPhoto';
import PhotoDetail from '../components/photoWall/PhotoDetail';
import PhotoList from '../components/photoWall/PhotoList'

let times = moment().format('YYYY MM DD');

const headerStyle = {
    backgroundColor:'#fbfbfb',
    elevation: 0,
    borderBottomWidth: 0,
    paddingLeft: 10,
    paddingRight: 10,
}

const headerLeft = ({navigation},headerLeft)=>{
    let {goBack} = navigation;
    return headerLeft=="back"?( // 设置返回按钮样式
        <TouchableOpacity onPress={()=>{goBack();navigation.state.params.callback();}} style={{width:20,height:20,marginRight: 10,justifyContent:'center'}}>
            <Image style={{width:16,height:16,marginLeft: 10}} source={require('../images/back.png')} />
        </TouchableOpacity>
    ):headerLeft=="close"?( // 设置关闭按钮样式
        <TouchableOpacity onPress={()=>{goBack();navigation.state.params.callback();}} style={{width:24,height:24,marginRight: 10,justifyContent:'center'}}>
            <Image style={{width:24,height:24,marginLeft: 10}} source={require('../images/close.png')} />
        </TouchableOpacity>
    ):null;
}

const headerRight = ({navigation},headerRight,visible)=>{
    console.log(navigation.state.params.noteId,'------visible')
    if(navigation.state.params.noteId != moment(times,'YYYY MM DD').unix()&&headerRight == 'update'&&visible){
        return null
    }else{
        let {goBack} = navigation;
        return headerRight=="save"?( // 设置保存按钮样式
            <TouchableOpacity style={{marginRight: 10,width:22,height:22,justifyContent:'center'}} onPress={()=>{navigation.state.params.save()}}>
                <Image style={{width:22,height:22,marginRight: 20}} source={require('../images/check.png')} />
            </TouchableOpacity>
        ):headerRight=="update"?( // 设置编辑按钮样式
            <TouchableOpacity visible={navigation.state.params.visible} onPress={()=>{navigation.state.params.setModalVisible(true)}} style={{width:22,height:22,marginRight: 10,justifyContent:'center'}}>
                <Image style={{width:22,height:22,marginRight: 20}} source={require('../images/feather.png')} />
            </TouchableOpacity>
        ):null;
    }
}

const StackOptions = ({navigation},headerTitle,headerBackTitle,headerLeft,headerRight) => {
    let {goBack} = navigation;
    
    const headerStyle =  Object.assign({
        backgroundColor:'#fbfbfb',
        borderBottomWidth: 0,        
        paddingLeft:5,
        paddingRight:5
    },headerStyle);
    // headerTitle; // title 内容
    // headerBackTitle;// 是否显示返回文字
    // headerLeft : 导航左侧按钮
    // header Right: 导航右侧按钮
    return {headerStyle,headerTitle,headerBackTitle,headerLeft,headerRight}
};

export const SimpleApp = createStackNavigator({
    Home: { screen: HomeScreen,path: 'home',navigationOptions:{
        header:null
    }},
    Write: { // diary
        screen: WriteScreen,
        path:'write',
        navigationOptions:({navigation}) => StackOptions({navigation},'致 今天',false,headerLeft({navigation},'back'),headerRight({navigation},'save'))
    },
    NoteDetail: {
        screen: NoteDetail,
        path:'noteDetail',
        navigationOptions:({navigation}) => StackOptions({navigation},'',true,headerLeft({navigation},'back'),headerRight({navigation},'update',true))
    },
    NoteList: {
        screen: NoteList,
        path:'noteList',
        navigationOptions:({navigation}) => StackOptions({navigation},'日记',true,headerLeft({navigation},'back'))
    },
    AddPhoto: { // diary
        screen: AddPhoto,
        path:'AddPhoto',
        navigationOptions:({navigation}) => StackOptions({navigation},'回忆录',false,headerLeft({navigation},'back'),headerRight({navigation},'save'))
    },
    PhotoDetail: {
        screen: PhotoDetail,
        path:'PhotoDetail',
        navigationOptions:({navigation}) => StackOptions({navigation},'',true,headerLeft({navigation},'back'),headerRight({navigation},'update',false))
    },
    PhotoList: {
        screen: PhotoList,
        path:'PhotoList',
        navigationOptions:({navigation}) => StackOptions({navigation},'回忆录',true,headerLeft({navigation},'back'))
    }

},{
    headerMode: 'screen',
});