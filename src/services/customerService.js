import api from './api.js';

const mapRegistrationPayload = (form, role) => {
  const payload = {
    username: form.email,
    email: form.email,
    password: form.password,
    role,
    full_name: form.fullName,
    phone: form.mobile,
    country: form.country,
    state: form.state,
    city: form.city,
    pin_code: form.pinCode,
    company: form.companyName,
    gst: form.gstNumber,
    address: form.address,
    license_number: form.licenseNumber,
    shop_name: form.shopName,
  };

  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== null && value !== '')
  );
};

const normalizeBackendErrors = (data) => {
  if (!data || typeof data !== 'object') {
    return {};
  }

  const payload = data.errors || data;
  const fieldErrors = {};

  const getFieldKey = (key) => {
    switch (key) {
      case 'full_name':
        return 'fullName';
      case 'phone':
        return 'mobile';
      case 'pin_code':
        return 'pinCode';
      case 'company':
        return 'companyName';
      case 'gst':
        return 'gstNumber';
      case 'license_number':
        return 'licenseNumber';
      case 'shop_name':
        return 'shopName';
      default:
        return key;
    }
  };

  Object.entries(payload).forEach(([key, value]) => {
    const fieldKey = getFieldKey(key);
    if (Array.isArray(value) && value.length > 0) {
      fieldErrors[fieldKey] = String(value[0]);
    } else if (typeof value === 'string') {
      fieldErrors[fieldKey] = value;
    } else if (typeof value === 'object' && value !== null) {
      const nestedValue = Object.values(value)[0];
      if (Array.isArray(nestedValue) && nestedValue.length > 0) {
        fieldErrors[fieldKey] = String(nestedValue[0]);
      } else if (typeof nestedValue === 'string') {
        fieldErrors[fieldKey] = nestedValue;
      }
    }
  });

  return fieldErrors;
};

const createApiError = (error) => {
  if (error.response) {
    const responseData = error.response.data;
    const errorMessage =
      responseData?.error ||
      responseData?.detail ||
      responseData?.message ||
      'Registration failed. Please verify your details and try again.';
    const apiError = new Error(String(errorMessage));
    apiError.status = error.response.status;
    apiError.responseData = responseData;
    apiError.fieldErrors = normalizeBackendErrors(responseData);
    return apiError;
  }

  if (error.request) {
    return new Error('Network error. Please check your connection and try again.');
  }

  return new Error('An unexpected error occurred. Please try again.');
};

const customerService = {
  registerCustomer: async ({ form, role }) => {
    try {
      const payload = mapRegistrationPayload(form, role);
      const response = await api.post('/auth/register', payload);
      return response.data;
    } catch (error) {
      throw createApiError(error);
    }
  },
};

export default customerService;
