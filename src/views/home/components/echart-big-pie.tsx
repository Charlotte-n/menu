import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, View } from 'nativewind/dist/preflight'
import Svg from 'react-native-svg'
import { VictoryPie } from 'victory-native'
import theme from '../../../styles/theme/color'

interface IProps {
    children?: ReactNode
}

const EchartBingPie: FC<IProps> = () => {
    const sampleData = [{ y: 1 }, { y: 3 }]

    return (
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
    )
}

export default memo(EchartBingPie)
