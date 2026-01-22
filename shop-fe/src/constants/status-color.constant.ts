export const STATUS_COLORS = {
  ACTIVE: "#4CAF50",        // Green – đang hoạt động
  INACTIVE: "#9CA3AF",      // Gray – không hoạt động
  DISABLED: "#6B7280",      // Dark Gray – bị vô hiệu
  PENDING: "#FACC15",       // Yellow – đang chờ
  PROCESSING: "#3B82F6",    // Blue – đang xử lý
  SUCCESS: "#16A34A",       // Green Dark – thành công
  WARNING: "#F97316",       // Orange – cảnh báo
  ERROR: "#EF4444",         // Red – lỗi
  FAILED: "#DC2626",        // Red Dark – thất bại
  INFO: "#0EA5E9",          // Cyan – thông tin
  DEFAULT: "#000000",          // Cyan – thông tin
} as const;
