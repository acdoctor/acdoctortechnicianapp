import images from '../assets/Images/images';
import i18n from '../components/i18n';

export const image_slider_data = [
  {
    image: images?.pst1,
  },
  {
    image: images?.pst3,
  },
  // {
  //   image:
  //     'https://images.unsplash.com/photo-1650301545472-b3113cb014e4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // },
  // { image: 'https://picsum.photos/id/1018/800/500' },
];
export const secondimageslider = [
  {
    // image: 'https://images.pexels.com/photos/1074882/pexels-photo-1074882.jpeg',
    image: images?.pst2,
  },
];
export const homescreedata = () => [
  {
    id: '1',
    type: 'item',
    title: `${i18n.t('NewJob')}`,
    img: images.newJobimg,
    screenName: 'Newjob',
  },
  {
    id: '2',
    type: 'item',
    title: `${i18n.t('JobHistory')}`,
    img: images.servicereportimg,
    screenName: 'Services',
  },
  {
    id: '3',
    type: 'item',
    title: `${i18n.t('Tools')}`,
    img: images.toolsimg,
    screenName: 'ToolsAssigned',
  },
  {
    id: '4',
    type: 'item',
    title: `${i18n.t('Attendance')}`,
    img: images.attedneceimg,
    screenName: 'Attendence',
  },
  {
    id: '5',
    type: 'item',
    title: `${i18n.t('Performance')}`,
    img: images.perforamceimg,
    screenName: 'Performance',
  },
  {
    id: '6',
    type: 'item',
    title: `${i18n.t('Leaves')}`,
    img: images.leavesimg,
    screenName: 'Leaves',
  },
];
export const Contracthomescreedata = () => [
  {
    id: '1',
    type: 'item',
    title: `${i18n.t('NewJob')}`,
    img: images.newJobimg,
    screenName: 'Newjob',
  },
  {
    id: '2',
    type: 'item',
    title: `${i18n.t('JobHistory')}`,
    img: images.servicereportimg,
    screenName: 'Services',
  },
  {
    id: '3',
    type: 'item',
    title: `${i18n.t('Performance')}`,
    img: images.perforamceimg,
    screenName: 'Performance',
  },
  {
    id: '4',
    type: 'item',
    title: `${i18n.t('Payment')}`,
    img: images.payment,
    screenName: '',
  },
];
export const utilities_data = () => [
  {
    id: '1',
    type: 'item',
    title: `${i18n.t('TonageCalculator')}`,
    img: images.tonagecalculator,
    screenName: 'TonageCalculator',
  },
  {
    id: '2',
    type: 'item',
    title: `${i18n.t('ErrorCodes')}`,
    img: images.errorcode,
    screenName: 'Errorcodes',
  },
  // {
  //   id: '3',
  //   type: 'item',
  //   title: `${i18n.t('FreeConsultancy')}`,
  //   img: images.freeconsul,
  //   screenName: 'undefi',
  // },
];
export const getMenuMockData = () => [
  {
    id: '1',
    name: i18n.t('Attendance'),
    icon: images.attedneceimg,
    screenName: 'Attendence',
  },
  {
    id: '2',
    name: i18n.t('Leaves'),
    icon: images.leavesimg,
    screenName: 'Leaves',
  },
  {
    id: '3',
    name: i18n.t('Tools'),
    icon: images.toolsimg,
    screenName: 'ToolsAssigned',
  },
  {
    id: '4',
    name: i18n.t('HelperAssign'),
    icon: images.helperaasingimg,
    screenName: 'HelperAssign',
  },
  {
    id: '5',
    name: i18n.t('Notification'),
    icon: images.menuNotifi,
    screenName: 'Notification',
  },
  // {
  //   id: '6',
  //   name: i18n.t('RateUs'),
  //   icon: images.servicereportimg,
  //   // screenName: 'HelpScreen',
  // },
  {
    id: '7',
    name: i18n.t('ChangeLanguage'),
    icon: images.changelanugaue,
    screenName: 'CHANGELANGUGE',
  },
  {
    id: '8',
    name: i18n.t('Help'),
    icon: images.helpimg,
    screenName: 'Help',
  },
  {
    id: '9',
    name: i18n.t('Dltac'),
    icon: images.helpimg,
    // screenName: 'Help',
  },
  {
    id: '10',
    name: i18n.t('Logout'),
    icon: images.logoutimig,
    screenName: 'LOGOUT',
  },
];

export const ContractorMenuData = () => [
  {
    id: '5',
    name: i18n.t('Payment'),
    icon: images.payment,
    screenName: 'ContractorPayment',
  },
  {
    id: '5',
    name: i18n.t('Notification'),
    icon: images.menuNotifi,
    screenName: 'Notification',
  },
  // {
  //   id: '6',
  //   name: i18n.t('RateUs'),
  //   icon: images.servicereportimg,
  //   // screenName: 'HelpScreen',
  // },
  {
    id: '7',
    name: i18n.t('ChangeLanguage'),
    icon: images.changelanugaue,
    screenName: 'CHANGELANGUGE',
  },
  {
    id: '8',
    name: i18n.t('Help'),
    icon: images.helpimg,
    screenName: 'Help',
  },
  {
    id: '9',
    name: i18n.t('Dltac'),
    icon: images.helpimg,
    // screenName: 'Help',
  },
  {
    id: '10',
    name: i18n.t('Logout'),
    icon: images.logoutimig,
    screenName: 'LOGOUT',
  },
];
