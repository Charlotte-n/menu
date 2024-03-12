import React, { useEffect, useRef, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'
import { useAppSelector } from '../../store'
import { shallowEqual } from 'react-redux'

const MyImagePicker = ({
    children,
    getImage,
}: {
    children: any
    getImage: any
}) => {
    const { content } = children
    const navigation = useNavigation()
    const { RecognizeFoodInfo } = useAppSelector((state) => {
        return {
            RecognizeFoodInfo: state.DietSlice.RecognizeFoodInfo,
        }
    }, shallowEqual)
    //获取相机权限
    useEffect(() => {
        ;(async () => {
            // 获取相册权限
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (status !== 'granted') {
                alert('对不起，我们需要相册权限才能继续！')
            }
        })()
    }, [])
    const [image, setImage] = useState('')
    const result = useRef<any>()
    //获取图片
    const pickImage = async () => {
        let res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        })
        result.current = res
        if (!result.current.canceled) {
            setImage((prevState: any) => {
                return result.current.assets[0].uri as string
            })
        }
    }
    useEffect(() => {
        if (image) {
            getImage(image)
        }
    }, [image])

    //获取到识别的食物
    useEffect(() => {
        if (RecognizeFoodInfo[0]?.name) {
            //@ts-ignore
            navigation.navigate('RecognizeFood')
        }
    }, [RecognizeFoodInfo])

    return (
        <View>
            <TouchableOpacity onPress={() => pickImage()}>
                {content}
            </TouchableOpacity>
        </View>
    )
}

export default MyImagePicker
