import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CarDetails from '../pages/CarDetails';
import Attendance from '../pages/Attendance';

const Auth = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthRoutes: React.FC = () => (
  // <Auth.Navigator
  //   screenOptions={{
  //     headerTintColor: '#fff',
  //     headerTitleAlign: 'center',
  //     headerStyle: {
  //       backgroundColor: '#08A4BD',
  //     },
  //     cardStyle: { backgroundColor: '#f4f4f4' },
  //   }}
  // >
  //   <Auth.Screen name="Detalhes" component={CarDetails} />
  //   <Auth.Screen name="Atendimentos" component={Attendance} />
  // </Auth.Navigator>
  <Drawer.Navigator initialRouteName="Detalhes">
    <Drawer.Screen name="Detalhes" component={CarDetails} />
    <Drawer.Screen name="Atendimentos" component={Attendance} />
  </Drawer.Navigator>
);

export default AuthRoutes;
