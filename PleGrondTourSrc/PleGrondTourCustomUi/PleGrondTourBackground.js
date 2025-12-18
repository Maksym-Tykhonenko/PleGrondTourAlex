import { ImageBackground, ScrollView, StyleSheet } from 'react-native';

const PleGrondTourBackground = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/pleGrondTourImages/grondTourBack.png')}
      colors={['#00195E', '#001B2D']}
      style={styles.grondTourContainer}
    >
      <ScrollView
        contentContainerStyle={styles.grondTourScrollView}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {children}
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
  },
});

export default PleGrondTourBackground;
