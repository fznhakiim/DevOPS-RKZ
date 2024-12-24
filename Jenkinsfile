pipeline {
    agent any
    triggers {
        cron('H/15 * * * *') // Menjadwalkan build setiap 15 menit
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
