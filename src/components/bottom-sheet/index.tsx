import React, { memo, useEffect, useState } from 'react'
import type { FC } from 'react'
import { View, TextInput, Text } from 'react-native'
import { BottomSheet, Card, Button, Icon } from '@rneui/themed'
import theme from '../../styles/theme/color'
import { getUserInfo, updateUserName } from '../../apis/mine'
import { useAppDispatch, useAppSelector } from '../../store'
import { changeUserInfoAction } from '../../store/slice/login-register-slice'
import { shallowEqual } from 'react-redux'

interface IProps {
    children?: any
    id: string
    isVisible: boolean
    contentValue: string
}

const MyBottomSheet: FC<IProps> = ({
    children,
    id,
    isVisible,
    contentValue,
}) => {
    const { content, cancel, placeholderContent } = children
    const [value, setValue] = useState('')
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    const dispatch = useAppDispatch()
    const userId = userInfo.id
    //拿着这个值来进行请求数据来反映数据
    const updateUsername = () => {
        updateUserName({ username: value, id: userInfo.id })
            .then(async (res) => {
                if (res.code === 1) {
                    try {
                        const res = await getUserInfo(userId)
                        if (res.code === 1) {
                            //重新获取用户信息
                            dispatch(changeUserInfoAction(res.data.user))
                            cancel()
                        }
                    } catch (e) {
                        console.log(e)
                    }
                }
            })
            .catch((error: any) => {
                console.log('出错了', error)
            })
    }
    useEffect(() => {
        setValue(contentValue)
    }, [contentValue])
    return (
        <View>
            <BottomSheet isVisible={isVisible}>
                <Card
                    containerStyle={{
                        marginHorizontal: 0,
                    }}
                >
                    <View className="flex-row justify-between pb-[10]">
                        <Text style={{ fontSize: 16 }}>{content}</Text>
                        <Icon
                            name={'close'}
                            type={'antdesign'}
                            size={20}
                            onPress={() => cancel()}
                        ></Icon>
                    </View>
                    <Card.Divider></Card.Divider>
                    <TextInput
                        className="border-[1] p-2"
                        placeholder={placeholderContent}
                        value={value}
                        style={{
                            borderWidth: 1,
                            borderColor: '#BFBFBF',
                        }}
                        onChangeText={(value: string) => setValue(value)}
                    ></TextInput>
                </Card>
                <Button
                    onPress={() => {
                        if (id === '0') {
                            updateUsername()
                        }
                    }}
                    title={'确定'}
                    color={theme.colors.deep01Primary}
                ></Button>
            </BottomSheet>
        </View>
    )
}

export default memo(MyBottomSheet)
