import * as React from 'react';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

// Nouveaux imports de navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Tes écrans
import Main from './screens/Players';
import QuizIndex from "./screens/QuizIndex";
import Quiz from "./screens/Quiz";
import QuizResult from "./screens/Results";
import Welcome from './screens/Welcome';
import Rules from './screens/Rules';

const store = ConfigureStore();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
<Stack.Navigator 
          initialRouteName="Welcome"
          screenOptions={{
            // 1. Supprime le titre/header sur TOUTES les pages
            headerShown: false, 
            // 2. Empêche le retour en arrière par geste (glisser le doigt) sur iOS
            gestureEnabled: false, 
          }}
        >
          <Stack.Screen 
            name="Welcome" 
            component={Welcome} 
            options={{ title: "Pour ou Contre" }} 
          />
          
          <Stack.Screen 
            name="Rules" 
            component={Rules} 
            options={{ title: "Règles" }} 
          />

          <Stack.Screen 
            name="Mainscreen" 
            component={Main} 
            options={{ title: "Joueurs" }} 
          />

          <Stack.Screen 
            name="QuizIndex" 
            component={QuizIndex} 
            options={{ title: "Quizzes" }} 
          />

          <Stack.Screen 
            name="Quiz" 
            component={Quiz} 
            options={({ route }) => ({
              headerLeft: () => null,
              title: route.params?.title || "Quiz",
              headerTintColor: "#fff",
              headerStyle: {
                backgroundColor: route.params?.color || "#000",
              }
            })} 
          />

          <Stack.Screen 
            name="QuizResult" 
            component={QuizResult} 
            options={{ 
              headerLeft: () => null, 
              title: "Résultat" 
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}