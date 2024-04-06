import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import AutoText from '../../../../../../components/auto-text'

interface IProps {
    children?: ReactNode
}

const MemberManage: FC<IProps> = () => {
    //获取成员的列表
    return (
        <ScrollView>
            <AutoText>成员管理页面</AutoText>
        </ScrollView>
    )
}

export default memo(MemberManage)
