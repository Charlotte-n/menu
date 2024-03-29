import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { TouchableOpacity } from 'react-native'
import Share from 'react-native-share'
import { useAppSelector } from '../../store'
import { shallowEqual } from 'react-redux'
interface IProps {
    children?: any
}

const MyShare: FC<IProps> = ({ children }) => {
    const { url } = useAppSelector((state) => {
        return {
            url: state.DietSlice.url,
        }
    }, shallowEqual)
    const { content } = children
    const share = () => {
        Share.open({
            url: `data:image/png;base64,${url}`,
            title: '口水鸡的做法',
            showAppsToView: true,
            message: '口水鸡的做法',
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                err && console.log(err)
            })
    }

    return (
        <TouchableOpacity
            onPress={() => {
                share()
            }}
        >
            {content}
        </TouchableOpacity>
    )
}

export default memo(MyShare)
