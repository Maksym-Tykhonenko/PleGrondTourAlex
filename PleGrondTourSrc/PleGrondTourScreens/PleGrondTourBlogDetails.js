import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Share,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';

import PleGrondTourBackground from '../PleGrondTourCustomUi/PleGrondTourBackground';

const PleGrondTourBlogDetails = () => {
  const navigationGrondTour = useNavigation();
  const routeGrondTour = useRoute();
  const { article } = routeGrondTour.params;

  const shareArticleGrondTour = async () => {
    try {
      await Share.share({
        message: `${article.title}
${article.full}`,
      });
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <PleGrondTourBackground>
      <View style={{ paddingBottom: 60 }}>
        <View style={styles.grondTourHeader}>
          <TouchableOpacity onPress={() => navigationGrondTour.goBack()}>
            <Image
              source={require('../../assets/pleGrondTourImages/grondTourBackBtn.png')}
            />
          </TouchableOpacity>

          <Text style={styles.grondTourHeaderTitle}>Blog</Text>

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
          <Text style={styles.grondTourTitle}>{article.title}</Text>
          <Text style={styles.grondTourText}>{article.full}</Text>
        </View>

        <TouchableOpacity
          style={styles.grondTourShareWrapper}
          onPress={shareArticleGrondTour}
          activeOpacity={0.6}
        >
          <LinearGradient
            colors={['#DC272C', '#761518']}
            style={styles.grondTourShareBtn}
          >
            <Text style={styles.grondTourShareText}>Share</Text>
            <Image
              source={require('../../assets/pleGrondTourImages/grondTourBackShare.png')}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </PleGrondTourBackground>
  );
};

export default PleGrondTourBlogDetails;

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
  grondTourCard: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    padding: 20,
    marginBottom: 25,
  },
  grondTourTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 11,
  },

  grondTourText: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '300',
    color: '#fff',
  },
  grondTourShareWrapper: {
    width: '90%',
    alignSelf: 'center',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 8,
  },
  grondTourShareBtn: {
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  grondTourShareText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
});
