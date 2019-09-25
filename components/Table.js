import React from 'react';
import {
  Image,
  Platform,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class Table extends React.Component {

    renderRow(datum, index){
        return(
            <View key={index} style={styles.tableRow}>
                <View style={styles.tableCell}><Text>{datum[0]}</Text></View>
                <View style={styles.tableCell}><Text>{datum[1]}</Text></View>
            </View>
        );
    }

    render(){
        const header = this.props.dataHeader;
        const data = this.props.dataSource;
        return (
            <View style={styles.tableContainer}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCell}><Text style={styles.headerText}>{header[0]}</Text></View>
                    <View style={styles.tableCell}><Text style={styles.headerText}>{header[1]}</Text></View>
                </View>
                {
                    data.map((entry, index) => {
                        return this.renderRow(entry, index);
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerText: { fontWeight: 'bold', fontSize: 16},
    tableContainer:{ flex: 1, alignItems:'center', justifyContent: 'center', padding: 50, paddingTop: 5 },
    tableRow:{ flex: 1, flexDirection: 'row', alignSelf: 'stretch', borderWidth: 0.5, borderColor: "#c8e1ff" },
    tableCell: { flex: 1, alignSelf: 'center', borderWidth: 0.5, borderColor: "#c8e1ff"}
  });
  