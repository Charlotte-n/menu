import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Dimensions, TextInput, TouchableOpacity, View } from 'react-native'
import { Icon } from '@rneui/themed'
import theme from '../../../styles/theme/color'
import { useNavigation } from '@react-navigation/native'


interface IProps {
    children?: ReactNode
    type: string
}

const SearchFilter: FC<IProps> = ({ type }) => {
    const [search, setSearch] = useState('')
    const navigation = useNavigation()
    const clearAll = () => {
        setSearch('')
    }
    //获取到图片
    const gotoCamera = () => {
        //@ts-ignore
        navigation.navigate('camera')
    }

    return (
        <View
            style={{
                backgroundColor: '#fff',
                borderColor: '#E1E1E1',
                borderStyle: 'solid',
                borderWidth: 1,
            }}
            className="flex-row items-center pl-[13] pr-[13] pt-[10] pb-[10]  rounded-[10px]"
        >
            <TouchableOpacity
                onPress={() => {
                    console.log('123')
                }}
            >
                <Icon
                    name={'search'}
                    type={'fontAwesome'}
                    color={theme.colors.deep01Primary}
                    style={{
                        marginRight: 10,
                    }}
                ></Icon>
            </TouchableOpacity>
            <TextInput
                placeholder={'搜索相关菜品食物的热量'}
                style={{
                    width: (Dimensions.get('screen').width - 40) / 1.4,
                }}
                onChangeText={(value) => setSearch(value)}
                value={search}
                onFocus={() => {
                    console.log('相关菜品', type)
                    if (type === 'home') {
                        //@ts-ignore
                        navigation.navigate('search')
                    }
                }}
            ></TextInput>
            {search && (
                <TouchableOpacity onPress={() => clearAll()}>
                    <Icon
                        name={'close'}
                        type={'FontAwesome'}
                        color={theme.colors.deep01Primary}
                        size={20}
                    ></Icon>
                </TouchableOpacity>
            )}
            {type === 'search' && search === '' ? (
                <TouchableOpacity
                    onPress={() => {
                        gotoCamera()
                    }}
                >
                    <Icon
                        name={'camera'}
                        type={'entypo'}
                        color={theme.colors.deep01Primary}
                        size={20}
                    ></Icon>
                </TouchableOpacity>
            ) : null}
        </View>
    )
}

export default memo(SearchFilter)
