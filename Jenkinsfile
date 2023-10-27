@Library('global-shared-library') _
def message = "";
pipeline {
    agent any
    environment {
        TAG = sh(script: "echo `date +%Y-%m%d-%H%M`", returnStdout: true).trim()
        Registry = "pgtgs/"
        dockerhub = credentials('dockerhub')
        Image = "agent-v2"
    }

    stages {		    	
        stage('Init Env') {
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
        stage('Prepare Env') {
            steps {
                cleanWs()
                checkout scm
                sh "docker login -u ${dockerhub_USR} -p ${dockerhub_PSW}"
                sh "echo 'Branch: ${env.GIT_BRANCH}'";
                script {
                    switch(env.GIT_BRANCH)
                    {
                        case ['master', 'origin/master']:
                            env.kube_ns = "prod";
                            env.k8s_config = 'prod-k8s-config';
                            break;
                        case ['release/current', 'origin/release/current']:
                            env.kube_ns = "staging";
                            env.k8s_config = 'stag-k8s-config';
                            break;
                        default:
                            env.kube_ns = "dev";
                            env.k8s_config = 'k8s-kube-config' 
                            break;
                    }
                    TAG = env.kube_ns + '-' + TAG
                    MergedTag = 'merged-' + TAG
                    message += "\nBranch: ${env.GIT_BRANCH}" 
                    message += "\nImage: ${Image}"
                    message += "\nTag: ${TAG}"
                    message += "\nEnv: $env.kube_ns"
                    env.commit_url = "${env.GIT_URL}".replace(".git","/-/commit/") + "${env.GIT_COMMIT}"
                    message += "\n Commit: ${env.commit_url}"
                }

                configFileProvider([configFile(fileId: 'tgs.' + env.kube_ns, variable: 'tgsconfig')]) {
                    script {
                        def envItems = readProperties file: "$tgsconfig";
                        envItems.each { key, value -> 
                            env."tgs_${key}" = value;
                        }
                        componentArray = "${env.tgs_agent_v2_components}".split(",")
                    }
                }

                sh "echo 'env: $env.kube_ns'"
                sh "echo 'tag: ${TAG}'"
            }
        } 
        stage('Npm Install') {   
            steps {                 
                sh "npm install"
                sh "npm run build --BRAND=PG2 --API_URL= --SITE=https://stg-t1.rpgp.cc/ --DEFAULT_LANGUAGE=zh-CN"
            }
        } 
        stage('Docker Build') {   
            steps {                 
                sh "docker build -t ${Registry}${Image}:${TAG} ."
            }
        }           
        stage('Docker Push') {   
            steps {   
                sh "docker push ${Registry}${Image}:${TAG}"
            }
        }
        stage('Deploy') {
            when {
                expression {
                    return env.kube_ns == 'prod';
                }
            }

            steps {
                script {
                    input message: 'Ready to go?', ok: 'yes';
                }
                
                sh "echo start deploy"
            }
        }
        stage('Deployment') {   
            steps {   
                script {            
                    withKubeConfig([credentialsId: env.k8s_config]) {
                        message += "\nComponent:"

                        for (i = 0;i < componentArray.length; i++) {
                            message += "\n    ${componentArray[i]}"
                            sh "kubectl set image deployment/${componentArray[i]} ${componentArray[i]}=${Registry}${Image}:${TAG} --record -n $env.kube_ns"
                        }
                    }
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
