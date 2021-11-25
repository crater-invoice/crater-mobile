export type ITheme = {
  mode: 'dark' | 'light',

  backgroundColor: string,

  secondaryBgColor: string,

  thirdBgColor: string,

  text: {
    primaryColor: string,
    secondaryColor: string,
    thirdColor: string,
    fourthColor: string,
    fifthColor: string,
    sixthColor: String,
    seventhColor: string
  },

  // Component Input
  input: {
    color: string,
    backgroundColor: string,
    validationBackgroundColor: string,
    placeholderColor: string,
    borderColor: string,
    disableBackgroundColor: string,
    firstColor: String
  },

  // Component Icons
  icons: {
    primaryBgColor: string,
    secondaryBgColor: string,

    primaryColor: string,
    secondaryColor: string,
    thirdColor: string,
    fourthColor: string,

    plus: {
      backgroundColor: string
    },
    circle: {
      backgroundColor: string,
      secondaryBgColor: string,
      borderColor: string
    },
    eye: {
      color: string
    },
    filter: {
      color: string
    },
    biometric: {
      backgroundColor: string
    }
  },

  // Component Header
  header: {
    primary: {
      color: string
    },
    secondary: {
      color: string
    }
  },

  // Component List Item
  listItem: {
    primary: {
      color: string
    },
    secondary: {
      color: string
    },
    third: {
      color: string
    },
    fourth: {
      color: string
    },
    fifth: {
      color: string
    }
  },

  // Component Tab
  tab: {
    activeColor: string,
    color: string,
    borderColor: string,
    borderBottomColor: string
  },

  // Navigation Tab
  tabNavigator: {
    backgroundColor: string,
    activeTextColor: string,
    inActiveTextColor: string,
    activeIconColor: string,
    inActiveIconColor: string
  },

  // Component Divider
  divider: {
    primaryBgColor: string,
    secondaryBgColor: string
  },

  // Component Avatar
  avatar: {
    bgColor: string
  },

  // ViewLabel
  viewLabel: {
    primaryColor: string,
    secondaryColor: string,
    thirdColor: string,
    fourthColor: string,
    fifthColor: string
  },

  // Card
  card: {
    primary: {
      bgColor: string
    },
    secondary: {
      bgColor: string
    }
  },

  // Button
  button: {
    disable: {
      bgColor: string
    }
  }
};
