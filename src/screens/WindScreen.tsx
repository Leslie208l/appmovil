import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width: screenWidth } = Dimensions.get('window');

const colors = {
  wind: '#0A7764',
  windLight: '#0F9B87',
  secondary: '#D78909',
  white: '#FFFFFF',
  textDark: '#2C2C2C',
  textMedium: '#5A5A5A',
  textLight: '#FFFFFF',
  background: '#F8F9FA',
  cardBackground: '#FDFDFD',
  shadow: '#E5E5E5',
  accent: '#F0F4F3',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
};

type RootStackParamList = {
  Temperature: undefined;
  Wind: undefined;
  Sun: undefined;
  About: undefined;
  Sensors: undefined;
};

// Datos estáticos para las gráficas de viento
const generateWindData = (timeRange: 'day' | 'week' | 'month' | 'year') => {
  if (timeRange === 'day') {
    return {
      labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
      datasets: [
        {
          data: [8.2, 6.5, 4.8, 12.3, 18.7, 15.2, 11.6, 9.8, 7.4],
          color: (opacity = 1) => `rgba(10, 119, 100, ${opacity})`,
          strokeWidth: 3
        }
      ]
    };
  } else if (timeRange === 'week') {
    return {
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      datasets: [
        {
          data: [10.5, 12.8, 15.2, 14.1, 13.6, 11.9, 9.3],
          color: (opacity = 1) => `rgba(10, 119, 100, ${opacity})`,
          strokeWidth: 3
        }
      ]
    };
  } else if (timeRange === 'month') {
    return {
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
      datasets: [
        {
          data: [12.4, 14.2, 11.8, 13.5],
          color: (opacity = 1) => `rgba(10, 119, 100, ${opacity})`,
          strokeWidth: 3
        }
      ]
    };
  } else {
    return {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [
        {
          data: [9.8, 11.2, 14.5, 16.3, 18.1, 15.7, 13.2, 11.8, 10.4, 12.6, 14.8, 16.2],
          color: (opacity = 1) => `rgba(10, 119, 100, ${opacity})`,
          strokeWidth: 3
        }
      ]
    };
  }
};

const WindScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('day');

  // Función para obtener la fecha actual formateada
  const getCurrentDate = () => {
    const today = new Date();
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    const dayName = days[today.getDay()];
    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();
    
    return `${dayName}, ${day} de ${month} de ${year}`;
  };

  // Datos estáticos actuales
  const currentWindData = {
    speed: 15.2,
    direction: 'NO',
    directionDegrees: 315,
    gust: 18.7,
    description: 'Brisa moderada'
  };

  // Datos estadísticos estáticos
  const windStats = {
    average: 12.4,
    maximum: 18.7,
    minimum: 4.8,
    predominantDirection: 'NO'
  };

  const windData = generateWindData(timeRange);

  const chartConfig = {
    backgroundGradientFrom: colors.cardBackground,
    backgroundGradientTo: colors.cardBackground,
    color: (opacity = 1) => `rgba(10, 119, 100, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 1,
    propsForLabels: {
      fontSize: 10,
      fill: colors.textMedium
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: colors.wind
    }
  };

  const getWindDescription = (speed: number) => {
    if (speed < 1) return 'Calma';
    if (speed < 5) return 'Brisa ligera';
    if (speed < 12) return 'Brisa suave';
    if (speed < 20) return 'Brisa moderada';
    if (speed < 29) return 'Brisa fresca';
    if (speed < 39) return 'Brisa fuerte';
    return 'Viento muy fuerte';
  };

  const getWindIntensityColor = (speed: number) => {
    if (speed < 12) return colors.success;
    if (speed < 20) return colors.warning;
    return colors.danger;
  };

  // Componente brújula mejorado
  const CompassComponent = () => {
    const directions = [
      { label: 'N', angle: 0 },
      { label: 'NE', angle: 45 },
      { label: 'E', angle: 90 },
      { label: 'SE', angle: 135 },
      { label: 'S', angle: 180 },
      { label: 'SO', angle: 225 },
      { label: 'O', angle: 270 },
      { label: 'NO', angle: 315 }
    ];

    return (
      <View style={styles.compassContainer}>
        <View style={styles.compass}>
          {directions.map((dir, index) => (
            <View 
              key={index}
              style={[
                styles.compassDirection,
                {
                  transform: [
                    { rotate: `${dir.angle}deg` },
                    { translateY: -80 }
                  ]
                }
              ]}
            >
              <View style={[
                styles.directionMarker,
                currentWindData.direction === dir.label && styles.activeDirectionMarker
              ]}>
                <Text style={[
                  styles.directionText,
                  currentWindData.direction === dir.label && styles.activeDirectionText,
                  { transform: [{ rotate: `${-dir.angle}deg` }] }
                ]}>
                  {dir.label}
                </Text>
              </View>
            </View>
          ))}
          
          {/* Flecha indicadora de dirección */}
          <View style={[
            styles.windArrow,
            { transform: [{ rotate: `${currentWindData.directionDegrees}deg` }] }
          ]}>
            <Icon name="navigation" size={32} color={colors.wind} />
          </View>
          
          {/* Centro de la brújula */}
          <View style={styles.compassCenter}>
            <Text style={styles.compassCenterText}>{currentWindData.direction}</Text>
          </View>
        </View>
      </View>
    );
  };

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
          <View style={styles.titleContainer}>
            <Icon name="air" size={28} color={colors.white} />
            <Text style={styles.title}>Datos del Viento</Text>
          </View>
          
          <View style={styles.dateButton}>
            <Icon name="calendar-today" size={18} color={colors.white} />
            <Text style={styles.dateText}>{getCurrentDate()}</Text>
          </View>
        </View>
      </View>

      {/* Contenido desplazable */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Selector de tiempo */}
        <View style={styles.timeRangeContainer}>
          <View style={styles.timeRangeSelector}>
            <TouchableOpacity
              style={[styles.timeRangeButton, timeRange === 'day' && styles.activeTimeRange]}
              onPress={() => setTimeRange('day')}
            >
              <Text style={[styles.timeRangeText, timeRange === 'day' && styles.activeTimeRangeText]}>Día</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.timeRangeButton, timeRange === 'week' && styles.activeTimeRange]}
              onPress={() => setTimeRange('week')}
            >
              <Text style={[styles.timeRangeText, timeRange === 'week' && styles.activeTimeRangeText]}>Semana</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.timeRangeButton, timeRange === 'month' && styles.activeTimeRange]}
              onPress={() => setTimeRange('month')}
            >
              <Text style={[styles.timeRangeText, timeRange === 'month' && styles.activeTimeRangeText]}>Mes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.timeRangeButton, timeRange === 'year' && styles.activeTimeRange]}
              onPress={() => setTimeRange('year')}
            >
              <Text style={[styles.timeRangeText, timeRange === 'year' && styles.activeTimeRangeText]}>Año</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Viento actual */}
        <View style={styles.currentWindContainer}>
          <View style={styles.currentWindCard}>
            <View style={styles.windIconContainer}>
              <Icon name="air" size={64} color={colors.wind} />
            </View>
            <View style={styles.currentWindSpeed}>
              <Text style={[styles.currentValue, { color: getWindIntensityColor(currentWindData.speed) }]}>
                {currentWindData.speed}
              </Text>
              <Text style={styles.currentUnit}>km/h</Text>
            </View>
            <Text style={styles.windDescription}>{getWindDescription(currentWindData.speed)}</Text>
            <View style={styles.windDetails}>
              <View style={styles.windDetailItem}>
                <Icon name="explore" size={20} color={colors.textMedium} />
                <Text style={styles.windDetailText}>Dirección: {currentWindData.direction}</Text>
              </View>
              <View style={styles.windDetailItem}>
                <Icon name="speed" size={20} color={colors.textMedium} />
                <Text style={styles.windDetailText}>Ráfaga: {currentWindData.gust} km/h</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Gráfico */}
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>
              Velocidad del viento - {timeRange === 'day' ? 'Día' : timeRange === 'week' ? 'Semana' : timeRange === 'month' ? 'Mes' : 'Año'}
            </Text>
          </View>
          <LineChart
            data={windData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            yAxisSuffix=" km/h"
          />
        </View>

        {/* Brújula */}
        <View style={styles.compassSection}>
          <View style={styles.compassCard}>
            <View style={styles.compassHeader}>
              <Icon name="explore" size={20} color={colors.wind} />
              <Text style={styles.compassTitle}>Dirección del Viento</Text>
            </View>
            <CompassComponent />
            <Text style={styles.directionInfo}>
              Dirección predominante: {windStats.predominantDirection}
            </Text>
          </View>
        </View>

        {/* Estadísticas */}
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <View style={styles.statsHeader}>
              <Icon name="assessment" size={20} color={colors.wind} />
              <Text style={styles.statsTitle}>Estadísticas del {timeRange === 'day' ? 'día' : timeRange === 'week' ? 'semana' : timeRange === 'month' ? 'mes' : 'año'}</Text>
            </View>
            <View style={styles.statsGrid}>
              <View style={[styles.statItem, { backgroundColor: 'rgba(10, 119, 100, 0.08)' }]}>
                <Icon name="trending-up" size={24} color={colors.wind} />
                <Text style={[styles.statValue, { color: colors.wind }]}>{windStats.maximum}</Text>
                <Text style={styles.statLabel}>Máxima</Text>
              </View>
              <View style={[styles.statItem, { backgroundColor: 'rgba(10, 119, 100, 0.08)' }]}>
                <Icon name="remove" size={24} color={colors.wind} />
                <Text style={[styles.statValue, { color: colors.wind }]}>{windStats.average}</Text>
                <Text style={styles.statLabel}>Promedio</Text>
              </View>
              <View style={[styles.statItem, { backgroundColor: 'rgba(10, 119, 100, 0.08)' }]}>
                <Icon name="trending-down" size={24} color={colors.wind} />
                <Text style={[styles.statValue, { color: colors.wind }]}>{windStats.minimum}</Text>
                <Text style={styles.statLabel}>Mínima</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Información adicional */}
        <View style={styles.additionalInfoContainer}>
          <View style={styles.additionalInfoCard}>
            <View style={styles.additionalInfoHeader}>
              <Icon name="info" size={20} color={colors.wind} />
              <Text style={styles.additionalInfoTitle}>Información Adicional</Text>
            </View>
            <View style={styles.infoGrid}>
              <View style={styles.infoRow}>
                <Icon name="speed" size={16} color={colors.textMedium} />
                <Text style={styles.infoLabel}>Unidad:</Text>
                <Text style={styles.infoValue}>Kilómetros por hora (km/h)</Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="update" size={16} color={colors.textMedium} />
                <Text style={styles.infoLabel}>Actualización:</Text>
                <Text style={styles.infoValue}>Cada 5 minutos</Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="height" size={16} color={colors.textMedium} />
                <Text style={styles.infoLabel}>Altura sensor:</Text>
                <Text style={styles.infoValue}>10 metros</Text>
              </View>
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
    backgroundColor: colors.wind,
    position: 'relative',
    overflow: 'hidden',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `${colors.windLight}15`,
  },
  menuButton: {
    position: 'absolute',
    left: 16,
    top: 16,
    zIndex: 1,
    padding: 8,
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 16,
    zIndex: 2,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    marginLeft: 8,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dateText: {
    color: colors.white,
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '500',
  },
  timeRangeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  timeRangeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    borderRadius: 25,
    padding: 4,
  },
  timeRangeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 2,
  },
  activeTimeRange: {
    backgroundColor: colors.wind,
    shadowColor: colors.wind,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  timeRangeText: {
    color: colors.textMedium,
    fontWeight: '500',
    fontSize: 14,
  },
  activeTimeRangeText: {
    color: colors.white,
    fontWeight: '600',
  },
  currentWindContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  currentWindCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.shadow,
  },
  windIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  currentWindSpeed: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  currentValue: {
    fontSize: 56,
    fontWeight: '200',
    color: colors.wind,
  },
  currentUnit: {
    fontSize: 24,
    color: colors.textMedium,
    marginLeft: 8,
  },
  windDescription: {
    fontSize: 18,
    color: colors.textDark,
    fontWeight: '500',
    marginBottom: 16,
  },
  windDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  windDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  windDetailText: {
    color: colors.textMedium,
    fontSize: 14,
    marginLeft: 4,
  },
  chartContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.shadow,
  },
  chartHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.accent,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
  },
  compassSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  compassCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.shadow,
  },
  compassHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  compassTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginLeft: 8,
  },
  compassContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  compass: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: colors.wind,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: colors.accent,
  },
  compassDirection: {
    position: 'absolute',
    alignItems: 'center',
  },
  directionMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.wind,
  },
  activeDirectionMarker: {
    backgroundColor: colors.wind,
  },
  directionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.wind,
  },
  activeDirectionText: {
    color: colors.white,
  },
  windArrow: {
    position: 'absolute',
    top: 20,
  },
  compassCenter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.wind,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },
  compassCenterText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  directionInfo: {
    fontSize: 16,
    color: colors.textDark,
    fontWeight: '500',
    marginTop: 16,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.shadow,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginLeft: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
    color: colors.wind,
  },
  statLabel: {
    color: colors.textMedium,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  additionalInfoContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  additionalInfoCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.shadow,
  },
  additionalInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  additionalInfoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginLeft: 8,
  },
  infoGrid: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.accent,
    borderRadius: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textMedium,
    marginLeft: 8,
    width: 100,
  },
  infoValue: {
    color: colors.textDark,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
});

export default WindScreen;