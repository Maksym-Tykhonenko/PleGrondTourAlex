import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, Image } from 'react-native';
import PleGrondTourBackground from './PleGrondTourBackground';
import { useNavigation } from '@react-navigation/native';

const PleGrondTourCustomLoader = () => {
  const navigation = useNavigation();
  const [isVisibleLogo, setIsVisibleLogo] = useState(false);

  const introSpieleMergurLoaderHTML = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=0.8">

<style>
  body {
    margin: 0;
    padding: 0;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .loader .box {
    background-color: rgb(84, 84, 84);
    width: 220px;
    height: 220px;
    padding: 20px;
    border-radius: 20px;
    border: 5px solid gray;
    position: relative;
    overflow: hidden;
    box-shadow: 3px 4px 5px rgb(193, 193, 193);
  }

  .screen {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: black;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    border-radius: 10px;
    padding: 10px;
    overflow: hidden;
  }

  .lightray-limit {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    overflow: hidden;
    border-radius: 10px;
  }

  .lightray {
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-50%, -50%);
    width: 250%;
    height: 250%;
    background-image: radial-gradient(#ffffffa1, transparent, transparent);
    border-radius: 10px 10px 0 0;
    animation: moveLight 4s infinite linear;
    opacity: 0.7;
  }

  @keyframes moveLight {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }

  .loader-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    padding: 5px;
    border: 5px solid #fff;
  }

  .progress {
    width: 0;
    height: 5px;
    background-color: #fff;
    animation: progress 5s infinite;
  }

  @keyframes progress {
    from { width: 0; }
    to { width: 100%; }
  }

  .top-side {
    position: absolute;
    width: 100%;
    height: 100%;
    top: -55px;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    box-shadow: 10px 10px 10px #1f1f1f8a;
    background-color: #1f1f1f8a;
  }

  .bottom-side {
    position: absolute;
    width: 100%;
    height: 100%;
    top: calc(100% + 60px);
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    box-shadow: -10px -10px 10px #a5a5a5;
    background-color: #a5a5a5;
  }
</style>
</head>

<body>
  <div class="loader">
    <div class="box">
      <div class="top-side"></div>
      <div class="bottom-side"></div>

      <div class="screen">

        <div class="lightray-limit">
          <div class="lightray"></div>
        </div>

        <div class="loader-box">
          <div class="progress"></div>
        </div>

      </div>
    </div>
  </div>
</body>
</html>
  `;

  useEffect(() => {
    setTimeout(() => {
      setIsVisibleLogo(true);
      setTimeout(() => {
        navigation.replace('PleGrondTourStoreOnboarding');
      }, 2000);
    }, 3000);
  }, []);

  return (
    <PleGrondTourBackground>
      <View style={styles.spielMergurLoader}>
        {isVisibleLogo ? (
          <>
            <Image
              source={require('../../assets/pleGrondTourImages/grondTourBacklgo.png')}
              style={{ marginBottom: 20 }}
            />
            <Image
              source={require('../../assets/pleGrondTourImages/grondTourBacklgo2.png')}
            />
          </>
        ) : (
          <WebView
            originWhitelist={['*']}
            source={{ html: introSpieleMergurLoaderHTML }}
            style={{
              width: 360,
              backgroundColor: 'transparent',
            }}
            scrollEnabled={false}
          />
        )}
      </View>
    </PleGrondTourBackground>
  );
};

const styles = StyleSheet.create({
  spielMergurLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PleGrondTourCustomLoader;
