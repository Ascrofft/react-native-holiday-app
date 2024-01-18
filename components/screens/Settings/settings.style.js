import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES, SHADOWS } from '../../../constants';

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.medium,
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
