//#region 百度识别食物返回来的数据类型
export type RecognizeFoodResponse = {
    error_code: any
    error_msg: any
    log_id: number
    result: Array<{
        baiKeInfo: any
        calorie: number
        name: string
        probability: number
    }>
    result_num: number
}

export type RecognizeFood = {
    baiKeInfo: any
    calorie: number
    name: string
    probability: number
}
//endregion
