/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http', // Hoặc 'https', tùy thuộc vào server của bạn
        hostname: 'localhost', // Tên miền hoặc địa chỉ IP của server
        port: '3000', // Cổng mà server đang chạy
        pathname: '/path/to/images/**', // Đường dẫn tới hình ảnh trên server
      },
    ],
  },
};

module.exports = nextConfig;
