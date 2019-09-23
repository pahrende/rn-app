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


export default class HomeScreen extends React.Component {
  state = {
    poolStats: [],
  };
  getDataUsingGet() {
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

  render() {
    const poolStats = this.state.poolStats;

    const tableHeader = ['Stat', 'Data'];
    const poolStatsTemp = [
      ['Hello','1'],
      ['Goodbye','3']
    ];

    console.log(poolStats);
    console.log(tableHeader);
            //
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

          <View style={styles.getStartedContainer}>
            
            <Button
              title="Get Pool Stats"
              onPress={() => this.getDataUsingGet()}
            />
            <Table dataHeader={tableHeader} dataSource={poolStatsTemp}/>
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
    paddingTop: 50,
  },
  getStartedContainer: {
    flex:1,
    alignItems: 'center',
    borderWidth: 0.5, 
    borderColor: "#c8e1ff" 
  }
});
