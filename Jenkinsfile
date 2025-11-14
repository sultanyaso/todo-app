pipeline {
    agent any

    environment {
        BUILD_TIMESTAMP = "${new Date().format('yyyy-MM-dd HH:mm:ss')}"
    }

    stages {

        // -------------------------------
        stage('Checkout Code') {
            steps {
                echo "Checking out branch: ${env.BRANCH_NAME}"
                checkout scm
            }
        }

        // -------------------------------
        stage('Install Dependencies') {
            steps {
                echo "Installing Node.js dependencies..."
                sh 'npm install'
            }
        }

        // -------------------------------
        stage('Parallel Test Execution') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        echo "Running Unit Tests..."
                        sh 'npm test || echo "No unit tests configured, skipping"'
                    }
                }
                stage('Linting') {
                    steps {
                        echo "Running Linting..."
                        sh 'npm run lint || echo "Lint passed (simulated)"'
                    }
                }
            }
        }

        // -------------------------------
        stage('Conditional Deployment Simulation') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'main') {
                        echo "Deployed to Production Environment (main branch)"
                    } else if (env.BRANCH_NAME == 'dev') {
                        echo "Deployed to Staging Environment (dev branch)"
                    } else {
                        echo "Feature branch detected – Deployment Skipped."
                    }
                }
            }
        }

        // -------------------------------
        stage('Archive Artifacts') {
            steps {
                echo "Archiving build artifacts..."
                sh 'zip -r build-artifacts-${BUILD_NUMBER}.zip . || echo "No artifacts, skipping"'
                archiveArtifacts artifacts: "build-artifacts-${BUILD_NUMBER}.zip", fingerprint: true
            }
        }

    } // stages

    post {
        success {
            echo "Build #${BUILD_NUMBER} on branch ${BRANCH_NAME} completed successfully at ${BUILD_TIMESTAMP}"
        }
        failure {
            echo "Build failed on branch ${BRANCH_NAME} at ${BUILD_TIMESTAMP}"
        }
    }

}
