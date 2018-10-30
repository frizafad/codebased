// global variable
def flagCheck     = false
def containerPort = "8080"
def containerEnv  = ""

// curl helper functiom
def curlRun(url, out="") {
  script {
    if (out.equals('')) {
      out = 'http_code'
    }

    echo "Getting Output ${out} from ${url}"
    def result = sh (
      returnStdout: true,
      script: "curl --output /dev/null --silent --connect-timeout 5 --max-time 5 --retry 5 --retry-delay 5 --retry-max-time 30 --write-out \"%{${out}}\" ${url}"
    )

    echo "Result of (${out}): ${result}"
  }
}

// workspace cleaner helper function
def cleanUpWorkspace() {
  script {
    deleteDir()
  }
}

// docker cleaner helper function
def cleanUpDocker(containerName="", imageName="") {
  script {
    if (! containerName.equals('')) {
      sh "docker stop '${containerName}' || true"
      sh "docker rm -f '${containerName}' || true"
    }
    
    if (! imageName.equals('')) {
      sh "docker rmi -f '${imageName}' || true"
    }

    if (! containerName.equals('') && ! imageName.equals('')) {
      cleanUpWorkspace()
    }
  }  
}

def transferFile(choice=""){
  script{
    if(choice == "a"){
      echo "Pushing Image to Private Registry"
      // try {
      //   flagCheck = false

      //   echo "Logging-in to Private Registry"
      //   sh "docker login --username='${params.KUBE_DEV_NAMESPACE}' --password='${params.DOCKER_DEV_REGISTRY_TOKEN}' ${params.DOCKER_DEV_REGISTRY_URL}"

      //   echo "Docker Build Image"
      //   sh "docker build -t '${params.DOCKER_DEV_REGISTRY_URL}/${params.KUBE_DEV_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:${params.DOCKER_IMAGE_TAG}' ."

      //   echo "Pushing Image to Private Registry"
      //   sh "docker push '${params.DOCKER_DEV_REGISTRY_URL}/${params.KUBE_DEV_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:${params.DOCKER_IMAGE_TAG}'"

      //   flagCheck = true
      // } finally {
      //   if (flagCheck == false) {
      //     echo "Pushing Image to Private Registry: Failed, Exiting Pipeline"
      //     cleanUpDocker("", "${params.DOCKER_DEV_REGISTRY_URL}/${params.KUBE_DEV_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:${gitTagName}")
          
      //     echo "Logging-out from Private Registry"
      //     sh "docker logout ${params.DOCKER_DEV_REGISTRY_URL}"

      //     currentBuild.result = 'FAILURE'
      //     sh "exit 1"
      //   } else {
      //     sh "rsync -avz ./MyIndohomedev.jmx mytelkom@118.98.34.150/var/www/html/myindidev/public" 
      //     echo "Logging-out from Private Registry"
      //     cleanUpDocker("", "${params.DOCKER_DEV_REGISTRY_URL}/${params.KUBE_DEV_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:${gitTagName}")

      //     sh "docker logout ${params.DOCKER_DEV_REGISTRY_URL}"
      //     echo "Pushing Image to Private Registry: Success, Continuing Pipeline"
      //   }
      // }
    }else if(choice == "b"){
      echo "RSync to DEV VM"
      //rsync -avz ./* mytelkom@118.98.34.150/var/www/html/myindidev/public
      //withCredentials([usernameColonPassword(credentialsId: 'mylogin', variable: 'USERPASS')]) {
      //sh '''
      //    rsync -Pav -e "ssh -i $HOME/.ssh/somekey" /* mytelkom@118.98.34.150:/var/www/html/myindidev/public
      //'''
      //}
    }else{

    }
  }
}

