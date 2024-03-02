import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { View } from 'nativewind/dist/preflight'
import { Dimensions, Image, ScrollView } from 'react-native'
import HotRecommend from '../../components/hot-recommend'
import EchartBigPie from './components/echart-big-pie'
import EchartSmallPie from './components/echart-small-pie'
import FoodByTime from './components/food-by-time'
import { transformAdaption } from '../../utils/adaptation'
import { useAppDispatch, useAppSelector } from '../../store'
import { shallowEqual } from 'react-redux'
import { Drawer } from 'react-native-drawer-layout'
import { changeOpenAction } from '../../store/slice/home'
import DrawerContent from './components/drawer-content'
interface IProps {
    children?: ReactNode
}

const Home: FC<IProps> = () => {
    const dispatch = useAppDispatch()
    const { open } = useAppSelector((state) => {
        return {
            open: state.HomeSlice.open,
        }
    }, shallowEqual)
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
                            ></FoodByTime>
                        )
                    })}
                </View>
                {/*    热门推荐*/}
                <View className="mt-[20]">
                    <HotRecommend title={'推荐菜品'}></HotRecommend>
                </View>
            </ScrollView>
        </Drawer>
    )
}

export default memo(Home)
