import { NavigationContainer } from '@react-navigation/native';
import { StoreProvider } from './PleGrondTourSrc/PleGrondTourStore/pleGrondTourStoreContext';
import PleGrondTourStack from './PleGrondTourSrc/PleGrondTourRoutes/PleGrondTourStack';

const App = () => {
  return (
    <NavigationContainer>
      <StoreProvider>
        <PleGrondTourStack />
      </StoreProvider>
    </NavigationContainer>
  );
};

export default App;
