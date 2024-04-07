import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
    Dimensions,
    Image,
    ScrollView,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'
import { Button } from '@rneui/themed'
import theme from '../../../../../../styles/theme/color'
import AutoText from '../../../../../../components/auto-text'
import {
    getThreeGroupApi,
    JoinGroupByCodeApi,
    searchGroupApi,
} from '../../../../../../apis/group'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../../../../../../store'
import { changeThreeGroupAction } from '../../../../../../store/slice/group'
import { shallowEqual } from 'react-redux'
import { GroupInfoType } from '../../../../../../apis/types/group'
import { ANDROID } from 'nativewind/dist/utils/selector'

interface IProps {
    children?: ReactNode
}

const SearchGroup: FC<IProps> = () => {
    const dispatch = useAppDispatch()
    const [searchTitle, setSearchTitle] = useState('')
    const navigation = useNavigation()
    const { threeGroup, userInfo } = useAppSelector((state) => {
        return {
            threeGroup: state.GroupSlice.threeGroup,
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    //搜索小组
    const [searchGroupInfo, setSearchGroupInfo] = useState(
        [] as GroupInfoType[],
    )
    const searchGroup = () => {
        searchGroupApi(searchTitle, userInfo.id).then((res) => {
            setSearchGroupInfo(res.data)
        })
    }
    //加入小组
    const JoinGroup = (code: string) => {
        JoinGroupByCodeApi(userInfo.id, code).then((res) => {
            getThreeGroupApi(userInfo.id).then((res) => {
                dispatch(changeThreeGroupAction(res.data))
                ToastAndroid.showWithGravity(
                    '加入成功',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                )
            })
        })
    }
    //进入小组详情首页
    const gotoGroupDetailHome = (id: number) => {
        //@ts-ignore
        navigation.navigate('groupDetailHome', { id })
    }
    return (
        <>
            <View>
                <Image
                    style={{
                        width: Dimensions.get('window').width,
                        height: 250,
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50,
                    }}
                    source={require('../../../../../../../assets/images/group.jpeg')}
                ></Image>
            </View>
            {/*推荐小组*/}
            <View
                className="absolute bottom-[-200] ml-[20] mr-[20] bg-white"
                style={{
                    borderRadius: 10,
                    paddingHorizontal: 15,
                }}
            >
                <View
                    className="pt-[10] flex-row"
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottomWidth: 1,
                        borderStyle: 'solid',
                        paddingBottom: 10,
                        borderBottomColor: '#cccccc',
                    }}
                >
                    <TextInput
                        value={searchTitle}
                        onChangeText={(text) => setSearchTitle(text)}
                        style={{
                            height: 32,
                            width: Dimensions.get('window').width / 1.5,
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderColor: '#cccccc',
                            borderRadius: 5,
                            marginRight: 10,
                        }}
                    ></TextInput>
                    <Button
                        onPress={() => {
                            searchGroup()
                        }}
                        title={'搜索'}
                        titleStyle={{
                            fontSize: 15,
                            height: 20,
                            color: theme.colors.deep01Primary,
                        }}
                        containerStyle={{
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: theme.colors.deep01Primary,
                        }}
                        buttonStyle={{
                            width: 55,
                            height: 30,
                        }}
                        color={'white'}
                    ></Button>
                </View>
                <ScrollView
                    className="pt-[20] pr-[20] h-[250]"
                    showsVerticalScrollIndicator={false}
                >
                    {searchGroupInfo?.length
                        ? searchGroupInfo.map((item) => {
                              return (
                                  <TouchableOpacity
                                      onPress={() => {
                                          gotoGroupDetailHome(item.id)
                                      }}
                                      className="flex-row mb-[30] justify-between"
                                      key={item.id}
                                  >
                                      <View className="flex-row">
                                          {item.avatar ? (
                                              <Image
                                                  style={{
                                                      height: 50,
                                                      width: 50,
                                                      borderRadius: 10,
                                                      marginRight: 15,
                                                  }}
                                                  source={{ uri: item.avatar }}
                                              ></Image>
                                          ) : (
                                              <Image
                                                  style={{
                                                      height: 50,
                                                      width: 50,
                                                      borderRadius: 10,
                                                      marginRight: 15,
                                                  }}
                                                  source={require('../../../../../../../assets/images/bg_login_header.png')}
                                              ></Image>
                                          )}

                                          <View>
                                              <AutoText
                                                  numberOfLines={1}
                                                  style={{
                                                      width: 150,
                                                  }}
                                              >
                                                  {item.groupName}
                                              </AutoText>
                                              <View className="flex-row mt-[5]">
                                                  <AutoText
                                                      fontSize={3.5}
                                                      style={{
                                                          width: 150 / 2.2,
                                                          paddingVertical: 2,
                                                          marginRight: 10,
                                                          backgroundColor:
                                                              theme.colors
                                                                  .secondary,
                                                          paddingHorizontal: 2,
                                                          borderRadius: 3,
                                                      }}
                                                  >
                                                      打卡率
                                                      {(
                                                          item.rate * 100
                                                      ).toFixed(1)}{' '}
                                                      %
                                                  </AutoText>
                                                  <AutoText
                                                      fontSize={3.5}
                                                      style={{
                                                          width: 150 / 2.5,
                                                          backgroundColor:
                                                              theme.colors
                                                                  .secondary,
                                                          paddingHorizontal: 2,
                                                          borderRadius: 3,
                                                      }}
                                                  >
                                                      成员数 {item.curNum}
                                                  </AutoText>
                                              </View>
                                          </View>
                                      </View>

                                      <View className="h-[25] w-[60]">
                                          {item.isInner ? (
                                              <Button
                                                  onPress={() => {
                                                      gotoGroupDetailHome(
                                                          item.id,
                                                      )
                                                  }}
                                                  title="进入"
                                                  containerStyle={{
                                                      borderRadius: 20,
                                                      borderColor:
                                                          theme.colors
                                                              .deep01Primary,
                                                      borderWidth: 1,
                                                      height: 25,
                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                  }}
                                                  titleStyle={{
                                                      fontSize: 10,
                                                      color: theme.colors
                                                          .deep01Primary,
                                                      height: 15,
                                                  }}
                                                  buttonStyle={{
                                                      backgroundColor: 'white',
                                                      borderColor:
                                                          theme.colors
                                                              .deep01Primary,
                                                  }}
                                              ></Button>
                                          ) : (
                                              <Button
                                                  onPress={() => {
                                                      JoinGroup(item.codeInfo)
                                                  }}
                                                  title="加入"
                                                  containerStyle={{
                                                      borderRadius: 20,
                                                      borderColor:
                                                          theme.colors
                                                              .deep01Primary,
                                                      borderWidth: 1,
                                                      height: 25,
                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                  }}
                                                  titleStyle={{
                                                      fontSize: 10,
                                                      color: theme.colors
                                                          .deep01Primary,
                                                      height: 15,
                                                  }}
                                                  buttonStyle={{
                                                      backgroundColor: 'white',
                                                      borderColor:
                                                          theme.colors
                                                              .deep01Primary,
                                                  }}
                                              ></Button>
                                          )}
                                      </View>
                                  </TouchableOpacity>
                              )
                          })
                        : threeGroup.map((item) => {
                              return (
                                  <TouchableOpacity
                                      onPress={() => {
                                          gotoGroupDetailHome(item.id)
                                      }}
                                      className="flex-row mb-[30] justify-between"
                                      key={item.id}
                                  >
                                      <View className="flex-row">
                                          {item.avatar ? (
                                              <Image
                                                  style={{
                                                      height: 50,
                                                      width: 50,
                                                      borderRadius: 10,
                                                      marginRight: 15,
                                                  }}
                                                  source={{ uri: item.avatar }}
                                              ></Image>
                                          ) : (
                                              <Image
                                                  style={{
                                                      height: 50,
                                                      width: 50,
                                                      borderRadius: 10,
                                                      marginRight: 15,
                                                  }}
                                                  source={require('../../../../../../../assets/images/bg_login_header.png')}
                                              ></Image>
                                          )}

                                          <View>
                                              <AutoText
                                                  numberOfLines={1}
                                                  style={{
                                                      width: 150,
                                                  }}
                                              >
                                                  {item.groupName}
                                              </AutoText>
                                              <View className="flex-row mt-[5]">
                                                  <AutoText
                                                      fontSize={3.5}
                                                      style={{
                                                          marginRight: 10,
                                                          backgroundColor:
                                                              theme.colors
                                                                  .secondary,
                                                          paddingHorizontal: 2,
                                                          borderRadius: 3,
                                                      }}
                                                  >
                                                      打卡率{' '}
                                                      {(
                                                          item.rate * 100
                                                      ).toFixed(1)}
                                                      %
                                                  </AutoText>
                                                  <AutoText
                                                      fontSize={3.5}
                                                      style={{
                                                          backgroundColor:
                                                              theme.colors
                                                                  .secondary,
                                                          paddingHorizontal: 2,
                                                          borderRadius: 3,
                                                      }}
                                                  >
                                                      成员数 {item.curNum}
                                                  </AutoText>
                                              </View>
                                          </View>
                                      </View>

                                      <View className="h-[25] w-[60]">
                                          <Button
                                              onPress={() => {
                                                  item.isInner
                                                      ? gotoGroupDetailHome(
                                                            item.id,
                                                        )
                                                      : JoinGroup(item.codeInfo)
                                              }}
                                              title={
                                                  item.isInner ? '进入' : '加入'
                                              }
                                              containerStyle={{
                                                  borderRadius: 20,
                                                  borderColor:
                                                      theme.colors
                                                          .deep01Primary,
                                                  borderWidth: 1,
                                                  height: 25,
                                                  alignItems: 'center',
                                                  justifyContent: 'center',
                                              }}
                                              titleStyle={{
                                                  fontSize: 10,
                                                  color: theme.colors
                                                      .deep01Primary,
                                                  height: 15,
                                              }}
                                              buttonStyle={{
                                                  backgroundColor: 'white',
                                                  borderColor:
                                                      theme.colors
                                                          .deep01Primary,
                                              }}
                                          ></Button>
                                      </View>
                                  </TouchableOpacity>
                              )
                          })}
                </ScrollView>
            </View>
        </>
    )
}

export default memo(SearchGroup)
