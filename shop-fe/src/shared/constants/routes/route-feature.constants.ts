export const ROUTE_COMMON_FEATURES = {
  CREATE: 'create',
  FIND_ONE_BY_ID: 'find-one-by-id',
  FIND_ONE_BY_SLUG: 'find-one-by-slug',
  FIND_MULTI: 'find-multi', // dùng cho ui table
  FIND_ALL: 'find-all', // dùng cho select-option
  UPDATE: 'update',
  DELETE_MULTI: 'delete-multi',
  DELETE: 'delete',
  SOFT_DELETE: 'soft-delete',
  RESTORE: 'restore',
  FIND_DATA: 'find-data', // Bảng chỉ có 1 item
};

export const ROUTE_FEATURES = {
  AUTH: {
    LOG_IN: 'login',
    REGISTER: 'register',
    ADMIN_LOG_IN: 'admin/login',
    GET_ME: 'get-me',
    LOG_OUT: 'logout',
    SEND_MAIL: 'send-mail',
    VEIRIFY_MAIL: 'verify-email'
  },
  UPLOAD: {
    CREATE: 'upload'
  },
  ROLES: {
    UPDATE_PERMISSIONS: 'update-permissions',
  },
  USERS: {
    CHANGE_STATUS: 'change-status',
    REVOKE: 'revoke',
    UPLOAD_AVATAR: 'upload-avatar',
    DEPARTMENT_TYPE: 'department-type',
  },
  CUSTOMER: {
    CHANGE_STATUS: 'change-status',
    IMPORT: 'import',
    DISTRIBUTE: 'distribute',
    ADD_NOTE: 'add-note',
    ADD_ORDER: 'add-order',
    FIND_MULTI_BARE: 'get-multi-bare',
    GET_ONE_BY_MKH: 'get-one-by-mkh',
    GET_NOTE_SIMPLE: 'get-note-simple',
  },
  CUSTOMER_CAMPAIGN: {
    REPORT: 'report',
  },
  CUSTOMER_ORDER: {
    CHANGE_STATUS: 'change-status',
  },
  INVENTORY: {
    GET_NEW_CODE: 'get-new-code',
  },
  SETTINGS: {
    INVENTORY: {
      GET_ONE_BY_TYPE: 'get-one-by-type',
    },
  },
  SETTING_VAT: {
    RECOVER: 'recover',
  },
  CHAT_FACEBOOK: {
    WEBHOOK: 'webhook',
  },
  TABLE_SELECTED: {
    GET_ONE: 'get-one',
  },
  TABLE_TAB: {
    GET_ONE: 'get-one',
  },
  DASHBOARD_SETTING: {
    GET_ONE: 'get-one',
  },
  REPORT: {
    GET_USERS_SALE_INFO_SIMPLE: 'get-users-sale-info-simple',
    GET_USER_SALE_INFO: 'get-user-sale-info',
    GET_USER_SALE_STATUS_INFO: 'get-user-sale-status-info',
    GET_USER_SALE_INFO_MONTHS_A_YEAR: 'get-user-sale-info-months-a-year',
    GET_USERS_SALE_INFO_YEAR: 'get-users-sale-info-year',
    GET_REVENUE_MONTH: 'get-revenue-month',
    GET_REVENUE_DETAIL_MONTH: 'get-revenue-month-detail',
  },
  NOTIFICATION: {
    MARK_ALL_READ: 'mark-all-read',
    UNREAD_COUNT: 'unread-count',
    MARK_READ: 'mark-read',
  },
  DATA_STORAGE: {
    TEST_DRIVE: 'test-drive',
  },
  DOMAIN_EXTERNAL: {
    REFRESH_TOKEN: 'refresh-token',
  },
};
