import React, { Component } from 'react';
import { View, Text,Image,TouchableOpacity} from 'react-native';
import {IMAGES} from '../../../assets/images/IndexImg';
import FontSize from '../../config/FontSize';
import Icon, { TypeIcon } from '../../config/Icon';
import { colors } from '../../config/style';
import HeaderView from '../../container/HeaderView';
import Share from 'react-native-share'
import Utils from '../../app/Utilis';
import { ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
export default class DetalisBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  onshare= async () =>{
    const result = {
      message:'Oreo Post',
      url:''
    }
    try {
        const shareoption=await Share.open(result)
    } catch (error) {
      alert(error.message);
    }
  }
  goBack()
  {
    Utils.goBack();
  }
  render() {
    const {item}=this.props.route.params
    Utils.nlog(item)
    return (
      <View style={{flex:1,backgroundColor:colors.white}}>
            <HeaderView
            TitleCenter={'Articles'}
            IconLeftShow={true}
            IconLefType={TypeIcon.AntDesign}
            IconNameLeft={'left'}
            onPressLeft={this.goBack}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{paddingHorizontal:FontSize.scale(15),paddingVertical:FontSize.scale(8)}}>
                <Image  style={{resizeMode:'stretch',width:'100%',height:FontSize.scale(250),borderRadius: FontSize.scale(5)}} source={item.img}></Image>               
            </View>
            <View style={{flex:1,paddingHorizontal:FontSize.scale(15)}}>
                <Text style={{color:colors.grayLight}}>{
                '2 year ago'}</Text>
                <View style={{height:FontSize.scale(10)}}/>
                <Text style={{fontSize:RFValue(20,FontSize.Height(100))}}>{'Vouge Ultimate Fall Boot Guide Is Here a'}</Text>
                <View style={{height:FontSize.scale(5)}}/>
                <Text>{'Fashion by admin'}</Text>
                <View style={{height:FontSize.scale(20)}}/>
                <Text style={{fontSize:RFValue(20,FontSize.Height(100)),color:colors.grayLight}} >{'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.'}</Text>
            </View>
                <TouchableOpacity 
                onPress={this.onshare}
                style={{paddingVertical:FontSize.scale(10),paddingHorizontal:FontSize.scale(10),flexDirection:'row',justifyContent:'flex-end'}}>
                      <Icon type={TypeIcon.Feather} name={'share'} size={22} ></Icon>
                      <View style={{width:FontSize.scale(10)}}></View>
                      <Text>{'Share Post'}</Text>
                </TouchableOpacity>
        </ScrollView>

    </View>
    );
  }
}
