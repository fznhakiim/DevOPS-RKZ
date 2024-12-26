# Menggunakan base image Nginx
FROM nginx:latest

# Menyalin semua file website ke direktori default Nginx
COPY . /usr/share/nginx/html

# Ekspose port 80 untuk diakses
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
