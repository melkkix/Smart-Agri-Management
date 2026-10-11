// ============================================================
// Smart Agri Management — Global Constants
// ============================================================

// App Info
export const APP_NAME = "Smart Agri Management";
export const APP_VERSION = "1.0.0";
export const APP_DESCRIPTION =
  "Empowering farmers with smart agriculture tools.";

// User Roles
export const ROLES = {
  ADMIN: "ADMIN",
  FARMER: "FARMER",
  BUYER: "BUYER",
};

// Auth
export const TOKEN_KEY = "smartagri_token";
export const USER_KEY = "smartagri_user";
export const REFRESH_TOKEN_KEY = "smartagri_refresh_token";

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

// API Status
export const API_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

// Crop Status
export const CROP_STATUS = {
  ACTIVE: "ACTIVE",
  HARVESTED: "HARVESTED",
  FAILED: "FAILED",
  PLANNED: "PLANNED",
};

// Order Status
export const ORDER_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
};

// Complaint Status
export const COMPLAINT_STATUS = {
  OPEN: "OPEN",
  IN_PROGRESS: "IN_PROGRESS",
  RESOLVED: "RESOLVED",
  CLOSED: "CLOSED",
};

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: "INFO",
  SUCCESS: "SUCCESS",
  WARNING: "WARNING",
  ERROR: "ERROR",
};

// Irrigation Types
export const IRRIGATION_TYPES = {
  DRIP: "Drip",
  SPRINKLER: "Sprinkler",
  FLOOD: "Flood",
  MANUAL: "Manual",
};

// Seasons
export const SEASONS = {
  KHARIF: "Kharif",
  RABI: "Rabi",
  ZAID: "Zaid",
};

// Indian States (for farm location)
export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal",
];

// Soil Types
export const SOIL_TYPES = [
  "Alluvial", "Black", "Red", "Laterite", "Desert/Arid", "Forest/Mountain",
  "Saline/Alkaline", "Peaty",
];

// Chart Colors
export const CHART_COLORS = {
  primary: "#22c55e",
  secondary: "#16a34a",
  accent: "#86efac",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#3b82f6",
  purple: "#8b5cf6",
  orange: "#f97316",
};

// Date Formats
export const DATE_FORMAT = "DD/MM/YYYY";
export const DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm";

// File Upload
export const MAX_FILE_SIZE_MB = 5;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
