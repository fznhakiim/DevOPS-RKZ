pipeline {
    agent any
    triggers {
        cron('H/15 * * * *') // Menjadwalkan build setiap 15 menit
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
        stage('Check and Push to Development') {
            steps {
                script {
                    echo 'Checking for changes in Jenkinsfile, Dockerfile, and .dockerignore...'
                    
                    // Fetch and checkout the development branch
                    bat '''
                    git fetch origin development
                    git checkout development || git checkout -b development
                    '''

                    // Check if the files differ between branches
                    def changes = sh(script: '''
                    git diff --name-only origin/master development -- Jenkinsfile Dockerfile .dockerignore
                    ''', returnStdout: true).trim()

                    if (changes) {
                        echo "Changes detected in: ${changes}"
                        bat '''
                        git checkout master -- Jenkinsfile Dockerfile .dockerignore
                        git add Jenkinsfile Dockerfile .dockerignore
                        git commit -m "Sync Jenkinsfile, Dockerfile, and .dockerignore from master to development"
                        git push origin development
                        '''
                    } else {
                        echo "No changes detected. Skipping push to development."
                    }
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
