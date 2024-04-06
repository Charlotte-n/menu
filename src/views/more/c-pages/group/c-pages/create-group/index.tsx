import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
    Alert,
    Dimensions,
    Image,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'
import AutoText from '../../../../../../components/auto-text'
import { Button, Card, Icon } from '@rneui/themed'
import theme from '../../../../../../styles/theme/color'
import { createGroupApi } from '../../../../../../apis/group'
import { createGroupParam } from '../../../../../../apis/types/group'
import { useAppSelector } from '../../../../../../store'
import { shallowEqual } from 'react-redux'
import ImagePicker from '../../../../../../components/image-picker'

interface IProps {
    children?: ReactNode
    navigation: any
}

const CreateGroup: FC<IProps> = ({ navigation }) => {
    const [title, setTitle] = useState('')
    const [size, setSize] = useState('')
    const [label, setLabel] = useState('')
    const [image, setGetImage] = useState('')
    const [introduce, setIntroduce] = useState('')
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    const getImage = (image: string) => {
        setGetImage(image)
    }
    //创建小组
    const createGroup = async () => {
        //创建一个formdata
        const formData = new FormData()
        formData.append('groupSize', size)
        formData.append('groupName', title)
        formData.append('ownerId', userInfo.id as any)
        formData.append('category', label)
        formData.append('image', {
            uri: image,
            name: 'group.jpeg',
            type: 'image/jpeg',
        } as any)
        formData.append('introduce', introduce)
        try {
            const res = await createGroupApi(formData)
            console.log(res)
            if (res.code === 1) {
                ToastAndroid.showWithGravityAndOffset(
                    '创建成功',
                    ToastAndroid.SHORT,
                    ToastAndroid.TOP,
                    25,
                    50,
                )
                navigation.goBack()
            }
        } catch (e) {
            console.log(e, '创建小组失败')
        }
    }
    return (
        <View>
            <Image
                style={{
                    height: 200,
                    width: Dimensions.get('window').width,
                }}
                source={require('../../../../../../../assets/images/group.jpeg')}
            ></Image>
            <Card
                containerStyle={{
                    position: 'absolute',
                    top: 120,
                    borderTopLeftRadius: 40,
                    borderTopEndRadius: 40,
                    width: Dimensions.get('screen').width,
                    paddingVertical: 0,
                    marginHorizontal: 0,
                    paddingHorizontal: 0,
                    flex: 1,
                    minHeight: Dimensions.get('window').height - 200,
                    backgroundColor: '#FEF0E3',
                }}
            >
                <View className="pl-[20] pr-[20]">
                    <TextInput
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                        placeholder="小组名称"
                        style={{
                            borderWidth: 1,
                            borderColor: 'white',
                            marginTop: 20,
                            backgroundColor: 'white',
                            borderRadius: 20,
                            height: 40,
                            paddingHorizontal: 5,
                        }}
                    ></TextInput>
                    <TextInput
                        value={size}
                        onChangeText={(text) => setSize(text)}
                        placeholder="成员数量"
                        style={{
                            borderWidth: 1,
                            borderColor: 'white',
                            marginTop: 20,
                            backgroundColor: 'white',
                            borderRadius: 20,
                            height: 40,
                            paddingHorizontal: 5,
                        }}
                    ></TextInput>
                    <TextInput
                        value={label}
                        onChangeText={(text) => setLabel(text)}
                        placeholder="小组类型"
                        style={{
                            borderWidth: 1,
                            borderColor: 'white',
                            marginTop: 20,
                            backgroundColor: 'white',
                            borderRadius: 20,
                            height: 40,
                            paddingHorizontal: 5,
                        }}
                    ></TextInput>
                    <TextInput
                        value={introduce}
                        onChangeText={(text) => setIntroduce(text)}
                        multiline={true}
                        numberOfLines={5}
                        placeholder="小组介绍"
                        textAlignVertical={'top'}
                        style={{
                            borderWidth: 1,
                            borderColor: 'white',
                            marginTop: 20,
                            backgroundColor: 'white',
                            borderRadius: 20,
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                        }}
                    ></TextInput>
                    <View className="mt-[15]">
                        {/*显示图片*/}
                        {image ? (
                            <View>
                                <Image
                                    source={{ uri: image }}
                                    style={{
                                        height: 50,
                                        width: 50,
                                        borderRadius: 10,
                                    }}
                                ></Image>
                            </View>
                        ) : (
                            <ImagePicker getImage={getImage}>
                                {{
                                    content: (
                                        <View
                                            className="w-[50] h-[50] justify-center items-center"
                                            style={{
                                                borderWidth: 1,
                                                borderColor: 'black',
                                                borderRadius: 10,
                                                borderStyle: 'dotted',
                                            }}
                                        >
                                            <Icon
                                                type="antdesign"
                                                size={20}
                                                name={'plus'}
                                            ></Icon>
                                        </View>
                                    ),
                                }}
                            </ImagePicker>
                        )}
                    </View>
                    <Button
                        onPress={() => {
                            createGroup()
                        }}
                        title="创建打卡小组"
                        containerStyle={{
                            borderRadius: 20,
                            marginTop: 20,
                        }}
                        buttonStyle={{
                            backgroundColor: theme.colors.deep01Primary,
                        }}
                    ></Button>
                </View>
                <View className="pl-[20] pt-[20]">
                    <AutoText
                        style={{
                            color: '#F3BF88',
                        }}
                    >
                        小组规则
                    </AutoText>
                    <AutoText
                        fontSize={4}
                        style={{
                            marginTop: 10,
                        }}
                    >
                        每个人最多只能创建两个小组。
                    </AutoText>
                    <AutoText
                        fontSize={4}
                        style={{
                            marginTop: 10,
                        }}
                    >
                        小组创建者一旦解散了小组，一周之内不能创建小组。
                    </AutoText>
                </View>
            </Card>
        </View>
    )
}

export default memo(CreateGroup)
