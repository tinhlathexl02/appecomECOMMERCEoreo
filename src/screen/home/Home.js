import React, { Component } from 'react'
import { Text, 
    View, 
    StyleSheet, 
    ImageBackground, 
    TouchableOpacity, 
    ScrollView,
    FlatList, 
    Image, 
    ActivityIndicator,
    Dimensions,
}
     from 'react-native'
import Icon, { TypeIcon } from '../../config/Icon'
import HeaderView from '../../container/HeaderView'
import {IMAGES} from '../../../assets/images/IndexImg';
import FontSize from '../../config/FontSize';
import { colors } from '../../config/style';
import ProductHorizontal from '../../component/Home/ProductHorizontal';
import { Context } from '../../config/ThemeProvider2';
import Carousel from '../../component/Home/Carousel';
import Utils from '../../app/Utilis';
import Config from '../../navigation/Config';
import Button2 from '../../component/Button2';
import { connect } from 'react-redux'
import CartAction from '../../Redux/Actions/ActionCart/CartAction'
import CategoriesACtion from '../../Redux/Actions/ActionCategories/CategoriesACtion'
import ProductACtion from '../../Redux/Actions/ActionProduct/ProductAction'
import CarsoulItem from '../../component/Home/CarouselItem';
import ConfigStack from '../../navigation/ConfigStack';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import HeadViewCustom from '../../container/HeadViewCustom';
import { scale, verticalScale } from 'react-native-size-matters';
import NumberCart from '../../container/NumberCart';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AuthAction from '../../Redux/Actions/ActionAuth/AuthAction';

const {width,height}=Dimensions.get('window')

const datacolors = [{
        id:'1',
        name: 'New Sweater',
        saleoff: '50% OFF',
        img: IMAGES.imgWomen,
    },
    {
        id:'2',
        name: 'New Sweater',
        saleoff: '50% OFF',
        img: IMAGES.imgDecor,
    },
    {
        id:'3',
        name: 'New Sweater',
        saleoff: '50% OFF',
        img: IMAGES.imgKids
    },
]

