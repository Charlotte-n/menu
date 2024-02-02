import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Text } from 'nativewind/dist/preflight'
import { Tab, TabView } from '@rneui/themed'

interface IProps {
    children?: ReactNode
}

const HealthMealScreen: FC<IProps> = () => {
    const [index, setIndex] = React.useState(0)

    return (
        <>
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: 'white',
                    height: 3,
                }}
                variant="primary"
            >
                <Tab.Item
                    title="Recent"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
                />
                <Tab.Item
                    title="favorite"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
                />
                <Tab.Item
                    title="cart"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
                />
            </Tab>

            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item
                    style={{
                        backgroundColor: 'red',
                        width: '100%',
                        height: 200,
                    }}
                >
                    <Text>Recent</Text>
                </TabView.Item>
                <TabView.Item
                    style={{ backgroundColor: 'blue', width: '100%' }}
                >
                    <Text>Favorite</Text>
                </TabView.Item>
                <TabView.Item
                    style={{ backgroundColor: 'green', width: '100%' }}
                >
                    <Text>Cart</Text>
                </TabView.Item>
            </TabView>
        </>
    )
}

export default memo(HealthMealScreen)
