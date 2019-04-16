import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, MapView, Marker, Location, Permissions } from 'expo';

export default class App extends Component {
  state = {
    mapRegion: null, 
    hasLocationPermissions: false,
    locationResult: null,
    locationLatitude: 39,
    locationLongitude: -77, 
    locationInfo: null
  };

  componentDidMount() {
    this.getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    console.log(mapRegion);
    this.setState({ mapRegion });
  };

  async getLocationAsync (){
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   } else {
     this.setState({ hasLocationPermissions: true });
   }

   let location = await Location.getCurrentPositionAsync({});
   await this.setState({ locationResult: JSON.stringify(location), locationLatitude: location.coords.latitude, locationLongitude: location.coords.longitude});
  
   // Center the map on the location we just fetched.
    this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
  }

  render() {
    return (
      <View style={styles.container}>
        
        
        {
          this.state.locationResult === null ?
          <Text>Finding your current location...</Text> :
          this.state.hasLocationPermissions === false ?
            <Text>Location permissions are not granted.</Text> :
            this.state.mapRegion === null ?
            <Text>Map region doesn't exist.</Text> :
            <MapView
              style={{ alignSelf: 'stretch',height:360}}
              region={this.state.mapRegion}
              onRegionChange={this._handleMapRegionChange}>
              
              <MapView.Marker
         coordinate={{
                      latitude: this.state.locationLatitude,
                      longitude: this.state.locationLongitude
                    }}                      
              
      />

               <MapView.Marker
         coordinate={{
                      latitude: 38,
                      longitude: -79
                    }}                      
              
      />
            </MapView>
            
            
            
        }

      </View>
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
