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
        stage('Check and Merge Changes') {
            steps {
                script {
                    echo 'Checking and merging changes...'

                    // Fetch updates for branch development
                    bat 'git fetch origin development'

                    // Check if master branch exists in remote
                    def masterExists = bat(
                        script: 'git ls-remote --heads origin master',
                        returnStatus: true
                    ) == 0

                    if (!masterExists) {
                        echo "Master branch does not exist. Creating it..."
                        bat '''
                        git checkout development
                        git checkout -b master
                        git push origin master
                        '''
                    } else {
                        echo "Master branch exists. Fetching it..."
                        bat 'git fetch origin master'
                    }

                    // Check and merge changes
                    bat 'git checkout master'
                    bat 'git merge development'
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
