import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    TextInput,
    View,
} from 'react-native'
import AutoText from '../../../../../../components/auto-text'
import { Avatar, Button, Card, Icon } from '@rneui/themed'
import theme from '../../../../../../styles/theme/color'
import ImagePicker from '../../../../../../components/image-picker'
import {
    ClockApi,
    ClockCalendarApi,
    ClockContentApi,
} from '../../../../../../apis/group'
import {
    ClockCalendarParams,
    clockParam,
} from '../../../../../../apis/types/group'
import { useAppDispatch, useAppSelector } from '../../../../../../store'
import { shallowEqual } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import { changeCurrentTimeAction } from '../../../../../../store/slice/group'
import moment from 'moment'

interface IProps {
    children?: ReactNode
}

const Clock: FC<IProps> = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const [images, setImages] = useState([] as string[])
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    const getImage = (image: string) => {
        setImages((prevState) => [...prevState, image])
    }
    const [clockP, setClockParam] = useState<clockParam>({
        content: '',
        userId: userInfo.id,
        groupId: (route.params as { id: number }).id,
    })
    //打卡上传
    const clock = async () => {
        const formData = new FormData()
        images.forEach((value) => {
            formData.append('images', {
                uri: value,
                name: 'image.jpeg',
                type: 'image/jpeg',
            } as any)
        })
        let res: any
        //文字或者图片上传
        if (images.length) {
            res = await ClockApi(clockP, formData)
        } else {
            res = await ClockContentApi(clockP)
        }
        if (res.code === 1) {
            //打卡日历
            const data: ClockCalendarParams = {
                groupId: (route.params as { id: number }).id,
                userId: userInfo.id,
                newDateTime: moment(new Date()).format('YYYY-MM-DD'),
            }
            //@ts-ignore
            navigation.navigate('groupDetailHome', {
                id: (route.params as { id: number }).id,
                time: new Date().toString(),
            })
            await ClockCalendarApi(data)
        }
        dispatch(
            changeCurrentTimeAction(moment(new Date()).format('YYYY-MM-DD')),
        )
    }
    return (
        <ScrollView
            className="flex-1 pt-[50] bg-[#FBEEE6]"
            showsVerticalScrollIndicator={false}
        >
            <StatusBar backgroundColor="#FBEEE6"></StatusBar>
            <Card
                containerStyle={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    paddingHorizontal: 20,
                    marginHorizontal: 0,
                }}
            >
                <View>
                    {userInfo.avatar ? (
                        <Image
                            style={{
                                width: 55,
                                height: 55,
                                borderRadius: 100,
                                position: 'absolute',
                                left: Dimensions.get('window').width / 2.8,
                                top: -30,
                                zIndex: 1000,
                            }}
                            source={{ uri: userInfo.avatar }}
                        ></Image>
                    ) : (
                        <Image
                            style={{
                                width: 55,
                                height: 55,
                                borderRadius: 100,
                                position: 'absolute',
                                left: Dimensions.get('window').width / 2.8,
                                top: -30,
                            }}
                            source={require('../../../../../../../assets/images/bg_login_header.png')}
                        ></Image>
                    )}

                    <AutoText
                        fontSize={5}
                        style={{
                            position: 'absolute',
                            left: Dimensions.get('window').width / 2.8,
                            top: 25,
                        }}
                    >
                        {userInfo.username}
                    </AutoText>
                </View>
                {/*上传内容*/}
                <View
                    style={{
                        marginTop: 50,
                        backgroundColor: theme.colors.secondary,
                        borderRadius: 20,
                        paddingVertical: 20,
                        paddingHorizontal: 5,
                    }}
                >
                    <TextInput
                        className=""
                        style={{
                            borderRadius: 20,
                            backgroundColor: theme.colors.secondary,
                            minHeight: 150,
                            paddingHorizontal: 10,
                            paddingBottom: 10,
                        }}
                        onChangeText={(value: string) =>
                            setClockParam((prevState) => {
                                prevState.content = value
                                return prevState
                            })
                        }
                        placeholder={'请输入打卡内容'}
                        textAlignVertical="top"
                        multiline={true}
                        numberOfLines={5}
                    ></TextInput>
                    <View>
                        {images.length <= 6 ? (
                            <View className="flex-row">
                                {images.length
                                    ? images.map((item, index) => {
                                          return (
                                              <Image
                                                  key={index}
                                                  source={{ uri: item }}
                                                  style={{
                                                      height: 50,
                                                      width: 50,
                                                      borderRadius: 10,
                                                      marginRight: 10,
                                                  }}
                                              ></Image>
                                          )
                                      })
                                    : null}

                                <ImagePicker getImage={getImage}>
                                    {{
                                        content: (
                                            <View
                                                className="justify-center items-center"
                                                style={{
                                                    height: 50,
                                                    width: 50,
                                                    borderRadius: 15,
                                                    borderWidth: 1,
                                                    borderStyle: 'dotted',
                                                }}
                                            >
                                                <Icon
                                                    type={'antdesign'}
                                                    name={'plus'}
                                                    size={15}
                                                ></Icon>
                                            </View>
                                        ),
                                    }}
                                </ImagePicker>
                            </View>
                        ) : null}
                    </View>
                </View>
                <View className="m-auto mt-[20]">
                    <Button
                        onPress={() => clock()}
                        title={'今日打卡'}
                        containerStyle={{
                            borderRadius: 20,
                            width: Dimensions.get('window').width / 2,
                        }}
                        color={theme.colors.deep01Primary}
                    ></Button>
                </View>
                {/*    规则*/}
                <View className="mt-[20]">
                    <AutoText>打卡规则</AutoText>
                    <AutoText
                        fontSize={4.5}
                        style={{
                            marginTop: 10,
                            color: '#FEBD47',
                        }}
                    >
                        1. 当天没有打卡的时候,不可以补卡。
                    </AutoText>
                    <AutoText
                        fontSize={4.5}
                        style={{
                            color: '#FEBD47',
                        }}
                    >
                        2. 不能超过5天不打卡。
                    </AutoText>
                </View>
            </Card>
        </ScrollView>
    )
}

export default memo(Clock)
