import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    Alert,
    Dimensions,
    Image,
} from 'react-native'
import { Icon } from '@rneui/themed'
import { DATA } from '../../data/mine'
import { useAppDispatch, useAppSelector } from '../../store'
import { shallowEqual } from 'react-redux'
import {
    changeUserProfileAction,
    clearUserInfoAction,
} from '../../store/slice/login-register-slice'
import { ScrollView } from 'nativewind/dist/preflight'
import MyImagePicker from '../../components/image-picker'
import { getUserInfo, logoutApi } from '../../apis/mine'
interface IProps {
    children?: ReactNode
}
import getImage from '../../utils/uploadImg'
import { useNavigation } from '@react-navigation/native'

const Home: FC<IProps> = () => {
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    const { id } = userInfo
    const Item = (props: any) => {
        let { title, path } = props
        path = String(path)
        return (
            <TouchableOpacity
                className="flex-row items-center pt-[20] pb-[20] border-b border-[#F1F3F4]"
                //@ts-ignore
                onPress={() => navigation.navigate(path)}
            >
                <Text
                    className="flex-1 "
                    style={{ fontSize: 15, fontWeight: '300' }}
                >
                    {title}
                </Text>
                <Icon
                    name={'right'}
                    type={'antdesign'}
                    size={14}
                    color={'#888888'}
                ></Icon>
            </TouchableOpacity>
        )
    }
    //退出登录
    const checkout = () => {
        Alert.alert('', '确定要退出登录吗', [
            {
                text: '取消',
                onPress: () => '',
                style: 'cancel',
            },
            {
                text: '确定',
                onPress: async () => {
                    //@ts-ignore
                    navigation.reset({
                        index: 0,
                        //@ts-ignore
                        routes: ['LoginRegisterHomeScreen'],
                    })
                    //@ts-ignore
                    navigation.navigate('LoginRegisterHomeScreen')
                    //清空用户信息
                    dispatch(clearUserInfoAction())
                },
            },
        ])
    }
    //注销用户
    const logout = async () => {
        Alert.alert('', '确定要注销用户吗', [
            {
                text: '取消',
                onPress: () => '',
                style: 'cancel',
            },
            {
                text: '确定',
                onPress: async () => {
                    //清空用户信息
                    //清空数据栈跳转到登录页面
                    const res = await logoutApi(userInfo.id)
                    console.log(res)
                    //@ts-ignore
                    navigation.reset({
                        index: 0,
                        //@ts-ignore
                        routes: ['LoginRegisterHomeScreen'],
                    })
                    //@ts-ignore
                    navigation.navigate('LoginRegisterHomeScreen')
                    dispatch(clearUserInfoAction())
                },
            },
        ])
    }
    //获取头像
    //这个页面获取用户信息
    useEffect(() => {
        //获取用户的信息
        getUserInfo(id).then((res) => {
            dispatch(changeUserProfileAction(res.data))
        })
    }, [])
    return (
        <ScrollView
            className="bg-white pl-[40] pr-[40] pt-[20]"
            style={{ height: Dimensions.get('screen').height }}
        >
            <View className="flex-row items-center mb-[40] justify-between">
                {/*封装的获取图片组件*/}
                {userInfo.avatar ? (
                    <MyImagePicker getImage={getImage}>
                        {{
                            content: (
                                <Image
                                    className="rounded-full"
                                    source={{ uri: userInfo.avatar }}
                                    style={{ width: 100, height: 100 }}
                                />
                            ),
                        }}
                    </MyImagePicker>
                ) : (
                    <MyImagePicker getImage={getImage}>
                        {{
                            content: (
                                <Image
                                    className="rounded-full"
                                    source={require('../../../assets/images/bg_login_header.png')}
                                    style={{ width: 100, height: 100 }}
                                ></Image>
                            ),
                        }}
                    </MyImagePicker>
                )}
                <TouchableOpacity
                    className="flex-row items-center"
                    //@ts-ignore
                    onPress={() => navigation.navigate('profile')}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            marginRight: 50,
                            fontWeight: '300',
                            width: 100,
                        }}
                        ellipsizeMode={'tail'}
                        numberOfLines={1}
                    >
                        {userInfo.username}
                    </Text>
                    <Icon
                        name={'right'}
                        type={'antdesign'}
                        size={20}
                        color={'#888888'}
                    ></Icon>
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                    scrollEnabled={false}
                    data={DATA}
                    renderItem={({ item }) => (
                        <Item title={item.title} path={item.path} />
                    )}
                    keyExtractor={(item) => item.id}
                />
                <TouchableOpacity
                    onPress={() => logout()}
                    className="flex-row items-center pt-[20] pb-[20] border-b border-[#F1F3F4]"
                >
                    <Text
                        className="flex-1 "
                        style={{ fontSize: 15, fontWeight: '300' }}
                    >
                        注销用户
                    </Text>
                    <Icon
                        name={'right'}
                        type={'antdesign'}
                        size={14}
                        color={'#888888'}
                    ></Icon>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => checkout()}
                    className="flex-row items-center pt-[20] pb-[20] border-b border-[#F1F3F4]"
                >
                    <Text
                        className="flex-1 "
                        style={{ fontSize: 15, fontWeight: '300' }}
                    >
                        退出登录
                    </Text>
                    <Icon
                        name={'right'}
                        type={'antdesign'}
                        size={14}
                        color={'#888888'}
                    ></Icon>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default memo(Home)
