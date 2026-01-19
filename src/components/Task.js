import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../assets/colors';

const Task = (props) => {

    return (
        <TouchableOpacity onPress={props.onUpdate}>
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <TouchableOpacity style={styles.square}></TouchableOpacity>
                    <Text style={styles.itemText}>{props.text}</Text>
                </View>
                <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={props.onRemove}
                >
                    <Text style={styles.removeText}>✕</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: COLORS.taskBackground,
        padding: 15,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        flex: 1,
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: COLORS.primary,
        opacity: 0.4,
        borderRadius: 20,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%',
    },
    removeButton: {
        width: 30,
        height: 30,
        backgroundColor: COLORS.removeButton,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    removeText: {
        color: COLORS.textWhite,
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default Task;