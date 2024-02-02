import { Dimensions, Image } from 'react-native'

export const searchFoodCategory = [
    {
        name: '口水鸡',
    },
    {
        name: '酸辣鱼',
    },
    {
        name: '水煮肉片',
    },
    {
        name: '豆腐脑',
    },
    {
        name: '鸡胸肉',
    },
    {
        name: '沙丁鱼',
    },
    {
        name: '炸鸡',
    },
    {
        name: '蔬菜沙拉',
    },
    {
        name: '豆沙包',
    },
    {
        name: '糖豆包',
    },
    {
        name: '意大利面',
    },
]

export const FoodCategory = [
    {
        id: 0,
        icon: (
            <Image
                source={require('../../assets/icon/主食.png')}
                style={{
                    width: Dimensions.get('screen').width / 5 - 40,
                    height: 30,
                }}
            />
        ),
        name: '主食',
    },
    {
        id: 1,
        icon: (
            <Image
                source={require('../../assets/icon/肉类.png')}
                style={{
                    width: Dimensions.get('screen').width / 5 - 40,
                    height: 30,
                }}
            />
        ),
        name: '肉类',
    },
    {
        id: 2,
        icon: (
            <Image
                source={require('../../assets/icon/饮料.png')}
                style={{
                    width: Dimensions.get('screen').width / 5 - 40,
                    height: 30,
                }}
            />
        ),
        name: '饮料',
    },
    {
        id: 3,
        icon: (
            <Image
                source={require('../../assets/icon/猕猴桃.png')}
                style={{
                    width: Dimensions.get('screen').width / 5 - 40,
                    height: 30,
                }}
            />
        ),
        name: '水果',
    },
    {
        id: 4,
        icon: (
            <Image
                source={require('../../assets/icon/guwu.png')}
                style={{
                    width: Dimensions.get('screen').width / 5 - 40,
                    height: 30,
                }}
            />
        ),
        name: '其他',
    },
]
