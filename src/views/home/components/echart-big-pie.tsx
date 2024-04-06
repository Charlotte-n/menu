import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, View } from 'nativewind/dist/preflight'
import Svg from 'react-native-svg'
import { VictoryPie } from 'victory-native'
import theme from '../../../styles/theme/color'
import { ResponseDailyIntake } from '../../../apis/types/home'
import { useAppSelector } from '../../../store'
import { shallowEqual } from 'react-redux'

interface IProps {
    children?: ReactNode
}

const EchartBingPie: FC<IProps> = () => {
    const { dailyIntake, dailyIntaked } = useAppSelector((state) => {
        return {
            dailyIntake: state.HomeSlice.dailyIntake,
            dailyIntaked: state.HomeSlice.dailyIntaked,
        }
    }, shallowEqual)
    const sampleData = [
        {
            y:
                100 -
                    Math.floor(
                        (dailyIntaked?.calories / dailyIntake?.calories) * 100,
                    ) || 100,
        },
        {
            m: 0,
            y:
                Math.floor(
                    (dailyIntaked?.calories / dailyIntake?.calories) * 100,
                ) || 0,
        },
    ]
    useEffect(() => {
        console.log(dailyIntake)
    }, [])
    return (
        <View className="m-auto">
            <Svg width={180} height={180}>
                {/*摄入总量*/}
                <View className="absolute top-[58] left-[53] m-auto">
                    {((dailyIntake?.calories - dailyIntaked?.calories)?.toFixed(
                        0,
                    ) as unknown as number) >= 0 ? (
                        <View>
                            <Text
                                style={{
                                    fontSize: 12,
                                    textAlign: 'center',
                                }}
                            >
                                今日需要摄入
                            </Text>
                            <Text
                                style={{
                                    fontSize: 30,
                                    textAlign: 'center',
                                }}
                            >
                                {(
                                    dailyIntake?.calories -
                                    dailyIntaked?.calories
                                )?.toFixed(0)}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    textAlign: 'center',
                                }}
                            >
                                千卡
                            </Text>
                        </View>
                    ) : !(isNaN(
                          dailyIntake?.calories - dailyIntaked?.calories,
                      ) as unknown as number) ? (
                        <View>
                            <Text
                                style={{
                                    fontSize: 12,
                                    textAlign: 'center',
                                }}
                            >
                                摄入超过了
                            </Text>
                            <Text
                                style={{
                                    fontSize: 30,
                                    textAlign: 'center',
                                }}
                            >
                                {(
                                    (dailyIntake?.calories -
                                        dailyIntaked?.calories) *
                                    -1
                                ).toFixed(0)}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    textAlign: 'center',
                                }}
                            >
                                千卡
                            </Text>
                        </View>
                    ) : (
                        <View>
                            <Text
                                style={{
                                    fontSize: 12,
                                    textAlign: 'center',
                                }}
                            >
                                今日需要摄入
                            </Text>
                            <Text
                                style={{
                                    fontSize: 30,
                                    textAlign: 'center',
                                }}
                            >
                                {dailyIntake?.calories?.toFixed(0)}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    textAlign: 'center',
                                }}
                            >
                                千卡
                            </Text>
                        </View>
                    )}
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
                                datum.m === 0
                                    ? theme.colors.deep01Primary
                                    : '#f2f2f2',
                        },
                    }}
                ></VictoryPie>
            </Svg>
        </View>
    )
}

export default memo(EchartBingPie)
