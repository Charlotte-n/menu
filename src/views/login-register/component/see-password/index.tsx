import React, { memo, useEffect,  useState } from 'react'
import type { FC, ReactNode } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Icon } from '@rneui/themed'
import theme from '../../../../styles/theme/color'

interface IProps {
    children?: ReactNode
    getIsSee: (value: boolean) => void
}

const SeePassWord: FC<IProps> = ({ getIsSee }) => {
    const [isSeePassWord, setIsSeePassWord] = useState<boolean>(false)
    const close = () => {
        setIsSeePassWord(!isSeePassWord)
    }
    const open = () => {
        setIsSeePassWord(!isSeePassWord)
    }
    useEffect(() => {
        getIsSee(isSeePassWord)
    }, [isSeePassWord])
    const See = () => {
        return (
            <TouchableOpacity onPress={() => close()}>
                <Icon
                    name={'eye'}
                    type={'feather'}
                    color={theme.colors.deep01Primary}
                ></Icon>
            </TouchableOpacity>
        )
    }
    const Off = () => {
        return (
            <TouchableOpacity onPress={() => open()}>
                <Icon
                    name={'eye-off'}
                    type={'feather'}
                    color={theme.colors.deep01Primary}
                ></Icon>
            </TouchableOpacity>
        )
    }
    return <View>{isSeePassWord ? <See /> : <Off />}</View>
}

export default memo(SeePassWord)
