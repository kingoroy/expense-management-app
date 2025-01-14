import { View, Text, FlatList } from 'react-native'
import React from 'react'
import recentTransactionStyles from '../../styles/stylesRecentTransaction'
import TransactionCard from './transactionCard'

const RecentTransaction = () => {
    return (
        <View style={recentTransactionStyles.container}>
            <View style={recentTransactionStyles.titleWrapper}>
                <Text style={recentTransactionStyles.title}>Recent Transaction</Text>
                <Text style={recentTransactionStyles.seeAllText}>See All</Text>
            </View>
           <FlatList 
              data={[1,2,3,4,54,6,7,8,9,10]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                    return (
                       <TransactionCard />
                    )
                }}
           />
        </View>
    )
}

export default RecentTransaction