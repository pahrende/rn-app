import * as WebBrowser from 'expo-web-browser';
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


export default class HomeScreen extends React.Component {
  state = {
    poolStats: [],
  };

  getPoolDataUsingGet() {
    //GET request
    callApi('pool/stats')
      .then(responseJson => {
        //Success
        //alert(JSON.stringify().stringify(responseJson));
        //console.log(responseJson);
        const respArray = (Object.entries(responseJson.pool_statistics));
        this.setState({
          poolStats: respArray,
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
    this.getPoolDataUsingGet();
  }

  render() {
    const poolStats = this.state.poolStats;

    const tableHeader = ['STAT', 'DATA'];
    const poolStatsTemp = [
      ['Hello','1'],
      ['Goodbye','3']
    ];

    //console.log(poolStats);
    
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

          <View style={styles.getStartedContainer}>            
            <Table dataHeader={tableHeader} dataSource={poolStats}/>
            <Button
              style={{flex:1, padding: 50, minWidth: 120}}
              title="Get Pool Stats"
              onPress={() => this.getPoolDataUsingGet()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

async function callApi(endpoint) {
  const response = await fetch('http://www.supportxmr.com/api/' + endpoint, {
    method: 'GET',
  });
  const body = await response.json();

  if (response.status !== 200) throw Error(body.message);

  return body;
}

HomeScreen.navigationOptions = {
  header: null,
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
  }
});
