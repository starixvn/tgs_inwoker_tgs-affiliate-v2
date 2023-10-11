@Library('global-shared-library') _
def message = "";
pipeline {
    agent any
    stages {		    	
        stage('Prepare Env') {
            steps {
                script {
                    def data = readYaml file: "brands.yaml"
                    def brand = data.cars[0].brand
                    sh "echo 'brand: ${brand}'"
                }
            }
        }	
    }
    post {
        success {
             sendTelegram("Pipeline: ${currentBuild.fullDisplayName} OK! ${message} \n${currentBuild.getBuildCauses()[0].shortDescription}\n")
        }
        failure {
            sendTelegram("<b>Failed Pipeline:</b> ${currentBuild.fullDisplayName} Something is wrong with ${env.BUILD_URL}/console\n${currentBuild.getBuildCauses()[0].shortDescription}\n")
        }
    }
}
