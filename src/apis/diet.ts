import hyRequest from '../services'
import { RecognizeFoodResponse } from './types/diet'
import { CommonResponseType } from './types'

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
