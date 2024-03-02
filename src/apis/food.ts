import hyRequest from '../services'
import {
    FoodCategoryType,
    FoodListByCategoryData,
    FoodListByCategoryType,
    SingleFoodListType,
} from './types/food'
import { CommonResponseType } from './types'

enum BASEURL {
    FOOD_CATEGORY = '/api/food/category',
    FOOD_LIST = '/api/food/list',
}

/**
 * 获取食物种类列表
 * @constructor
 */
export const FoodCategoryApi = () => {
    return hyRequest.get<CommonResponseType<FoodCategoryType>>({
        url: BASEURL.FOOD_CATEGORY,
    })
}

/**
 * 食物列表
 * @param data
 * @constructor
 */
export const FoodListByCategoryApi = (data: FoodListByCategoryData) => {
    return hyRequest.post<
        CommonResponseType<SingleFoodListType | FoodListByCategoryType>
    >({
        url: BASEURL.FOOD_LIST,
        data,
    })
}
