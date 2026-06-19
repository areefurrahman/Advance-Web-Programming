import { View, Text } from 'react-native';

export default function ShopScreen() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#000',
            }}
        >
            <Text
                style={{
                    color: '#fff',
                    fontSize: 32,
                    fontWeight: 'bold',
                }}
            >
                Shop Screen
            </Text>
        </View>
    );
}