def container(choice="") {
  script {
    if (choice == "c"){
      try {
        flagCheck = false
        
        echo "Docker Build Image"
        sh "docker build -t '${params.KUBE_DEV_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:${params.DOCKER_IMAGE_TAG}' ."

        echo "Parse Port & Environment Parameter"
        containerPort  = params.CONTAINER_PORT.tokenize(",")
        def stringPort = ""            
        containerPort.each { portValue ->
          stringPort  += "-p :${portValue} "
        }
        println stringPort
        def stringEnv  = ""
        containerEnv   = params.CONTAINER_ENV.tokenize(",")
        containerEnv.each { envValue ->
          stringEnv   += "-e ${envValue} "
        }
        println stringEnv

        echo "Docker Run Image"
        sh "docker run -d ${stringPort} ${stringEnv} --name '${params.KUBE_DEV_NAMESPACE}-${params.DOCKER_IMAGE_NAME}-${params.DOCKER_IMAGE_TAG}' --rm '${params.KUBE_DEV_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:${params.DOCKER_IMAGE_TAG}'"
        sleep 5

        flagCheck = true
      } finally {
        if (flagCheck == false) {
          echo "Containerize: Failed, Exiting Pipeline"
          cleanUpDocker("${params.KUBE_DEV_NAMESPACE}-${params.DOCKER_IMAGE_NAME}-${params.DOCKER_IMAGE_TAG}", "${params.KUBE_DEV_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:${params.DOCKER_IMAGE_TAG}")

          currentBuild.result = 'FAILURE'
          sh "exit 1"
        } else {
          echo "Containerize: Success, Continuing Pipeline"
        }
      }
    }else if(choice == "a") {
      echo "Invoke JMeter on DEV Server From Image Repository"
      //sh "ssh mytelkom@118.98.34.150 docker build -t '${params.DOCKER_DEV_REGISTRY_URL}/${params.KUBE_DEV_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:${params.DOCKER_IMAGE_TAG}' ."

    }else{
      echo "Invoke JMeter on DEV Server From RSync"
      //sh "ssh mytelkom@118.98.34.150 docker build -t '${params.DOCKER_DEV_REGISTRY_URL}/${params.KUBE_DEV_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:${params.DOCKER_IMAGE_TAG}' ."

    }
  }
}

def deploying(choice=""){
  script{
    if(choice == "c"){
      echo "Deploying to OpenShift"
      // try {
      //   flagCheck = false

      //   echo "Cleaning-up Docker"
      //   cleanUpDocker("${params.KUBE_DEV_NAMESPACE}-${params.DOCKER_IMAGE_NAME}-${params.DOCKER_IMAGE_TAG}")
      //   openshiftBuild(apiURL: "${params.KUBE_DEV_URL}", authToken: "${params.KUBE_DEV_TOKEN}", namespace: 'params.KUBE_DEV_NAMESPACE', buildConfig: "${params.KUBE_DEV_NAMESPACE}", showBuildLogs: 'true')  

      //   flagCheck = true
      // } finally {
      //   if (flagCheck == false) {
      //     echo "Deploying to OpenShift: Failed, Exiting Pipeline."
      //     cleanUpDocker("${params.KUBE_DEV_NAMESPACE}-${params.DOCKER_IMAGE_NAME}-${params.DOCKER_IMAGE_TAG}", "${params.KUBE_DEV_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:${params.DOCKER_IMAGE_TAG}")

      //     currentBuild.result = 'FAILURE'
      //     sh "exit 1"
      //   } else {
      //     echo "Deploying to Openshift: Success, Continuing Pipeline"
      //   }
      // }   
    }else{

    }
  }
}

def testJMeter(choice=""){
  script{
    if(choice=="c"){
      try{
        flagCheck=false
        echo "Invoke JMeter"
        def exposedPort

        exposedPort = sh (
          returnStdout: true,
          script: "docker ps -a -f 'name=${params.KUBE_DEV_NAMESPACE}-${params.DOCKER_IMAGE_NAME}-${params.DOCKER_IMAGE_TAG}' --format '{{.Ports}}' | cut -d':' -f2 | cut -d'-' -f1 | xargs | tr -d ' ' | tr -d '\\n'"
        )
        println exposedPort
        
        sh "sed -i -e '/HTTPSampler.port/s/1234/${exposedPort}/g' ./test.jmx"
        sh 'mkdir JMeter'
        sh '/var/lib/jenkins/tools/jmeter/bin/jmeter -n -t ./test.jmx -l ./result.jtl -e -o ./JMeter/'
        publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: './JMeter/', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: ''])
        flagCheck=true
      }finally{
        if(flagCheck==false){
          cleanUpDocker("${params.KUBE_DEV_NAMESPACE}-${params.DOCKER_IMAGE_NAME}-${params.DOCKER_IMAGE_TAG}", "${params.KUBE_DEV_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:${params.DOCKER_IMAGE_TAG}")
        }
      }
      


    }else if(choice=="b"){
      echo "Invoke JMeter"
      
    }else{

    }
  }
}

