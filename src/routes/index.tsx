import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CarDetails from '../pages/CarDetails';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#08A4BD',
      },
      cardStyle: { backgroundColor: '#f4f4f4' },
    }}
  >
    <Auth.Screen name="Detalhes" component={CarDetails} />
  </Auth.Navigator>
);

export default AuthRoutes;
