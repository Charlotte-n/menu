import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'nativewind/dist/preflight'
import IntakeItem from './components/intake-item'
import Total from './components/total'
import AutoText from '../../../components/auto-text'
import { useAppSelector } from '../../../store'
import { getDailyIntakeApi } from '../../../apis/diet'
import { shallowEqual } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

interface IProps {
    children?: ReactNode
}

const Intake: FC<IProps> = () => {
    const navigation = useNavigation()
    const { userInfo, dailyIntake } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
            dailyIntake: state.HomeSlice.dailyIntake,
        }
    }, shallowEqual)
    //获取今日摄入的列表
    const [IntakeFoodList, setIntakeFoodList] = useState<any>()
    const [total, setTotal] = useState<number[]>([] as number[])
    const time = ['早餐', '午餐', '晚餐']
    const GetDailyIntake = () => {
        getDailyIntakeApi(userInfo.id).then((res) => {
            let result = [res.data.breakfast, res.data.lunch, res.data.dinner]
            setIntakeFoodList(result)
            setTotal(res.data.calories)
        })
    }
    useEffect(() => {
        GetDailyIntake()
    }, [])

    return (
        <ScrollView className="bg-[#FFFFFF] pl-[20] pr-[20]">
            <View
                style={{
                    height: Dimensions.get('screen').height - 150,
                    justifyContent: 'flex-end',
                }}
            >
                <AutoText
                    fontSize={7}
                    style={{
                        marginBottom: 8,
                    }}
                >
                    今日摄入
                </AutoText>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className="felx-1"
                >
                    {IntakeFoodList
                        ? IntakeFoodList.map((list: any, index: number) => {
                              return (
                                  <View key={index}>
                                      {list ? (
                                          <AutoText
                                              fontSize={7}
                                              style={{
                                                  marginBottom: 10,
                                              }}
                                          >
                                              {time[index]}
                                          </AutoText>
                                      ) : null}
                                      {list
                                          ? list.map(
                                                (item: any, index: number) => {
                                                    return (
                                                        <TouchableOpacity
                                                            key={index}
                                                            className="mb-[10]"
                                                            onPress={() => {
                                                                navigation.navigate(
                                                                    //@ts-ignore
                                                                    'food-nutrients',
                                                                    {
                                                                        id: item.id as number,
                                                                    },
                                                                )
                                                            }}
                                                        >
                                                            <IntakeItem
                                                                data={item}
                                                            ></IntakeItem>
                                                        </TouchableOpacity>
                                                    )
                                                },
                                            )
                                          : null}
                                  </View>
                              )
                          })
                        : null}

                    <View style={{ alignItems: 'flex-end', marginBottom: 10 }}>
                        {((dailyIntake.calories - total[4])?.toFixed(
                            0,
                        ) as unknown as number) >= 0 ? (
                            <AutoText>
                                今日还可摄入
                                {(dailyIntake.calories - total[4])?.toFixed(0)}
                                千卡
                            </AutoText>
                        ) : (
                            <AutoText>
                                今日摄入已经超过
                                {(
                                    (dailyIntake.calories - total[4]) *
                                    -1
                                )?.toFixed(0)}
                                千卡
                            </AutoText>
                        )}
                    </View>
                </ScrollView>
                <View
                    style={{
                        paddingTop: 10,
                        justifyContent: 'flex-end',
                    }}
                >
                    <Total data={total}></Total>
                </View>
            </View>
        </ScrollView>
    )
}

export default memo(Intake)
