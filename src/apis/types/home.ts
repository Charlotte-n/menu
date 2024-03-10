export interface GetDailyIntakeData {
    birth: string
    exercise: string | number
    fat?: number
    gym: string
    height: string
    sex: string
    target: string
    userid: number
    weight: string
}

export interface ResponseDailyIntake {
    cellulose: number
    calories: number
    fat: number
    carbohydrate: number
    protein: number
}