// pipeline declarative
pipeline {
  parameters {
    string(name: 'gitBranch',                  description: '',                                                  defaultValue: 'master')
    string(name: 'choice',                     description: '',                                                  defaultValue: 'c')
    string(name: 'KUBE_DEV_NAMESPACE',         description: 'Kubernetes Development Namespace',                  defaultValue: 'bulir-api-dev-new')
    string(name: 'KUBE_DEV_BLD_CFG',           description: 'Kubernetes Development Build Config',               defaultValue: 'bulir-api-new')
    string(name: 'KUBE_DEV_URL',               description: 'Kubernetes Development URL',                        defaultValue: 'https://console.playcourt.id/')
    string(name: 'KUBE_DEV_TOKEN',             description: 'Kubernetes Development Token',                      defaultValue: '')
    
    string(name: 'SKIP_TLS',                   description: 'Skip TLS',                                          defaultValue: 'true')

    string(name: 'DOCKER_IMAGE_NAME',          description: 'Docker Image Name',                                 defaultValue: 'bulir-api-new')
    string(name: 'DOCKER_IMAGE_TAG',           description: 'Docker Image Tag',                                  defaultValue: 'latest')

    string(name: 'CONTAINER_PORT',             description: 'Container Port List (Seperate with Commas)',        defaultValue: '8080')
    string(name: 'CONTAINER_ENV',              description: 'Container Environment List (Seperate with Commas)', defaultValue: '')
  }

  agent none
  stages {
    stage("Initialize") {
      parallel {
        stage("Agent: NodeJS") {
          agent { label "jenkins-agent-nodejs-1" }
          steps {
            script {
              echo "Cleaning-up Environment"
              cleanUpWorkspace()

              echo "Checking-up Environment"
              sh "git --version"
            }
          }
        }

        stage("Agent: Docker") {
          agent { label "jenkins-agent-docker-1" }
          steps {
            script {
              echo "Cleaning-up Environment"

              echo "Checking-up Environment"
              sh "git --version"
              sh "docker --version"
            }
          }
        }
      }
    }

  stage("Checkout SCM") {
      parallel {
        stage("Agent: NodeJS") {
          agent { label "jenkins-agent-nodejs-1" }
          steps {            
            script {
              echo "Checking-out SCM"
              checkout scm
              //try{
                gitBranchNameDocker = sh (
                  returnStdout: true,
                  script: "git branch | grep \\\\\\* | awk -F' ' '{print \$2}'"
                )

                println gitBranchNameDocker
                println params.gitBranch

                // if(gitBranchNameDocker == params.gitBranch){
                //   flagCheck = true
                // }
             // }finally{
                // if(flagCheck == false){
                //   cleanUpWorkspace()

                //   currentBuild.delete
                //   sh "exit 0"
                // }
             // }
            }
          }
        }

        stage("Agent: Docker") {
          agent { label "jenkins-agent-docker-1" }
          steps {
            script {
              echo "Checking-out SCM"
              checkout scm
            }
          }
        }
      }
    }

    stage("Unit Test & Analysis") {
      agent { label "jenkins-agent-nodejs-1" }
      steps {
        script {
          try {
            flagCheck = false


              sh 'pwd'
              sh 'rm -rf .svn'
              sh 'ls -lah'
            // PUT UNIT TEST HERE

            flagCheck = true
          } finally {

            echo "Run SonarQube Analysis"
            def scannerHome = tool 'SonarQube Scanner';
            withSonarQubeEnv('SonarQube') {
              sh "${scannerHome}/bin/sonar-scanner"
            }

            if (flagCheck == false) {
              echo "Unit Test: Failed, Exiting Pipeline"
              cleanUpWorkspace()

              currentBuild.result = 'FAILURE'
              sh "exit 1"
            } else {
              echo "Unit Test: Success, Continuing Pipline"
            }
          }
        }
      }
    }

    stage("Build") {
      agent { label "jenkins-agent-docker-1" }
      steps {
        script{
          transferFile("c")
          container("c")
        }
      }
    }

    // stage("Container Test") {
    //   parallel {
    //     stage("Get http_code") {
    //       agent { label "jenkins-agent-docker-1" }
    //       steps {
    //         script {
    //           try {
    //             flagCheck = false
                
    //             def exposedPort = ""
    //             containerPort.each { portValue ->
    //               exposedPort = sh (
    //                 returnStdout: true,
    //                 script: "docker ps -a -f 'name=${params.KUBE_DEV_NAMESPACE}-${params.DOCKER_IMAGE_NAME}-${params.DOCKER_IMAGE_TAG}' --format '{{.Ports}}' | cat | awk '{for(i=1;i<=NF;i++){tmp=match(\$i,/${portValue}/);if(tmp){print \$i}}}' | cut -d'-' -f1 | cut -d':' -f2 | xargs | tr -d ' ' | tr -d '\\n'"
    //               )

    //               curlRun("127.0.0.1:${exposedPort}", "http_code")
    //             }

    //             flagCheck = true
    //           } finally {
    //             if (flagCheck == false) {
    //               echo "Container Test: Failed, Exiting Pipeline"
    //               cleanUpDocker("${params.KUBE_DEV_NAMESPACE}-${params.DOCKER_IMAGE_NAME}-${params.DOCKER_IMAGE_TAG}", "${params.DOCKER_DEV_REGISTRY_URL}/${params.KUBE_DEV_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:${params.DOCKER_IMAGE_TAG}")

    //               sh "exit 1"
    //             } else {
    //               echo "Container Test: Success, Continuing Pipeline"
    //             }
    //           }
    //         }
    //       }
    //     }

    //     stage("Get time_total") {
    //       agent { label "jenkins-agent-docker-1" }
    //       steps {
    //         script {
    //           try {
    //             flagCheck = false                
                
    //             def exposedPort = ""
    //             containerPort.each { portValue ->
    //               exposedPort = sh (
    //                 returnStdout: true,
    //                 script: "docker ps -a -f 'name=${params.KUBE_DEV_NAMESPACE}-${params.DOCKER_IMAGE_NAME}-${params.DOCKER_IMAGE_TAG}' --format '{{.Ports}}' | cat | awk '{for(i=1;i<=NF;i++){tmp=match(\$i,/${portValue}/);if(tmp){print \$i}}}' | cut -d'-' -f1 | cut -d':' -f2 | xargs | tr -d ' ' | tr -d '\\n'"
    //               )

    //               curlRun("127.0.0.1:${exposedPort}", "time_total")
    //             }

    //             flagCheck = true
    //           } finally {
    //             if (flagCheck == false) {
    //               echo "Container Test: Failed, Exiting Pipeline"
    //               cleanUpDocker("${params.KUBE_DEV_NAMESPACE}-${params.DOCKER_IMAGE_NAME}-${params.DOCKER_IMAGE_TAG}", "${params.DOCKER_DEV_REGISTRY_URL}/${params.KUBE_DEV_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:${params.DOCKER_IMAGE_TAG}")

    //               currentBuild.result = 'FAILURE'
    //               sh "exit 1"
    //             } else {
    //               echo "Container Test: Success, Continuing Pipeline"
    //             }
    //           }
    //         }
    //       }
    //     }

    //     stage("Get size_download") {
    //       agent { label "jenkins-agent-docker-1" }
    //       steps {
    //         script {
    //           try {
    //             flagCheck = false
                
    //             def exposedPort = ""
    //             containerPort.each { portValue ->
    //               exposedPort = sh (
    //                 returnStdout: true,
    //                 script: "docker ps -a -f 'name=${params.KUBE_DEV_NAMESPACE}-${params.DOCKER_IMAGE_NAME}-${params.DOCKER_IMAGE_TAG}' --format '{{.Ports}}' | cat | awk '{for(i=1;i<=NF;i++){tmp=match(\$i,/${portValue}/);if(tmp){print \$i}}}' | cut -d'-' -f1 | cut -d':' -f2 | xargs | tr -d ' ' | tr -d '\\n'"
    //               )

    //               curlRun("127.0.0.1:${exposedPort}", "size_download")
    //             }
                
    //             flagCheck = true
    //           } finally {
    //             if (flagCheck == false) {
    //               echo "Container Test: Failed, Exiting Pipeline"
    //               cleanUpDocker("${params.KUBE_DEV_NAMESPACE}-${params.DOCKER_IMAGE_NAME}-${params.DOCKER_IMAGE_TAG}", "${params.DOCKER_DEV_REGISTRY_URL}/${params.KUBE_DEV_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:${params.DOCKER_IMAGE_TAG}")

    //               currentBuild.result = 'FAILURE'
    //               sh "exit 1"
    //             } else {
    //               echo "Container Test: Success, Continuing Pipeline"
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }

    stage("Deploy") {
      agent { label "jenkins-agent-docker-1" }
      steps {
        script {
         deploying("c")
        }
      }
    }

    // stage("JMeter") {
    //   agent { label "jenkins-agent-docker-1" }
    //   steps {
    //     script {
    //      testJMeter("c")
    //     }
    //   }
    // }

    stage("Finalize") {
      parallel {
        stage("Agent: NodeJS") {
          agent { label "jenkins-agent-nodejs-1" }
          steps {
            script {
              echo "Cleaning-up Environment"
              cleanUpWorkspace()
            }
          }
        }

        stage("Agent: Docker") {
          agent { label "jenkins-agent-docker-1" }
          steps {
            script {
              echo "Cleaning-up Environment"
              cleanUpDocker("${params.KUBE_DEV_NAMESPACE}-${params.DOCKER_IMAGE_NAME}-${params.DOCKER_IMAGE_TAG}", "${params.KUBE_DEV_NAMESPACE}/${params.DOCKER_IMAGE_NAME}:${params.DOCKER_IMAGE_TAG}")
            }
          }
        }
      }
    }

  }
}
