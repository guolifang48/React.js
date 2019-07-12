// Admin Route
import DashboardIcon from '@material-ui/icons/Dashboard';
import SellerIcon from '@material-ui/icons/Shop';
import ProductIcon from '@material-ui/icons/CardGiftcard';
import CustomerIcon from '@material-ui/icons/Person';
import OrderIcon from '@material-ui/icons/ShoppingCart';
import TransactionIcon from '@material-ui/icons/TransferWithinAStationSharp';
import CouponIcon from '@material-ui/icons/Code';
import MessageIcon from '@material-ui/icons/Message';
import PictureIcon from '@material-ui/icons/PictureInPictureSharp';
import CategoryIcon from '@material-ui/icons/Category';
// Seller Route
import StoreIcon from '@material-ui/icons/Store';
import FeeIcon from '@material-ui/icons/Feedback';

// Pages
import {
  admin,
  seller
} from './pages';


const sellerRoute = {
  items: [{
      path: '/',
      name: 'Dashboard',
      type: 'link',
      icon: DashboardIcon,
      component: seller.Home
    },
    {
      path: '/store',
      name: 'Stores',
      type: 'link',
      icon: StoreIcon,
      component: seller.Store
    },
    {
      path: '/product',
      name: 'Products',
      type: 'link',
      icon: ProductIcon,
      component: seller.Product
    },
    {
      path: '/transaction',
      name: 'Transaction',
      type: 'link',
      icon: TransactionIcon,
      component: seller.Transaction
    },
    {
      path: '/order',
      name: 'Order',
      type: 'link',
      icon: OrderIcon,
      component: seller.Order
    },
    {
      path: '/fee',
      name: 'Delievered Fees Location',
      type: 'link',
      icon: FeeIcon,
      component: seller.Fee
    },
    {
      path: '/coupon',
      name: 'Coupon Management',
      type: 'link',
      icon: CouponIcon,
      component: seller.Coupon
    }
  ],
  details: [
    {
      path: '/profile',
      name: 'Profile',
      component: seller.Profile
    },
    {
      path: '/chat/:id?',
      name: 'Chat',
      component: seller.Chat
    },
    {
      path: '/product/:id',
      name: 'Product-Detail',
      component: seller.ProductDetail
    },
    {
      path: '/store/:id',
      name: 'Store-Detail',
      component: seller.StoreDetail
    },
  ],
};

const adminRoute = {
  items: [{
      path: '/',
      name: 'Dashboard',
      type: 'link',
      icon: DashboardIcon,
      component: admin.Home
    },
    {
      path: '/store',
      name: 'Stores',
      type: 'link',
      icon: StoreIcon,
      component: admin.Store
    },
    {
      path: '/product',
      name: 'Product',
      type: 'link',
      icon: ProductIcon,
      component: admin.Product
    },
    {
      path: '/category',
      name: 'Category',
      type: 'link',
      icon: CategoryIcon,
      component: admin.Category
    },
    
    {
      path: '/customer',
      name: 'Customers',
      type: 'link',
      icon: CustomerIcon,
      component: admin.Customer
    },
    {
      path: '/order',
      name: 'Order',
      type: 'link',
      icon: OrderIcon,
      component: admin.Order
    },
    {
      path: '/transaction',
      name: 'Transaction',
      type: 'link',
      icon: TransactionIcon,
      component: admin.Transaction
    },
    {
      path: '/report',
      name: 'Report',
      type: 'link',
      icon: MessageIcon,
      component: admin.Report
    },
    {
      path: '/advertise',
      name: 'Advertise',
      type: 'link',
      icon: PictureIcon,
      component: admin.Advertise
    },
    {
      path: '/coupon',
      name: 'Coupon Management',
      type: 'link',
      icon: CouponIcon,
      component: admin.Coupon
    }
  ],
  details: [
    {
      path: '/product/:id',
      name: 'Product Detail',
      component: admin.ProductDetail
    },
    {
      path: '/user/:id',
      name: 'User Detail',
      component: admin.SellerDetail
    },
    {
      path: '/store/:id',
      name: 'Store Detail',
      component: admin.StoreDetail
    },
  ]
};

export {adminRoute, sellerRoute};