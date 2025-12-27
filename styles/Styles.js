import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const colors = {
  franceBlue: '#002395',  // Bleu drapeau officiel
  franceRed: '#ED2939',   // Rouge drapeau officiel
  white: '#FFFFFF',
  overlay: 'rgba(0, 35, 149, 0.75)', // Overlay bleu pour lisibilité
  textSecondary: 'rgba(255, 255, 255, 0.85)',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.franceBlue,
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
  },
  topSection: {
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
    borderRadius: 20,
  },
  title: {
    color: colors.white,
    fontSize: 36,
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10,
    paddingHorizontal: 30,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: colors.white,
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 50,
    width: width * 0.8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },

  buttonText: {
    color: colors.franceBlue,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  accentLine: {
    width: 60,
    height: 4,
    backgroundColor: colors.franceRed,
    marginTop: 15,
    borderRadius: 2,
  }
});