// Admin
import admin from './admin';
// Seller
import seller from './seller';

// Authentication
import Lockscreen from './Authentication/Lockscreen';
import PasswordReset from './Authentication/PasswordReset';
import Signin from './Authentication/Signin';
import Signup from './Authentication/Signup';

// Error
import NotFound from './Errors/NotFound'
import BackendError from './Errors/BackendError';

export {
  admin,
  seller,
  
  Lockscreen,
  PasswordReset,
  Signin,
  Signup,

  NotFound,
  BackendError
}