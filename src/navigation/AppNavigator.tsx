// AppNavigator.tsx
import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Importar pantallas
import HomeScreen from '../screens/HomeScreen';
import TemperatureScreen from '../screens/TemperatureScreen';
import WindScreen from '../screens/WindScreen';
import SunScreen from '../screens/SunScreen';
import AboutScreen from '../screens/AboutScreen';
import SensorsScreen from '../screens/SensorsScreen';
import AdminLoginScreen from '../screens/AdminLoginScreen';

const Drawer = createDrawerNavigator();

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.drawerSafeArea} edges={['right', 'bottom', 'left']}>
      <View style={styles.drawerContainer}>
        {/* Encabezado */}
        <View style={styles.drawerHeader}>
          <Image 
            source={require('../../assets/UTD.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appTitle}>Sistema Meteorológico</Text>
          <Text style={styles.appSubtitle}>Universidad Tecnológica de Durango</Text>
        </View>

        {/* Botones de navegación */}
        {[
          { name: 'Home', icon: 'home', label: 'Inicio', color: '#0A7764' },
          { name: 'Temperature', icon: 'device-thermostat', label: 'Temperatura', color: '#D78909' },
          { name: 'Wind', icon: 'air', label: 'Viento', color: '#0A7764' },
          { name: 'Sun', icon: 'wb-sunny', label: 'Radiación Solar', color: '#D78909' },
          { name: 'Sensors', icon: 'sensors', label: 'Sensores IoT', color: '#0A7764' },
          { name: 'AdminLogin', icon: 'login', label: 'Login', color: '#D78909' }, // Changed to yellow and label to "Login"
          { name: 'About', icon: 'info', label: 'Sobre Nosotros', color: '#0A7764' },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.drawerItem}
            onPress={() => navigation.navigate(item.name)}
          >
            <Icon name={item.icon} size={24} color={item.color} style={styles.drawerIcon} />
            <Text style={[styles.drawerItemText, { color: item.color }]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 UTD - Todos los derechos reservados</Text>
      </View>
    </SafeAreaView>
  );
};

const AppNavigator = () => {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#0A7764" barStyle="light-content" />
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            drawerPosition: 'left',
            headerShown: false,
            drawerType: 'slide',
            drawerStyle: {
              width: 300,
              backgroundColor: '#FFFFFF',
            },
            overlayColor: 'rgba(0, 0, 0, 0.3)',
            swipeEnabled: true,
          }}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Temperature" component={TemperatureScreen} />
          <Drawer.Screen name="Wind" component={WindScreen} />
          <Drawer.Screen name="Sun" component={SunScreen} />
          <Drawer.Screen name="Sensors" component={SensorsScreen} />
          <Drawer.Screen name="AdminLogin" component={AdminLoginScreen} />
          <Drawer.Screen name="About" component={AboutScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  drawerSafeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  drawerContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  drawerHeader: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A7764',
    marginBottom: 4,
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 12,
    textAlign: 'center',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: '#FAFAFA',
  },
  drawerIcon: {
    marginRight: 16,
  },
  drawerItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerText: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'center',
  },
});

export default AppNavigator;