const databrand = [{
        name: 'zara',
        img: IMAGES.imgZara,
        rate: 5.0,
    },
    {
        name: 'pullandbear',
        rate: 5.0,
        img: IMAGES.imgPb,
    },
    {
        name: 'pullandbear',
        rate: 5.0,
        img: IMAGES.imgZara,
    },
]
const dataProduct = [{
        id: 1,
        name: 'colorful chino',
        price: '$30.00',
        img: IMAGES.imgQuanao1,
    },
    {
        id: 2,
        name: 'colorful chino',
        price: '$30.00',
        img: IMAGES.imgQuanao1,
    },
    {
        id: 3,
        name: 'colorful chino',
        price: '$30.00',
        img: IMAGES.imgQuanao1,
    },
    {
        id: 4,
        name: 'colorful chino',
        price: '$30.00',
        img: IMAGES.imgQuanao1,
    },
]
const datablog=[
    {
       id:1,
       Titele:'Vogue Utimate Fall Boot Guide I Here a',
       time:'2 year ago',
       img:IMAGES.imgBlog1,
    },
    {
        id:2,
        Titele:'Virgil Abloh Latest Off-White',
        time:'2 year ago',
        img:IMAGES.imgBlog2,
    },
    {
        id:3,
        Titele:'20 Reasons to Reconsider the Ballet Flat',
        time:'2 year ago',
        img:IMAGES.imgBlog3,
    }
]

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingCategory:true,
        };
      }
      componentDidMount= async() =>{
        await this.props.FetchProduct();
        await this.props.FetchLoaiSp();
        await this.props.Datacart();
        await this.props.Datalike();
        if(this.props.tokenSocial!=null)
        {
        const currentUser = await GoogleSignin.getCurrentUser();
          this.props.LoadUser(currentUser.user)
        }

      }
      _rendeitemCategory=({item,index}) =>{
          const {ListLoaisp}=this.props.dataCategory
            return(
                <TouchableOpacity onPress={() =>{Utils.navigate(Config.ProductScreen,{maloai:item._id})}}  style={{flexDirection:'row'}}>
                    <View>
                        <Image style={styles.imageCategories}
                        source={ {uri:item.imgproduct}}
                        >
                        </Image>
                        <Text style={{marginTop:FontSize.scale(10),textAlign:'center',...FontSize.TextStyles.roboto,fontSize:RFValue(18,FontSize.Height(100))}}>{item.nameproduct}</Text>
                    </View>
                        { index!=ListLoaisp.length-1 ?(<View style={{width:FontSize.scale(15),height:'100%'}}></View>):null }
            </TouchableOpacity>
            )
      }
      _rendeitemblog=(item,index) =>{
        return(
          <TouchableOpacity key={index} 
          style={{flexDirection:'row',
          paddingHorizontal:FontSize.scale(15),
          paddingVertical:FontSize.scale(20),
          borderBottomWidth:0.8,
          borderBottomColor:colors.colorGrayBgr
          }}
          onPress={() => Utils.navigate(ConfigStack.HomeStack,{screen:Config.DetalisBlog,initial: false,params:{item:item}},)}
          >
              <Image source={item.img} 
              style={{width:FontSize.scale(140),height:FontSize.scale(120)}} 
              borderRadius={FontSize.scale(4)}
              /> 
              <View  style={{flex:1,paddingHorizontal:FontSize.scale(10),
              }}>
                  <Text  
                  style={{...FontSize.TextStyles.semiBold,
                    fontSize:FontSize.sizes.sText19
                  }}>{item.Titele}
                  </Text>
                  <View style={{height:FontSize.scale(10)}}></View>
                  <Text style={{color:colors.colorGrayLight }}>{item.time}</Text>
              </View>
          </TouchableOpacity>
        )
    }
    render() {
        const {ListLoaisp,isLoading}=this.props.dataCategory
        const {Listsp,isLoadingsp}=this.props.dataProduct
        return ( 
             <Context.Consumer>
             {({ theme, updateTheme }) => (
                <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,backgroundColor:colors.white}}>
                    
                    <HeadViewCustom
                    ContainerStyle={{paddingHorizontal:scale(15),paddingVertical:verticalScale(20)}}
                    ViewLeft={
                        <TouchableOpacity  onPress={() =>{this.props.navigation.openDrawer()}}>
                               <Icon
                            name='menu'
                            type={TypeIcon.Entypo}
                            size={scale(20)}
                                />
                        </TouchableOpacity>
                    }
                    ViewCenter={
                        <Image
                        source={IMAGES.imgLogoOreo}
                        style={{width:scale(50),height:verticalScale(40)}}
                        resizeMode={'stretch'}
                        />
                    }
                    ViewRight={
                        <TouchableOpacity  onPress={() => Utils.navigate(Config.CartScreen)} style={{flexDirection:'row'}}>
                            <NumberCart number={this.props.dataCart.length}/>
                            <Icon name='shoppingcart'
                            type={TypeIcon.AntDesign}
                            size={scale(18)}
                            />
                        </TouchableOpacity>
                    }
                    />
                    <Carousel 
                        {...this.props}
                        data={datacolors}
                        renderitem={
                            <CarsoulItem  />}
                        autotTime={3000}
                    />
                    <View style={{height:FontSize.scale(12)}}/>
                    <View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:FontSize.scale(10)}}>
                                    <Text style={styles.textMeidum}>{'Categories'}</Text>
                                    <TouchableOpacity onPress={() =>  Utils.navigate(Config.Shop)}>
                                        <Text style={styles.txtSmall}>{'Show all'}</Text>
                                    </TouchableOpacity>
                            </View>
                            <View style={{height:FontSize.scale(30)}}/>
                            {!isLoading ? 
                                    <FlatList
                                    style={{marginHorizontal:FontSize.scale(15)}}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={ListLoaisp}
                                    renderItem={this._rendeitemCategory}
                                    keyExtractor={(item,index) => index}
                              />:
                              (
                                  <ActivityIndicator size={'large'}  color={colors.grayLight}/>
                              )
                              }
                    </View>
                    <View style={{height:FontSize.scale(20),borderBottomWidth:0.8,borderBottomColor:colors.grayLight}}/>
                    <View style={{paddingVertical:FontSize.scale(30)}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:FontSize.scale(10)}}>
                                        <Text style={styles.textMeidum}>{'Vendors'}</Text>
                                        <Text style={styles.txtSmall}>{'Show all'}</Text>
                        </View>
                        <View style={{height:FontSize.scale(30)}}></View>
                        <FlatList
                                    style={{marginHorizontal:FontSize.scale(15)}}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={databrand}
                                    renderItem={({item,index}) =>
                                    {
                                        return(
                                            <View  
                                            style={{
                                           ...styles.viewVendors,
                                            marginRight:index==databrand.length-1 ? 0:FontSize.scale(15)
                                            }}>
                                                <View style={{paddingHorizontal:FontSize.scale(2)}}>
                                                    <Image style={styles.imageVendors}
                                                    source={item.img}
                                                    >
                                                    </Image>
                                                    <Text style={{marginBottom:FontSize.scale(20),textAlign:'center',fontSize:FontSize.reText(20)}}>{item.name}</Text>
                                                </View>
                                            </View>
                                                )
                                    }
                                    }
                                    keyExtractor={(item,index) => index}
                                    />
                    </View>
                    <View style={{height:FontSize.scale(20),borderBottomWidth:0.8,borderBottomColor:colors.grayLight}}/>
                    <ProductHorizontal
                    {...this.props}
                    txtLeft={'Best seller'}
                    txtRight={'Show all'}
                    datanew={Listsp}
                    isloading={isLoadingsp}
                    />
                    <ImageBackground source={IMAGES.imgBackGroud} style={{height:FontSize.scale(170)}}/>   
                    <View style={{height:FontSize.scale(40)}}/>
                    <ProductHorizontal
                    {...this.props}
                    txtLeft={'New Arrivals'}
                    txtRight={'Show all'}
                    datanew={Listsp}
                    isloading={isLoadingsp}
                    />
                        <ImageBackground source={IMAGES.imgBackGroudShop} 
                        style=
                        {{
                            marginHorizontal:FontSize.scale(15),
                            height:FontSize.scale(190),
                            alignItems:'center',
                            justifyContent:'center',
                        }}
                        resizeMode={'cover'}
                        borderRadius={12}
                            >
                                <View style={{
                                    borderRadius:FontSize.scale(5),
                                    backgroundColor:colors.white,
                                    width:FontSize.scale(150),
                                    height:FontSize.scale(40),
                                    justifyContent:'center',
                                }}>
                                    <Text   style={{textAlign:'center',fontSize:FontSize.reText(22)}} >{'Shop Sale'}</Text>
                                </View>
                            </ImageBackground>
                     <View style={{height:FontSize.scale(30)}}/>
                      <Button2
                         title={'Free Shipping && Free Return'}
                         style=
                         {{
                         backgroundColor:colors.colorGrayBgr,
                         height:FontSize.scale(40)
                         }}
                         styleTxt={{
                             ...FontSize.TextStyles.roboto,
                             fontSize:FontSize.sizes.sText18
                         }}
                        />
                     <View style={{height:FontSize.scale(30)}}/>
                     <View>
                     <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:FontSize.scale(10)}}>
                                        <Text style={styles.textMeidum}>{'Blogs'}</Text>
                                        <TouchableOpacity onPress={() => Utils.navigate(ConfigStack.HomeStack,{screen:Config.DetalisBlogAll,initial: false,params:{data:datablog,numbercart:this.props.dataCart.length}})}> 
                                        <Text style={styles.txtSmall} >{'Show all'}</Text>
                                        </TouchableOpacity>
                        </View>
                         {datablog.map(this._rendeitemblog)}
                     </View>

                </ScrollView>
                )}
               </Context.Consumer>
        )
        }
    }
