import Profile from '../views/mine/profile'
import Collect from '../views/mine/collect'
import Intake from '../views/mine/intake'
import Body from '../views/mine/body'
//个人中心的路由及其相关配置
const MineOtherScreen = [
    {
        name: 'profile',
        component: Profile,
        headerTitle: '个人资料',
    },
    {
        name: 'collect',
        component: Collect,
        headerTitle: '我的收藏',
    },
    {
        name: 'intake',
        component: Intake,
        headerTitle: '摄入管理',
    },
    {
        name: 'body',
        component: Body,
        headerTitle: '身体数据',
    },
]

export { MineOtherScreen }
