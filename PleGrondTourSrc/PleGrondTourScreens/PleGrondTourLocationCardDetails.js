import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Share,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

import PleGrondTourBackground from '../PleGrondTourCustomUi/PleGrondTourBackground';

const PleGrondTourLocationCardDetails = () => {
  const navigationGrondTour = useNavigation();
  const routeGrondTour = useRoute();
  const { location } = routeGrondTour.params;

  const [savedGrondTour, setSavedGrondTour] = useState(false);
  const [visitedGrondTour, setVisitedGrondTour] = useState(false);

  useEffect(() => {
    loadStatesGrondTour();
  }, []);

  const loadStatesGrondTour = async () => {
    try {
      const savedGrondTourLocs = await AsyncStorage.getItem(
        'grondTour_saved_places',
      );
      const visitedGrondTourLocs = await AsyncStorage.getItem(
        'grondTour_visited_places',
      );

      const savedList = savedGrondTourLocs
        ? JSON.parse(savedGrondTourLocs)
        : [];
      const visitedList = visitedGrondTourLocs
        ? JSON.parse(visitedGrondTourLocs)
        : [];

      setSavedGrondTour(savedList.includes(location.id));
      setVisitedGrondTour(visitedList.includes(location.id));
    } catch (error) {
      console.log('error');
    }
  };

  const toggleSaveGrondTour = async () => {
    const savedGrondTourLocs = await AsyncStorage.getItem(
      'grondTour_saved_places',
    );
    let savedList = savedGrondTourLocs ? JSON.parse(savedGrondTourLocs) : [];

    if (savedGrondTour) {
      savedList = savedList.filter(
        selId => Number(selId) !== Number(location.id),
      );
    } else {
      savedList.push(Number(location.id));
    }

    await AsyncStorage.setItem(
      'grondTour_saved_places',
      JSON.stringify(savedList),
    );
    setSavedGrondTour(!savedGrondTour);
  };

  const toggleVisitedGrondTour = async () => {
    const visitedGrondTourLocs = await AsyncStorage.getItem(
      'grondTour_visited_places',
    );
    let visitedGrondTourList = visitedGrondTourLocs
      ? JSON.parse(visitedGrondTourLocs)
      : [];

    if (visitedGrondTour) {
      visitedGrondTourList = visitedGrondTourList.filter(
        selId => selId !== location.id,
      );
    } else {
      visitedGrondTourList.push(location.id);
    }

    await AsyncStorage.setItem(
      'grondTour_visited_places',
      JSON.stringify(visitedGrondTourList),
    );
    setVisitedGrondTour(!visitedGrondTour);
  };

  const sharePlaceGrondTour = async () => {
    try {
      await Share.share({
        message: `${location.title}\n\n${location.description}\n\nCoordinates: ${location.coords}`,
      });
    } catch (e) {}
  };

  const openInMapsGrondTour = () => {
    const grondTourMapUrl = `https://www.google.com/maps/search/?api=1&query=${location.coords}`;
    Linking.openURL(grondTourMapUrl);
  };

  const parseCoordsGrondTour = selectedCoords => {
    try {
      const [lat, lng] = selectedCoords
        .replace(/°|N|W|S|E/g, '')
        .split(',')
        .map(v => parseFloat(v.trim()));
      return { lat, lng };
    } catch {
      return { lat: 0, lng: 0 };
    }
  };

  const { lat, lng } = parseCoordsGrondTour(location.coords);

  return (
    <PleGrondTourBackground>
      <View style={{ alignItems: 'center', paddingBottom: 40 }}>
        <View style={styles.grondTourHeader}>
          <TouchableOpacity onPress={() => navigationGrondTour.goBack()}>
            <Image
              source={require('../../assets/pleGrondTourImages/grondTourBackBtn.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigationGrondTour.navigate('PleGrondTourStoreSetup')
            }
          >
            <Image
              source={require('../../assets/pleGrondTourImages/grondTourBackSett.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.grondTourCard}>
          <Image source={location.image} style={styles.grondTourImage} />

          <Text style={styles.grondTourTitle}>{location.title}</Text>

          <View style={styles.grondTourSeparator} />

          <Text style={styles.grondTourCoords}>{location.coords}</Text>

          <View style={styles.grondTourSeparator} />

          <Text style={styles.grondTourDescription}>
            {location.description}
          </Text>

          <Text style={styles.grondTourHighlights}>
            Highlights: {location.highlights}
          </Text>
        </View>

        <View style={styles.grondTourRow}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.grondTourActionBtn, { flex: 1 }]}
            onPress={sharePlaceGrondTour}
          >
            <LinearGradient
              colors={['#DC272C', '#761518']}
              style={styles.grondTourActionBtnBg}
            >
              <Text style={styles.grondTourActionBtnText}>Share</Text>
              <Image
                source={require('../../assets/pleGrondTourImages/grondTourBackShare.png')}
              />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.grondTourActionBtn,
              visitedGrondTour && { borderColor: '#DC272C' },
            ]}
            onPress={toggleVisitedGrondTour}
          >
            <LinearGradient
              colors={
                visitedGrondTour ? ['#777', '#999'] : ['#DC272C', '#761518']
              }
              style={styles.grondTourActionBtnBg}
            >
              <Text style={styles.grondTourActionBtnText}>
                {visitedGrondTour ? 'Visited' : 'Visit'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleSaveGrondTour} activeOpacity={0.6}>
            <Image
              source={
                savedGrondTour
                  ? require('../../assets/pleGrondTourImages/grondTourSaved.png')
                  : require('../../assets/pleGrondTourImages/grondTourSave.png')
              }
              style={{ width: 45, height: 45 }}
            />
          </TouchableOpacity>
        </View>

        <MapView
          style={styles.grondTourMap}
          initialRegion={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.15,
            longitudeDelta: 0.15,
          }}
        >
          <Marker coordinate={{ latitude: lat, longitude: lng }}>
            <Image
              source={require('../../assets/pleGrondTourImages/grondTourMarker.png')}
            />
          </Marker>
        </MapView>

        <TouchableOpacity
          style={styles.grondTourOpenMapBtn}
          onPress={openInMapsGrondTour}
        >
          <LinearGradient
            colors={['#DC272C', '#761518']}
            style={styles.grondTourOpenMapBg}
          >
            <Text style={styles.grondTourOpenMapText}>Open in map</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </PleGrondTourBackground>
  );
};

export default PleGrondTourLocationCardDetails;

const styles = StyleSheet.create({
  grondTourHeader: {
    width: '100%',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 60,
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  grondTourCard: {
    width: '90%',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 25,
    padding: 20,
    marginBottom: 15,
  },
  grondTourImage: {
    width: '100%',
    height: 154,
    borderRadius: 15,
  },
  grondTourTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginTop: 12,
  },
  grondTourSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: '#fff',
    opacity: 0.7,
    marginVertical: 15,
  },
  grondTourCoords: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '300',
  },
  grondTourDescription: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '400',
  },
  grondTourHighlights: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 5,
  },
  grondTourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
    width: '90%',
  },
  grondTourActionBtn: {
    width: '32%',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
  },
  grondTourActionBtnBg: {
    height: 41,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  grondTourActionBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  grondTourMap: {
    width: '90%',
    height: 260,
    borderRadius: 20,
    overflow: 'hidden',
  },
  grondTourOpenMapBtn: {
    width: '90%',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 8,
    marginTop: 20,
  },
  grondTourOpenMapBg: {
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grondTourOpenMapText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
});
