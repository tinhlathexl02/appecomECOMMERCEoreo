import React, { Component } from 'react';
import { TouchableOpacity,Image,ScrollView,StyleSheet} from 'react-native';
import { FlatList } from 'react-native';
import { View, Text } from 'react-native';
import {IMAGES} from '../../../assets/images/IndexImg';
import Utils from '../../app/Utilis';
import FontSize from '../../config/FontSize';
import Icon, { TypeIcon } from '../../config/Icon';
import { colors } from '../../config/style';
import HeaderView from '../../container/HeaderView';
import Config from '../../navigation/Config';
import { connect } from 'react-redux';
import CartAction from '../../Redux/ActionsCart/CartAction';



const dataCategory=[
  {
    id:1,
    name:'Accessories',
  },
  {
    id:2,
    name:'Dresses',
  },
  {
    id:3,
    name:'Pants',
  },
  {
    id:4,
    name:'Shoes',
  },
  {
    id:5,
    name:'T-shirts',
  },
]
 class ProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowGrid:true,
      ChangeIcon:true,
    };
    this.check = React.createRef()
  }
  componentDidMount()
  {
    const {maloai} = this.props.route.params;
    console.log('maloai truyen qua'+maloai)
    this.props.FetchSanPham(maloai);
    Utils.nlog(this.props.data)
  }
  changeIcon=(id,data) =>
  {
    this.props.LikeProduct(id),
    this.props.Add_Remove(data)
  }
  _AddCart(item){
    this.props.AddCart(item)
  }
  _renderItemGrid=({item,index})=>{

    return(
    <TouchableOpacity key={index}
    onPress={() =>{Utils.navigate(Config.CartScreen)}}
    key={item.id} style={{
      marginRight:FontSize.scale(7),
      height:FontSize.scale(250),
      width:FontSize.scale(170),
      
     }}
      >
      
     <View style={{backgroundColor:colors.white,flexDirection:'row'}}>
          <View style={{paddingHorizontal:FontSize.scale(10),paddingVertical:FontSize.verticalScale(10)}}>
          <Image source={{uri:item.imgproduct[0].img}} style={{width:150,height:200,resizeMode:'cover'}} >
            </Image>
          </View>
          <View style={{flex:1,justifyContent:'space-between',paddingVertical:FontSize.verticalScale(4)}}>
            <TouchableOpacity
            onPress={() =>this.changeIcon(item.id,item)}
            >
          {item.LikeSanPham==0 ? <Icon type={TypeIcon.AntDesign} name={'hearto'} size={22} >
          </Icon>: <Icon type={TypeIcon.AntDesign} name={'heart'} size={22} ></Icon>}    
            </TouchableOpacity>

            <TouchableOpacity  onPress={() =>this._AddCart(item)}>
            <Icon type={TypeIcon.AntDesign} name={'plussquare'} size={30}></Icon>
            </TouchableOpacity>
          </View>
     </View>
       <View style={{flex:1,paddingVertical:FontSize.scale(4)}}>
       <Text numberOfLines={2} style={{color:colors.grayLight,fontSize:FontSize.reText(18)}} >{item.nameproduct}</Text>
       <View style={{height:FontSize.scale(4)}}></View>
        {/* <Text style={{fontWeight:'bold',fontSize:FontSize.reText(20)}}>{item.GiaBan.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+" đ"}</Text> */}
       </View>
    </TouchableOpacity>
    )
  }
    renderRate=({item}) =>{
      for (let index = 0; index <4 ; index++) {
              <View>
                      <Icon  type={TypeIcon.EvilIcons}  name={'star'} size={15}></Icon>
              </View>
      }
    }
    _renderItemList=({item}) =>
  {
   return(
     <TouchableOpacity 
     style={{backgroundColor:colors.white,height:FontSize.scale(400),width:FontSize.Width(100),marginBottom:FontSize.scale(40)}} >
            
            <View style={{flex:8,paddingHorizontal:FontSize.scale(20),flexDirection:'row'}}> 
            <View style={{flex:8}}>
              <Image source={{uri:item.imgproduct[0]}} style={{width:'100%',height:'100%',resizeMode:'cover'}}></Image>
            </View>
             <View style={{flex:2,justifyContent:'space-between',alignItems:'flex-end',paddingVertical:FontSize.verticalScale(5),paddingHorizontal:FontSize.scale(8)}}>
                      
             <TouchableOpacity>
               <Icon type={TypeIcon.AntDesign} name={'hearto'} size={22}></Icon>
             </TouchableOpacity>
                  <TouchableOpacity onPress={() =>this.props.AddCart(item)}>
                  <Icon type={TypeIcon.AntDesign} name={'plussquare'} size={30}></Icon>
                  </TouchableOpacity>
             </View>
            </View>
            <View style={{flex:2,backgroundColor:colors.white}}>
            <Text style={{color:colors.grayLight}}>{item.nameproduct}</Text>
            <View
            style={{height:FontSize.scale(2)}}
            />
            {/* <Text style={{fontWeight:'bold',fontSize:FontSize.reText(22)}}>{ item.GiaBan.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+" đ"}</Text> */}
            <View
            style={{height:FontSize.scale(8)}}
            />
            <View style={{flexDirection:'row'}}> 
              <Icon  type={TypeIcon.Entypo}  name={'star'} size={20} color={colors.colorStarYellow} ></Icon>
              <Icon  type={TypeIcon.Entypo}  name={'star'} size={20} color={colors.colorStarYellow}></Icon>
              <Icon  type={TypeIcon.Entypo}  name={'star'} size={20} color={colors.colorStarYellow}></Icon>
              <Icon  type={TypeIcon.Entypo}  name={'star'} size={20} color={colors.colorStarYellow}></Icon>   
            </View>
            </View>
     </TouchableOpacity>
   )
    
  }
  render() {
    const {isShowGrid}=this.state
      const {data}=this.props
      Utils.nlog(this.props)
    return (
      <View style={{flex:1,backgroundColor:colors.white}}>
            <HeaderView
            iconright={true}
            IconLeftShow={true}
            TitleCenter={'Women'}
            IconLefType={TypeIcon.AntDesign}
            IconNameLeft={'left'}
            StyleTxtCenter={{fontSize:FontSize.reText(22)}}
            onPressLeft={() =>Utils.goBack()}
            />
            <View style={{paddingHorizontal:FontSize.scale(12),paddingVertical:FontSize.verticalScale(20)}}>

              <View style={{flexDirection:'row',height:FontSize.scale(20)}}>
                  <TouchableOpacity style={{flexDirection:'row'}}>
                  <Icon
                  type={TypeIcon.FontAwesome5}
                  name={'grip-lines-vertical'}
                  size={22}
                  />
                  <View style={{width:FontSize.scale(10)}}></View>
                  <Text style={{fontSize:FontSize.reText(20)}}>{'Refine'}</Text>
                  </TouchableOpacity>
                    <View style={{flex:8}}>

                    </View>
                    <View style={{flexDirection:'row'}}>
                      <TouchableOpacity
                      onPress={()=>{
                          this.setState({isShowGrid:true})
                      }}
                      >     
                      <Icon   type={TypeIcon.Ionicons} name={'md-grid-outline'} size={22}/>
                      </TouchableOpacity>
                      <View style={{width:FontSize.scale(10)}}></View>
                      <TouchableOpacity
                      
                      onPress={()=>{
                        this.setState({isShowGrid:false})
                    }}
                      >     
                      <Icon   type={TypeIcon.MaterialCommunityIcons} name={'border-all-variant'} color={colors.grayLight} size={22}/>
                      </TouchableOpacity>
                    </View>
              </View>
              <ScrollView style={{paddingVertical:FontSize.verticalScale(14)}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              >
                          {dataCategory.map((item,index) =>{
                            return(
                              <TouchableOpacity key={index} style={{justifyContent:'center',borderWidth:1,borderColor:colors.grayLight,marginRight:FontSize.scale(10),paddingVertical:FontSize.verticalScale(10),paddingHorizontal:FontSize.scale(10)}}>
                                      <Text style={{textAlign:'center'}} >{item.name}</Text>
                              </TouchableOpacity>
                            )
                          })}
                      </ScrollView>
            </View>
            <View style={{flex:1}}>
                    <FlatList
                    style={{
                    paddingVertical:FontSize.scale(7),
                    paddingHorizontal:FontSize.scale(10)}}
                    data={this.props.data}
                    renderItem={ isShowGrid==true ? this._renderItemGrid:this._renderItemList}
                    numColumns={2}
                    keyExtractor={item => item.MaSp}            
                    />
            </View>
      </View>
    );
  }
}

const mapStateToProps =(state) =>{


  return{
    data:state.CartReducer.ListSanPham
  
  }
}

const mapDispatchToProps =(dispatch) =>{
    
  return {
    AddCart:(data) => dispatch(CartAction.ActionAddCart(data)),
    Add_Remove:(data) => dispatch(CartAction.ActionAdd_RemoveLike(data)),
    LikeProduct:(id) =>dispatch(CartAction.ActionAdd_LikeProduct(id)),
    FetchSanPham:(id) => dispatch(CartAction.ActionFetchSanPhamToLoaiSpRequest(id)),

  }
  
}





export default connect(mapStateToProps,mapDispatchToProps)(ProductScreen)





const styles = StyleSheet.create({
  absoluteFillObject:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.grayLight
  }
})