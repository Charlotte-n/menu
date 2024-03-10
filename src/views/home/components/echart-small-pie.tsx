import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, View } from 'nativewind/dist/preflight'
import { Dimensions } from 'react-native'
import Svg from 'react-native-svg'
import { VictoryPie } from 'victory-native'
import theme from '../../../styles/theme/color'
import AutoText from '../../../components/auto-text'
import { useAppSelector } from '../../../store'
import { shallowEqual } from 'react-redux'

interface IProps {
    children?: ReactNode
}

const EchartSmallPie: FC<IProps> = () => {
    const { dailyIntake, dailyIntaked } = useAppSelector((state) => {
        return {
            dailyIntake: state.HomeSlice.dailyIntake,
            dailyIntaked: state.HomeSlice.dailyIntaked,
        }
    }, shallowEqual)
    const sampleData = [
        [
            {
                y:
                    100 -
                        Math.floor(
                            (dailyIntaked?.carbohydrate /
                                dailyIntake?.carbohydrate) *
                                100,
                        ) || 100,
            },
            {
                m: 0,
                y:
                    Math.floor(
                        (dailyIntaked?.carbohydrate /
                            dailyIntake?.carbohydrate) *
                            100,
                    ) || 0,
            },
        ],
        [
            {
                y:
                    100 -
                        Math.floor(
                            (dailyIntaked?.protein / dailyIntake?.protein) *
                                100,
                        ) || 100,
            },
            {
                m: 1,
                y:
                    Math.floor(
                        (dailyIntaked?.protein / dailyIntake?.protein) * 100,
                    ) || 0,
            },
        ],
        [
            {
                y:
                    100 -
                        Math.floor(
                            (dailyIntaked?.fat / dailyIntake?.fat) * 100,
                        ) || 100,
            },
            {
                m: 2,
                y:
                    Math.floor((dailyIntaked?.fat / dailyIntake?.fat) * 100) ||
                    0,
            },
        ],
        [
            {
                y:
                    100 -
                        Math.floor(
                            (dailyIntaked?.cellulose / dailyIntake?.cellulose) *
                                100,
                        ) || 100,
            },
            {
                m: 3,
                y:
                    Math.floor(
                        (dailyIntaked?.cellulose / dailyIntake?.cellulose) *
                            100,
                    ) | 0,
            },
        ],
    ]
    //以后这是一个动态的数据
    const data = [
        {
            key: '0',
            name: '碳水化合物',
        },
        {
            key: '1',
            name: '蛋白质',
        },
        {
            key: '2',
            name: '脂肪',
        },
        {
            key: '3',
            name: '纤维素',
        },
    ]
    const yuansu = ['carbohydrate', 'protein', 'fat', 'cellulose']
    return (
        <View className="flex-row">
            {data.map((item, index) => {
                return (
                    <View
                        className="relative mr-auto"
                        key={item.key}
                        style={{
                            width: Dimensions.get('screen').width / 4 - 10,
                        }}
                    >
                        <Svg
                            width={Dimensions.get('screen').width / 4 - 10}
                            height={90}
                            className="m-auto"
                        >
                            <View className="absolute bottom-[30]">
                                <AutoText
                                    fontSize={4.5}
                                    style={{
                                        fontSize: 18,
                                        textAlign: 'center',
                                        left: 28,
                                        width: 30,
                                        top: -5,
                                    }}
                                >
                                    {(dailyIntaked as any)[
                                        yuansu[index]
                                    ]?.toFixed(0) || 0}
                                </AutoText>
                                <Text
                                    style={{
                                        fontSize: 9,
                                        textAlign: 'center',
                                        left: 28,
                                    }}
                                >
                                    千卡
                                </Text>
                            </View>
                            <VictoryPie
                                width={Dimensions.get('screen').width / 4 - 10}
                                height={100}
                                innerRadius={25}
                                radius={30}
                                data={sampleData[index]}
                                labels={() => null}
                                style={{
                                    data: {
                                        fill: ({ datum }) =>
                                            datum.m === index
                                                ? theme.colors.deep01Primary
                                                : '#f2f2f2',
                                    },
                                }}
                            ></VictoryPie>
                        </Svg>
                        <View>
                            <AutoText
                                fontSize={4.5}
                                style={{
                                    fontSize: 12,
                                    textAlign: 'center',
                                }}
                            >
                                {item.name}
                            </AutoText>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

export default memo(EchartSmallPie)
