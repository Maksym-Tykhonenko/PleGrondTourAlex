import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import PleGrondTourBackground from '../PleGrondTourCustomUi/PleGrondTourBackground';

import { locationsByCategory } from '../PleGrondTourData/locationsByCategory';

const getAllLocationsGrondTour = () => {
  return Object.values(locationsByCategory).flat();
};

const PleGrondTourSavedLocations = () => {
  const navigationGrondTour = useNavigation();
  const [savedLocationsGrondTour, setSavedLocationsGrondTour] = useState([]);

  useEffect(() => {
    loadSavedLocationsGrondTour();
  }, []);

  const loadSavedLocationsGrondTour = async () => {
    try {
      const savedGrondTourLocs = await AsyncStorage.getItem(
        'grondTour_saved_places',
      );
      let savedGrondTourIds = savedGrondTourLocs
        ? JSON.parse(savedGrondTourLocs)
        : [];

      savedGrondTourIds = savedGrondTourIds.map(currId => Number(currId));

      const allSavedLocations = getAllLocationsGrondTour();

      const filteredGrondTourLocations = allSavedLocations.filter(filteredLoc =>
        savedGrondTourIds.includes(Number(filteredLoc.id)),
      );

      setSavedLocationsGrondTour(filteredGrondTourLocations);
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <PleGrondTourBackground>
      <View style={{ alignItems: 'center', paddingBottom: 40 }}>
        <View style={styles.grondTourHeader}>
          <TouchableOpacity onPress={() => navigationGrondTour.goBack()}>
            <Image
              source={require('../../assets/pleGrondTourImages/grondTourBackBtn.png')}
            />
          </TouchableOpacity>

          <Text style={styles.grondTourHeaderTitle}>Saved</Text>

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

        {savedLocationsGrondTour.length === 0 && (
          <Text style={styles.grondTourEmptyText}>No saved locations yet.</Text>
        )}

        {savedLocationsGrondTour.map(locGrondTour => (
          <View key={locGrondTour.id} style={styles.grondTourCard}>
            <Image source={locGrondTour.image} style={styles.grondTourImage} />

            <Text style={styles.grondTourTitle}>{locGrondTour.title}</Text>
            <TouchableOpacity
              onPress={() =>
                navigationGrondTour.navigate(
                  'PleGrondTourLocationCardDetails',
                  { location: locGrondTour },
                )
              }
              style={styles.grondTourOpenBtnWrapper}
            >
              <LinearGradient
                colors={['#DC272C', '#761518']}
                style={styles.grondTourOpenBtn}
              >
                <Text style={styles.grondTourOpenBtnText}>Open</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </PleGrondTourBackground>
  );
};

export default PleGrondTourSavedLocations;

const styles = StyleSheet.create({
  grondTourHeader: {
    width: '100%',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  grondTourHeaderTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000',
  },
  grondTourEmptyText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
  },
  grondTourCard: {
    width: '90%',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
    padding: 15,
    marginBottom: 25,
    alignItems: 'center',
  },
  grondTourImage: {
    width: '100%',
    height: 155,
    borderRadius: 12,
  },
  grondTourTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
  },
  grondTourOpenBtnWrapper: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 12,
    marginTop: 12,
  },
  grondTourOpenBtn: {
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grondTourOpenBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
});
