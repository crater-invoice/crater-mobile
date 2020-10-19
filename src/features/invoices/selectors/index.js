import { hasLength } from '@/constants';
import { createSelector } from 'reselect'
import { INVOICES_STATUS_BG_COLOR, INVOICES_STATUS_TEXT_COLOR } from '../constants';

const getDueInvoicesState = createSelector(
    invoices => invoices,
    invoices => {
        return !hasLength(invoices) ? [] : invoices.map((item) => {
            const {
                invoice_number,
                user: { name, currency } = {},
                status,
                formattedInvoiceDate,
                total,
            } = item;

            return {
                title: name,
                subtitle: {
                    title: invoice_number,
                    label: status,
                    labelBgColor: INVOICES_STATUS_BG_COLOR[status],
                    labelTextColor: INVOICES_STATUS_TEXT_COLOR[status],
                },
                amount: total,
                currency,
                rightSubtitle: formattedInvoiceDate,
                fullItem: item,
            };
        });
    }
);

const getDraftInvoicesState = createSelector(
    invoices => invoices,
    invoices => {
        return !hasLength(invoices) ? [] : invoices.map((item) => {
            const {
                invoice_number,
                user: { name, currency } = {},
                status,
                formattedInvoiceDate,
                total,
            } = item;

            return {
                title: name,
                subtitle: {
                    title: invoice_number,
                    label: status,
                    labelBgColor: INVOICES_STATUS_BG_COLOR[status],
                    labelTextColor: INVOICES_STATUS_TEXT_COLOR[status],
                },
                amount: total,
                currency,
                rightSubtitle: formattedInvoiceDate,
                fullItem: item,
            };
        });
    }
);

const getAllInvoicesState = createSelector(
    invoices => invoices,
    invoices => {
        return !hasLength(invoices) ? [] : invoices.map((item) => {
            const {
                invoice_number,
                user: { name, currency } = {},
                status,
                formattedInvoiceDate,
                total,
            } = item;

            return {
                title: name,
                subtitle: {
                    title: invoice_number,
                    label: status,
                    labelBgColor: INVOICES_STATUS_BG_COLOR[status],
                    labelTextColor: INVOICES_STATUS_TEXT_COLOR[status],
                },
                amount: total,
                currency,
                rightSubtitle: formattedInvoiceDate,
                fullItem: item,
            };
        });
    }
);

export {
    getDueInvoicesState,
    getDraftInvoicesState,
    getAllInvoicesState,
}
