import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES, SHADOWS } from '../../../constants';

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.medium,
    },
    
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    searchContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: SIZES.large,
        height: 50,
      },
      searchWrapper: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginRight: SIZES.small,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.medium,
        height: "100%",
      },
      searchInput: {
        fontFamily: FONT.regular,
        width: "100%",
        height: "100%",
        paddingHorizontal: SIZES.medium,
      },
      searchBtn: {
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
      },
      searchBtnImage: {
        width: "50%",
        height: "50%",
        tintColor: COLORS.white,
      },
      secondaryText: {
        fontFamily: FONT.regular,
        fontSize: SIZES.large,
        color: COLORS.secondary,
      },
      primaryText: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        marginTop: 2,
      },

    textContainer: {
        flex: 1,
        marginHorizontal: SIZES.medium,
    },
    itemContainer: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: SIZES.medium,
        borderRadius: SIZES.small,
        backgroundColor: "#FFF",
        ...SHADOWS.medium,
        shadowColor: COLORS.white,
        marginBottom: 10
    },
    itemName: {
        fontSize: SIZES.medium,
        fontFamily: "DMBold",
        color: COLORS.primary,
    },
    itemsContainer: {
        marginTop: SIZES.medium,
    },
});

export default styles;
