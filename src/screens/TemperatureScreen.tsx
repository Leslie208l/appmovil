import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const { width: screenWidth } = Dimensions.get('window');

const colors = {
  primary: '#D78909',
  primaryDark: '#A56A07',
  primaryLight: '#F5B947',
  secondary: '#0A7764',
  secondaryLight: '#DCA901',
  accent: '#FFA500',
  white: '#FFFFFF',
  background: '#F8F9FA',
  cardBackground: '#FDFDFD',
  textDark: '#2C2C2C',
  textMedium: '#5A5A5A',
  textLight: '#FFFFFF',
  shadow: '#E5E5E5',
  success: '#28A745',
  warning: '#FFC107',
  danger: '#DC3545',
  info: '#17A2B8',
};

// Datos estáticos para diferentes rangos de tiempo
const temperatureDataSets = {
  day: {
    labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
    data: [18.5, 17.2, 16.8, 19.4, 25.7, 27.3, 22.8, 20.1],
    maxTemp: 27.3,
    minTemp: 16.8,
    avgTemp: 21.0,
    unit: '°C'
  },
  week: {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    data: [18.2, 19.5, 20.8, 22.1, 25.4, 24.7, 21.3],
    maxTemp: 25.4,
    minTemp: 18.2,
    avgTemp: 21.7,
    unit: '°C'
  },
  month: {
    labels: ['1', '5', '10', '15', '20', '25', '30'],
    data: [19.8, 21.2, 23.5, 25.8, 27.1, 24.9, 22.4],
    maxTemp: 27.1,
    minTemp: 19.8,
    avgTemp: 23.4,
    unit: '°C'
  },
  year: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    data: [18.2, 19.8, 22.5, 25.3, 28.7, 30.2, 29.8, 28.9, 26.4, 24.1, 20.7, 18.5],
    maxTemp: 30.2,
    minTemp: 18.2,
    avgTemp: 24.3,
    unit: '°C'
  }
};

