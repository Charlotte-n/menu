import hyRequest from '../services'
import { RecognizeFoodResponse } from './types/diet'
import { CommonResponseType } from './types'
import axios from 'axios'

enum URL {
    RECOGNIZE_FOOD_URL = '/api/dish/parse',
}
interface recognizeFoodParamType {
    image: string
}

/**
 * 识别食物的api
 * @param param
 */
export const recognizeFood = (param: recognizeFoodParamType) => {
    return hyRequest.post<CommonResponseType<RecognizeFoodResponse>>({
        url: URL.RECOGNIZE_FOOD_URL,
        data: param,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}
interface addressParamType {
    location: string
    ak: string
}

/**
 * 获取地理位置信息
 * @param param
 */
export const address = (param: addressParamType) => {
    return axios.get('https://api.map.baidu.com/reverse_geocoding/v3', {
        params: param,
    })
}
