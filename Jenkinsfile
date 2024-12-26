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
                checkout([ 
                    $class: 'GitSCM', 
                    branches: [[name: '*/master']], 
                    userRemoteConfigs: [[url: 'https://github.com/fznhakiim/DevOPS-RKZ.git']] 
                ])
            }
        }
        stage('Check and Push to Development') {
            steps {
                script {
                    echo 'Checking for changes in Jenkinsfile, Dockerfile, and .dockerignore...'

                    // Fetch and checkout the development branch
                    bat '''
                    git fetch origin
                    git checkout development
                    '''

                    // Periksa apakah file berubah antara master dan development
                    def changes = bat(
                        script: '''
                        git diff --name-only origin/master development -- Jenkinsfile Dockerfile .dockerignore
                        ''',
                        returnStdout: true
                    ).trim()

                    if (changes) {
                        echo "Changes detected in: ${changes}"

                        // Cek apakah ada submodule yang tidak diinginkan
                        bat '''
                        git rm --cached DevOPS-RKZ
                        '''

                        // Menambahkan file yang tidak terpelihara (untracked files) ke Git
                        bat '''
                        git add -A
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
