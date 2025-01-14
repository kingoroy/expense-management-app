import { View, Text, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
import balanceSummaryCardStyles from '../../styles/stylesBalanceSummaryCard';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Colors from '../../styles/Colors';

const BalanceSummaryCard = () => {
  const [isSticky, setIsSticky] = useState(false);
  const cardPosition = useRef(null);

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (cardPosition.current) {
      const cardTop = cardPosition.current.y; // Position of the card
      if (scrollY >= cardTop && !isSticky) {
        setIsSticky(true);
      } else if (scrollY < cardTop && isSticky) {
        setIsSticky(false);
      }
    }
  };

  return (
    <ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={16} // Ensures smooth scroll detection
    >
      {/* Sticky UI */}
      {isSticky && (
        <View style={balanceSummaryCardStyles.stickyContainer}>
          <Text style={balanceSummaryCardStyles.stickyText}>Sticky Balance Summary</Text>
          <AntDesign name="downcircleo" size={20} color={Colors.primaryText} />
        </View>
      )}

      {/* Original UI */}
      <View
        onLayout={(event) => {
          cardPosition.current = event.nativeEvent.layout;
        }}
        style={balanceSummaryCardStyles.container}
      >
        <View style={balanceSummaryCardStyles.smallContainer}>
          <View>
            <Text style={balanceSummaryCardStyles.balanceTitle}>Total Balance</Text>
            <View style={balanceSummaryCardStyles.balanceTextWrapper}>
              <FontAwesome name="rupee" size={30} color={Colors.primaryText} />
              <Text style={balanceSummaryCardStyles.balanceText}>29231239</Text>
            </View>
          </View>
          <View style={balanceSummaryCardStyles.balanceDropdown}>
            <Text>Month</Text>
            <AntDesign name="downcircleo" size={20} color="black" />
          </View>
        </View>

        <View style={balanceSummaryCardStyles.smallContainer}>
          <View>
            <View style={balanceSummaryCardStyles.balanceTitleWwrapper}>
              <View style={balanceSummaryCardStyles.arrowStyle}>
                <AntDesign name="arrowdown" size={18} color={Colors.errorText} />
              </View>
              <Text style={balanceSummaryCardStyles.smallBalanceTitle}>Expenses</Text>
            </View>
            <View style={balanceSummaryCardStyles.balanceTextWrapper}>
              <FontAwesome name="rupee" size={24} color={Colors.white} />
              <Text style={balanceSummaryCardStyles.smallBalanceText}>29231239</Text>
            </View>
          </View>
          <View>
            <View style={balanceSummaryCardStyles.balanceTitleWwrapper}>
              <View style={balanceSummaryCardStyles.arrowStyle}>
                <AntDesign name="arrowup" size={18} color={Colors.green} />
              </View>
              <Text style={balanceSummaryCardStyles.smallBalanceTitle}>Income</Text>
            </View>
            <View style={balanceSummaryCardStyles.balanceTextWrapper}>
              <FontAwesome name="rupee" size={24} color={Colors.white} />
              <Text style={balanceSummaryCardStyles.smallBalanceText}>29231239</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default BalanceSummaryCard;
