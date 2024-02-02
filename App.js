import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import TabBar from './src/route/tab-bar'
import LoginRegisterHomeScreen from './src/route/login'
import { Icon } from '@rneui/themed'
import { MineOtherScreen } from './src/data/app-path'
import { Provider } from 'react-redux'
import store, { persistor } from './src/store'
import { PersistGate } from 'redux-persist/es/integration/react'
import UserAgree from './src/views/mine/profile/c-pages/user-agree'
import Search from './src/views/diet/search'
import MyCamera from './src/components/camera'
import FoodDetail from './src/views/diet/c-pages/food-detail'
import theme from './src/styles/theme/color'
import { Image, TouchableOpacity } from 'react-native'
export default function App() {
    const Stack = createStackNavigator()
    useEffect(() => {}, [])
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName={'LoginRegisterHomeScreen'}
                    >
                        <Stack.Screen
                            name={'LoginRegisterHomeScreen'}
                            component={LoginRegisterHomeScreen}
                            options={{
                                headerShown: false,
                            }}
                        ></Stack.Screen>
                        <Stack.Screen
                            name={'tabs'}
                            component={TabBar}
                            options={{
                                headerShown: false, // 隐藏StackNavigator的导航栏
                            }}
                        ></Stack.Screen>
                        {/*个人中心页面:一个页面中跳转到其他的详情页面*/}
                        {MineOtherScreen.map((item) => {
                            return (
                                <Stack.Screen
                                    key={item.name}
                                    name={item.name}
                                    component={item.component}
                                    options={{
                                        headerShadowVisible: false,
                                        headerTitle: item.headerTitle,
                                        headerTitleAlign: 'center',
                                        headerBackImage: () => (
                                            <Icon
                                                name={'left'}
                                                type={'antdesign'}
                                            ></Icon>
                                        ),
                                    }}
                                ></Stack.Screen>
                            )
                        })}
                        <Stack.Screen
                            name={'userAgreeScreen'}
                            component={UserAgree}
                            options={{
                                headerShadowVisible: false,
                                headerTitleAlign: 'center',
                                headerTitle: '用户协议',
                                headerBackImage: () => (
                                    <Icon
                                        name={'left'}
                                        type={'antdesign'}
                                    ></Icon>
                                ),
                            }}
                        ></Stack.Screen>
                        {/*    饮食页面*/}
                        <Stack.Screen
                            name={'search'}
                            component={Search}
                            options={{
                                headerTitle: '搜索',
                                headerTitleAlign: 'center',
                                headerBackImage: () => (
                                    <Icon
                                        name={'left'}
                                        type={'antdesign'}
                                    ></Icon>
                                ),
                            }}
                        ></Stack.Screen>
                        <Stack.Screen
                            name={'camera'}
                            component={MyCamera}
                            options={{
                                headerShown: false,
                            }}
                        ></Stack.Screen>
                        <Stack.Screen
                            name={'food-detail'}
                            component={FoodDetail}
                            options={{
                                headerTitle: '',
                                headerStyle: {
                                    height: 40,
                                    backgroundColor: theme.colors.primary,
                                },

                                headerBackImage: () => (
                                    <Icon
                                        name={'left'}
                                        type={'antdesign'}
                                        size={25}
                                    ></Icon>
                                ),
                                headerRight: () => {
                                    return (
                                        <TouchableOpacity>
                                            <Image
                                                source={require('./assets/icon/分享.png')}
                                                style={{
                                                    width: 25,
                                                    height: 25,
                                                    marginRight: 10,
                                                }}
                                            ></Image>
                                        </TouchableOpacity>
                                    )
                                },
                            }}
                        ></Stack.Screen>
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    )
}
