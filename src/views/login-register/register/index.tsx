import React, { memo, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, View, Image, ScrollView } from 'nativewind/dist/preflight'
import { Button, Icon, Input } from '@rneui/themed'
import {
    StyleSheet,
    TouchableOpacity,
    Alert,
    Dimensions,
    StatusBar,
} from 'react-native'
import { verifyEmail } from '../../../utils/verify-email'
import CountDown from '../../../components/count-down'
import theme from '../../../styles/theme/color'
import { getCodeApi, verifyCodeApi } from '../../../apis/mine'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SeePassWord from '../component/see-password'

interface IProps {
    children?: ReactNode
    navigation: any
}

const Register: FC<IProps> = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [isEmail, setIsEmail] = useState(true)
    const emailInput = useRef<any>()
    const [password, setPassword] = useState('')
    const [isPassword, setIsPassword] = useState(true)
    const [twicePassword, setTwicePassword] = useState('')
    const [isTwicePassword, setIsTwicePassword] = useState(true)
    const [code, setCode] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const passwordinput = useRef<any>()
    const twicepasswordInput = useRef<any>()
    const [veriyCode, setVeriyCode] = useState('')
    const [isVerifyCode, setIsVerifyCode] = useState(true)
    const [isSee, setIsSee] = useState<boolean>()
    const [isTwiceSee, setIsTwiceSee] = useState<boolean>()
    const getTime = (value: string | number) => {
        if (value == 0) {
            setCode(false)
        }
    }
    const getIsSee = (value: boolean) => {
        setIsSee(value)
    }
    const getIsTwiceSee = (value: boolean) => {
        setIsTwiceSee(value)
    }
    //校验邮箱是否正确
    const verifyEmailRule = () => {
        setIsEmail(verifyEmail(email))
        console.log(verifyEmail(email))
        if (!verifyEmail(email)) {
            emailInput.current?.shake()
        }
    }
    //校验第二次输入密码是否和第一次一样
    const verifyPassword = () => {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
        setIsPassword(reg.test(password))
        if (!isPassword) {
            passwordinput.current.shake()
        }
    }
    const verifyTwicePassword = () => {
        if (password !== twicePassword) {
            setIsTwicePassword(false)
            twicepasswordInput.current.shake()
        } else {
            setIsTwicePassword(true)
        }
    }
    //获取验证码
    const handleCode = async () => {
        //校验一下上面的邮箱是否正确
        verifyEmailRule()
        if (isEmail) {
            //请求验证码
            const resCode = await getCodeApi(email)
            //进行判断用户是否注册了
            if (resCode.code === 1) {
                //没注册
                setIsRegister(false)
                setCode((value) => !value)
                //成功的话就跳转到登录页面
            } else if (resCode.code === 0) {
                //注册了跳转到登录页面
                setIsRegister(true)
                Alert.alert(
                    '提示',
                    '该邮箱已经注册了,是否要到登录页面去登录?',
                    [
                        {
                            text: '取消',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        {
                            text: '确定',
                            onPress: () => navigation.navigate('Login'),
                        },
                    ],
                )
            }
        }
    }
    //进行注册
    const handleRegister = async () => {
        verifyEmailRule()
        verifyPassword()
        verifyTwicePassword()
        if (isEmail && isPassword && isTwicePassword) {
            const param = {
                code: veriyCode,
                email,
                password,
            }
            const res = await verifyCodeApi(param)
            if (res.code === 1) {
                setIsVerifyCode(true)
                //验证成功跳转到登录页面
                Alert.alert('', '注册成功,是否要去登录', [
                    {
                        text: '取消',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: '确定',
                        onPress: () => navigation.navigate('Login'),
                    },
                ])
            } else {
                setIsVerifyCode(false)
            }
        }
    }
    return (
        <ScrollView
            className="relative"
            style={{ flex: 1, backgroundColor: 'white' }}
        >
            <StatusBar backgroundColor={theme.colors.primary}></StatusBar>
            <KeyboardAwareScrollView className="flex-1" style={{ flex: 1 }}>
                <View
                    style={[
                        {
                            height: Dimensions.get('screen').height / 3.8,
                        },
                        styles.Background,
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
                    <Text style={styles.LoginText}>注册</Text>
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
                            onChangeText={(value: any) => setEmail(value)}
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
                            ref={passwordinput}
                            placeholder="输入密码"
                            leftIcon={
                                <Icon
                                    name={'password'}
                                    size={24}
                                    color={'#FB7F86'}
                                    style={{ marginRight: 10 }}
                                />
                            }
                            onBlur={() => verifyPassword()}
                            onChangeText={(value: any) => setPassword(value)}
                            value={password}
                            secureTextEntry={!isSee}
                            containerStyle={{
                                marginTop: 20,
                            }}
                            ErrorComponent={() => {
                                if (!isPassword) {
                                    return (
                                        <Text style={{ color: 'red' }}>
                                            密码必须包含数字、字母，且长度为8-16位
                                        </Text>
                                    )
                                }
                            }}
                            rightIcon={<SeePassWord getIsSee={getIsSee} />}
                        />
                        <Input
                            ref={twicepasswordInput}
                            placeholder="再次输入密码"
                            leftIcon={
                                <Icon
                                    name={'password'}
                                    size={24}
                                    color={'#FB7F86'}
                                    style={{ marginRight: 10 }}
                                />
                            }
                            containerStyle={{
                                marginTop: 20,
                            }}
                            onBlur={() => verifyTwicePassword()}
                            onChangeText={(value: any) =>
                                setTwicePassword(value)
                            }
                            value={twicePassword}
                            secureTextEntry={!isTwiceSee}
                            rightIcon={<SeePassWord getIsSee={getIsTwiceSee} />}
                            ErrorComponent={() => {
                                if (!isTwicePassword) {
                                    return (
                                        <Text style={{ color: 'red' }}>
                                            和上面的密码不一样
                                        </Text>
                                    )
                                }
                            }}
                        />

                        <View style={styles.Code}>
                            <Input
                                placeholder="输入验证码"
                                onChangeText={(value) => setVeriyCode(value)}
                                value={veriyCode}
                                leftIcon={
                                    <Icon
                                        name={'code'}
                                        size={24}
                                        color={'#FB7F86'}
                                        style={{
                                            marginRight: 10,
                                        }}
                                    />
                                }
                                containerStyle={{
                                    marginTop: 20,
                                    marginRight: 10,
                                    width: Dimensions.get('screen').width / 2,
                                }}
                                ErrorComponent={() => {
                                    if (!isVerifyCode) {
                                        return (
                                            <Text style={{ color: 'red' }}>
                                                验证码错误
                                            </Text>
                                        )
                                    }
                                }}
                            />
                            {code ? (
                                <CountDown getTime={getTime}></CountDown>
                            ) : (
                                <Button
                                    title={'获取验证码'}
                                    buttonStyle={{
                                        backgroundColor: '#F17A81',
                                        borderRadius: 30,
                                        paddingVertical: 10,
                                    }}
                                    containerStyle={{
                                        width: 100,
                                        borderRadius: 30,
                                    }}
                                    titleStyle={{
                                        fontSize: 15,
                                    }}
                                    onPress={() => handleCode()}
                                ></Button>
                            )}
                        </View>
                    </View>
                    <View className="" style={styles.LoginButton}>
                        <Button
                            onPress={() => handleRegister()}
                            title={'注册'}
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
                                backgroundColor: '#F17A81',
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
                                marginRight: 15,
                            }}
                        ></Button>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    Background: {
        position: 'relative',
    },
    Bottom: {
        paddingTop: 50,
        paddingHorizontal: 30,
        flex: 1,
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
    //   获取验证码
    Code: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    CodeButton: {
        color: '#F17A81',
        margin: 0,
    },
})
export default memo(Register)
