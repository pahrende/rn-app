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

//     <View style={{ flex: 1, alignSelf: 'stretch' }} >
//     <Text>Hello</Text>    
// </View>/> { /* Edit these as they are your cells. You may even take parameters to display different data / react elements etc. */}
// <View style={{ flex: 1, alignSelf: 'stretch' }} />

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
                    <View style={styles.tableCell}><Text>{header[0]}</Text></View>
                    <View style={styles.tableCell}><Text>{header[1]}</Text></View>
                </View>
                <View style={styles.text}>
                {
                    data.map((entry, index) => {
                        return this.renderRow(entry, index);
                    })
                }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    getStartedText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 24,
      textAlign: 'center',
    },
    tableContainer:{ flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    dataRow: { height: 30 },
    border: { borderWidth: 0.5, borderColor: "#c8e1ff" },
    table: { marginTop: 10, marginBottom: 10 },
    tableRow:{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' },
    tableCell: { flex: 1, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center'}
  });
  