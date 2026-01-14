export const getInitials = (name?: string): string => {
  if (!name) return "";

  // 🔹 Bỏ dấu tiếng Việt và ký tự đặc biệt
  const normalized = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu tiếng Việt
    .replace(/[^a-zA-Z\s]/g, ""); // bỏ ký tự không phải chữ cái

  const parts = normalized.trim().split(/\s+/);

  if (parts.length >= 2) {
    // Lấy chữ cái đầu của 2 từ cuối
    const last = parts[parts.length - 1][0];
    const secondLast = parts[parts.length - 2][0];
    return (secondLast + last).toUpperCase();
  } else {
    // Chỉ có 1 từ → lấy 2 ký tự đầu
    return parts[0].substring(0, 2).toUpperCase();
  }
};
