import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Vibration,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import PleGrondTourBackground from '../PleGrondTourCustomUi/PleGrondTourBackground';
import { locationsByCategory } from '../PleGrondTourData/locationsByCategory';
import { quizQuestions } from '../PleGrondTourConsts/quizQuestions';
import { useStorage } from '../PleGrondTourStore/pleGrondTourStoreContext';

const PleGrondTourLocations = () => {
  const [selectedQuestionsGrondTour, setSelectedQuestionsGrondTour] = useState(
    [],
  );
  const [stepGrondTour, setStepGrondTour] = useState('quiz');
  const [quizIndexGrondTour, setQuizIndexGrondTour] = useState(0);
  const [scoreGrondTour, setScoreGrondTour] = useState({ A: 0, B: 0, C: 0 });
  const [finalCategoryGrondTour, setFinalCategoryGrondTour] = useState(null);
  const [selectedOptionGrondTour, setSelectedOptionGrondTour] = useState(null);
  const { isEnabledVibration } = useStorage();

  const navigationGrondTour = useNavigation();

  useEffect(() => {
    const grondTourShuffArr = [...quizQuestions].sort(
      () => Math.random() - 0.5,
    );
    setSelectedQuestionsGrondTour(grondTourShuffArr.slice(0, 4));
  }, []);

  const chooseOptionGrondTour = selectedType => {
    setSelectedOptionGrondTour(selectedType);
    if (isEnabledVibration) {
      Vibration.vibrate(50);
    }
  };

  const nextQuestionGrondTour = () => {
    if (!selectedOptionGrondTour) return;

    setScoreGrondTour(prevType => ({
      ...prevType,
      [selectedOptionGrondTour]: prevType[selectedOptionGrondTour] + 1,
    }));

    if (quizIndexGrondTour < 3) {
      setQuizIndexGrondTour(prevIdx => prevIdx + 1);
      setSelectedOptionGrondTour(null);
      return;
    }

    finishQuizGrondTour();
  };

  const finishQuizGrondTour = () => {
    const maxGrondTourQuizVal = Math.max(
      scoreGrondTour.A,
      scoreGrondTour.B,
      scoreGrondTour.C,
    );

    let selectedCategory = 'A';
    if (scoreGrondTour.B === maxGrondTourQuizVal) selectedCategory = 'B';
    if (scoreGrondTour.C === maxGrondTourQuizVal) selectedCategory = 'C';

    setFinalCategoryGrondTour(selectedCategory);
    setStepGrondTour('results');
  };

  if (stepGrondTour === 'quiz') {
    if (selectedQuestionsGrondTour.length === 0) return null;

    const currGrondTourQuestion =
      selectedQuestionsGrondTour[quizIndexGrondTour];

    const optionStyleGrondTour = selOpt =>
      selectedOptionGrondTour === selOpt
        ? styles.grondTourOptionRed
        : styles.grondTourOption;

    return (
      <PleGrondTourBackground>
        <View style={styles.grondTourContainer}>
          <View style={styles.grondTourHeader}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigationGrondTour.goBack()}
            >
              <Image
                source={require('../../assets/pleGrondTourImages/grondTourBackBtn.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
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

          <View style={styles.grondTourQuestionContainer}>
            <Text style={styles.grondTourQuestion}>
              {currGrondTourQuestion.question}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => chooseOptionGrondTour('A')}
            style={optionStyleGrondTour('A')}
            activeOpacity={0.6}
          >
            <Text style={styles.grondTourOptionText}>
              {currGrondTourQuestion.A}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => chooseOptionGrondTour('B')}
            style={optionStyleGrondTour('B')}
          >
            <Text style={styles.grondTourOptionText}>
              {currGrondTourQuestion.B}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => chooseOptionGrondTour('C')}
            style={optionStyleGrondTour('C')}
          >
            <Text style={styles.grondTourOptionText}>
              {currGrondTourQuestion.C}
            </Text>
          </TouchableOpacity>

          {selectedOptionGrondTour && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={nextQuestionGrondTour}
                style={{
                  borderWidth: 2,
                  borderColor: '#fff',
                  borderRadius: 10,
                  marginTop: 50,
                }}
              >
                <LinearGradient
                  colors={['#DC272C', '#761518']}
                  style={{
                    width: 174,
                    height: 60,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}
                  >
                    Next
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </PleGrondTourBackground>
    );
  }

  if (stepGrondTour === 'results') {
    const listGrondTour = locationsByCategory[finalCategoryGrondTour];

    return (
      <PleGrondTourBackground>
        <View style={{ alignItems: 'center' }}>
          <View style={[styles.grondTourHeader, { marginBottom: 20 }]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigationGrondTour.goBack()}
            >
              <Image
                source={require('../../assets/pleGrondTourImages/grondTourBackBtn.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
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

          {listGrondTour.map(locGrondTour => (
            <View key={locGrondTour.id} style={styles.grondTourLocationCard}>
              <Image
                source={locGrondTour.image}
                style={styles.grondTourLocationImg}
              />

              <Text style={styles.grondTourLocationTitle}>
                {locGrondTour.title}
              </Text>

              <TouchableOpacity
                activeOpacity={0.6}
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
                  <Text
                    style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}
                  >
                    Open
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </PleGrondTourBackground>
    );
  }

  return null;
};

const styles = StyleSheet.create({
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    padding: 20,
    minHeight: 110,
    marginBottom: 80,
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  grondTourHeaderText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    textAlign: 'center',
  },
  grondTourQuestionContainer: {
    width: '90%',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
    padding: 20,
    minHeight: 140,
    justifyContent: 'center',
    marginBottom: 60,
  },
  grondTourQuestion: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
  },
  grondTourOption: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
    padding: 15,
    width: '90%',
    marginBottom: 20,
  },
  grondTourOptionRed: {
    borderWidth: 5,
    borderColor: '#DC272C',
    borderRadius: 20,
    padding: 15,
    width: '90%',
    marginBottom: 20,
  },
  grondTourOptionText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  grondTourLocationCard: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
    width: '90%',
    marginBottom: 25,
    overflow: 'hidden',
    padding: 17,
  },
  grondTourLocationImg: {
    width: '100%',
    height: 155,
    borderRadius: 12,
  },
  grondTourLocationTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
  },
  grondTourOpenBtnWrapper: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
    marginTop: 12,
    width: '100%',
    alignSelf: 'center',
  },
  grondTourOpenBtn: {
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PleGrondTourLocations;
