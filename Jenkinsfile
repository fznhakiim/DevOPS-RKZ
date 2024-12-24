pipeline {
    agent any
    triggers {
        cron('H/15 * * * *') // Menjadwalkan build setiap 15 menit
    }
    environment {
        DOCKER_IMAGE = 'devops-rkz:latest'
        CONTAINER_NAME = 'devops-rkz_container'
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_REPO = 'fznhakiim/devops-rkz'
    }
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                // Menggunakan kredensial untuk GitHub
                withCredentials([usernamePassword(credentialsId: 'DevOpsRKZ', usernameVariable: 'GITHUB_USERNAME', passwordVariable: 'GITHUB_TOKEN')]) {
                    git branch: 'master', url: 'https://github.com/fznhakiim/DevOPS-RKZ.git'
                }
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
        stage('Push Docker Image') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'
                // Menggunakan kredensial untuk Docker Hub
                withCredentials([usernamePassword(credentialsId: 'DockerHubCreds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    // Docker login menggunakan password stdin untuk keamanan
                    bat """
                    echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin ${DOCKER_REGISTRY}
                    docker tag ${env.DOCKER_IMAGE} ${env.DOCKER_REGISTRY}/${env.DOCKER_REPO}:latest
                    docker push ${env.DOCKER_REGISTRY}/${env.DOCKER_REPO}:latest
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
