import hyRequest from '../services'
import { LoginData } from './types/mine'
import { CommonResponseType } from './types'
import { BASE_URL } from '../services/config'

enum URL {
    LOGINURL = '/api/user/login',
    CODEURL = '/api/user/getCode',
    VERIFYURL = '/api/user/register',
    UPLOADAVATAR = '/api/common/upload',
    UPDATEUSERINFO = '/api/user/updatemsg',
    GETUSERINFO = '/api/user/msg',
}

export interface LoginParamType {
    email: string
    password: string
}

/**
 * 登录
 * @param LoginParam
 * @constructor
 */
export const LoginApi = (LoginParam: LoginParamType) => {
    return hyRequest.post<CommonResponseType<LoginData>>({
        url: URL.LOGINURL,
        data: {
            email: LoginParam.email,
            password: LoginParam.password,
        },
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

/**
 * 获取验证码
 * @param email
 */
export const getCodeApi = (email: string) => {
    return hyRequest.get<CommonResponseType<string>>({
        url: URL.CODEURL,
        params: {
            email,
        },
    })
}

/**
 * 校验验证码
 * @param code
 */
interface VerifyCodeParamType {
    code: string
    email: string
    password: string
}
export const verifyCodeApi = (parm: VerifyCodeParamType) => {
    return hyRequest.post({
        url: URL.VERIFYURL,
        data: parm,
    })
}

interface uploadAvatarParamType {
    image: string
}

/**
 * 上传头像
 * @param param
 * @param id
 */
export const uploadAvatar = (param: uploadAvatarParamType, id: number) => {
    return hyRequest.post({
        url: URL.UPLOADAVATAR + '/' + id,
        data: param,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

/**
 * 修改用户名
 * @param username
 * @param id
 */
export const updateUserName = ({
    username,
    id,
}: {
    username: string
    id: number
}) => {
    return hyRequest.post({
        url: URL.UPDATEUSERINFO,
        data: {
            username,
            id,
        },
    })
}

/**
 * 获取用户信息
 * @param id
 */
export const getUserInfo = (id: number) => {
    return hyRequest.get({
        url: URL.GETUSERINFO + '/' + id,
    })
}

interface updateUserProfileParamType {
    id: number
    sex?: number
    height?: string
    birth?: string
    weight?: string
    habit?: string
}
export const updateUserProfile = (param: updateUserProfileParamType) => {
    return hyRequest.post({
        url: URL.UPDATEUSERINFO,
        data: param,
    })
}
