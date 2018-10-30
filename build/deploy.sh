aws ecs register-task-definition --family squid-task --cli-input-json file://$WORKSPACE/_build/codebase-backend.json > $WORKSPACE/_build/codebase-backend_output.json
export PRODUCT_TASK_ARN=$(jq '.taskDefinition.taskDefinitionArn' mcodebase-backend_output.json | sed -e 's/^"//' -e 's/"$//')
export PRODUCT_TASK_FAMILY=$(jq '.taskDefinition.family' codebase-backend_output.json | sed -e 's/^"//' -e 's/"$//')
export PRODUCT_TASK_REVISION=$(jq '.taskDefinition.revision' codebase-backend_output.json)
aws ecs update-service --cluster codebase-backend-cluster --service codebase-backend --task-definition $PRODUCT_TASK_FAMILY:$PRODUCT_TASK_REVISION
