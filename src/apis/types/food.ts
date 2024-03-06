export interface FoodListByCategoryData {
    category_id?: string | number
    id?: string | number
    title?: string
    pageNum?: number
    pageSize?: number
}

//食物种类
export type FoodCategoryType = Daum[]
export interface Daum {
    id: number
    title: string
}

//食物列表
export interface FoodListByCategoryType {
    num: number
    foods: SingleFoodListType[]
}
export interface SingleFoodListType {
    id?: number
    categoryId?: number
    title?: string
    image?: string
    cellulose?: number
    field?: string
    calories?: number
    fat?: number
    carbohydrate?: number
    protein?: number
}
