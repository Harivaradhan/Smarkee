export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone) {
  return /^\d{10}$/.test(phone);
}

export function validatePassword(password) {
  return password.length >= 8;
}

export function getRoleRedirectPath(role) {
  switch (role) {
    case 'Admin':
      return '/admin/dashboard';
    case 'Manufacturer':
      return '/manufacturer/dashboard';
    case 'Distributor':
      return '/distributor/dashboard';
    case 'User':
      return '/user/dashboard';
    default:
      return '/unauthorized';
  }
}
