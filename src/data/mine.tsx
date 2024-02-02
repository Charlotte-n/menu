import store from '../store'
const userInfo = store.getState().LoginRegisterSlice.userInfo
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: '个人资料',
        path: 'profile',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: '我的收藏',
        path: 'collect',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: '摄入管理',
        path: 'intake',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29234',
        title: '身体数据',
        path: 'body',
    },
    // {
    //     id: '58694a0f-3da1-471f-bd96-145571e29235',
    //     title: '小工具',
    //     path:'tool'
    // },
]

//个人资料

export { DATA }
