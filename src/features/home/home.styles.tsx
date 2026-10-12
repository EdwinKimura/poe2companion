
import { StyleSheet } from 'react-native';

export const COLORS = {
  background: '#10100F',
  surface: '#1B1A18',
  surfaceLight: '#26231F',
  border: '#383128',
  text: '#F0E9DC',
  muted: '#A49A89',
  gold: '#C7A66A',
  green: '#91A77B',
  unique: 'rgb(175 96 37)',
  stats: '#858585',
  statsLink: '#04bdbde3',
};

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  eyebrow: {
    fontSize: 10,
    letterSpacing: 2.5,
  },
  logo: {
    fontSize: 22,
    letterSpacing: 1,
    marginTop: 4,
  },
  offlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  offlineText: {
    fontSize: 9,
    letterSpacing: 0.5,
  },

  hero: {
    borderWidth: 1,
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
    height: 300,
    flex: 1
  },
  heroBackgroundContainer: {
    width: '100%', 
    height: '100%', 
    padding: 0, 
    position: 'relative',
  },
  heroTextContainer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    padding: 20,
    width: '100%',
    height: '100%',
    experimental_backgroundImage: 'linear-gradient(60deg, #000, transparent)',
  },
  heroCalltoAction: {
    width: '60%',
  },
  heroBackgroundImage: {
    width: '100%',
    height: "100%",
  },
  heroEyebrow: {
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase'
  },
  heroTitle: {
    fontSize: 24,
  },
  heroDescription: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 20,
  },

  releaseButton: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  releaseText: {
    fontSize: 11,
    paddingLeft: 8,
  },

  sectionTitle: {
    fontSize: 18,
  },
  sectionDescription: {
    fontSize: 12,
    marginTop: 5,
  },

  syncLoadingCard: {
    minHeight: 112,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 9,
    padding: 20,
  },
  syncLoadingText: {
    fontSize: 13,
    flexShrink: 1,
  },

  featureList: {
    gap: 8,
    marginVertical: 12
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 9,
    padding: 13,
  },
  featureIcon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginRight: 13,
  },
  featureSymbol: {
    fontSize: 25,
  },
  featureInfo: {
    flex: 1,
    gap: 4,
  },
  featureTitle: {
    fontSize: 14,
  },
  featureDescription: {
    fontSize: 11,
  },

  chevron: {
    fontSize: 26,
    marginLeft: 8,
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
  },

  databaseCard: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
  },
  databaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  databaseTitle: {
    fontSize: 11,
  },
  databaseIcon: {
    fontSize: 12,
  },
  dataBaseInfo: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center'
  },
  databaseStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  pendingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  databaseStatusText: {
    fontSize: 11,
  },
  databaseVersion: {
    fontSize: 11,
  },
  footer: {
    fontSize: 9,
    textAlign: 'center',
    letterSpacing: 1,
    marginTop: 22,
  },
});
