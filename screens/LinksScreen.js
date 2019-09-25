import React from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import Table from '../components/Table';
import Constants from 'expo-constants';

export default class LinksScreen extends React.Component {
  state = {
    poolApiUrl: 'http://www.supportxmr.com/api/',
    poolStats: [],
  };

  getPoolDataUsingGet() {
    //GET request
    const poolUrl = this.state.poolApiUrl;
    callApi(poolUrl, 'pool/stats')
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
              title="Update Stats"
              onPress={() => this.getPoolDataUsingGet()}
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

LinksScreen.navigationOptions = {
  title: 'Pool Stats',
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
