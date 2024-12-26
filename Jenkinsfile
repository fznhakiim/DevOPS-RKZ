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
                        userRemoteConfigs: [[
                            url: 'https://github.com/fznhakiim/DevOPS-RKZ.git',
                            credentialsId: 'DevOpsRKZ'  // ID kredensial GitHub Anda
                        ]],
                    ])
                    echo 'Successfully checked out development branch.'
                }
            }
        }
        stage('Check and Push Files') {
            steps {
                script {
                    echo 'Adding and pushing files Jenkinsfile, Dockerfile, and .dockerignore...'

                    // Ensure we are on the master branch
                    echo 'Fetching latest changes from master branch...'
                    bat 'git fetch origin master'
                    
                    echo 'Switching to master branch...'
                    bat 'git checkout master'

                    echo 'Checking out files from development branch to master...'
                    bat 'git checkout development -- Jenkinsfile Dockerfile .dockerignore'

                    // Show git status to verify changes
                    echo 'Checking the status of the repository...'
                    bat 'git status'

                    echo 'Staging the files for commit...'
                    bat 'git add Jenkinsfile Dockerfile .dockerignore'

                    echo 'Committing the changes...'
                    bat 'git commit --allow-empty -m "Add Jenkinsfile, Dockerfile, and .dockerignore"'

                    echo 'Pushing changes to master branch...'
                    bat 'git push origin master || (echo "Git push failed!" && exit 1)'

                    echo 'Push completed successfully.'
                }
            }
        }
        stage('Build') {
            steps {
                echo 'Building the project...'
                bat 'echo Build process started...'
                bat 'echo Build process completed.'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                bat 'echo Test process started...'
                bat 'echo Test process completed.'
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat 'docker --version'
                bat 'docker build -t devops-rkz:latest .'
                echo 'Docker image build completed.'
            }
        }
        stage('Deploy Docker Container') {
            steps {
                echo 'Deploying Docker container...'
                bat '''
                echo "Stopping and removing existing container if any..."
                docker stop devops-rkz_container || exit 0
                docker rm devops-rkz_container || exit 0
                echo "Running new Docker container..."
                docker run -d -p 8080:8080 --name devops-rkz_container devops-rkz:latest
                '''
                echo 'Docker container deployed successfully.'
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
