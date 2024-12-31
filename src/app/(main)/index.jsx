import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import getUserDetailsAction from '../../redux/actions/userDetailsAction';
import { deleteAuthRow, getAllAuthData, getAuthData } from '../../utils/database';
import Colors from '../../styles/Colors';

const MainHomeScreen = () => {
  const dispatch = useDispatch();
  const data = getAllAuthData()
  console.log('authtable', data)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.moodyBlack, color: Colors.white }}> 
      <Text>WELCOME to Kshirsa</Text>
    </View>
  )
}

export default MainHomeScreen