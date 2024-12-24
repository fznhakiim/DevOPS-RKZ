pipeline {
    agent any
    triggers {
        cron('H/15 * * * *') // Menjadwalkan build setiap 15 menit
    }
    environment {
        DOCKER_IMAGE = 'DevOPS-RKZ:latest' // Nama dan tag image Docker
        CONTAINER_NAME = 'DevOPS-RKZ_container' // Nama container Docker
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
                    sh '''
                    docker build -t $DOCKER_IMAGE .
                    '''
                }
            }
        }
        stage('Deploy Docker Container') {
            steps {
                echo 'Deploying Docker container...'
                script {
                    sh '''
                    # Hentikan container jika sudah ada
                    docker stop $DevOPS-RKZ_container || true
                    docker rm $DevOPS-RKZ_container || true
                    
                    # Jalankan container baru
                    docker run -d --name $DevOPS-RKZ_container -p 8080:8080 $DOCKER_IMAGE
                    '''
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
