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
                    
                    for (i = 0;i <  data.cars.size(); i++) {
                        sh "echo 'brand: ${ data.cars[i].brand}'"   
                        sh "echo 'brand: ${ data.cars[i].fuel}'"   
                        sh "echo 'brand: ${ data.cars[i].transmission}'"   
                        sh "echo '=============='"
                    }
                }
            }
        }	
        
        stage('npm install') {
            steps {
                script {
                    sh "npm install"
                    sh "npm run build --BRAND=PG2 --API_URL=/ --SITE=https://stg-t1.rpgp.cc/ --DEFAULT_LANGUAGE=zh-CN"
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
