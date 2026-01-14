// src/shared/enums/http-status.enum.ts
export enum HttpStatusCode {
  OK = 200,                     // Thành công (GET, UPDATE)
  CREATED = 201,                // Tạo mới thành công (POST)
  NO_CONTENT = 204,             // Thành công nhưng không trả dữ liệu

  BAD_REQUEST = 400,            // Request sai / thiếu dữ liệu
  UNAUTHORIZED = 401,           // Chưa đăng nhập / thiếu token
  FORBIDDEN = 403,              // Không có quyền truy cập
  NOT_FOUND = 404,              // Không tìm thấy tài nguyên
  CONFLICT = 409,               // Trùng dữ liệu (email, code...)
  UNPROCESSABLE_ENTITY = 422,   // Dữ liệu hợp lệ về format nhưng sai logic (validate fail)

  INTERNAL_SERVER_ERROR = 500,  // Lỗi hệ thống / lỗi server
}
