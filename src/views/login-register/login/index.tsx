import React, { memo,  useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Image, ScrollView, Text, View } from 'nativewind/dist/preflight'
import {
    Alert,
    Dimensions,
    StatusBar,
    StyleSheet,
} from 'react-native'
import { Button, Icon, Input } from '@rneui/themed'
import { TouchableOpacity } from 'react-native'
import theme from '../../../styles/theme/color'
import { verifyEmail } from '../../../utils/verify-email'
import { LoginApi, LoginParamType } from '../../../apis/mine'
import { useAppDispatch } from '../../../store'
import {
    changeTokenAction,
    changeUserInfoAction,
} from '../../../store/slice/login-register-slice'
import { StackActions } from '@react-navigation/native'
//@ts-ignore
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SeePassWord from '../component/see-password'
interface IProps {
    children?: ReactNode
    navigation: any
}

const Login: FC<IProps> = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isEmail, setIsEmail] = useState(true)
    const [isPassWord, setIsPassWord] = useState(true)
    const [isSee, setIsSee] = useState<boolean>()
    const emailInput = useRef<any>()
    const passwordInput = useRef<any>()
    const dispatch = useAppDispatch()
    const getIsSee = (value: boolean) => {
        setIsSee(value)
    }
    //校验邮箱是否正确
    const verifyEmailRule = () => {
        setIsEmail(verifyEmail(email))
        if (!verifyEmail(email)) {
            emailInput.current?.shake()
        }
    }
    //登录跳转到个人中心页面
    const goToMine = async () => {
        //进行一下校验
        verifyEmailRule()
        if (password.length === 0) {
            passwordInput.current.shake()
            setIsPassWord(false)
        }
        if (isEmail) {
            const param: LoginParamType = {
                email: email,
                password: password,
            }
            try {
                const res = await LoginApi(param)
                console.log(res.data)
                if (res.code === 1) {
                    navigation.dispatch(StackActions.replace('tabs'))
                    dispatch(changeUserInfoAction(res.data.user))
                    dispatch(changeTokenAction(res.data.token))
                } else {
                    Alert.alert('', '邮箱或者密码错误,请重新输入', [
                        {
                            text: '确定',
                            onPress: () => console.log('OK Pressed'),
                            style: 'cancel',
                        },
                    ])
                }
            } catch (e) {
                console.log('出现错误了', e)
            }
        }
    }

    return (
        <ScrollView
            className="bg-white"
            style={{ height: Dimensions.get('screen').height }}
        >
            <StatusBar backgroundColor={theme.colors.primary}></StatusBar>
            <KeyboardAwareScrollView>
                <View
                    style={[
                        {
                            height: Dimensions.get('window').height / 2,
                        },
                    ]}
                >
                    <Image
                        source={require('../../../../assets/images/bg_login_header.png')}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    ></Image>
                    <TouchableOpacity
                        style={[styles.Back]}
                        onPress={() => navigation.replace('LoginHome')}
                        touchSoundDisabled
                    >
                        <Icon
                            name={'left'}
                            type={'antdesign'}
                            color={theme.colors.deep01Primary}
                            size={30}
                        ></Icon>
                    </TouchableOpacity>
                </View>
                <View style={styles.Bottom}>
                    <Text style={styles.LoginText}>登录</Text>
                    <View>
                        <Input
                            ref={emailInput}
                            placeholder="输入邮箱"
                            leftIcon={
                                <Icon
                                    name={'email'}
                                    size={24}
                                    color={'#FB7F86'}
                                    style={{ marginRight: 10 }}
                                />
                            }
                            onBlur={() => verifyEmailRule()}
                            onChangeText={(value: any) => {
                                setEmail(value)
                            }}
                            value={email}
                            ErrorComponent={() => {
                                if (!isEmail) {
                                    return (
                                        <Text style={{ color: 'red' }}>
                                            邮箱错误
                                        </Text>
                                    )
                                }
                            }}
                        />

                        <Input
                            placeholder="输入密码"
                            value={password}
                            ref={passwordInput}
                            onChangeText={(value) => setPassword(value)}
                            ErrorComponent={() => {
                                if (!isPassWord) {
                                    return (
                                        <Text style={{ color: 'red' }}>
                                            密码错误
                                        </Text>
                                    )
                                }
                            }}
                            leftIcon={
                                <Icon
                                    name={'password'}
                                    size={24}
                                    color={'#FB7F86'}
                                    style={{
                                        marginRight: 10,
                                    }}
                                />
                            }
                            rightIcon={<SeePassWord getIsSee={getIsSee} />}
                            containerStyle={{
                                marginTop: 25,
                            }}
                            secureTextEntry={!isSee}
                        />
                    </View>
                    <View className="" style={styles.LoginButton}>
                        <Button
                            title={'登录'}
                            icon={
                                <Icon
                                    name="arrowright"
                                    type="antdesign"
                                    color={'white'}
                                    size={25}
                                ></Icon>
                            }
                            iconRight
                            buttonStyle={{
                                backgroundColor: theme.colors.deep01Primary,
                                borderRadius: 30,
                                paddingVertical: 10,
                            }}
                            containerStyle={{
                                width: Dimensions.get('screen').width / 2.5,
                                borderRadius: 30,
                                marginVertical: 20,
                            }}
                            titleStyle={{
                                fontSize: 20,
                                marginRight: 10,
                            }}
                            onPress={() => goToMine()}
                        ></Button>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    Bottom: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        width: '100%',
    },
    LoginText: {
        fontSize: 28,
        color: '#3D0007',
        marginBottom: 15,
    },
    LoginButton: {
        alignItems: 'flex-end',
    },
    Back: {
        position: 'absolute',
        borderRadius: 100,
        marginTop: 10,
        marginLeft: 10,
        width: 50,
        height: 50,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
})

export default memo(Login)
