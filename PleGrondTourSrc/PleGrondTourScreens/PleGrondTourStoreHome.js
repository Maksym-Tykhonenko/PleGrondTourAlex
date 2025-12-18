import {
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';

import PleGrondTourBackground from '../PleGrondTourCustomUi/PleGrondTourBackground';
import { grondTourFacts } from '../PleGrondTourData/grondTourFacts';
import { useStorage } from '../PleGrondTourStore/pleGrondTourStoreContext';
import { grondTourTracks } from '../PleGrondTourConsts/grondTourTracks';

const PleGrondTourStoreHome = () => {
  const navigationGrondTour = useNavigation();
  const [grondTourFactGrondTour, setGrondTourFactGrondTour] = useState('');
  const {
    isEnabledBackgroundMusic,
    setIsEnabledBackgroundMusic,
    setIsEnabledVibration,
  } = useStorage();

  const [grondTourCurrTrackGrondTour, setGrondTourCurrTrackGrondTour] =
    useState(0);
  const [grondTourSoundGrondTour, setGrondTourSoundGrondTour] = useState(null);

  useFocusEffect(
    useCallback(() => {
      grondTourLoadBgMusic();
      grondTourLoadVibration();
    }, []),
  );

  useEffect(() => {
    grondTourPlayTrack(grondTourCurrTrackGrondTour);

    return () => {
      if (grondTourSoundGrondTour) {
        grondTourSoundGrondTour.stop(() => {
          grondTourSoundGrondTour.release();
        });
      }
    };
  }, [grondTourCurrTrackGrondTour]);

  const grondTourPlayTrack = selIndex => {
    if (grondTourSoundGrondTour) {
      grondTourSoundGrondTour.stop(() => {
        grondTourSoundGrondTour.release();
      });
    }

    const newSoundGrondTour = new Sound(
      grondTourTracks[selIndex],
      Sound.MAIN_BUNDLE,
      error => {
        if (error) return;

        newSoundGrondTour.play(success => {
          if (success) {
            setGrondTourCurrTrackGrondTour(
              prev => (prev + 1) % grondTourTracks.length,
            );
          }
        });

        setGrondTourSoundGrondTour(newSoundGrondTour);
      },
    );
  };

  useEffect(() => {
    const updateVolumeGrondTour = async () => {
      try {
        const savedValueGrondTour = await AsyncStorage.getItem(
          'grond_tour_music',
        );
        const isOnMusicGrondTour = JSON.parse(savedValueGrondTour);

        setIsEnabledBackgroundMusic(isOnMusicGrondTour);
        if (grondTourSoundGrondTour) {
          grondTourSoundGrondTour.setVolume(isOnMusicGrondTour ? 1 : 0);
        }
      } catch {}
    };

    updateVolumeGrondTour();
  }, [grondTourSoundGrondTour]);

  useEffect(() => {
    if (grondTourSoundGrondTour) {
      grondTourSoundGrondTour.setVolume(isEnabledBackgroundMusic ? 1 : 0);
    }
  }, [grondTourSoundGrondTour, isEnabledBackgroundMusic]);

  const grondTourLoadBgMusic = async () => {
    try {
      const savedMusicValueGrondTour = await AsyncStorage.getItem(
        'grond_tour_music',
      );
      const isOnMusicGrondTour = JSON.parse(savedMusicValueGrondTour);
      setIsEnabledBackgroundMusic(isOnMusicGrondTour);
    } catch {}
  };

  const grondTourLoadVibration = async () => {
    try {
      const savedVibroValueGrondTour = await AsyncStorage.getItem(
        'grond_tour_vibration',
      );
      if (savedVibroValueGrondTour !== null) {
        const isOnGrondTour = JSON.parse(savedVibroValueGrondTour);
        setIsEnabledVibration(isOnGrondTour);
      }
    } catch {}
  };

  useFocusEffect(
    useCallback(() => {
      const randomFactGrondTour =
        grondTourFacts[Math.floor(Math.random() * grondTourFacts.length)];
      setGrondTourFactGrondTour(randomFactGrondTour);
    }, []),
  );

  const grondTourShareSelectedFact = async () => {
    try {
      await Share.share({
        message: grondTourFactGrondTour,
      });
    } catch {}
  };

  return (
    <PleGrondTourBackground>
      <View style={styles.grondTourContainer}>
        <View style={styles.grondTourHeader}>
          <Text style={styles.grondTourHeaderText}>Main menu</Text>

          <TouchableOpacity
            style={styles.grondTourSettingsButton}
            activeOpacity={0.7}
            onPress={() =>
              navigationGrondTour.navigate('PleGrondTourStoreSetup')
            }
          >
            <Image
              source={require('../../assets/pleGrondTourImages/grondTourBackSett.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.grondTourFactsContainer}>
          <Text style={styles.grondTourFactsTitle}>
            {grondTourFactGrondTour}
          </Text>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={grondTourShareSelectedFact}
            style={styles.grondTourShareButtonWrap}
          >
            <LinearGradient
              colors={['#DC272C', '#761518']}
              style={styles.grondTourShareButton}
            >
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 20 }}>
                Share
              </Text>

              <Image
                source={require('../../assets/pleGrondTourImages/grondTourBackShare.png')}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.grondTourShareButtonsWrapper}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() =>
              navigationGrondTour.navigate('PleGrondTourLocations')
            }
            style={styles.grondTourStartButtonWrap}
          >
            <LinearGradient
              colors={['#DC272C', '#761518']}
              style={styles.grondTourStartButton}
            >
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 20 }}>
                Start test
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigationGrondTour.navigate('PleGrondTourBlogList')}
          >
            <Image
              source={require('../../assets/pleGrondTourImages/grondTourBackBlog.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigationGrondTour.navigate('PleGrondTourSavedLocations')
            }
          >
            <Image
              source={require('../../assets/pleGrondTourImages/grondTourBackSaved.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.grondTourUnderline} />

        <View style={styles.grondTourAboutContainer}>
          <Text style={styles.grondTourAboutTitle}>
            Canada –{' '}
            <Text style={[styles.grondTourAboutTitle, { fontWeight: '300' }]}>
              brief description
            </Text>
          </Text>

          <View
            style={{ flexDirection: 'row', gap: 20, justifyContent: 'center' }}
          >
            <Image
              source={require('../../assets/pleGrondTourImages/grondTourBackAbout1.png')}
            />
            <Image
              source={require('../../assets/pleGrondTourImages/grondTourBackAbout2.png')}
            />
          </View>

          <Text style={styles.grondTourAboutSubtitle}>
            Canada{' '}
            <Text
              style={[styles.grondTourAboutSubtitle, { fontWeight: '300' }]}
            >
              is a vast and diverse country known for its breathtaking natural
              landscapes, multicultural cities, and welcoming spirit. Stretching
              from the Atlantic to the Pacific and far into the Arctic, it
              offers towering mountains, endless forests, dramatic coastlines,
              and some of the world’s clearest lakes. Its cities blend modern
              innovation with rich cultural heritage, shaped by Indigenous
              traditions and global influences.
            </Text>
          </Text>
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
    paddingBottom: 30,
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
    fontWeight: '800',
    color: '#000',
    textAlign: 'center',
  },

  grondTourSettingsButton: {
    position: 'absolute',
    right: 20,
    top: 56,
  },

  grondTourFactsContainer: {
    width: '90%',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    paddingTop: 25,
  },

  grondTourFactsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },

  grondTourUnderline: {
    width: '90%',
    height: 1,
    backgroundColor: '#fff',
    marginVertical: 30,
  },

  grondTourAboutContainer: {
    width: '90%',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },

  grondTourAboutTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 15,
  },

  grondTourAboutSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginTop: 15,
    textAlign: 'center',
    lineHeight: 20,
  },

  grondTourShareButtonWrap: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
    width: '100%',
  },

  grondTourShareButton: {
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  grondTourShareButtonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
    marginTop: 30,
    gap: 10,
  },

  grondTourStartButtonWrap: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
    flex: 1,
  },

  grondTourStartButton: {
    height: 57,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});

export default PleGrondTourStoreHome;
