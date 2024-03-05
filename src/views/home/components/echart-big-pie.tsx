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
    const { dailyIntake } = useAppSelector((state) => {
        return {
            dailyIntake: state.HomeSlice.dailyIntake,
        }
    }, shallowEqual)
    //TODO:单位转化
    const sampleData = [{ y: 100 }, { y: 100 }]
    useEffect(() => {}, [])
    return (
        <View className="m-auto">
            <Svg width={180} height={180}>
                <View className="absolute top-[58] left-[53] m-auto">
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
    )
}

export default memo(EchartBingPie)
