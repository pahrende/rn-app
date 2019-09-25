import React from 'react';
import {
  Image,
  Platform,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Table from '../components/Table';
import Constants from 'expo-constants';


export default class MinerScreen extends React.Component {
  state = {
    poolApiUrl: 'http://www.supportxmr.com/api/',
    minerAddr: '4A6zDXohCGTX2h8HGeGCD6j2FeusrGzV3eoKHPnFurNLRdmzEUf66WSHB72EfeUMqjYqBvMEn3z2HbWJ3VJYsxM3N5X6waa',
    minerStats: [],
    minerIdentifiers: [],
    minerPayments: [],
  };

  getPayments(){
    const poolUrl = this.state.poolApiUrl;
    const minerAddr = this.state.minerAddr;
    callApi(poolUrl, 'miner/' + minerAddr + '/payments')
      .then(responseJson => {
        //Success
        //alert(JSON.stringify().stringify(responseJson));
        console.log(responseJson);
        const respArray = (Object.entries(responseJson[0]));

        //console.log(respArray);

        this.setState({
          minerPayments: respArray,
        });
      })
      //If response is not in json then in error
      .catch(error => {
        //Error
        alert(JSON.stringify(error));
        console.error(error);
      });
  }

  getMinerIdentifiers(){
    const poolUrl = this.state.poolApiUrl;
    const minerAddr = this.state.minerAddr;
    callApi(poolUrl, 'miner/' + minerAddr + '/identifiers')
      .then(responseJson => {
        //Success
        //alert(JSON.stringify().stringify(responseJson));
        //console.log(responseJson);
        const respArray = (Object.entries(responseJson));
        this.setState({
          minerIdentifiers: respArray,
        });
      })
      //If response is not in json then in error
      .catch(error => {
        //Error
        alert(JSON.stringify(error));
        console.error(error);
      });
  }

  getMinerStats() {
    const poolUrl = this.state.poolApiUrl;
    const minerAddr = this.state.minerAddr;
    callApi(poolUrl, 'miner/' + minerAddr + '/stats')
      .then(responseJson => {
        //Success
        //alert(JSON.stringify().stringify(responseJson));
        //console.log(responseJson);
        const respArray = (Object.entries(responseJson));
        this.setState({
          minerStats: respArray,
        });
      })
      //If response is not in json then in error
      .catch(error => {
        //Error
        alert(JSON.stringify(error));
        console.error(error);
      });
  }

  componentDidMount(){
    this.getMinerStats();
    this.getMinerIdentifiers();
    this.getPayments();
  }

  render() {
    const minerStats = this.state.minerStats;
    const minerIdentifiers = this.state.minerIdentifiers;
    const minerPayments = this.state.minerPayments;

    const statHeader = ['STAT', 'DATA'];
    const idHeader = ['ID', 'NAME']
    const minerStatsTemp = [
      ['Hello','1'],
      ['Goodbye','3']
    ];

    //console.log(minerStats);
    
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

          <View style={styles.getStartedContainer}>            
            <Table dataHeader={statHeader} dataSource={minerStats}/>
            <Table dataHeader={idHeader} dataSource={minerIdentifiers}/>
            <Table dataHeader={statHeader} dataSource={minerPayments}/>
            <Button
              style={{flex:1}}
              title="Update Stats"
              onPress={() => this.getMinerStats()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

async function callApi(url, endpoint) {
  const response = await fetch(url + endpoint, {
    method: 'GET',
  });
  const body = await response.json();

  if (response.status !== 200) throw Error(body.message);

  return body;
}

MinerScreen.navigationOptions = {
  title: 'Miner Stats'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    marginTop: Constants.statusBarHeight,
  },
  getStartedContainer: {
    flex:1,
    marginBottom: 29
  }
});
