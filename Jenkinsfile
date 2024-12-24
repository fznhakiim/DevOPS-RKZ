pipeline {
    agent any
    triggers {
        cron('H/15 * * * *') // Menjadwalkan build setiap 15 menit
    }
    environment {
        DOCKER_IMAGE = 'devops-rkz:latest'
        CONTAINER_NAME = 'devops-rkz_container'
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_REPO = 'fznhakiim/devopsrkz'
    }
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                withCredentials([usernamePassword(credentialsId: 'DevOpsRKZ', usernameVariable: 'GITHUB_USERNAME', passwordVariable: 'GITHUB_TOKEN')]) {
                    git branch: 'master', url: 'https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/fznhakiim/DevOPS-RKZ.git'
                }
            }
        }
        stage('Build') {
            steps {
                echo 'Building the project...'
                bat '''
                echo Starting build process
                echo Building application...
                echo Build completed successfully!
                '''
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat "docker build -t ${DOCKER_IMAGE} ."
            }
        }
        stage('Push Docker Image') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    script {
                        // Debug credentials
                        echo "Using Docker Hub username: ${DOCKER_USERNAME}"

                        // Login, tag, and push Docker image securely
                        bat script: '''
                        echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin
                        docker tag ${DOCKER_IMAGE} ${DOCKER_REGISTRY}/${DOCKER_REPO}:latest
                        docker push ${DOCKER_REGISTRY}/${DOCKER_REPO}:latest
                        ''', environment: [
                            "DOCKER_PASSWORD=${DOCKER_PASSWORD}", 
                            "DOCKER_USERNAME=${DOCKER_USERNAME}"
                        ]
                    }
                }
            }
        }
        stage('Deploy Docker Container') {
            steps {
                echo 'Deploying Docker container...'
                bat """
                docker stop ${CONTAINER_NAME} || true
                docker rm ${CONTAINER_NAME} || true
                docker run -d -p 8080:8080 --name ${CONTAINER_NAME} ${DOCKER_REGISTRY}/${DOCKER_REPO}:latest
                """
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
