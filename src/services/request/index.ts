import axios, { AxiosRequestConfig } from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestConfig } from './type'
import store from '../../store/index'
import { changeTokenAction } from '../../store/slice/login-register-slice'
import { navigateToTop } from '../../../App'
// 拦截器: 蒙版Loading/token/修改配置

/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *  2.响应结果的类型处理(泛型)
 */

class HYRequest {
    instance: AxiosInstance

    // request实例 => axios的实例
    constructor(config: HYRequestConfig) {
        this.instance = axios.create(config)
        // 每个instance实例都添加拦截器
        this.instance.interceptors.request.use(
            (config) => {
                const token = store.getState().LoginRegisterSlice.token
                // loading/token
                if (token) {
                    config.headers.token =
                        'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MTMzMzU2NTMsInVzZXIiOm51bGx9.VgBXhr2qnNEg0sVuYyuT0XuIzXZpS68reBGfc_g_Huw'
                }
                return config
            },
            (err) => {
                return err
            },
        )
        this.instance.interceptors.response.use(
            (res) => {
                return res.data
            },
            (err) => {
                if (
                    err.response?.data.code === 401 ||
                    !err.response?.data.code
                ) {
                    store.dispatch(changeTokenAction(''))
                    // navigateToTop()
                }

                return err
            },
        )

        // 针对特定的hyRequest实例添加拦截器
        this.instance.interceptors.request.use(
            // config.interceptors?.requestSuccessFn,
            config.interceptors?.requestFailureFn,
        )
        this.instance.interceptors.response.use(
            config.interceptors?.responseSuccessFn,
            config.interceptors?.responseFailureFn,
        )
    }

    // 封装网络请求的方法
    // T => IHomeData
    request<T = any>(config: HYRequestConfig<T>) {
        // 单次请求的成功拦截处理
        if (config.interceptors?.requestSuccessFn) {
            config = config.interceptors.requestSuccessFn(config)
        }

        // 返回Promise
        return new Promise<T>((resolve, reject) => {
            this.instance
                .request<any, T>(config)
                .then((res) => {
                    // 单词响应的成功拦截处理
                    if (config.interceptors?.responseSuccessFn) {
                        res = config.interceptors.responseSuccessFn(res)
                    }
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    get<T = any>(config: HYRequestConfig<T>) {
        return this.request({
            ...config,

            method: 'GET',
        })
    }
    post<T = any>(config: HYRequestConfig<T>) {
        return this.request({
            ...config,
            method: 'POST',
        })
    }
    delete<T = any>(config: HYRequestConfig<T>) {
        return this.request({
            ...config,
            method: 'DELETE',
        })
    }
    patch<T = any>(config: HYRequestConfig<T>) {
        return this.request({
            ...config,
            method: 'PATCH',
        })
    }
}

export default HYRequest
