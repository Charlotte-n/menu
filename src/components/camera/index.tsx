import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC } from 'react'
import {
    TouchableOpacity,
    View,
    Text,
    Dimensions,
    StatusBar,
    ScrollView,
    Image,
} from 'react-native'
import PhotoEditor from 'react-native-photo-editor'
import { Icon } from '@rneui/themed'
import SafeAreaView from 'react-native-safe-area-view'
import { useNavigation } from '@react-navigation/native'
import {
    Camera,
    useCameraDevice,
    useCameraPermission,
} from 'react-native-vision-camera'
import MyImagePicker from '../image-picker'
import { getSearchImage } from '../../utils/uploadImg'
import { useAppSelector } from '../../store'
import { FoodListByCategoryApi } from '../../apis/food'
import { FoodListByCategoryType } from '../../apis/types/food'
import { shallowEqual } from 'react-redux'
interface IProps {
    children?: any
}

const MyCamera: FC<IProps> = ({ children }) => {
    const navigation = useNavigation()
    const [selectedImage, setSelectedImage] = useState('')
    // const [type, setType] = useState(CameraType.back)
    const [isEdit, setIsEdit] = useState(false)
    const { hasPermission, requestPermission } = useCameraPermission()
    const [sizeImage, setSizeImage] = useState('')
    const camera = useRef<any>()
    const { RecognizeFoodInfo } = useAppSelector((state) => {
        return {
            RecognizeFoodInfo: state.DietSlice.RecognizeFoodInfo,
        }
    }, shallowEqual)
    const device: any = useCameraDevice('back')
    if (device == null) return <Text>123</Text>
    useEffect(() => {
        console.log(hasPermission)
        ;(async () => {
            if (!hasPermission) {
                await requestPermission()
            }
        })()
    }, [])
    //照相
    const takePicture = async () => {
        if (camera.current) {
            const photo = await camera.current.takePhoto({})
            setSelectedImage(photo.path)
            setIsEdit(true)
            //获得了图片进行用户编辑
        }
    }
    const upload = async (res: string) => {
        try {
            setSizeImage(res)
        } catch (error) {
            console.error('Error compressing image', error)
            setSelectedImage(selectedImage)
        }
    }
    useEffect(() => {
        if (isEdit) {
            PhotoEditor.Edit({
                path: selectedImage,
                onDone: (res) => {
                    upload(res).then()
                },
                onCancel: () => {},
            })
        }
    }, [isEdit, selectedImage])
    useEffect(() => {
        if (sizeImage) {
            getSearchImage(sizeImage).then()
            //判断是否有名字
            console.log(RecognizeFoodInfo)
            // FoodListByCategoryApi({ title: RecognizeFoodInfo[0].name }).then(
            //     (res) => {
            //         console.log(res)
            //         //@ts-ignore
            //         navigation.navigate('food-nutrients', {
            //             id: (res.data as FoodListByCategoryType).foods[0]?.id,
            //         })
            //     },
            // )
        }
    }, [sizeImage])

    return (
        <SafeAreaView style={{ height: Dimensions.get('screen').height }}>
            <StatusBar></StatusBar>
            <ScrollView>
                <Camera
                    ref={camera}
                    device={device}
                    style={{
                        height: Dimensions.get('screen').height / 1.5,
                    }}
                    isActive={true}
                    photo={true}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            position: 'absolute',
                            left: 0,
                        }}
                    >
                        <Icon name={'left'} type={'antdesign'} size={30}></Icon>
                    </TouchableOpacity>
                </Camera>
                <View
                    className="pl-[20] pr-[20] pt-[30] bg-white"
                    style={{
                        height: Dimensions.get('screen').height / 3.5,
                    }}
                >
                    <Text className="text-center" style={{ fontSize: 17 }}>
                        餐前拍一拍
                    </Text>
                    <View className="flex-row items-center mt-[30]">
                        <TouchableOpacity>
                            <MyImagePicker getImage={getSearchImage}>
                                {{
                                    content: (
                                        <Image
                                            source={require('../../../assets/images/picture.png')}
                                            style={{
                                                width: 40,
                                                height: 40,
                                            }}
                                        ></Image>
                                    ),
                                }}
                            </MyImagePicker>
                        </TouchableOpacity>

                        <View className="flex-1 ml-[90]">
                            <TouchableOpacity onPress={() => takePicture()}>
                                <Image
                                    source={require('../../../assets/images/takepicture.png')}
                                    style={{
                                        width: 60,
                                        height: 60,
                                    }}
                                ></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default memo(MyCamera)
