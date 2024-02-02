import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Text } from 'react-native'
import { ScrollView } from 'nativewind/dist/preflight'

interface IProps {
    children?: ReactNode
}

const UserAgree: FC<IProps> = () => {
    return (
        <ScrollView className="bg-white pl-[10] pr-[10] pt-[10]">
            <Text className="indent-2" style={{ lineHeight: 23 }}>
                {'\t\t'}
                请认真阅读本用户注册及使用APP隐私协议（以下简称“本协议”），确保您充分理解本协议中各条款。请您审慎阅读并选择接受或不接受本协议。
            </Text>
            <Text style={{ lineHeight: 23 }}>
                {'\t\t'}
                本协议约定北京奇境天成网络技术有限公司（以下简称本公司）与用户之间关于神奇AR（以下简称本APP）软件（目前仅在IOS系统开放注册及使用
                ）服务（以下简称“服务”）的权利义务。“用户”是指注册、登录、使用本APP服务的个人或相关使用者。本协议可由本APP软件系统运行后台及本公司随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知，用户可在本APP中查阅最新版协议条款，也提请用户随时关注本APP用户协议的更新情况，以免造成不必要的误解和纠纷。在修改协议条款后，如果用户不接受修改后的条款，请立即停止使用本APP提供的服务，用户继续使用本APP提供的服务将被视为接受修改后的协议。
            </Text>
            <Text style={{ lineHeight: 23 }}>
                {'\t\t'}
                我们这款APP,主要是提供一些健康食谱，通过这些食谱，让更多大学生或者更多想要控制饮食，减肥的用户来进行使用
            </Text>
        </ScrollView>
    )
}

export default memo(UserAgree)
