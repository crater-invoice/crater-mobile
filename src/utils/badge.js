import { colors } from '@/styles';

export const BADGE_STATUS_BG_COLOR = {
    DRAFT: {
        light: colors.warningLight,
        dark: colors.warning
    },
    SENT: {
        light: colors.warningLight2,
        dark: colors.warningDark2
    },
    VIEWED: {
        light: colors.infoLight,
        dark: colors.infoDark
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
        dark: colors.successDark
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
        dark: colors.dangerLight
    },
    REJECTED: {
        light: colors.gray2,
        dark: colors.secondaryDark
    },
    ACCEPTED: {
        light: colors.successLight2,
        dark: colors.success
    }
};

export const BADGE_STATUS_TEXT_COLOR = {
    DRAFT: {
        light: colors.warningDark,
        dark: colors.white
    },
    SENT: {
        light: colors.warningDark2,
        dark: colors.white
    },
    VIEWED: {
        light: colors.infoDark,
        dark: colors.white
    },
    OVERDUE: {
        light: colors.dangerDark,
        dark: colors.white
    },
    DUE: {
        light: colors.dangerDark,
        dark: colors.white
    },
    COMPLETED: {
        light: colors.successDark,
        dark: colors.white
    },
    UNPAID: {
        light: colors.warningDark,
        dark: colors.white
    },
    PAID: {
        light: colors.successDark,
        dark: colors.white
    },
    PARTIALLY_PAID: {
        light: colors.infoDark,
        dark: colors.white
    },
    EXPIRED: {
        light: colors.dangerDark,
        dark: colors.dangerDark
    },
    REJECTED: {
        light: colors.darkGray2,
        dark: colors.white
    },
    ACCEPTED: {
        light: colors.successDark,
        dark: colors.white
    }
};
