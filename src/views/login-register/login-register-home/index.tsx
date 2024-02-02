import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Image, View, ScrollView } from 'nativewind/dist/preflight'
import theme from '../../../styles/theme/color'
import { Button, ThemeProvider } from '@rneui/themed'
import { MainTheme } from '../../../styles/theme/ui-theme'
import { StackActions } from '@react-navigation/native'
import { Dimensions, StatusBar } from 'react-native'

interface IProps {
    children?: ReactNode
    navigation: any
}

const LoginHome: FC<IProps> = ({ navigation }) => {

    return (
        <ScrollView
            className="flex-1"
            style={{ backgroundColor: theme.colors.primary }}
        >
            <StatusBar backgroundColor={theme.colors.primary}></StatusBar>
            <View
                style={{
                    width: '100%',
                    height: Dimensions.get('screen').height / 1.5,
                }}
            >
                <Image
                    source={require('../../../../assets/images/bg_welcome_header.png')}
                    style={{
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('screen').height / 1.5,
                    }}
                    resizeMode={'cover'}
                ></Image>
            </View>
            <View
                style={{
                    alignItems: 'center',
                    paddingVertical: 3,
                }}
            >
                <ThemeProvider theme={MainTheme}>
                    <Button
                        title={'登录'}
                        buttonStyle={{
                            backgroundColor: theme.colors.deep01Primary,
                            borderRadius: 30,
                            paddingVertical: 10,
                        }}
                        containerStyle={{
                            width: 250,
                            borderRadius: 30,
                            marginVertical: 20,
                        }}
                        titleStyle={{
                            fontSize: 20,
                        }}
                        onPress={() =>
                            navigation.dispatch(StackActions.replace('Login'))
                        }
                    ></Button>
                    <Button
                        title={'注册'}
                        buttonStyle={{
                            backgroundColor: 'white',
                            borderRadius: 30,
                            paddingVertical: 10,
                        }}
                        containerStyle={{
                            width: 250,
                            borderRadius: 30,
                            marginTop: 10,
                        }}
                        titleStyle={{
                            color: theme.colors.deep01Primary,
                            fontSize: 20,
                        }}
                        onPress={() =>
                            navigation.dispatch(
                                StackActions.replace('Register'),
                            )
                        }
                    ></Button>
                </ThemeProvider>
            </View>
        </ScrollView>
    )
}

export default memo(LoginHome)
