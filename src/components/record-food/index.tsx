import React, { memo } from 'react'
import type { FC } from 'react'
import {
    Dimensions,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import { BottomSheet, Button, Card, Icon } from '@rneui/themed'
import theme from '../../styles/theme/color'
interface IProps {
    children: {
        cancel: () => void
    }
    isVisible: boolean
}

const RecordFood: FC<IProps> = ({ isVisible, children }) => {
    const { cancel } = children
    const pickerData = [
        {
            a: [1, 2, 3, 4],
        },
        {
            b: [5, 6, 7, 8],
        },
    ]
    const selectedValue = ['a', 2]
    // Picker.init({
    //     pickerData: pickerData,
    //     selectedValue: ['a', 2],
    //     onPickerConfirm: (data) => {
    //         console.log(data)
    //     },
    //     onPickerCancel: (data) => {
    //         console.log(data)
    //     },
    //     onPickerSelect: (data) => {
    //         console.log(data)
    //     },
    // })
    const show = () => {
        // Picker.show()
    }
    return (
        <BottomSheet isVisible={isVisible} containerStyle={{}}>
            <Card
                containerStyle={{
                    width: Dimensions.get('screen').width,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    margin: 0,
                    // paddingRight: 0,
                }}
            >
                {/*换成选择器*/}
                <View className="m-auto mb-[20] flex-row">
                    <TouchableOpacity
                        onPress={() => {
                            show()
                        }}
                    >
                        <Text className="flex-1 text-center">早餐</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            cancel()
                        }}
                    >
                        <Icon
                            type={'antdesign'}
                            name={'close'}
                            size={20}
                        ></Icon>
                    </TouchableOpacity>
                </View>
                {/*食物*/}
                <View className="m-auto items-center">
                    <Image
                        source={require('../../../assets/images/bg_welcome_header.png')}
                        style={{
                            borderRadius: 10,
                            width: 60,
                            height: 60,
                        }}
                    ></Image>
                    <Text
                        className="mt-[10] pt-[2] pb-[2] text-center"
                        style={{
                            backgroundColor: theme.colors.primary,
                            borderRadius: 10,
                            width: 100,
                        }}
                    >
                        鸡腿
                    </Text>
                </View>
                {/*营养成分*/}
                <View className="flex-row">
                    {[1, 2, 3, 4].map((item, index) => {
                        return (
                            <View
                                key={item}
                                style={{
                                    marginTop: 20,
                                    width: Dimensions.get('screen').width / 4.4,
                                }}
                                className="border-t border-b pt-[10] pb-[10] border-[#f4f4f4]"
                            >
                                <Text className="color-[#666]">热量(千卡)</Text>
                                <Text className="mt-[10] text-center">85</Text>
                            </View>
                        )
                    })}
                </View>
                {/*  数量*/}
                <View className="m-auto mt-[20]">
                    <TextInput
                        className="border-b pb-[2] pl-[10] pr-[10]"
                        style={{
                            fontSize: 22,
                            color: theme.colors.deep01Primary,
                            borderColor: theme.colors.deep01Primary,
                        }}
                    >
                        20.0
                    </TextInput>
                    <Text
                        className="mt-[5] text-center"
                        style={{
                            color: theme.colors.deep01Primary,
                            fontSize: 13,
                        }}
                    >
                        克
                    </Text>
                </View>
                {/*计算器组件*/}
                {/*<View></View>*/}
                <View className="m-auto mt-[20]">
                    <Button
                        onPress={() => {
                            cancel()
                        }}
                        title="保存"
                        containerStyle={{
                            width: Dimensions.get('screen').width / 4,
                            borderRadius: 20,
                        }}
                        buttonStyle={{
                            backgroundColor: theme.colors.deep01Primary,
                            paddingVertical: 5,
                        }}
                    ></Button>
                </View>
            </Card>
        </BottomSheet>
    )
}

export default memo(RecordFood)
