import {View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
const myImage = require('../../assets/icon.png');

export default function Auth({onAuthenticate}) {
    return(
        <View>
            <Text style={styles.title}>Paidy</Text>
            <Text style={styles.subTitle}>Todo-List Secure Application</Text>
                <Text style={styles.description}>
                    Securely manage your tasks with biometric authentication. Your to-do list is protected and accessible only to you.
                </Text>
            <TouchableOpacity 
                onPress={onAuthenticate}
                style={styles.btn}>
                <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#0893FC',
        padding: 10,
        borderRadius: 5,
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
    },
    title: {
        fontSize: 50,
        fontWeight: '400',
        marginVertical: 30,
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 24,
        fontWeight: '300',
        marginBottom: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 50,
    }
})