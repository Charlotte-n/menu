import hyRequest from '../services'
import {
    FoodCategoryType,
    FoodCommentListData,
    FoodCommentSingleData,
    FoodListByCategoryData,
    FoodListByCategoryType,
    PostFoodCommentData,
    RecipeListBody,
    RecipeListData,
    SingleFoodListType,
} from './types/food'
import { CommonResponseType } from './types'
import CommentSingle from '../views/diet/c-pages/food-detail/components/comment-single'
enum BASEURL {
    FOOD_CATEGORY = '/api/food/category',
    FOOD_LIST = '/api/food/list',
    GET_COMMENTS = '/api/user/comments',
    POST_COMMENTS = '/api/user/addcomment',
    RECIPE_LIST = '/api/dish/getdishes',
    COMMENT_ID = '/api/user/getcomment',
    GET_RANDOM_FOOD = '/api/dish/recommend',
    POST_DO_LIKE = '/api/user/dolike',
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
 * 获取菜谱列表
 * @param data
 * @constructor
 */
export const RecipeListApi = (data: RecipeListBody) => {
    return hyRequest.post<CommonResponseType<RecipeListData>>({
        url: BASEURL.RECIPE_LIST,
        data,
    })
}

/**
 * 随机获取三个菜品
 */
export const getRandomRecipeApi = () => {
    return hyRequest.get({
        url: BASEURL.GET_RANDOM_FOOD,
    })
}

/**
 * 获取用户的评论
 * @param FoodId
 * @param userId
 * @constructor
 */
export const getCommentsApi = (FoodId: number, userId: number) => {
    return hyRequest.get<CommonResponseType<FoodCommentListData>>({
        url: BASEURL.GET_COMMENTS + '/' + FoodId + '/' + userId,
    })
}

/**
 * 根据id获取评论
 * @param id
 */
export const getCommentByIdApi = (id: number, userid: number) => {
    return hyRequest.get<CommonResponseType<FoodCommentSingleData>>({
        url: BASEURL.COMMENT_ID + '/' + id + '/' + userid,
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

/**
 * 点赞
 * @param userid
 * @param commentId
 * @constructor
 */
export const PostDoLikeApi = (userid: number, commentId: number) => {
    return hyRequest.post({
        url: BASEURL.POST_DO_LIKE,
        params: {
            userid,
            commentId,
        },
    })
}
