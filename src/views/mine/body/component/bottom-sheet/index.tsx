import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, View } from 'react-native'
import { BottomSheet, Card, Icon } from '@rneui/themed'

interface IProps {
    children?: any
    isVisible: boolean
}

const BodyBottomSheet: FC<IProps> = ({ children, isVisible }) => {
    const { content } = children
    return (
        <BottomSheet isVisible={true}>
            <Card>
                {/*标题*/}
                <View>
                    <Text>性别</Text>
                    <Icon type={'antdesign'} name={'close'} size={20}></Icon>
                </View>
                {/*选择器或者其他内容*/}
                {content}
            </Card>
        </BottomSheet>
    )
}

export default memo(BodyBottomSheet)
