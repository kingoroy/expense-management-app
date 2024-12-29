import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import getUserDetailsAction from '../../redux/actions/userDetailsAction';

const MainHomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(getUserDetailsAction()).unwrap()
      .then(() => {
      }).catch((error) => {
      })
    }, 20000);
  }, [])
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> 
      <Text>WELCOME to Kshirsa</Text>
    </View>
  )
}

export default MainHomeScreen