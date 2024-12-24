# Menggunakan base image Java
FROM openjdk:11-jdk-slim

# Menentukan direktori kerja di dalam container
WORKDIR /app

# Menyalin file aplikasi ke dalam container
COPY target/*.jar app.jar

# Menentukan perintah untuk menjalankan aplikasi
ENTRYPOINT ["java", "-jar", "app.jar"]
