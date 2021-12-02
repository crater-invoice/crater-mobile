import {colors} from '@/styles';

export const lightTheme = {
  mode: 'light',

  backgroundColor: colors.veryLightGray,

  secondaryBgColor: colors.white,

  thirdBgColor: colors.white,

  text: {
    primaryColor: colors.primary,
    secondaryColor: colors.secondary,
    thirdColor: colors.veryDarkGray,
    fourthColor: colors.primaryLight,
    fifthColor: colors.darkGray,
    sixthColor: colors.dark,
    seventhColor: colors.gray6
  },

  // Component Input
  input: {
    color: colors.dark2,
    backgroundColor: colors.white,
    validationBackgroundColor: colors.dangerLight,
    placeholderColor: colors.darkGray,
    borderColor: colors.lightGray,
    disableBackgroundColor: colors.lightGray,
    firstColor: colors.white10
  },

  // Component Icons
  icons: {
    primaryBgColor: colors.primary,
    secondaryBgColor: colors.primary,

    primaryColor: colors.darkGray,
    secondaryColor: colors.darkGray,
    thirdColor: colors.dark2,
    fourthColor: colors.gray,

    plus: {
      backgroundColor: colors.white
    },
    circle: {
      backgroundColor: colors.primary,
      secondaryBgColor: colors.white,
      borderColor: colors.primaryLight2
    },
    eye: {
      color: colors.dark3
    },
    filter: {
      color: colors.primary
    },
    biometric: {
      backgroundColor: colors.dark4
    }
  },

  // Component Header
  header: {
    primary: {
      color: colors.dark2
    },
    secondary: {
      color: colors.dark1
    }
  },

  // Component List Item
  listItem: {
    primary: {
      color: colors.dark2
    },
    secondary: {
      color: colors.secondary
    },
    third: {
      color: colors.white5
    },
    fourth: {
      color: colors.darkGray
    },
    fifth: {
      color: colors.dark
    }
  },

  // Component Tab
  tab: {
    activeColor: colors.primary,
    color: colors.darkGray,
    borderColor: colors.darkGray,
    borderBottomColor: colors.primary
  },

  // Navigation Tab
  tabNavigator: {
    backgroundColor: colors.white,
    activeTextColor: colors.primary,
    inActiveTextColor: colors.dark2,
    activeIconColor: colors.primary,
    inActiveIconColor: colors.darkGray
  },

  // Component Divider
  divider: {
    primaryBgColor: colors.gray,
    secondaryBgColor: colors.lightGray
  },

  // Component Avatar
  avatar: {
    bgColor: colors.gray
  },

  // ViewLabel
  viewLabel: {
    primaryColor: colors.dark2,
    secondaryColor: colors.secondary,
    thirdColor: colors.primary,
    fourthColor: colors.veryDarkGray,
    fifthColor: colors.dark
  },

  // Card
  card: {
    primary: {
      bgColor: colors.veryLightGray
    },
    secondary: {
      bgColor: colors.veryLightGray
    }
  },

  // Button
  button: {
    disable: {
      bgColor: colors.lightGray
    }
  }
};
