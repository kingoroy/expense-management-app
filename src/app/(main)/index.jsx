import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getUserDetailsAction, { logoutAction } from '../../redux/actions/userDetailsAction';
import { deleteAuthRow, getAllAuthData, getAuthData } from '../../utils/database';
import Colors from '../../styles/Colors';
import KshirsaButton from '../../small-components/KshirsaButton';
import { REFRESH_TOKEN } from '../../utils/storageKeys';
import { Toast } from 'react-native-alert-notification';
import { useRouter } from 'expo-router';
import apiRoutes from '../../constants/apiRoutes';

const MainHomeScreen = () => {
  const user = useSelector((state) => state.userDetailsReducer?.data);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.moodyBlack, color: Colors.white }}> 
      <Text style={{color: Colors.secondary, fontSize: 60}}>Hi {user?.userDetails?.name}</Text>
      <Text style={{color: Colors.secondary}}>WELCOME to Kshirsa</Text>
      {/* <KshirsaButton title='Logout' onPress={handleLogout} /> */}
    </View>
  )
}

export default MainHomeScreen