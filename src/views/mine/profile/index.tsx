import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import ProfileFlatList from './component/content-item'
import MyImagePicker from '../../../components/image-picker'
import { ScrollView } from 'nativewind/dist/preflight'
import { useAppDispatch, useAppSelector } from '../../../store'
import { shallowEqual } from 'react-redux'
import { getUserInfo } from '../../../apis/mine'
import { changeUserInfoAction } from '../../../store/slice/login-register-slice'
import MyBottomSheet from '../../../components/bottom-sheet'
import getImage from '../../../utils/uploadImg'
interface IProps {
    children?: ReactNode
}
const Profile: FC<IProps> = () => {
    const [Id, setId] = useState('')
    const height = Dimensions.get('screen').height
    const [isVisible, setIsVisible] = useState(true)
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    const { id, avatar } = userInfo
    //#region渲染不同的ui
    const feedBack = (id: string) => {
        switch (id) {
            case '0':
                return (
                    <MyBottomSheet
                        id={id}
                        isVisible={isVisible}
                        contentValue={userInfo.username}
                    >
                        {{
                            content: '修改用户名',
                            cancel: () => setIsVisible(false),
                            placeholderContent: '请填写用户名',
                        }}
                    </MyBottomSheet>
                )
            case '1':
                return (
                    // 增加判断是否要解除绑定手机号
                    <MyBottomSheet
                        id={id}
                        isVisible={isVisible}
                        contentValue={'13383024736'}
                    >
                        {{
                            content: '绑定手机号',
                            cancel: () => setIsVisible(false),
                            placeholderContent: '请填写手机号',
                        }}
                    </MyBottomSheet>
                )
        }
    }
    //endregion
    //#region获取头像
    //获取头像
    const dispatch = useAppDispatch()
    //长传图片
    //#endregion
    //这个页面获取用户信息
    useEffect(() => {
        //获取用户的信息
        getUserInfo(id).then((res) => {
            dispatch(changeUserInfoAction(res.data.user))
        })
    }, [])
    return (
        <ScrollView
            style={{ height: height }}
            className="bg-white pt-[4] pl-[40] pr-[40]"
        >
            <View className="flex-row items-center pt-[20] pb-[20]  border-[#F1F3F4] border-b">
                <Text
                    className="flex-1"
                    style={{ fontSize: 15, fontWeight: '300' }}
                >
                    头像
                </Text>
                {/*封装的获取图片组件*/}
                {avatar ? (
                    <MyImagePicker getImage={getImage}>
                        {{
                            content: (
                                <Image
                                    className="rounded-full"
                                    source={{ uri: avatar }}
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
                                    source={require('../../../../assets/images/bg_login_header.png')}
                                    style={{ width: 100, height: 100 }}
                                ></Image>
                            ),
                        }}
                    </MyImagePicker>
                )}
            </View>
            <ProfileFlatList getId={setId}>
                {{ set: () => setIsVisible(true) }}
            </ProfileFlatList>
            {Id && feedBack(Id)}
        </ScrollView>
    )
}

export default memo(Profile)
