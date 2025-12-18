import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PleGrondTourBackground from '../PleGrondTourCustomUi/PleGrondTourBackground';
import { useStorage } from '../PleGrondTourStore/pleGrondTourStoreContext';

const PleGrondTourStoreSetup = () => {
  const navigationGrondTour = useNavigation();
  const {
    isEnabledBackgroundMusic,
    setIsEnabledBackgroundMusic,
    isEnabledVibration,
    setIsEnabledVibration,
  } = useStorage();

  const toggleBackgroundMusicGrondTour = async selectedValue => {
    try {
      await AsyncStorage.setItem(
        'grond_tour_music',
        JSON.stringify(selectedValue),
      );
      setIsEnabledBackgroundMusic(selectedValue);
    } catch {}
  };

  const toggleBackgroundVibrationGrondTour = async selectedValue => {
    try {
      await AsyncStorage.setItem(
        'grond_tour_vibration',
        JSON.stringify(selectedValue),
      );
      setIsEnabledVibration(selectedValue);
    } catch {}
  };

  return (
    <PleGrondTourBackground>
      <View style={styles.grondTourContainer}>
        <View style={styles.grondTourHeader}>
          <Text style={styles.grondTourHeaderText}>Settings</Text>

          <TouchableOpacity
            style={styles.grondTourBackButton}
            activeOpacity={0.7}
            onPress={() => navigationGrondTour.goBack()}
          >
            <Image
              source={require('../../assets/pleGrondTourImages/grondTourBackBtn.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.grondTourSwitchContainer}>
          <Text style={styles.grondTourFactsTitle}>Music</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              toggleBackgroundMusicGrondTour(!isEnabledBackgroundMusic)
            }
          >
            {isEnabledBackgroundMusic ? (
              <Image
                source={require('../../assets/pleGrondTourImages/grondTourSwitchOn.png')}
              />
            ) : (
              <Image
                source={require('../../assets/pleGrondTourImages/grondTourSwitchOff.png')}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.grondTourSwitchContainer}>
          <Text style={styles.grondTourFactsTitle}>Vibration</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              toggleBackgroundVibrationGrondTour(!isEnabledVibration)
            }
          >
            {isEnabledVibration ? (
              <Image
                source={require('../../assets/pleGrondTourImages/grondTourSwitchOn.png')}
              />
            ) : (
              <Image
                source={require('../../assets/pleGrondTourImages/grondTourSwitchOff.png')}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.grondTourShareButtonBottom}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() =>
              Linking.openURL(
                'https://apps.apple.com/us/app/ple-grond-tour/id6756440344',
              )
            }
            style={styles.grondTourShareButtonWrap}
          >
            <LinearGradient
              colors={['#DC272C', '#761518']}
              style={styles.grondTourShareButton}
            >
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 20 }}>
                Share the app
              </Text>
              <Image
                source={require('../../assets/pleGrondTourImages/grondTourBackShare.png')}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </PleGrondTourBackground>
  );
};

const styles = StyleSheet.create({
  grondTourScrollView: {
    flexGrow: 1,
  },
  grondTourContainer: {
    flex: 1,
    alignItems: 'center',
  },
  grondTourHeader: {
    width: '100%',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    padding: 30,
    minHeight: 110,
    marginBottom: 30,
  },
  grondTourHeaderText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  grondTourBackButton: {
    position: 'absolute',
    left: 20,
    top: 56,
  },
  grondTourSwitchContainer: {
    width: '90%',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  grondTourFactsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  grondTourShareButtonBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 60,
    width: '100%',
  },
  grondTourShareButtonWrap: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
    width: '90%',
  },
  grondTourShareButton: {
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});

export default PleGrondTourStoreSetup;
