import hyRequest from '../services'
import {
    FoodCategoryType,
    FoodListByCategoryData,
    FoodListByCategoryType,
    PostFoodCommentData,
    SingleFoodListType,
} from './types/food'
import { CommonResponseType } from './types'

enum BASEURL {
    FOOD_CATEGORY = '/api/food/category',
    FOOD_LIST = '/api/food/list',
    GET_COMMENTS = '/user/comments',
    POST_COMMENTS = '/user/addcomment',
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

/**
 * 获取用户的评论
 * @param FoodId
 * @constructor
 */
export const getCommentsApi = (FoodId: number) => {
    return hyRequest.get({
        url: BASEURL.GET_COMMENTS + '/' + FoodId,
    })
}

/**
 * 发送评论
 * @param data
 * @constructor
 */
export const PostCommentsApi = (data: PostFoodCommentData) => {
    return hyRequest.post<CommonResponseType<any>>({
        url: BASEURL.POST_COMMENTS,
        data,
    })
}
