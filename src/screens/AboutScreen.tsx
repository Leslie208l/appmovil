// screens/AboutScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

const colors = {
  primary: '#0A7764',
  primaryLight: '#0F9B87',
  secondary: '#D78909',
  white: '#FFFFFF',
  textDark: '#2C2C2C',
  textMedium: '#5A5A5A',
  textLight: '#8E8E93',
  background: '#F8F9FA',
  cardBackground: '#FDFDFD',
  border: '#E0E0E0',
  shadow: '#E5E5E5',
  accent: '#F0F4F3',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
};

const AboutScreen = () => {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const teamMembers = [
    {
      name: 'Solís Guereca Alina Alecxandra',
      role: 'Líder de Proyecto',
      expertise: 'Gestión, Coordinación',
      icon: 'supervisor-account'
    },
    {
      name: 'Sosa Villa Leslie Joselin',
      role: 'Desarrolladora App Móvil',
      expertise: 'React Native',
      icon: 'smartphone'
    },
    {
      name: 'Robles Quezada Jacqueline',
      role: 'Desarrolladora Frontend',
      expertise: 'UI/UX',
      icon: 'design-services'
    },
    {
      name: 'Gonzalez Espino Marco Antonio',
      role: 'Desarrollador Backend',
      expertise: 'APIs, Servidores',
      icon: 'dns'
    },
    {
      name: 'Delgado Cabrera Miguel Angel',
      role: 'Administrador de Base de Datos',
      expertise: 'SQL, NoSQL',
      icon: 'storage'
    }
  ];

  const features = [
    {
      icon: 'thermostat',
      title: 'Monitoreo de Temperatura',
      description: 'Medición precisa de temperatura ambiente en tiempo real'
    },
    {
      icon: 'air',
      title: 'Velocidad del Viento',
      description: 'Registro de velocidad y dirección del viento'
    },
    {
      icon: 'wb-sunny',
      title: 'Radiación Solar',
      description: 'Medición de intensidad de radiación solar'
    },
    {
      icon: 'water-drop',
      title: 'Humedad Relativa',
      description: 'Control de niveles de humedad atmosférica'
    },
    {
      icon: 'show-chart',
      title: 'Análisis Histórico',
      description: 'Gráficos y tendencias de datos meteorológicos'
    },
    {
      icon: 'cloud',
      title: 'Pronóstico Local',
      description: 'Predicciones basadas en datos locales'
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header fijo */}
      <View style={styles.header}>
        <View style={styles.headerOverlay} />
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          <Icon name="menu" size={28} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Sobre Nosotros</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Contenido desplazable */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Universidad Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Icon name="school" size={28} color={colors.primary} />
            </View>
            <Text style={styles.sectionTitle}>Universidad Tecnológica de Durango</Text>
          </View>
          <Text style={styles.text}>
            La Universidad Tecnológica de Durango es una institución comprometida con la excelencia académica 
            y la formación de profesionales capaces de enfrentar los retos del mundo actual. Fundada con el 
            propósito de impulsar el desarrollo tecnológico y científico de la región.
          </Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Icon name="groups" size={24} color={colors.primary} />
              <Text style={styles.statNumber}>15,000+</Text>
              <Text style={styles.statLabel}>Estudiantes</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="school" size={24} color={colors.primary} />
              <Text style={styles.statNumber}>50+</Text>
              <Text style={styles.statLabel}>Programas</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="emoji-events" size={24} color={colors.primary} />
              <Text style={styles.statNumber}>25</Text>
              <Text style={styles.statLabel}>Años</Text>
            </View>
          </View>
        </View>

        {/* Sistema Meteorológico Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Icon name="cloud" size={28} color={colors.primary} />
            </View>
            <Text style={styles.sectionTitle}>Sistema Meteorológico UTD</Text>
          </View>
          <Text style={styles.text}>
            Este sistema fue desarrollado por estudiantes y profesores de la UTD para monitorear las condiciones 
            climáticas en tiempo real y proporcionar datos históricos para investigación y análisis meteorológico. 
            Utilizamos sensores de última generación para garantizar la precisión de los datos.
          </Text>
          
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Icon name={feature.icon} size={20} color={colors.primary} />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Equipo de Desarrollo Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Icon name="group" size={28} color={colors.primary} />
            </View>
            <Text style={styles.sectionTitle}>Equipo de Desarrollo</Text>
          </View>
          <Text style={styles.text}>
            Nuestro equipo multidisciplinario combina experiencia en desarrollo de software, 
            análisis de datos y ingeniería para crear soluciones innovadoras que contribuyan 
            al avance científico y tecnológico de nuestra institución.
          </Text>
          
          <View style={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <View key={index} style={styles.teamMemberCard}>
                <View style={styles.memberHeader}>
                  <View style={styles.memberIconContainer}>
                    <Icon name={member.icon} size={24} color={colors.primary} />
                  </View>
                  <View style={styles.memberInfo}>
                    <Text style={styles.memberName}>{member.name}</Text>
                    <Text style={styles.memberRole}>{member.role}</Text>
                  </View>
                </View>
                <View style={styles.memberExpertiseContainer}>
                  <Icon name="stars" size={16} color={colors.secondary} />
                  <Text style={styles.memberExpertise}>{member.expertise}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Especificaciones Técnicas Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Icon name="settings" size={28} color={colors.primary} />
            </View>
            <Text style={styles.sectionTitle}>Especificaciones Técnicas</Text>
          </View>
          
          <View style={styles.techSpecs}>
            <View style={styles.techSpecItem}>
              <Icon name="memory" size={20} color={colors.primary} />
              <View style={styles.techSpecInfo}>
                <Text style={styles.techSpecLabel}>Plataforma</Text>
                <Text style={styles.techSpecValue}>React Native</Text>
              </View>
            </View>
            
            <View style={styles.techSpecItem}>
              <Icon name="sensors" size={20} color={colors.primary} />
              <View style={styles.techSpecInfo}>
                <Text style={styles.techSpecLabel}>Sensores</Text>
                <Text style={styles.techSpecValue}>Arduino + IoT</Text>
              </View>
            </View>
            
            <View style={styles.techSpecItem}>
              <Icon name="cloud-sync" size={20} color={colors.primary} />
              <View style={styles.techSpecInfo}>
                <Text style={styles.techSpecLabel}>Base de Datos</Text>
                <Text style={styles.techSpecValue}>MongoDB</Text>
              </View>
            </View>
            
            <View style={styles.techSpecItem}>
              <Icon name="api" size={20} color={colors.primary} />
              <View style={styles.techSpecInfo}>
                <Text style={styles.techSpecLabel}>API</Text>
                <Text style={styles.techSpecValue}>Node.js + Express</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Contacto Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Icon name="contact-phone" size={28} color={colors.primary} />
            </View>
            <Text style={styles.sectionTitle}>Contacto</Text>
          </View>
          <Text style={styles.text}>
            Para más información sobre el proyecto, colaboraciones académicas o consultas técnicas, 
            no dudes en contactarnos a través de cualquiera de nuestros canales de comunicación:
          </Text>
          
          <View style={styles.contactGrid}>
            <View style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Icon name="email" size={20} color={colors.primary} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactText}>meteorologia@utd.edu.mx</Text>
              </View>
            </View>
            
            <View style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Icon name="phone" size={20} color={colors.primary} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Teléfono</Text>
                <Text style={styles.contactText}>+52 618 123 4567</Text>
              </View>
            </View>
            
            <View style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Icon name="location-on" size={20} color={colors.primary} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Dirección</Text>
                <Text style={styles.contactText}>
                  Carretera Durango - Mezquital Km 4.5{'\n'}
                  34308 Gabino Santillán, Durango, México
                </Text>
              </View>
            </View>
            
            <View style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Icon name="language" size={20} color={colors.primary} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Sitio Web</Text>
                <Text style={styles.contactText}>www.utd.edu.mx</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Icon name="school" size={32} color={colors.primary} />
            <Text style={styles.footerText}>
              © 2025 Universidad Tecnológica de Durango
            </Text>
            <Text style={styles.footerSubtext}>
              Desarrollado por estudiantes de la UTD
            </Text>
            <Text style={styles.versionText}>
              Versión 1.0.0 - Sistema Meteorológico UTD
            </Text>
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
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
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
    padding: 8,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    zIndex: 1,
  },
  placeholder: {
    width: 44,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.shadow,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: colors.textMedium,
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'justify',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMedium,
    marginTop: 4,
  },
  featuresGrid: {
    marginTop: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    padding: 16,
    backgroundColor: colors.accent,
    borderRadius: 12,
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: colors.textMedium,
    lineHeight: 16,
  },
  teamGrid: {
    marginTop: 8,
  },
  teamMemberCard: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(10, 119, 100, 0.1)',
  },
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  memberIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 4,
    lineHeight: 20,
  },
  memberRole: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  memberExpertiseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  memberExpertise: {
    fontSize: 13,
    color: colors.textMedium,
    marginLeft: 6,
    fontStyle: 'italic',
  },
  techSpecs: {
    marginTop: 8,
  },
  techSpecItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: colors.accent,
    borderRadius: 12,
  },
  techSpecInfo: {
    marginLeft: 12,
    flex: 1,
  },
  techSpecLabel: {
    fontSize: 12,
    color: colors.textMedium,
    marginBottom: 2,
  },
  techSpecValue: {
    fontSize: 16,
    color: colors.textDark,
    fontWeight: '600',
  },
  contactGrid: {
    marginTop: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    padding: 16,
    backgroundColor: colors.accent,
    borderRadius: 12,
  },
  contactIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: colors.textMedium,
    marginBottom: 4,
    fontWeight: '500',
  },
  contactText: {
    fontSize: 14,
    color: colors.textDark,
    lineHeight: 20,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: 20,
  },
  footerContent: {
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.shadow,
  },
  footerText: {
    fontSize: 14,
    color: colors.textDark,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 12,
  },
  footerSubtext: {
    fontSize: 12,
    color: colors.textMedium,
    textAlign: 'center',
    marginTop: 4,
  },
  versionText: {
    fontSize: 11,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default AboutScreen;