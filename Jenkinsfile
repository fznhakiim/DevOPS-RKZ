pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                git branch: 'main', url: 'https://github.com/fznhakiim/DevOPS-RKZ.git'
            }
        }
        stage('Build') {
            steps {
                echo 'Building the project...'
                bat '''
                echo Starting build process
                REM Tambahkan perintah build sesuai dengan kebutuhan
                echo Build selesai!
                '''
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                bat '''
                echo Starting test process
                REM Tambahkan perintah untuk menjalankan pengujian
                echo Semua tes selesai!
                '''
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the project...'
                bat '''
                echo Starting deployment
                REM Tambahkan langkah deployment (contoh: copy file)
                echo Deployment selesai!
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
