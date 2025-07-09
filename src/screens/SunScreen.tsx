import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, StatusBar } from 'react-native';
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
  primaryLight: '#F5B041',
  secondary: '#0A7764',
  secondaryLight: '#0F9B87',
  accent: '#FFA500',
  white: '#FFFFFF',
  background: '#F8F9FA',
  cardBackground: '#FDFDFD',
  textDark: '#2C2C2C',
  textMedium: '#5A5A5A',
  textLight: '#FFFFFF',
  shadow: '#E5E5E5',
  warning: '#E74C3C',
  success: '#27AE60',
  info: '#3498DB',
};

const SunScreen = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('day');

  // Datos estáticos para diferentes rangos de tiempo
  const generateUVData = () => {
    if (timeRange === 'day') {
      return {
        labels: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
        datasets: [
          {
            data: [0.5, 2.1, 5.8, 8.2, 9.1, 6.4, 2.3],
            color: (opacity = 1) => `rgba(215, 137, 9, ${opacity})`,
            strokeWidth: 3
          }
        ]
      };
    } else if (timeRange === 'week') {
      return {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [
          {
            data: [7.2, 8.5, 6.8, 9.1, 8.8, 7.9, 6.5],
            color: (opacity = 1) => `rgba(215, 137, 9, ${opacity})`,
            strokeWidth: 3
          }
        ]
      };
    } else if (timeRange === 'month') {
      return {
        labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
        datasets: [
          {
            data: [7.8, 8.2, 7.5, 8.9],
            color: (opacity = 1) => `rgba(215, 137, 9, ${opacity})`,
            strokeWidth: 3
          }
        ]
      };
    } else {
      return {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [
          {
            data: [5.2, 6.1, 7.3, 8.5, 9.2, 10.1, 9.8, 9.1, 7.9, 6.8, 5.9, 4.8],
            color: (opacity = 1) => `rgba(215, 137, 9, ${opacity})`,
            strokeWidth: 3
          }
        ]
      };
    }
  };

  const uvData = generateUVData();

  const chartConfig = {
    backgroundGradientFrom: colors.cardBackground,
    backgroundGradientTo: colors.cardBackground,
    color: (opacity = 1) => `rgba(215, 137, 9, ${opacity})`,
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
      stroke: colors.primary
    }
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const getUVIndexDescription = (index: number) => {
    if (index <= 2) return { text: 'Bajo', color: colors.success };
    if (index <= 5) return { text: 'Moderado', color: colors.info };
    if (index <= 7) return { text: 'Alto', color: colors.accent };
    if (index <= 10) return { text: 'Muy alto', color: colors.warning };
    return { text: 'Extremo', color: colors.warning };
  };

  const getCurrentUVIndex = () => {
    if (timeRange === 'day') return 8.2;
    if (timeRange === 'week') return 7.8;
    if (timeRange === 'month') return 8.1;
    return 7.2;
  };

  const getDaylightHours = () => {
    if (timeRange === 'day') return '13 horas 36 minutos';
    if (timeRange === 'week') return '13 horas 42 minutos (promedio)';
    if (timeRange === 'month') return '13 horas 18 minutos (promedio)';
    return '12 horas 54 minutos (promedio anual)';
  };

  const getSunriseTime = () => {
    return timeRange === 'day' ? '06:12' : '06:15';
  };

  const getSunsetTime = () => {
    return timeRange === 'day' ? '19:48' : '19:45';
  };

  const getStatistics = () => {
    if (timeRange === 'day') {
      return { average: 5.2, maximum: 9.1, minimum: 0.5 };
    } else if (timeRange === 'week') {
      return { average: 7.8, maximum: 9.1, minimum: 6.5 };
    } else if (timeRange === 'month') {
      return { average: 8.1, maximum: 8.9, minimum: 7.5 };
    } else {
      return { average: 7.2, maximum: 10.1, minimum: 4.8 };
    }
  };

  const getCurrentDate = () => {
    return moment(date).format('DD/MM/YYYY');
  };

  const uvDescription = getUVIndexDescription(getCurrentUVIndex());
  const stats = getStatistics();
  const currentUV = getCurrentUVIndex();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerOverlay} />
        <TouchableOpacity 
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())} 
          style={styles.menuButton}
        >
          <Icon name="menu" size={28} color={colors.white} />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.title}>Radiación Solar</Text>
          <TouchableOpacity 
            onPress={() => setShowDatePicker(true)} 
            style={styles.dateButton}
          >
            <Icon name="calendar-today" size={18} color={colors.white} />
            <Text style={styles.dateText}>{getCurrentDate()}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* DatePicker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
          maximumDate={new Date()}
          themeVariant="light"
        />
      )}

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

        {/* Índice UV actual */}
        <View style={styles.currentValueContainer}>
          <View style={styles.currentValueCard}>
            <View style={styles.uvIconContainer}>
              <Text style={styles.uvIcon}>☀️</Text>
            </View>
            <Text style={styles.currentValue}>{currentUV.toFixed(1)}</Text>
            <View style={[styles.uvLevelBadge, { backgroundColor: uvDescription.color }]}>
              <Text style={styles.uvLevelText}>{uvDescription.text}</Text>
            </View>
            <Text style={styles.currentDescription}>Índice UV</Text>
          </View>
        </View>

        {/* Gráfico */}
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>
              Radiación UV del {timeRange === 'day' ? 'día' : timeRange === 'week' ? 'semana' : timeRange === 'month' ? 'mes' : 'año'}
            </Text>
          </View>
          <LineChart
            data={uvData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            yAxisSuffix=" UV"
          />
        </View>

        {/* Horas de sol */}
        <View style={styles.sunInfoContainer}>
          <View style={styles.sunInfoCard}>
            <View style={styles.sunInfoHeader}>
              <Icon name="wb-sunny" size={20} color={colors.primary} />
              <Text style={styles.sunInfoTitle}>Horas de Sol</Text>
            </View>
            
            <View style={styles.sunGraph}>
              <View style={styles.sunPath}>
                <View style={[styles.sunPosition, { left: '65%' }]} />
              </View>
              <View style={styles.sunTimes}>
                <View style={styles.sunTime}>
                  <Icon name="wb-twilight" size={16} color={colors.textMedium} />
                  <Text style={styles.sunTimeText}>{getSunriseTime()} AM</Text>
                  <Text style={styles.sunTimeLabel}>Amanecer</Text>
                </View>
                <View style={styles.sunTime}>
                  <Icon name="brightness-3" size={16} color={colors.textMedium} />
                  <Text style={styles.sunTimeText}>{getSunsetTime()} PM</Text>
                  <Text style={styles.sunTimeLabel}>Atardecer</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.daylightInfo}>
              <Icon name="access-time" size={18} color={colors.primary} />
              <Text style={styles.daylightHours}>{getDaylightHours()}</Text>
            </View>
          </View>
        </View>

        {/* Estadísticas */}
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <View style={styles.statsHeader}>
              <Icon name="analytics" size={20} color={colors.primary} />
              <Text style={styles.statsTitle}>Estadísticas UV</Text>
            </View>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: 'rgba(52, 152, 219, 0.1)' }]}>
                  <Icon name="show-chart" size={20} color={colors.info} />
                </View>
                <Text style={[styles.statValue, { color: colors.info }]}>{stats.average.toFixed(1)}</Text>
                <Text style={styles.statLabel}>Promedio</Text>
              </View>
              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: 'rgba(231, 76, 60, 0.1)' }]}>
                  <Icon name="keyboard-arrow-up" size={20} color={colors.warning} />
                </View>
                <Text style={[styles.statValue, { color: colors.warning }]}>{stats.maximum.toFixed(1)}</Text>
                <Text style={styles.statLabel}>Máximo</Text>
              </View>
              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: 'rgba(39, 174, 96, 0.1)' }]}>
                  <Icon name="keyboard-arrow-down" size={20} color={colors.success} />
                </View>
                <Text style={[styles.statValue, { color: colors.success }]}>{stats.minimum.toFixed(1)}</Text>
                <Text style={styles.statLabel}>Mínimo</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recomendaciones */}
        <View style={styles.tipsContainer}>
          <View style={styles.tipsCard}>
            <View style={styles.tipsHeader}>
              <Icon name="health-and-safety" size={20} color={colors.primary} />
              <Text style={styles.tipsTitle}>Recomendaciones de Protección</Text>
            </View>
            
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <View style={styles.tipIcon}>
                  <Icon name="wb-sunny" size={18} color={colors.primary} />
                </View>
                <Text style={styles.tipText}>Usa protector solar SPF 30+ cada 2 horas</Text>
              </View>
              
              <View style={styles.tipItem}>
                <View style={styles.tipIcon}>
                  <Icon name="access-time" size={18} color={colors.primary} />
                </View>
                <Text style={styles.tipText}>Evita exposición entre 10am y 4pm</Text>
              </View>
              
              <View style={styles.tipItem}>
                <View style={styles.tipIcon}>
                  <Icon name="visibility" size={18} color={colors.primary} />
                </View>
                <Text style={styles.tipText}>Usa sombrero de ala ancha y gafas de sol</Text>
              </View>
              
              <View style={styles.tipItem}>
                <View style={styles.tipIcon}>
                  <Icon name="umbrella" size={18} color={colors.primary} />
                </View>
                <Text style={styles.tipText}>Busca sombra cuando el índice UV sea alto</Text>
              </View>
              
              <View style={styles.tipItem}>
                <View style={styles.tipIcon}>
                  <Icon name="local-drink" size={18} color={colors.primary} />
                </View>
                <Text style={styles.tipText}>Mantente hidratado bebiendo agua regularmente</Text>
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
    alignItems: 'center',
    marginTop: 16,
    zIndex: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
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
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  currentValueCard: {
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
  uvIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  uvIcon: {
    fontSize: 60,
    marginBottom: 12,
  },
  currentValue: {
    fontSize: 56,
    fontWeight: '200',
    color: colors.primary,
    marginBottom: 12,
  },
  uvLevelBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 8,
  },
  uvLevelText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  currentDescription: {
    fontSize: 16,
    color: colors.textMedium,
    fontWeight: '500',
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
    borderBottomColor: 'rgba(215, 137, 9, 0.1)',
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
  sunInfoContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sunInfoCard: {
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
  sunInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  sunInfoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginLeft: 8,
  },
  sunGraph: {
    marginBottom: 16,
  },
  sunPath: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(215, 137, 9, 0.3)',
    borderRadius: 3,
    marginBottom: 16,
    position: 'relative',
  },
  sunPosition: {
    position: 'absolute',
    top: -8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  sunTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sunTime: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(215, 137, 9, 0.1)',
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
  },
  sunTimeText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginVertical: 4,
  },
  sunTimeLabel: {
    fontSize: 12,
    color: colors.textMedium,
    fontWeight: '500',
  },
  daylightInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: 'rgba(215, 137, 9, 0.1)',
    borderRadius: 12,
  },
  daylightHours: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginLeft: 8,
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
    alignItems: 'center',
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(215, 137, 9, 0.05)',
    borderRadius: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(215, 137, 9, 0.1)',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMedium,
    textAlign: 'center',
    fontWeight: '500',
  },
  tipsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tipsCard: {
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
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginLeft: 8,
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(215, 137, 9, 0.08)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(215, 137, 9, 0.1)',
  },
  tipIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(215, 137, 9, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: colors.textDark,
    fontWeight: '500',
    lineHeight: 20,
  },
});

export default SunScreen;