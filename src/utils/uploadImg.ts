import { getUserInfo, uploadAvatar } from '../apis/mine'
import { changeUserInfoAction } from '../store/slice/login-register-slice'
import store from '../store'
import { recognizeFood } from '../apis/diet'
import { changeRecognizeFoodInfoAction } from '../store/slice/diet'
import { FlipType, manipulateAsync, SaveFormat } from 'expo-image-manipulator'
import { Alert } from 'react-native'
import { uploadCommunicateImagApi } from '../apis/communicate'
const getImage = async (value: string) => {
    const { id } = store.getState().LoginRegisterSlice.userInfo
    const uploadImage = async () => {
        const formData: any = new FormData()
        formData.append('avatar', {
            uri: value,
            name: 'avatar.jpeg',
            type: 'image/jpeg',
        })
        //上传图片,更新个人信息
        await uploadAvatar(formData, id)
        const res = await getUserInfo(id)
        store.dispatch(changeUserInfoAction(res.data.user))
    }
    await uploadImage()
}
export const getSearchImage = async (value: string) => {
    const uploadImage = async () => {
        //进行一下压缩
        const manipResult = await manipulateAsync(
            value,
            [
                { rotate: 90 },
                { flip: FlipType.Vertical },
                { resize: { width: 1000 } },
            ],
            { compress: 1, format: SaveFormat.JPEG },
        )
        const formData: any = new FormData()
        formData.append('image', {
            uri: manipResult.uri,
            name: 'avatar.jpeg',
            type: 'image/jpeg',
        })
        //上传到
        const res = await recognizeFood(formData)
        //将食材信息放到仓库
        store.dispatch(changeRecognizeFoodInfoAction(res.data.result))
    }
    await uploadImage()
}

//多图片上传
export const uploadMultipleImages = async (
    selectedImages: string[],
    id: number,
) => {
    console.log(selectedImages)
    try {
        const formData: any = new FormData()
        const uploadImage = async () => {
            selectedImages.forEach((value) => {
                formData.append('images', {
                    uri: value,
                    name: 'image.jpeg',
                    type: 'image/jpeg',
                })
            })
        }
        //多图片上传
        await uploadImage()
        await uploadCommunicateImagApi(id as number, formData)
    } catch (error) {
        console.error('Upload error:', error)
        Alert.alert('Error', 'Failed to upload images')
    }
}
export default getImage
