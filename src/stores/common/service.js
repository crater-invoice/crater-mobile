import Request from '@/utils/request';

/**
 * Fetch Tax And Discount Per item.
 * @returns {*}
 */
export const fetchTaxAndDiscountPerItem = () => {
  return Request.get({
    path: `company/settings`,
    axiosProps: {
      params: {settings: ['tax_per_item', 'discount_per_item']}
    }
  });
};
