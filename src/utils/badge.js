import {colors} from '@/styles';

export const BADGE_STATUS_BG_COLOR = {
  ON_HOLD: {
    light: colors.warningLight,
    dark: colors.white9
  },
  ACTIVE: {
    light: colors.infoLight,
    dark: colors.warning
  },
  DRAFT: {
    light: colors.warningLight,
    dark: colors.warning
  },
  SENT: {
    light: colors.warningLight2,
    dark: colors.white9
  },
  VIEWED: {
    light: colors.infoLight,
    dark: colors.infoLight
  },
  OVERDUE: {
    light: colors.dangerLight,
    dark: colors.danger
  },
  DUE: {
    light: colors.dangerLight,
    dark: colors.danger
  },
  COMPLETED: {
    light: colors.successLight2,
    dark: colors.success
  },
  UNPAID: {
    light: colors.warningLight,
    dark: colors.warningDark
  },
  PAID: {
    light: colors.successLight2,
    dark: colors.success
  },
  PARTIALLY_PAID: {
    light: colors.infoLight,
    dark: colors.success
  },
  EXPIRED: {
    light: colors.dangerLight,
    dark: colors.danger
  },
  REJECTED: {
    light: colors.gray2,
    dark: colors.white4
  },
  ACCEPTED: {
    light: colors.successLight2,
    dark: colors.success
  }
};

export const BADGE_STATUS_TEXT_COLOR = {
  ON_HOLD: {
    light: colors.warningDark,
    dark: colors.white9
  },
  ACTIVE: {
    light: colors.infoDark,
    dark: colors.warning
  },
  DRAFT: {
    light: colors.warningDark,
    dark: colors.warning
  },
  SENT: {
    light: colors.warningDark2,
    dark: colors.white9
  },
  VIEWED: {
    light: colors.infoDark,
    dark: colors.infoLight
  },
  OVERDUE: {
    light: colors.dangerDark,
    dark: colors.danger
  },
  DUE: {
    light: colors.dangerDark,
    dark: colors.danger
  },
  COMPLETED: {
    light: colors.successDark,
    dark: colors.success
  },
  UNPAID: {
    light: colors.warningDark,
    dark: colors.warningDark
  },
  PAID: {
    light: colors.successDark,
    dark: colors.success
  },
  PARTIALLY_PAID: {
    light: colors.infoDark,
    dark: colors.success
  },
  EXPIRED: {
    light: colors.dangerDark,
    dark: colors.danger
  },
  REJECTED: {
    light: colors.darkGray2,
    dark: colors.white4
  },
  ACCEPTED: {
    light: colors.successDark,
    dark: colors.success
  }
};
