import React, { PureComponent } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ViewPropTypes,
    TouchableHighlight,
    Animated,
    PanResponder,
} from 'react-native';

import PropTypes from 'prop-types';

export default class SimpleSwiper extends PureComponent {


    static propTypes = {
        /**
         *  设置外部容器的样式。
         */
        style: ViewPropTypes.style,
        /**
         *  设置外部容器的默认宽度。
         */
        initialWidth: PropTypes.number,
        /**
         * 轮播的视图
         */
        index: PropTypes.number,
        /**
         * 当前展现项目要变化时，触发该回调。回调参数为变化后的位置。
         */
        onChange: PropTypes.func,
        /**
         * 轮播项目
         */
        children: PropTypes.node.isRequired,
    };

    static defaultProps = {
        initialWidth: 0,
    };

    constructor(props) {
        super(props);

        this.state = {
            layoutWidth: props.initialWidth,
            positionAnimated: new Animated.Value(- props.index * props.initialWidth)
        };
    }

    componentWillMount() {
        // 获取 positionAnimated 的动态值
        this.state.positionAnimated.addListener(({ value }) => {
            console.log('position',value)
            this.position = value;
        });
    }

    componentDidMount() {
    }

    componentDidUpdate(){
        this.scrollTo(this.props.index)
    }


    onPanResponderEnd = () => {
        // 超过 50% 的距离，触发左滑、右滑
        const index = Math.round(-this.position / this.state.layoutWidth)
        const safeIndex = this.getSafeIndex(index);
        if(this.props.index==-1){
            this.props._onPress(true)
        }
        console.log(this.props.index,'---this.props.index')
        this.props.onChange(safeIndex)
    };

    responder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => false,
        onMoveShouldSetPanResponder : (e, gestureState) => {
            const {dx, dy} = gestureState;
            return (Math.abs(dx) > 0) || (Math.abs(dy) > 0);
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
            // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
            // 默认返回true。目前暂时只支持android。
            return true;
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,

        onPanResponderGrant: (evt, gestureState) => {
            // 用户手指触碰屏幕，停止动画
            this.state.positionAnimated.stopAnimation();
            // 记录手势响应时的位置
            this.startPosition = this.position;
        },
        onPanResponderMove: (evt, { dx }) => {
            // 要变化的位置 = 手势响应时的位置 + 移动的距离
            if(dx!=0){
                if(dx!=0 && this.props.index!=-1){
                    this.props._onPress(false)
                    this.props.onChange(-1)
                }
                const position = this.startPosition + dx
                this.state.positionAnimated.setValue(position)
                // this.props._rotates(position) // 设置旋转大小
            }
            
        },
        onPanResponderRelease: this.onPanResponderEnd,
        onPanResponderTerminate: this.onPanResponderEnd,
    });

    scrollTo = ( toIndex ) => {
        Animated.spring(this.state.positionAnimated, {
            toValue: - toIndex * this.state.layoutWidth,
            friction: 12,
            tension: 50,
        }).start()
    }

    getSafeIndex = (index) => {
        const max = this.props.children.length - 1;
        const min = 0;

        return Math.min(max, Math.max(index, min))
    }


    handleLayout = ({nativeEvent}) => {
        this.setState({
            layoutWidth: nativeEvent.layout.width,
        })

        this.state.positionAnimated.setValue( - this.props.index * nativeEvent.layout.width)
    }

    render() {
        const {children, style, index} = this.props;
        const {layoutWidth} = this.state;

        const items = children.map((item, index) => (
            <Animated.View
                style={{
                    width: layoutWidth,
                    padding:20,
                    transform: [{
                        translateX:  this.state.positionAnimated,
                    }]
                }}
                key={index}
            >
                {item}
            </Animated.View>
        ));

        return (
            <View
                style={[styles.container, style]}
                onLayout={this.handleLayout}
                {...this.responder.panHandlers}
                onStartShouldSetResponderCapture={(evt, gestureState) => false}
            >
                {items}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        overflow:'hidden',
        flexDirection: 'row',
        alignItems:'center',
    }
})