import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, View } from 'nativewind/dist/preflight'
import { Dimensions } from 'react-native'
import Svg from 'react-native-svg'
import { VictoryPie } from 'victory-native'
import theme from '../../../styles/theme/color'

interface IProps {
    children?: ReactNode
}

const EchartSmallPie: FC<IProps> = () => {
    const sampleData = [{ y: 1 }, { y: 3 }]

    return (
        <View className="flex-row">
            {[1, 2, 3, 4].map((item, index) => {
                return (
                    <View
                        className="relative mr-auto"
                        key={item}
                        style={{
                            width: Dimensions.get('screen').width / 4 - 10,
                        }}
                    >
                        <Svg
                            width={Dimensions.get('screen').width / 4 - 10}
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
                                width={Dimensions.get('screen').width / 4 - 10}
                                height={100}
                                innerRadius={25}
                                radius={30}
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
    )
}

export default memo(EchartSmallPie)
