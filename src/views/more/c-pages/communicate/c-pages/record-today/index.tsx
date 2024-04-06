import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import { Button } from '@rneui/themed'
import theme from '../../../../../../styles/theme/color'
import {
    getTopicApi,
    recordDietTextApi,
} from '../../../../../../apis/communicate'
import { useAppSelector } from '../../../../../../store'
import { shallowEqual } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import { uploadMultipleImages } from '../../../../../../utils/uploadImg'
import { yingshe } from '../../../../../../data/date'

interface IProps {
    children?: ReactNode
    navigation: any
}

const RecordToday: FC<IProps> = ({ navigation }) => {
    const [text, setText] = useState('')
    const [titles, setTitles] = useState([])
    const [activeId, setActiveId] = useState(1)
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    const getTopic = () => {
        getTopicApi().then((res) => {
            setTitles(res.data)
        })
    }
    useEffect(() => {
        getTopic()
    }, [])

    //上传文字
    const UploadText = () => {
        const recordDietParam = {
            content: text,
            topicId: activeId,
            userid: userInfo.id,
        }
        return new Promise((resolve, reject) => {
            recordDietTextApi(recordDietParam)
                .then((res) => {
                    console.log(res.data, '上传文字')
                    resolve(res.data)
                })
                .catch((e) => {
                    console.log(e)
                    reject(e)
                })
        })
    }
    //多图片上传
    const [selectedImages, setSelectedImages] = useState([] as string[])

    const pickImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
            selectionLimit: 6,
        })
        if (!result.canceled) {
            setSelectedImages([
                ...selectedImages,
                ...result.assets.map((item) => item.uri),
            ])
        }
    }
    const UploadAll = () => {
        //限制条件
        if (selectedImages.length == 0 && text.trim() === '') {
            return Alert.alert('请填写记录')
        }
        UploadText().then((id) => {
            selectedImages &&
                selectedImages.length > 0 &&
                uploadMultipleImages(selectedImages, id as number).then(
                    (res) => {
                        console.log(res, '上传图片')
                    },
                )
        })
        // 清除选中图片
        setSelectedImages([])
        //返回上一页面
        navigation.navigate('DietCommunication', { refresh: Math.random() })
    }
    return (
        <ScrollView className="flex-1 bg-white pl-[15] pr-[15] pt-[15]">
            <View className="flex-row items-center">
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '800',
                        flex: 1,
                    }}
                >
                    {new Date().getMonth() +
                        1 +
                        '月' +
                        new Date().getDate() +
                        '日 '}

                    {'星期' + yingshe[Number(new Date().getDay())]}
                </Text>
                <Button
                    onPress={() => {
                        UploadAll()
                    }}
                    title="发布"
                    containerStyle={{
                        borderRadius: 50,
                        width: 80,
                    }}
                    titleStyle={{
                        fontSize: 15,
                    }}
                    color={theme.colors.deep01Primary}
                ></Button>
            </View>
            <View>
                <Text
                    style={{
                        marginTop: 10,
                        fontSize: 14,
                        color: '#cccccc',
                    }}
                >
                    选择你要发布的板块：
                </Text>
            </View>
            {/*模块*/}
            <View className="flex-row">
                {titles.map(
                    (item: { desc: string; id: number; stauts: number }) => {
                        return (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => {
                                    setActiveId(item.id)
                                }}
                            >
                                <Text
                                    style={{
                                        borderRadius: 8,
                                        borderColor: theme.colors.deep01Primary,
                                        borderWidth: 1,
                                        paddingHorizontal: 5,
                                        paddingVertical: 3,
                                        marginRight: 5,
                                        fontSize: 12,
                                        marginTop: 5,
                                        backgroundColor:
                                            activeId === item.id
                                                ? theme.colors.deep01Primary
                                                : 'white',
                                        color:
                                            activeId === item.id
                                                ? 'white'
                                                : theme.colors.deep01Primary,
                                    }}
                                >
                                    {item.desc}
                                </Text>
                            </TouchableOpacity>
                        )
                    },
                )}
            </View>
            {/*    记录的板块*/}
            <View>
                <TextInput
                    style={{
                        borderRadius: 10,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                    }}
                    className="mt-[10] bg-[#F2FCF1]"
                    multiline={true}
                    numberOfLines={15}
                    textAlignVertical={'top'}
                    value={text}
                    onChangeText={(value) => {
                        setText(value)
                    }}
                    placeholder={'写下今天吃了什么与此刻的心情'}
                />
                <Text
                    style={{
                        textAlign: 'right',
                    }}
                >
                    {text.length}/500
                </Text>
            </View>

            {/*    图片的添加*/}
            <View>
                <Text
                    style={{
                        fontSize: 12,
                        color: '#cccccc',
                    }}
                >
                    添加图片让记录更生动(最多只能上传6张图片)
                </Text>
                <View className="flex-row items-center ">
                    {selectedImages.length > 0 ? (
                        <View className="flex-row items-center mt-[10] flex-wrap">
                            {selectedImages.map((item, index) => {
                                return (
                                    <Image
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 10,
                                            marginRight: index === 3 ? 0 : 10,
                                            marginTop: 10,
                                        }}
                                        key={index}
                                        source={{ uri: item }}
                                    ></Image>
                                )
                            })}
                        </View>
                    ) : null}
                    <TouchableOpacity
                        onPress={() => pickImages()}
                        style={{
                            justifyContent: 'center',
                            marginTop: 10,
                            borderWidth: 1,
                            borderStyle: 'dashed',
                            borderColor: '#ccccccc',
                            borderRadius: 10,
                            height: 60,
                            width: 60,
                        }}
                    >
                        {selectedImages.length >= 6 ? null : (
                            <Text
                                style={{
                                    fontSize: 12,
                                    textAlign: 'center',
                                }}
                            >
                                添加图片
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default memo(RecordToday)
