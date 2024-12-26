pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'devops-rkz:latest'
        CONTAINER_NAME = 'devops-rkz_container'
    }
    stages {
        stage('Checkout Development') {
            steps {
                script {
                    echo 'Checking out development branch...'
                    checkout([ 
                        $class: 'GitSCM',
                        branches: [[name: '*/development']],
                        userRemoteConfigs: [[url: 'https://github.com/fznhakiim/DevOPS-RKZ.git']]
                    ])
                }
            }
        }
        stage('Check and Push Files') {
            steps {
                script {
                    echo 'Adding and pushing files Jenkinsfile, Dockerfile, and .dockerignore...'

                    // Ensure we are on the master branch
                    bat 'git fetch origin master'
                    bat 'git checkout master'

                    // Copy necessary files (Jenkinsfile, Dockerfile, .dockerignore) from development to master
                    bat 'git checkout development -- Jenkinsfile Dockerfile .dockerignore'

                    // Add the files to staging
                    bat 'git add Jenkinsfile Dockerfile .dockerignore'

                    // Commit changes
                    bat 'git commit -m "Add Jenkinsfile, Dockerfile, and .dockerignore"'

                    // Push changes to master
                    bat 'git push origin master'
                }
            }
        }
        stage('Build') {
            steps {
                echo 'Building the project...'
                bat 'echo Build process completed.'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                bat 'echo Test process completed.'
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat 'docker build -t devops-rkz:latest .'
            }
        }
        stage('Deploy Docker Container') {
            steps {
                echo 'Deploying Docker container...'
                bat '''
                docker stop devops-rkz_container || exit 0
                docker rm devops-rkz_container || exit 0
                docker run -d -p 8080:8080 --name devops-rkz_container devops-rkz:latest
                '''
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
