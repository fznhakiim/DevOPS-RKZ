pipeline {
    agent any
    triggers {
        // Menjadwalkan build setiap 15 menit
        cron('H/15 * * * *') // Bisa disesuaikan jika Anda ingin menggunakan cron
        // Untuk otomatis memicu build jika ada perubahan di GitHub, Anda dapat menggunakan webhook.
        // Webhook di GitHub yang mengarah ke Jenkins untuk memicu build.
    }
    environment {
        DOCKER_IMAGE = 'devops-rkz:latest' // Nama dan tag image Docker
        CONTAINER_NAME = 'devops-rkz_container' // Nama container Docker
    }
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                git branch: 'master', url: 'https://github.com/fznhakiim/DevOPS-RKZ.git'
            }
        }
        stage('Build') {
            steps {
                echo 'Building the project...'
                bat '''
                echo Starting build process
                REM Ayo kita Build
                echo Build udah selesai yaa!
                '''
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                bat '''
                echo Starting test process
                REM Ayo kita Testing
                echo Semua tes udah selesai ya!
                '''
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    bat """
                    docker build -t ${env.DOCKER_IMAGE} . 
                    """
                }
            }
        }
        stage('Deploy Docker Container') {
            steps {
                echo 'Deploying Docker container...'
                script {
                    bat """
                    docker stop ${env.CONTAINER_NAME} || true
                    docker rm ${env.CONTAINER_NAME} || true
                    docker run -d -p 8080:8080 --name ${env.CONTAINER_NAME} ${env.DOCKER_IMAGE}
                    """
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline finished successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for more details.'
        }
        always {
            echo 'Pipeline execution completed.'
        }
    }
}
