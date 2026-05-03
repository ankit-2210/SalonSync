pipeline {
    agent any

    environment {
        DOCKER_HUB = "ankitagarwal2210"
        SERVICES = "ApiGateway EurekaServer UserService SalonService BookingService CategoryService OfferingService PaymentService NotificationService ReviewService"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/ankit-2210/SalonSync.git'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'ankit-2210', passwordVariable: 'ankit-2210')]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Build & Push Microservices') {
            steps {
                script {
                    def services = SERVICES.split(" ")

                    for (service in services) {
                        echo "Building ${service}"

                        dir(service) {
                            sh '''
                                mvn clean package -DskipTests
                                mvn compile jib:build
                            '''
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                dir('DockerCompose/default') {
                    sh '''
                        docker-compose down
                        docker-compose pull
                        docker-compose up -d
                    '''
                }
            }
        }
    }
}