const mapStateToProps =(state) =>{
        return{
          datalike:state.CartReducer.ListProductLike,
          dataCategory:state.CategoriesReducer,
          dataProduct:state.ProductReducer,
          dataCart:state.CartReducer.ListCart,
          tokenSocial:state.AuthReducer.tokenSocial,
        }
      }
const mapDispatchToProps =(dispatch) =>{
        return {
          FetchLoaiSp:() => dispatch(CategoriesACtion.FecthCategories()),
          FetchProduct:() =>dispatch(ProductACtion.FecthProduct()),
          Datacart:() => dispatch(CartAction.ActionCart()),
          Datalike:() => dispatch(CartAction.ActionLike()),
          AddCart:(data) => dispatch(CartAction.ActionAddCart(data)),
          Add_Remove:(data) => dispatch(CartAction.ActionAdd_RemoveLike(data)),
          LikeProduct:(id) =>dispatch(CartAction.ActionAdd_LikeProduct(id)),
          LoadUser:(data) => dispatch(AuthAction.LoadUser(data))
        }
      }
export default connect(mapStateToProps,mapDispatchToProps)(Home)

const styles = StyleSheet.create({
    textMeidum:{
        ...FontSize.TextStyles.semiBold,
        fontSize:RFValue(22,FontSize.Height(100))
    },
    txtSmall:{
        fontSize:RFValue(18,FontSize.Height(100)),
        color:colors.grayLight,
    },
    imageCategories:
    {
        width:width/3-FontSize.scale(15),
        height:FontSize.scale(120),
        borderRadius:FontSize.scale(4)
    },
    viewVendors:{
            backgroundColor:colors.colorGrayBgr,
            borderRadius:FontSize.scale(12),
            flexDirection:'row',
    },
    imageVendors:
    {
        width:FontSize.scale(110),
        height:FontSize.scale(100),
        resizeMode:'center',
        borderRadius:FontSize.scale(120),
    },
})
    