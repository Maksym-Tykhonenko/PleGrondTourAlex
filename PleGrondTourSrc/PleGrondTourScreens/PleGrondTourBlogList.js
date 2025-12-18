import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { pleGrondTourBlogArt as pleGrondTourBlogArtGrondTour } from '../PleGrondTourConsts/pleGrondTourBlogArt';

import PleGrondTourBackground from '../PleGrondTourCustomUi/PleGrondTourBackground';

const PleGrondTourBlogList = () => {
  const navigationGrondTour = useNavigation();

  return (
    <PleGrondTourBackground>
      <View contentContainerStyle={{ paddingBottom: 40 }}>
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

        {pleGrondTourBlogArtGrondTour.map(articleGrondTour => (
          <TouchableOpacity
            key={articleGrondTour.id}
            activeOpacity={0.8}
            onPress={() =>
              navigationGrondTour.navigate('PleGrondTourBlogDetails', {
                article: articleGrondTour,
              })
            }
            style={styles.grondTourCard}
          >
            <Text style={styles.grondTourTitle}>{articleGrondTour.title}</Text>
            <Text style={styles.grondTourPreview}>
              {articleGrondTour.preview}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </PleGrondTourBackground>
  );
};

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
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  grondTourCard: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    padding: 18,
    marginBottom: 25,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  grondTourTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 11,
  },
  grondTourPreview: {
    fontSize: 13,
    fontWeight: '300',
    color: '#fff',
  },
});

export default PleGrondTourBlogList;
