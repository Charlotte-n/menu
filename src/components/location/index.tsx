import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import Geolocation from 'react-native-geolocation-service'
import { PermissionsAndroid, Text, View } from 'react-native'
import Geocoder from 'react-native-geocoding'
// 初始化 API key（必须在使用任何其他功能之前进行初始化）
interface IProps {
    children?: ReactNode
}

const MyLocation: FC<IProps> = () => {
    Geocoder.init('AIzaSyCDiI8RsFKdM9H7eFN9HTWk3ntVcHIDHI0')
    const [position, setPosition] = useState('')
    const getPosition = () => {
        // 获取当前位置
        Geolocation.getCurrentPosition(
            (position) => {
                console.log('Current Position: ', position)
                // 通过经纬度获取地址（逆地理编码）
                Geocoder.from(
                    position.coords.latitude,
                    position.coords.longitude,
                )
                    .then((json) => {
                        const addressComponent =
                            json.results[0].address_components[0]
                        console.log(addressComponent)
                    })
                    .catch((error) => console.warn(error))
            },
            (error) => {
                console.error('Error getting location: ', error)
                getPosition()
            },
        )
    }
    const requestLocationPermission = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: '获取地理位置',
                message: '应用需要获取您的地理位置',
                buttonPositive: '确定',
                buttonNegative: '取消',
            },
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission granted')
            // 这里可以调用获取位置的代码
            getPosition()
        } else {
            console.log('Location permission denied')
        }
    }
    useEffect(() => {
        requestLocationPermission().then()
    }, [])
    return (
        <View>
            <Text>123</Text>
        </View>
    )
}

export default memo(MyLocation)
