import api from './api.js';

const normalizeBackendErrors = (data) => {
  if (!data || typeof data !== 'object') return {};
  const payload = data.errors || data;
  const fieldErrors = {};

  Object.entries(payload).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      fieldErrors[key] = String(value[0]);
    } else if (typeof value === 'string') {
      fieldErrors[key] = value;
    } else if (typeof value === 'object' && value !== null) {
      const nested = Object.values(value)[0];
      if (Array.isArray(nested) && nested.length > 0) fieldErrors[key] = String(nested[0]);
      else if (typeof nested === 'string') fieldErrors[key] = nested;
    }
  });

  return fieldErrors;
};

const createApiError = (error) => {
  if (error.response) {
    const responseData = error.response.data;
    const message = responseData?.detail || responseData?.error || responseData?.message || 'Failed to add product.';
    const apiError = new Error(String(message));
    apiError.status = error.response.status;
    apiError.responseData = responseData;
    apiError.fieldErrors = normalizeBackendErrors(responseData);
    return apiError;
  }

  if (error.request) {
    return new Error('Network error. Please check your connection and try again.');
  }

  return new Error('An unexpected error occurred.');
};

const productService = {
  addProduct: async ({ manufacturerId, productName, barcode, size }) => {
    try {
      const payload = {
        manufacturer_id: manufacturerId,
        product_name: productName,
        barcode,
        size,
      };

      const response = await api.post('/customer/product/', payload);
      return response.data;
    } catch (error) {
      throw createApiError(error);
    }
  },
};

export default productService;
