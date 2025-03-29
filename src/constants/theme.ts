export const COLORS = {
  // Ana mor tonları
  primary: '#6A3EA1', // Koyu mor
  primaryLight: '#9A7AC1', // Açık mor
  primaryDark: '#4A2C74', // Çok koyu mor
  secondary: '#D6B9FF', // Lila
  secondaryLight: '#EAD8FF', // Açık lila
  secondaryDark: '#B592FF', // Koyu lila
  accent: '#9D71EA', // Parlak mor aksan
  
  // Diğer renkler
  success: '#4CAF50',
  danger: '#FF5252',
  warning: '#FFC107',
  info: '#2196F3',
  light: '#F5F5F5',
  dark: '#333333',
  white: '#FFFFFF',
  background: '#F9F6FF', // Çok açık mor arka plan
  textPrimary: '#333333',
  textSecondary: '#6c757d',
  textMuted: '#9CA3AF',
  border: '#E2E8F0',
  shadowColor: '#000',
  
  // Giriş ekranı için özel renkler
  authBackground: '#F0E6FF', // Mor tonda açık arka plan  
  authCard: '#FFFFFF', // Kart arka planı beyaz
  authButton: '#6A3EA1', // Buton rengi mor
  authButtonText: '#FFFFFF', // Buton yazı rengi beyaz
  authInput: '#F5EEFF', // Input arka planı açık mor
  authPlaceholder: '#A094B0', // Placeholder yazı rengi
};

export const FONTS = {
  light: 'System',
  regular: 'System',
  medium: 'System',
  semiBold: 'System',
  bold: 'System',
};

export const SIZES = {
  // Global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  margin: 16,

  // Font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 18,
  h4: 16,
  h5: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,
  small: 10,
};

export const STYLES = {
  shadow: {
    shadowColor: COLORS.shadowColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonShadow: {
    shadowColor: COLORS.shadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  // Giriş ekranı için özel stiller
  authInputStyle: {
    backgroundColor: COLORS.authInput,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    marginBottom: SIZES.margin,
    fontSize: SIZES.body3,
    color: COLORS.textPrimary,
  },
  authButtonStyle: {
    backgroundColor: COLORS.authButton,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding / 1.5,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  }
};

const appTheme = { COLORS, FONTS, SIZES, STYLES };

export default appTheme; 