const TemperatureScreen = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('day');

  const currentData = temperatureDataSets[timeRange];

  const chartConfig = {
    backgroundGradientFrom: colors.cardBackground,
    backgroundGradientTo: colors.cardBackground,
    color: (opacity = 1) => `rgba(215, 137, 9, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 1,
    propsForLabels: {
      fontSize: 11,
      fill: colors.textMedium,
      fontWeight: '500'
    },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: colors.primary,
      fill: colors.cardBackground
    },
    propsForBackgroundLines: {
      stroke: colors.shadow,
      strokeWidth: 1,
      strokeDasharray: '5,5'
    }
  };

  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const getCurrentTemperature = () => {
    const now = new Date().getHours();
    const index = Math.floor(now / 3);
    return currentData.data[Math.min(index, currentData.data.length - 1)];
  };

  const getTemperatureDescription = (temp: number) => {
    if (temp < 10) return { text: 'Muy frío', color: colors.info, icon: 'ac-unit' };
    if (temp < 18) return { text: 'Frío', color: colors.info, icon: 'thermostat' };
    if (temp < 24) return { text: 'Templado', color: colors.success, icon: 'wb-sunny' };
    if (temp < 30) return { text: 'Cálido', color: colors.warning, icon: 'wb-sunny' };
    return { text: 'Muy caliente', color: colors.danger, icon: 'whatshot' };
  };

  const getTemperatureIcon = (temp: number) => {
    if (temp < 10) return '🥶';
    if (temp < 18) return '🌡️';
    if (temp < 24) return '🌤️';
    if (temp < 30) return '☀️';
    return '🔥';
  };

  const handleExportData = () => {
    Alert.alert(
      'Exportar Datos',
      'Función disponible en versión premium',
      [{ text: 'OK', style: 'default' }]
    );
  };

  const handleShareData = () => {
    Alert.alert(
      'Compartir',
      `Temperatura actual: ${getCurrentTemperature().toFixed(1)}°C\nMáxima: ${currentData.maxTemp}°C\nMínima: ${currentData.minTemp}°C`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  const tempDescription = getTemperatureDescription(getCurrentTemperature());

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())} 
          style={styles.menuButton}
        >
          <Icon name="menu" size={28} color={colors.white} />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.title}>Temperatura</Text>
          <TouchableOpacity 
            onPress={() => setShowDatePicker(true)} 
            style={styles.dateButton}
          >
            <Icon name="calendar-today" size={18} color={colors.white} />
            <Text style={styles.dateText}>
              {moment(date).format('DD/MM/YYYY')}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          onPress={handleShareData}
          style={styles.shareButton}
        >
          <Icon name="share" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
          maximumDate={new Date()}
          themeVariant="light"
          textColor={colors.primary}
        />
      )}

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Selector de rango de tiempo */}
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

        {/* Temperatura actual */}
        <View style={styles.currentValueContainer}>
          <Text style={styles.temperatureIcon}>
            {getTemperatureIcon(getCurrentTemperature())}
          </Text>
          <Text style={styles.currentValue}>{getCurrentTemperature().toFixed(1)}°C</Text>
          <View style={styles.temperatureDescriptionContainer}>
            <Icon name={tempDescription.icon} size={20} color={tempDescription.color} />
            <Text style={[styles.currentDescription, { color: tempDescription.color }]}>
              {tempDescription.text}
            </Text>
          </View>
          <Text style={styles.lastUpdateText}>
            Última actualización: {moment().format('HH:mm')}
          </Text>
        </View>

        {/* Gráfico de temperatura */}
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>
              Temperatura del {timeRange === 'day' ? 'día' : timeRange === 'week' ? 'semana' : timeRange === 'month' ? 'mes' : 'año'}
            </Text>
            <TouchableOpacity onPress={handleExportData} style={styles.exportButton}>
              <Icon name="download" size={18} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <LineChart
            data={{
              labels: currentData.labels,
              datasets: [
                {
                  data: currentData.data,
                  color: (opacity = 1) => `rgba(215, 137, 9, ${opacity})`,
                  strokeWidth: 3
                }
              ]
            }}
            width={screenWidth - 60}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            yAxisSuffix="°C"
            yAxisInterval={1}
            withHorizontalLabels={true}
            withVerticalLabels={true}
            withDots={true}
            withShadow={false}
            withInnerLines={true}
            withOuterLines={false}
          />
        </View>

        {/* Estadísticas */}
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <View style={styles.statsHeader}>
              <Icon name="assessment" size={20} color={colors.primary} />
              <Text style={styles.cardTitle}>Estadísticas</Text>
            </View>
            <View style={styles.statsGrid}>
              <View style={[styles.statItem, { backgroundColor: 'rgba(215, 137, 9, 0.08)' }]}>
                <Icon name="trending-up" size={20} color={colors.danger} />
                <Text style={[styles.statValue, { color: colors.danger }]}>
                  {currentData.maxTemp.toFixed(1)}°C
                </Text>
                <Text style={styles.statLabel}>Máxima</Text>
              </View>
              <View style={[styles.statItem, { backgroundColor: 'rgba(215, 137, 9, 0.08)' }]}>
                <Icon name="trending-down" size={20} color={colors.info} />
                <Text style={[styles.statValue, { color: colors.info }]}>
                  {currentData.minTemp.toFixed(1)}°C
                </Text>
                <Text style={styles.statLabel}>Mínima</Text>
              </View>
              <View style={[styles.statItem, { backgroundColor: 'rgba(215, 137, 9, 0.08)' }]}>
                <Icon name="straighten" size={20} color={colors.success} />
                <Text style={[styles.statValue, { color: colors.success }]}>
                  {currentData.avgTemp.toFixed(1)}°C
                </Text>
                <Text style={styles.statLabel}>Promedio</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Historial */}
        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Icon name="history" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Historial Reciente</Text>
          </View>
          <View style={styles.historyList}>
            <View style={styles.historyItem}>
              <View style={styles.historyItemLeft}>
                <Icon name="schedule" size={16} color={colors.textMedium} />
                <Text style={styles.historyDate}>Ayer</Text>
              </View>
              <View style={styles.historyItemRight}>
                <Text style={styles.historyValue}>24.1°C</Text>
                <Text style={styles.historyChange}>+1.2°C</Text>
              </View>
            </View>
            <View style={styles.historyItem}>
              <View style={styles.historyItemLeft}>
                <Icon name="schedule" size={16} color={colors.textMedium} />
                <Text style={styles.historyDate}>Hace 2 días</Text>
              </View>
              <View style={styles.historyItemRight}>
                <Text style={styles.historyValue}>23.7°C</Text>
                <Text style={styles.historyChange}>-0.4°C</Text>
              </View>
            </View>
            <View style={styles.historyItem}>
              <View style={styles.historyItemLeft}>
                <Icon name="schedule" size={16} color={colors.textMedium} />
                <Text style={styles.historyDate}>Hace 1 semana</Text>
              </View>
              <View style={styles.historyItemRight}>
                <Text style={styles.historyValue}>22.5°C</Text>
                <Text style={styles.historyChange}>-1.2°C</Text>
              </View>
            </View>
            <View style={styles.historyItem}>
              <View style={styles.historyItemLeft}>
                <Icon name="schedule" size={16} color={colors.textMedium} />
                <Text style={styles.historyDate}>Hace 1 mes</Text>
              </View>
              <View style={styles.historyItemRight}>
                <Text style={styles.historyValue}>20.8°C</Text>
                <Text style={styles.historyChange}>-1.7°C</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Información adicional */}
        <View style={styles.additionalInfoContainer}>
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Icon name="info" size={20} color={colors.primary} />
              <Text style={styles.infoTitle}>Información del Sensor</Text>
            </View>
            <View style={styles.infoContent}>
              <View style={styles.infoRow}>
                <Icon name="devices" size={16} color={colors.textMedium} />
                <Text style={styles.infoLabel}>Tipo:</Text>
                <Text style={styles.infoValue}>DHT22</Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="precision-manufacturing" size={16} color={colors.textMedium} />
                <Text style={styles.infoLabel}>Precisión:</Text>
                <Text style={styles.infoValue}>±0.5°C</Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="update" size={16} color={colors.textMedium} />
                <Text style={styles.infoLabel}>Frecuencia:</Text>
                <Text style={styles.infoValue}>Cada 5 min</Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="battery-full" size={16} color={colors.success} />
                <Text style={styles.infoLabel}>Estado:</Text>
                <Text style={[styles.infoValue, { color: colors.success }]}>Activo</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 50,
    backgroundColor: colors.primary,
    position: 'relative',
    overflow: 'hidden',
  },
  menuButton: {
    padding: 8,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dateText: {
    color: colors.white,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  shareButton: {
    padding: 8,
  },
  timeRangeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  timeRangeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(215, 137, 9, 0.1)',
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
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
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
  currentValueContainer: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  temperatureIcon: {
    fontSize: 60,
    marginBottom: 10,
  },
  currentValue: {
    fontSize: 64,
    fontWeight: '200',
    color: colors.primary,
    marginBottom: 10,
  },
  temperatureDescriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  currentDescription: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 8,
  },
  lastUpdateText: {
    fontSize: 14,
    color: colors.textMedium,
    fontStyle: 'italic',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.shadow,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
  },
  exportButton: {
    padding: 4,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
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
  cardTitle: {
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
    alignItems: 'center',
    flex: 1,
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(215, 137, 9, 0.1)',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMedium,
    textAlign: 'center',
    fontWeight: '500',
  },
  historyContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
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
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginLeft: 8,
  },
  historyList: {
    gap: 12,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(215, 137, 9, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(215, 137, 9, 0.1)',
  },
  historyItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyDate: {
    fontSize: 14,
    color: colors.textDark,
    marginLeft: 8,
    fontWeight: '500',
  },
  historyItemRight: {
    alignItems: 'flex-end',
  },
  historyValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  historyChange: {
    fontSize: 12,
    color: colors.textMedium,
    marginTop: 2,
  },
  additionalInfoContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  infoCard: {
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
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginLeft: 8,
  },
  infoContent: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(215, 137, 9, 0.05)',
    borderRadius: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textMedium,
    marginLeft: 8,
    flex: 1,
  },
  infoValue: {
    color: colors.textDark,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default TemperatureScreen;