import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, View } from 'nativewind/dist/preflight'
import { Dimensions } from 'react-native'
import Svg from 'react-native-svg'
import { VictoryPie } from 'victory-native'
import theme from '../../../styles/theme/color'
import AutoText from '../../../components/auto-text'

interface IProps {
    children?: ReactNode
}

const EchartSmallPie: FC<IProps> = () => {
    const sampleData = [{ y: 100 }]
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
                            style={{}}
                            height={90}
                            className="m-auto"
                        >
                            <View className="absolute bottom-[30]">
                                <Text
                                    style={{
                                        fontSize: 18,
                                        margin: 'auto',
                                        textAlign: 'center',
                                        left: 25,
                                        width: 30,
                                    }}
                                >
                                    0
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 9,
                                        textAlign: 'center',
                                        left: 25,
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
