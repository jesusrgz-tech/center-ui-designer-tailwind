// Jenkinsfile de referencia: mismas etapas que .github/workflows/ci.yml y
// cd.yml, para comparar cómo se expresa el mismo pipeline en Jenkins.
// No es el pipeline activo del proyecto (el activo es GitHub Actions,
// porque el remoto vive en GitHub); esto es material de aprendizaje y
// queda listo por si en algún momento se monta un Jenkins propio (p. ej.
// para un entorno on-prem del SaaS).
//
// Requiere en el agente: Node 22, Docker con acceso al daemon, y
// credenciales configuradas en Jenkins:
//   - "registry-credentials": usuario/password o token del registry
//   - "kubeconfig": (opcional, solo si se habilita el stage de Deploy)

pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    environment {
        REGISTRY      = 'ghcr.io'
        IMAGE_NAME    = 'jesusrgz-tech/center-ui-designer-tailwind'
        IMAGE_TAG     = "${env.GIT_COMMIT?.take(7) ?: 'local'}"
        NODE_VERSION  = '22'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            agent {
                docker { image "node:${NODE_VERSION}-alpine" }
            }
            steps {
                sh 'npm ci'
            }
        }

        stage('Lint') {
            agent {
                docker { image "node:${NODE_VERSION}-alpine" }
            }
            steps {
                sh 'npm run lint'
            }
        }

        stage('Build') {
            agent {
                docker { image "node:${NODE_VERSION}-alpine" }
            }
            steps {
                sh 'npm run build'
            }
            post {
                success {
                    archiveArtifacts artifacts: 'dist/**', fingerprint: true
                }
            }
        }

        stage('Docker build') {
            when { branch 'main' }
            steps {
                sh "docker build -t ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} -t ${REGISTRY}/${IMAGE_NAME}:latest ."
            }
        }

        stage('Docker push') {
            when { branch 'main' }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'registry-credentials',
                    usernameVariable: 'REG_USER',
                    passwordVariable: 'REG_PASS'
                )]) {
                    sh '''
                        echo "$REG_PASS" | docker login $REGISTRY -u "$REG_USER" --password-stdin
                        docker push ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
                        docker push ${REGISTRY}/${IMAGE_NAME}:latest
                    '''
                }
            }
        }

        stage('Deploy') {
            when { branch 'main' }
            steps {
                echo 'Deploy deshabilitado por defecto. Para activarlo: ' +
                     'configurar credencial "kubeconfig" en Jenkins y ' +
                     'descomentar el bloque de kubectl (ver k8s/ y docs/CI-CD.md).'
                // withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                //     sh '''
                //         kubectl --kubeconfig=$KUBECONFIG set image deployment/tailadmin-react \
                //             app=${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} -n tailadmin
                //     '''
                // }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
