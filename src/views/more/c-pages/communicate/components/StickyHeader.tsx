import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
    Animated,
    FlatList,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import AutoText from '../../../../../components/auto-text'
import theme from '../../../../../styles/theme/color'

interface IProps {
    children?: any
    props: {
        stickyHeaderY: number
        stickyScrollY: any
    }
    titles: any
}
interface ItemProps {
    data: null
}

const StickyHeader: FC<IProps> = ({ props, titles, children }) => {
    const [stickyLayoutY, setStickyLayoutY] = useState(0)
    // 函数可以提出去
    const _onLayout = (event: any) => {
        setStickyLayoutY(event.nativeEvent.layout.y)
    }
    const getId = children.getId

    const { stickyHeaderY = -1, stickyScrollY = new Animated.Value(0) } = props
    const y = stickyHeaderY != -1 ? stickyHeaderY : stickyLayoutY
    const translateY = stickyScrollY.interpolate({
        inputRange: [-1, 0, y, y + 1],
        outputRange: [0, 0, 0, 1],
    })

    const Item = ({ item }: { item: { id: number; desc: string } }) => {
        return (
            <TouchableOpacity
                className="mr-[10]"
                onPress={() => {
                    setActiveIndex(Number(item.id))
                }}
            >
                <AutoText
                    style={[
                        {
                            paddingBottom: 2,
                        },
                        activeIndex === Number(item.id) ? styles.active : null,
                    ]}
                >
                    {item.desc}
                </AutoText>
                <View
                    style={
                        activeIndex === Number(item.id)
                            ? styles.indirector
                            : null
                    }
                ></View>
            </TouchableOpacity>
        )
    }
    //导航的样式
    const [activeIndex, setActiveIndex] = useState(0)
    useEffect(() => {
        getId(activeIndex)
    }, [activeIndex])
    return (
        <Animated.View
            onLayout={_onLayout}
            style={[
                {
                    paddingTop: 3,
                    zIndex: 1000,

                    backgroundColor: 'white',
                },
                {
                    transform: [{ translateY }],
                },
            ]}
        >
            <FlatList
                data={titles}
                renderItem={Item}
                scrollEnabled={false}
                invertStickyHeaders={true}
                keyExtractor={(item) => String(item.id)}
                horizontal={true}
            ></FlatList>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    active: {
        color: theme.colors.deep01Primary,
    },
    indirector: {
        borderRadius: 10,
        width: 20,
        height: 5,
        backgroundColor: theme.colors.deep01Primary,
    },
})

export default memo(StickyHeader)
