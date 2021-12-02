import {colors} from '@/styles';

export const darkTheme = {
  mode: 'dark',

  backgroundColor: colors.black,

  secondaryBgColor: colors.black2,

  thirdBgColor: colors.gray6,

  text: {
    primaryColor: colors.white2,
    secondaryColor: colors.white,
    thirdColor: colors.white7,
    fourthColor: colors.white2,
    fifthColor: colors.white4,
    sixthColor: colors.white2,
    seventhColor: colors.white2
  },

  // Component Input
  input: {
    color: colors.white2,
    backgroundColor: colors.gray6,
    validationBackgroundColor: colors.danger,
    placeholderColor: colors.white4,
    borderColor: colors.gray6,
    disableBackgroundColor: colors.dark2,
    firstColor: colors.dark2
  },

  // Component Icons
  icons: {
    primaryBgColor: colors.primaryLight,
    secondaryBgColor: colors.white,

    primaryColor: colors.white2,
    secondaryColor: colors.white4,
    thirdColor: colors.white2,
    fourthColor: colors.white6,

    plus: {
      backgroundColor: colors.black
    },
    circle: {
      backgroundColor: colors.primaryLight,
      secondaryBgColor: colors.white3,
      borderColor: colors.black2
    },
    eye: {
      color: colors.white2
    },
    filter: {
      color: colors.primaryLight
    },
    biometric: {
      backgroundColor: colors.white
    }
  },

  // Component Header
  header: {
    primary: {
      color: colors.white2
    },
    secondary: {
      color: colors.white
    }
  },

  // Component List Item
  listItem: {
    primary: {
      color: colors.white3
    },
    secondary: {
      color: colors.white
    },
    third: {
      color: colors.white4
    },
    fourth: {
      color: colors.white4
    },
    fifth: {
      color: colors.white
    }
  },

  // Component Tab
  tab: {
    activeColor: colors.white2,
    color: colors.gray5,
    borderColor: colors.gray6,
    borderBottomColor: colors.white2
  },

  // Navigation Tab
  tabNavigator: {
    backgroundColor: colors.black2,
    activeTextColor: colors.primaryLight,
    inActiveTextColor: colors.white6,
    activeIconColor: colors.primaryLight,
    inActiveIconColor: colors.white6
  },

  // Component Divider
  divider: {
    primaryBgColor: colors.gray7,
    secondaryBgColor: colors.gray7
  },

  // Component Avatar
  avatar: {
    bgColor: colors.gray7
  },

  // ViewLabel
  viewLabel: {
    primaryColor: colors.white4,
    secondaryColor: colors.white4,
    thirdColor: colors.primaryLight,
    fourthColor: colors.white4,
    fifthColor: colors.white2
  },

  // Card
  card: {
    primary: {
      bgColor: colors.gray7
    },
    secondary: {
      bgColor: colors.dark5
    }
  },

  // Button
  button: {
    disable: {
      bgColor: colors.black2
    }
  }
};
