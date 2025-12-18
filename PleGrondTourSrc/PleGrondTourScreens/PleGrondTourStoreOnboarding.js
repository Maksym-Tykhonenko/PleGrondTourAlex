import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import { pleGrondTourOnboardInfo } from '../PleGrondTourData/pleGrondTourOnboardInfo';

const PleGrondTourStoreOnboarding = () => {
  const navigation = useNavigation();
  const [grondTourCurrentIndex, setGrondTourCurrentIndex] = useState(0);

  const handleNextGrondTourIdxPress = () => {
    grondTourCurrentIndex < 3
      ? setGrondTourCurrentIndex(grondTourCurrentIndex + 1)
      : navigation.replace('PleGrondTourStoreHome');
  };

  return (
    <ImageBackground
      source={pleGrondTourOnboardInfo[grondTourCurrentIndex].welcomeBackground}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.grondTourScrollView}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.grondTourContainer}>
          {grondTourCurrentIndex !== 3 ? (
            <View style={styles.grondTourHeader}>
              <Text style={styles.grondTourHeaderText}>
                {pleGrondTourOnboardInfo[grondTourCurrentIndex].welcomeTitle}
              </Text>
              <Text style={styles.grondTourHeaderSub}>
                {
                  pleGrondTourOnboardInfo[grondTourCurrentIndex]
                    .welcomeDescription
                }
              </Text>
            </View>
          ) : (
            <Image
              source={require('../../assets/pleGrondTourImages/grondTourBackWelcLogo.png')}
              style={{ marginTop: 88 }}
            />
          )}

          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Image
              source={
                pleGrondTourOnboardInfo[grondTourCurrentIndex].welcomeImage
              }
            />
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={handleNextGrondTourIdxPress}
              style={{
                borderWidth: 2,
                borderColor: '#fff',
                borderRadius: 10,
                position: 'absolute',
                bottom: 50,
              }}
            >
              <LinearGradient
                colors={['#DC272C', '#761518']}
                style={{
                  width: 200,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}
                >
                  {
                    pleGrondTourOnboardInfo[grondTourCurrentIndex]
                      .welocomeButtonText
                  }
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
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
    paddingTop: 70,
    padding: 40,
    minHeight: 260,
    marginBottom: 20,
  },
  grondTourHeaderText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  grondTourHeaderSub: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    fontWeight: '400',
  },
});

export default PleGrondTourStoreOnboarding;
