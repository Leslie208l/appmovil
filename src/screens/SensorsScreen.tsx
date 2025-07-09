import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

const colors = {
  primary: '#0A7764',
  primaryLight: '#0F9B87',
  white: '#FFFFFF',
  textDark: '#2C2C2C',
  textMedium: '#5A5A5A',
  textLight: '#FFFFFF',
  background: '#F8F9FA',
  cardBackground: '#FDFDFD',
  temperature: '#D78909',
  humidity: '#2E86C1',
  pressure: '#DCA901',
  wind: '#0A7764',
  rain: '#5DADE2',
  light: '#F39C12',
  error: '#E74C3C',
  success: '#2ECC71',
  warning: '#F39C12',
  shadow: '#E5E5E5',
  accent: '#F0F4F3',
};

const SensorsScreen = () => {
  const navigation = useNavigation();
  const [selectedSensor, setSelectedSensor] = useState<number | null>(null);

  const sensors = [
    {
      id: 1,
      name: 'Sensor de Temperatura',
      model: 'DHT22',
      icon: 'device-thermostat',
      color: colors.temperature,
      parameters: 'Temperatura (-40°C a 80°C)',
      accuracy: '±0.5°C',
      status: 'Activo',
      lastReading: '25.4°C',
      lastUpdate: 'Hace 2 minutos',
      voltage: '3.3V',
      location: 'Exterior - Norte',
      serialNumber: 'DHT22-001',
      installDate: '15/03/2024',
      batteryLevel: 85,
    },
    {
      id: 2,
      name: 'Sensor de Humedad',
      model: 'DHT22',
      icon: 'water-drop',
      color: colors.humidity,
      parameters: 'Humedad relativa (0% a 100%)',
      accuracy: '±2%',
      status: 'Activo',
      lastReading: '65%',
      lastUpdate: 'Hace 2 minutos',
      voltage: '3.3V',
      location: 'Exterior - Norte',
      serialNumber: 'DHT22-002',
      installDate: '15/03/2024',
      batteryLevel: 85,
    },
    {
      id: 3,
      name: 'Sensor de Presión Atmosférica',
      model: 'BMP280',
      icon: 'speed',
      color: colors.pressure,
      parameters: 'Presión (300hPa a 1100hPa)',
      accuracy: '±1 hPa',
      status: 'Activo',
      lastReading: '1013.25 hPa',
      lastUpdate: 'Hace 3 minutos',
      voltage: '3.3V',
      location: 'Interior - Estación',
      serialNumber: 'BMP280-001',
      installDate: '15/03/2024',
      batteryLevel: 92,
    },
    {
      id: 4,
      name: 'Sensor de Velocidad del Viento',
      model: 'Anemómetro',
      icon: 'air',
      color: colors.wind,
      parameters: 'Velocidad (0 a 50 m/s)',
      accuracy: '±0.5 m/s',
      status: 'Activo',
      lastReading: '12 km/h',
      lastUpdate: 'Hace 1 minuto',
      voltage: '5V',
      location: 'Exterior - Torre',
      serialNumber: 'ANEM-001',
      installDate: '15/03/2024',
      batteryLevel: 78,
    },
    {
      id: 5,
      name: 'Sensor de Lluvia',
      model: 'Pluviómetro',
      icon: 'grain',
      color: colors.rain,
      parameters: 'Precipitación (0 a 200 mm/h)',
      accuracy: '±1 mm',
      status: 'Activo',
      lastReading: '0 mm',
      lastUpdate: 'Hace 5 minutos',
      voltage: '5V',
      location: 'Exterior - Torre',
      serialNumber: 'PLUV-001',
      installDate: '15/03/2024',
      batteryLevel: 88,
    },
    {
      id: 6,
      name: 'Sensor de Radiación Solar',
      model: 'BH1750',
      icon: 'wb-sunny',
      color: colors.light,
      parameters: 'Intensidad lumínica (1-65535 lux)',
      accuracy: '±20%',
      status: 'Mantenimiento',
      lastReading: 'N/A',
      lastUpdate: 'Hace 1 hora',
      voltage: '3.3V',
      location: 'Exterior - Sur',
      serialNumber: 'BH1750-001',
      installDate: '15/03/2024',
      batteryLevel: 15,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo':
        return colors.success;
      case 'Inactivo':
        return colors.error;
      case 'Mantenimiento':
        return colors.warning;
      default:
        return colors.textMedium;
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return colors.success;
    if (level > 20) return colors.warning;
    return colors.error;
  };

  const getBatteryIcon = (level: number) => {
    if (level > 80) return 'battery-full';
    if (level > 60) return 'battery-5-bar';
    if (level > 40) return 'battery-4-bar';
    if (level > 20) return 'battery-2-bar';
    return 'battery-1-bar';
  };

  const handleSensorPress = (sensorId: number) => {
    setSelectedSensor(selectedSensor === sensorId ? null : sensorId);
  };

  const handleCalibrate = (sensorName: string) => {
    Alert.alert(
      'Calibrar Sensor',
      `¿Deseas calibrar el ${sensorName}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Calibrar', onPress: () => {
          Alert.alert('Calibración', 'Sensor calibrado correctamente');
        }},
      ]
    );
  };

  const handleRestart = (sensorName: string) => {
    Alert.alert(
      'Reiniciar Sensor',
      `¿Deseas reiniciar el ${sensorName}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Reiniciar', onPress: () => {
          Alert.alert('Reinicio', 'Sensor reiniciado correctamente');
        }},
      ]
    );
  };

  const activeSensors = sensors.filter(s => s.status === 'Activo').length;
  const inactiveSensors = sensors.filter(s => s.status === 'Inactivo').length;
  const maintenanceSensors = sensors.filter(s => s.status === 'Mantenimiento').length;

  return (
    <View style={styles.container}>
      {/* Header fijo */}
      <View style={styles.header}>
        <View style={styles.headerOverlay} />
        <TouchableOpacity 
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())} 
          style={styles.menuButton}
        >
          <Icon name="menu" size={28} color={colors.white} />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Icon name="sensors" size={24} color={colors.white} />
          <Text style={styles.title}>Sensores IoT</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Resumen del Sistema */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Icon name="dashboard" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Resumen del Sistema</Text>
          </View>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Icon name="sensors" size={28} color={colors.primary} />
              <Text style={styles.summaryNumber}>{sensors.length}</Text>
              <Text style={styles.summaryLabel}>Total</Text>
            </View>
            <View style={styles.summaryItem}>
              <Icon name="check-circle" size={28} color={colors.success} />
              <Text style={[styles.summaryNumber, { color: colors.success }]}>
                {activeSensors}
              </Text>
              <Text style={styles.summaryLabel}>Activos</Text>
            </View>
            <View style={styles.summaryItem}>
              <Icon name="build" size={28} color={colors.warning} />
              <Text style={[styles.summaryNumber, { color: colors.warning }]}>
                {maintenanceSensors}
              </Text>
              <Text style={styles.summaryLabel}>Mantenimiento</Text>
            </View>
            <View style={styles.summaryItem}>
              <Icon name="error" size={28} color={colors.error} />
              <Text style={[styles.summaryNumber, { color: colors.error }]}>
                {inactiveSensors}
              </Text>
              <Text style={styles.summaryLabel}>Inactivos</Text>
            </View>
          </View>
        </View>

        {/* Lista de Sensores */}
        <View style={styles.sensorsContainer}>
          <View style={styles.sensorsHeader}>
            <Icon name="list" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Lista de Sensores</Text>
          </View>
          
          {sensors.map((sensor) => (
            <TouchableOpacity
              key={sensor.id}
              style={[
                styles.sensorCard,
                {
                  borderLeftColor: sensor.color,
                  backgroundColor: sensor.status === 'Activo' 
                    ? colors.cardBackground 
                    : sensor.status === 'Mantenimiento' 
                      ? '#FFF8E1' 
                      : '#FFEBEE',
                }
              ]}
              onPress={() => handleSensorPress(sensor.id)}
              activeOpacity={0.7}
            >
              <View style={styles.sensorHeader}>
                <View style={styles.sensorIconContainer}>
                  <Icon name={sensor.icon} size={32} color={sensor.color} />
                </View>
                
                <View style={styles.sensorInfo}>
                  <Text style={[styles.sensorName, { color: sensor.color }]}>
                    {sensor.name}
                  </Text>
                  <Text style={styles.sensorModel}>{sensor.model}</Text>
                  <View style={styles.locationContainer}>
                    <Icon name="place" size={14} color={colors.textMedium} />
                    <Text style={styles.locationText}>{sensor.location}</Text>
                  </View>
                </View>
                
                <View style={styles.sensorStatus}>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(sensor.status) }
                  ]}>
                    <Text style={styles.statusText}>{sensor.status}</Text>
                  </View>
                  
                  <View style={styles.batteryContainer}>
                    <Icon 
                      name={getBatteryIcon(sensor.batteryLevel)} 
                      size={16} 
                      color={getBatteryColor(sensor.batteryLevel)} 
                    />
                    <Text style={[
                      styles.batteryText,
                      { color: getBatteryColor(sensor.batteryLevel) }
                    ]}>
                      {sensor.batteryLevel}%
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.quickInfo}>
                <View style={styles.quickInfoItem}>
                  <Text style={styles.quickInfoLabel}>Última lectura:</Text>
                  <Text style={[styles.quickInfoValue, { color: sensor.color }]}>
                    {sensor.lastReading}
                  </Text>
                </View>
                <View style={styles.quickInfoItem}>
                  <Text style={styles.quickInfoLabel}>Actualizado:</Text>
                  <Text style={styles.quickInfoValue}>{sensor.lastUpdate}</Text>
                </View>
              </View>

              {/* Detalles expandibles */}
              {selectedSensor === sensor.id && (
                <View style={styles.expandedDetails}>
                  <View style={styles.detailsDivider} />
                  
                  <View style={styles.detailsGrid}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Parámetros:</Text>
                      <Text style={styles.detailValue}>{sensor.parameters}</Text>
                    </View>
                    
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Precisión:</Text>
                      <Text style={styles.detailValue}>{sensor.accuracy}</Text>
                    </View>
                    
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Voltaje:</Text>
                      <Text style={styles.detailValue}>{sensor.voltage}</Text>
                    </View>
                    
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Número de serie:</Text>
                      <Text style={styles.detailValue}>{sensor.serialNumber}</Text>
                    </View>
                    
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Fecha de instalación:</Text>
                      <Text style={styles.detailValue}>{sensor.installDate}</Text>
                    </View>
                  </View>

                  {/* Botones de acción */}
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: colors.primary }]}
                      onPress={() => handleCalibrate(sensor.name)}
                    >
                      <Icon name="tune" size={16} color={colors.white} />
                      <Text style={styles.actionButtonText}>Calibrar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: colors.warning }]}
                      onPress={() => handleRestart(sensor.name)}
                    >
                      <Icon name="refresh" size={16} color={colors.white} />
                      <Text style={styles.actionButtonText}>Reiniciar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* Indicador de expansión */}
              <View style={styles.expandIndicator}>
                <Icon 
                  name={selectedSensor === sensor.id ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                  size={24} 
                  color={colors.textMedium} 
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Información del sistema */}
        <View style={styles.systemInfo}>
          <View style={styles.systemHeader}>
            <Icon name="info" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Información del Sistema</Text>
          </View>
          
          <View style={styles.systemDetails}>
            <View style={styles.systemRow}>
              <Icon name="router" size={16} color={colors.textMedium} />
              <Text style={styles.systemLabel}>Estación:</Text>
              <Text style={styles.systemValue}>UTD-WS001</Text>
            </View>
            
            <View style={styles.systemRow}>
              <Icon name="wifi" size={16} color={colors.success} />
              <Text style={styles.systemLabel}>Conectividad:</Text>
              <Text style={[styles.systemValue, { color: colors.success }]}>En línea</Text>
            </View>
            
            <View style={styles.systemRow}>
              <Icon name="update" size={16} color={colors.textMedium} />
              <Text style={styles.systemLabel}>Última sincronización:</Text>
              <Text style={styles.systemValue}>Hace 1 minuto</Text>
            </View>
            
            <View style={styles.systemRow}>
              <Icon name="memory" size={16} color={colors.textMedium} />
              <Text style={styles.systemLabel}>Uso de memoria:</Text>
              <Text style={styles.systemValue}>45% (128MB)</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    padding: 16,
    paddingTop: 50,
    backgroundColor: colors.primary,
    position: 'relative',
    overflow: 'hidden',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `${colors.primaryLight}15`,
  },
  menuButton: {
    position: 'absolute',
    left: 16,
    top: 16,
    zIndex: 1,
    padding: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    zIndex: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 12,
  },
  summaryCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 20,
    margin: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.shadow,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 8,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginVertical: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textMedium,
    textAlign: 'center',
    fontWeight: '500',
  },
  sensorsContainer: {
    margin: 20,
    marginTop: 10,
  },
  sensorsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sensorCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.shadow,
  },
  sensorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sensorIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sensorInfo: {
    flex: 1,
  },
  sensorName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  sensorModel: {
    fontSize: 14,
    color: colors.textMedium,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: colors.textMedium,
    marginLeft: 4,
  },
  sensorStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 8,
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  quickInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  quickInfoItem: {
    flex: 1,
  },
  quickInfoLabel: {
    fontSize: 12,
    color: colors.textMedium,
    fontWeight: '500',
  },
  quickInfoValue: {
    fontSize: 14,
    color: colors.textDark,
    fontWeight: '600',
    marginTop: 2,
  },
  expandedDetails: {
    marginTop: 12,
  },
  detailsDivider: {
    height: 1,
    backgroundColor: colors.shadow,
    marginVertical: 12,
  },
  detailsGrid: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.accent,
    borderRadius: 8,
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textMedium,
    fontWeight: '500',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: colors.textDark,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    minWidth: 120,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  expandIndicator: {
    alignItems: 'center',
    marginTop: 8,
  },
  systemInfo: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 20,
    margin: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.shadow,
  },
  systemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  systemDetails: {
    gap: 12,
  },
  systemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.accent,
    borderRadius: 12,
  },
  systemLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textMedium,
    marginLeft: 8,
    flex: 1,
  },
  systemValue: {
    color: colors.textDark,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SensorsScreen;