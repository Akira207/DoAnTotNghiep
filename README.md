# Backend - Furniture Workshop API

Đây là phần backend của hệ thống quản lý xưởng sản xuất đồ gỗ, được xây dựng với kiến trúc RESTful API.

## 🚀 Công nghệ sử dụng
- **Node.js** & **Express.js**: Framework chính để xây dựng server.
- **MongoDB** & **Mongoose**: Cơ sở dữ liệu NoSQL và ODM để quản lý dữ liệu.
- **JSON Web Token (JWT)**: Xác thực và phân quyền người dùng.
- **Bcryptjs**: Mã hóa mật khẩu bảo mật.
- **Multer**: Xử lý upload hình ảnh/tệp tin.
- **Cors**: Cho phép frontend truy cập API từ domain khác.
- **Dotenv**: Quản lý biến môi trường.

## 🛠 Cấu trúc thư mục
- `config/`: Cấu hình kết nối cơ sở dữ liệu.
- `controllers/`: Chứa logic xử lý nghiệp vụ cho từng module (User, Order, Product, Warehouse...).
- `models/`: Định nghĩa schema cho MongoDB.
- `routes/`: Định nghĩa các endpoint API.
- `middleware/`: Các hàm trung gian (xác thực auth, upload file).
- `utils/`: Các hàm tiện ích dùng chung.
- `uploads/`: Thư mục lưu trữ tệp tin được upload.

## 📦 Các Module chính
- **Quản lý người dùng & Xác thực**: Đăng ký, đăng nhập, phân quyền.
- **Quản lý sản phẩm & Phụ kiện**: Quản lý danh mục đồ gỗ và linh kiện đi kèm.
- **Quản lý đơn hàng**: Xử lý đơn hàng, chi tiết đơn hàng và thanh toán.
- **Quản lý sản xuất**: Theo dõi tác vụ sản xuất và lô sản xuất.
- **Quản lý kho**: Theo dõi nhập nguyên vật liệu và tồn kho.
- **Quản lý khách hàng**: Lưu trữ thông tin khách hàng.

## ⚙️ Cài đặt và Chạy
1. Cài đặt dependencies:
   ```bash
   npm install
   ```
2. Tạo file `.env` với các thông tin sau:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
3. Chạy server ở chế độ phát triển:
   ```bash
   npm run dev
   ```
