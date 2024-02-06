import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, View } from 'nativewind/dist/preflight'
import { Circle, VictoryPie } from 'victory-native'
import Svg from 'react-native-svg'
import theme from '../../styles/theme/color'
import { Dimensions } from 'react-native'
import HotRecommend from '../../components/hot-recommend'

interface IProps {
    children?: ReactNode
}

const Home: FC<IProps> = () => {
    const sampleData = [{ y: 1 }, { y: 3 }]
    return (
        <View
            className="bg-white pl-[10] pr-[10]"
            style={{
                height: Dimensions.get('screen').height,
            }}
        >
            {/*echarts表*/}
            <View className="relative">
                <View className="m-auto">
                    <Svg width={180} height={180}>
                        <View className="absolute top-[58] left-[60] m-auto">
                            <Text
                                style={{
                                    fontSize: 10,
                                    textAlign: 'center',
                                }}
                            >
                                今日已摄入
                            </Text>
                            <Text
                                style={{
                                    fontSize: 38,
                                }}
                            >
                                448
                            </Text>
                            <Text
                                style={{
                                    fontSize: 10,
                                    textAlign: 'center',
                                }}
                            >
                                千卡
                            </Text>
                        </View>
                        <VictoryPie
                            standalone={false}
                            width={180}
                            height={180}
                            innerRadius={65}
                            radius={80}
                            data={sampleData}
                            labels={() => null}
                            style={{
                                data: {
                                    fill: ({ datum }) =>
                                        datum.y === 3
                                            ? theme.colors.deep01Primary
                                            : '#f2f2f2',
                                },
                            }}
                        ></VictoryPie>
                    </Svg>
                </View>
                {/*各类营养素*/}
                <View className="flex-row">
                    {[1, 2, 3, 4].map((item, index) => {
                        return (
                            <View
                                className="relative mr-auto"
                                key={item}
                                style={{
                                    width:
                                        Dimensions.get('screen').width / 4 - 10,
                                }}
                            >
                                <Svg
                                    width={
                                        Dimensions.get('screen').width / 4 - 10
                                    }
                                    style={{}}
                                    className="m-auto"
                                    height={90}
                                >
                                    <View className="absolute bottom-[30] left-[26] m-auto">
                                        <Text
                                            style={{
                                                fontSize: 18,
                                            }}
                                        >
                                            448
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 9,
                                                textAlign: 'center',
                                            }}
                                        >
                                            千卡
                                        </Text>
                                    </View>
                                    <VictoryPie
                                        width={
                                            Dimensions.get('screen').width / 4 -
                                            10
                                        }
                                        height={100}
                                        innerRadius={25}
                                        radius={30}
                                        data={sampleData}
                                        labels={() => null}
                                        style={{
                                            data: {
                                                fill: ({ datum }) =>
                                                    datum.y === 3
                                                        ? theme.colors
                                                              .deep01Primary
                                                        : '#f2f2f2',
                                            },
                                        }}
                                    ></VictoryPie>
                                </Svg>
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            textAlign: 'center',
                                        }}
                                    >
                                        碳水化合物
                                    </Text>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>
            {/*    热门推荐*/}
            <View className="mt-[20]">
                <HotRecommend></HotRecommend>
            </View>
        </View>
    )
}

export default memo(Home)
