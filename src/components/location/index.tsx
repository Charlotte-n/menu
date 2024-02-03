import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import Geolocation from 'react-native-geolocation-service'
import { PermissionsAndroid, Text, View } from 'react-native'
import { address } from '../../apis/diet'
// 初始化 API key（必须在使用任何其他功能之前进行初始化）
interface IProps {
    children?: ReactNode
}

const MyLocation: FC<IProps> = () => {
    const [position, setPosition] = useState('')
    const getPosition = () => {
        // 获取当前位置
        Geolocation.getCurrentPosition(
            async (position) => {
                console.log('Current Position: ', position.coords)
                // 通过经纬度获取地址（逆地理编码）
                const param = {
                    location: `${position.coords.latitude},${position.coords.longitude}`,
                    ak: 'Kv4hNCt8Zjm79Fu7U7o6xV9ExjSt4JJz',
                }
                const res = await address(param)
                console.log(res)
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
