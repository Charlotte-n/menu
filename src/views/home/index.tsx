import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { View } from 'nativewind/dist/preflight'
import { Dimensions, Image, ScrollView, StatusBar } from 'react-native'
import HotRecommend from '../../components/hot-recommend'
import EchartBigPie from './components/echart-big-pie'
import EchartSmallPie from './components/echart-small-pie'
import FoodByTime from './components/food-by-time'
import { transformAdaption } from '../../utils/adaptation'
import { useAppDispatch, useAppSelector } from '../../store'
import { shallowEqual } from 'react-redux'
import { Drawer } from 'react-native-drawer-layout'
import {
    changeDailyIntake,
    changeDailyIntaked,
    changeOpenAction,
} from '../../store/slice/home'
import DrawerContent from './components/drawer-content'
import { Dialog } from '@rneui/themed'
import DialogContent from './components/dialog-content'
import { FoodListByCategoryApi } from '../../apis/food'
import {
    FoodListByCategoryType,
    SingleFoodListType,
} from '../../apis/types/food'
import { DailyIntakeApi } from '../../apis/home'
import { getDailyIntakeApi } from '../../apis/diet'
interface IProps {
    children?: ReactNode
}

const Home: FC<IProps> = () => {
    const dispatch = useAppDispatch()
    const { open, dailyIntake } = useAppSelector((state) => {
        return {
            open: state.HomeSlice.open,
            dailyIntake: state.HomeSlice.dailyIntake,
        }
    }, shallowEqual)
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    //弹窗显示
    const [dialogVisible, setDialogVisible] = useState(false)
    const toggleDialog = async () => {
        //判断信息
        if (userInfo.height && userInfo.weight && userInfo.habit) {
            //获取用户的每日摄入量，放入仓库存储
            DailyIntakeApi(userInfo.id).then((res) => {
                dispatch(changeDailyIntake(res.data))
            })
            setDialogVisible(false)
            return
        }
        setDialogVisible(true)
    }
    const cancel = () => {
        setDialogVisible(false)
    }

    useEffect(() => {
        toggleDialog()
    }, [])

    //获取每日推荐食谱
    const [RecipeFood, setRecipeFood] = useState([] as SingleFoodListType[])
    const getRecipeData = () => {
        FoodListByCategoryApi({ category_id: 9 }).then((res) => {
            setRecipeFood((res.data as FoodListByCategoryType).foods)
        })
    }
    useEffect(() => {
        getRecipeData()
    }, [])

    //静态资源
    const data = [
        {
            id: '0',
            icon: (
                <Image
                    source={require('../../../assets/icon/早餐.png')}
                    style={{
                        width: transformAdaption(30),
                        height: transformAdaption(30),
                        marginRight: transformAdaption(10),
                    }}
                ></Image>
            ),
            name: '早餐',
            recommend: '347~489',
        },
        {
            id: '1',
            icon: (
                <Image
                    source={require('../../../assets/icon/午餐.png')}
                    style={{
                        width: transformAdaption(30),
                        height: transformAdaption(30),
                        marginRight: transformAdaption(10),
                    }}
                ></Image>
            ),
            name: '午餐',
            recommend: '486~635',
        },
        {
            id: '2',
            icon: (
                <Image
                    source={require('../../../assets/icon/fruit.png')}
                    style={{
                        width: transformAdaption(30),
                        height: transformAdaption(30),
                        marginRight: transformAdaption(10),
                    }}
                ></Image>
            ),
            name: '晚餐',
            recommend: '347~489',
        },
    ]
    //获取摄入列表
    const GetDailyIntake = () => {
        getDailyIntakeApi(userInfo.id).then((res) => {
            const dailyIntaked = {
                fat: res.data.calories[2],
                calories: res.data.calories[4],
                carbohydrate: res.data.calories[1],
                protein: res.data.calories[0],
                cellulose: res.data.calories[3],
            }
            dispatch(changeDailyIntaked(dailyIntaked))
        })
    }
    useEffect(() => {
        GetDailyIntake()
    }, [dailyIntake])

    return (
        <Drawer
            open={open}
            onOpen={() => dispatch(changeOpenAction(true))}
            onClose={() => dispatch(changeOpenAction(false))}
            renderDrawerContent={() => {
                return <DrawerContent />
            }}
            layout={{
                width: 280,
                height: Dimensions.get('window').height,
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="bg-white pl-[10] pr-[10]"
                style={{
                    height: Dimensions.get('screen').height,
                }}
            >
                {/*echarts表*/}
                <View className="relative">
                    <EchartBigPie></EchartBigPie>
                    {/*各类营养素*/}
                    <EchartSmallPie></EchartSmallPie>
                </View>
                {/*早餐、午餐、晚餐*/}
                <View>
                    {data.map((item, index) => {
                        return (
                            <FoodByTime
                                key={item.id}
                                baseData={item}
                                image={item.icon}
                                type={index}
                            ></FoodByTime>
                        )
                    })}
                </View>
                {/*    热门推荐*/}
                <View className="mt-[20]">
                    <HotRecommend
                        title={'推荐菜品'}
                        data={RecipeFood}
                    ></HotRecommend>
                </View>
                {/*    初次登录的用户弹窗*/}
                <Dialog
                    isVisible={dialogVisible}
                    overlayStyle={{
                        marginTop: -100,
                    }}
                >
                    <Dialog.Title title={'个人信息'}></Dialog.Title>
                    {/*内容*/}
                    {dialogVisible ? (
                        <View>
                            <DialogContent>{{ cancel: cancel }}</DialogContent>
                        </View>
                    ) : null}
                </Dialog>
            </ScrollView>
        </Drawer>
    )
}

export default memo(Home)
