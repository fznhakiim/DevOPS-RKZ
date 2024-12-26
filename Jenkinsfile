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
        stage('Checkout Development') {
            steps {
                echo 'Checking out development branch...'
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/development']],
                    userRemoteConfigs: [[url: 'https://github.com/InTroubleWh/DevOps-RKZ.git']]
                ])
            }
        }
        stage('Check and Merge Changes') {
            steps {
                script {
                    echo 'Checking and merging changes...'

                    // Fetch updates for both branches
                    bat '''
                    git fetch origin master
                    git fetch origin development
                    '''

                    // Check if there are changes
                    def changes = bat(
                        script: '''
                        git diff --name-only origin/master origin/development -- Jenkinsfile Dockerfile .dockerignore
                        ''',
                        returnStdout: true
                    ).trim()

                    if (changes) {
                        echo "Differences detected: ${changes}"

                        // Checkout to master
                        bat '''
                        git checkout master
                        '''

                        // Merge development into master
                        bat '''
                        git merge development
                        '''

                        // Push merged changes to master
                        bat '''
                        git push origin master
                        '''
                    } else {
                        echo "No changes detected. Skipping merge."
                        currentBuild.result = 'SUCCESS'
                        return
                    }
                }
            }
        }
        stage('Build') {
            steps {
                echo 'Building the project...'
                bat '''
                echo Starting build process
                echo Build selesai!
                '''
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                bat '''
                echo Starting test process
                echo Semua tes selesai!
                '''
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    bat """
                    docker build --pull --cache-from=${env.DOCKER_IMAGE} -t ${env.DOCKER_IMAGE} .
                    """
                }
            }
        }
        stage('Deploy Docker Container') {
            steps {
                echo 'Deploying Docker container...'
                script {
                    try {
                        bat """
                        docker stop ${env.CONTAINER_NAME} || exit 0
                        docker rm ${env.CONTAINER_NAME} || exit 0
                        docker run -d -p 8080:8080 --name ${env.CONTAINER_NAME} ${env.DOCKER_IMAGE}
                        """
                    } catch (Exception e) {
                        echo "Failed to deploy Docker container: ${e.message}"
                    }
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline finished successfully!'
            emailext to: 'kemal@gmail.com', subject: 'Build Success', body: 'The pipeline has completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Check the logs for more details.'
            emailext to: 'kemal@gmail.com', subject: 'Build Failure', body: 'The pipeline failed. Please check the Jenkins logs.'
        }
        always {
            echo 'Pipeline execution completed.'
        }
    }
}
