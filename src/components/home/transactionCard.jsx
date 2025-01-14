
import { View, Text, Image } from 'react-native'
import React from 'react'
import transactionCardStyles from '../../styles/stylesTransactioncard'
import imagePath from '../../constants/imagePath'
import logoStyles from '../../styles/logoStyles'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../styles/Colors'

const TransactionCard = () => {
  return (
    <View style={transactionCardStyles.container}>
        <View style={transactionCardStyles.leftContainer}>
            <View style={{ marginRight: 10, width: 50 }}>
              <Image source={imagePath.logoPath} style={logoStyles.smallLogo} />
            </View>
            <View>
            <Text style={transactionCardStyles.amount}>₹ 100</Text>
            {/* <Text style={transactionCardStyles.title}>Transaction Title</Text> */}
            <Text style={transactionCardStyles.subtitle}>Transaction description</Text>
            </View>
        </View>
        <View style={transactionCardStyles.rightContainer}>
            <Text style={transactionCardStyles.subtitle}>1st Jan 25</Text>
        <Ionicons name="cash" size={24} color={Colors.secondary} />
        </View>
    </View>
  )
}

export default TransactionCard