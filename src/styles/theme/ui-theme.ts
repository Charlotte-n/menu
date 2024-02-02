import { createTheme } from '@rneui/themed'
import theme from './color'

export const MainTheme = createTheme({
    // Use only one color scheme
    lightColors: {
        primary: 'red',
    },
    // And set that mode as default
    mode: 'light',
    components: {
        Button: {
            raised: true,
            color: theme.colors.primary,
        },
    },
})
