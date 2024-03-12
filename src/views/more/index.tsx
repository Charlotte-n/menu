import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Dimensions, Image, TouchableOpacity, View } from 'react-native'
import { BottomSheet, Card, Icon } from '@rneui/themed'
import AutoText from '../../components/auto-text'
import theme from '../../styles/theme/color'
import { useNavigation } from '@react-navigation/native'

interface IProps {
    children?: any
    isVisible: boolean
}

const More: FC<IProps> = ({ isVisible, children }) => {
    const cancel = children.disShow
    const navigation = useNavigation()
    const gotoAI = () => {
        cancel()
        //@ts-ignore
        navigation.navigate('ai')
    }
    return (
        <View>
            <BottomSheet isVisible={isVisible}>
                <Card
                    containerStyle={{
                        width: Dimensions.get('screen').width,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        margin: 0,
                    }}
                >
                    {/*标题*/}
                    <View className="flex-row justify-center items-center">
                        <AutoText
                            fontSize={5.2}
                            style={{
                                flex: 1,
                            }}
                        >
                            更多功能
                        </AutoText>
                        <TouchableOpacity onPress={() => cancel()}>
                            <Icon type="antdesign" name="close"></Icon>
                        </TouchableOpacity>
                    </View>
                    {/*    内容*/}
                    <View className="mt-[20]">
                        <TouchableOpacity
                            className="w-[70] h-[70] items-center justify-center"
                            style={{
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: theme.colors.deep01Primary,
                                marginBottom: 10,
                            }}
                            onPress={() => gotoAI()}
                        >
                            <Image
                                style={{
                                    width: 38,
                                    height: 38,
                                    marginBottom: 5,
                                }}
                                source={require('../../../assets/images/robot.png')}
                            ></Image>
                            <AutoText fontSize={4}>AI小助手</AutoText>
                        </TouchableOpacity>
                    </View>
                </Card>
            </BottomSheet>
        </View>
    )
}

export default memo(More)
