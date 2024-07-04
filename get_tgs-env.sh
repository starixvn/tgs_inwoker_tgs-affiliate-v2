#!/bin/bash
get_environment() {
  declare -A branch_env_mapping=(
    ["release/current"]="staging"
    ["develop"]="dev"
    ["master"]="prod"
  )

  branch_name="$1"
  tgs_env=${branch_env_mapping["$branch_name"]}

  if [ -z "$tgs_env" ]; then
    echo "Unsupported branch for deployment"
    exit 1
  fi

  echo "$tgs_env"
}

deploy_brands() {
  npm install --force
  echo "YAML_CONTENT=$YAML_CONTENT"
  
  for ((index=0; index<=total_brands; index++)); do
    deploy=$(echo "$YAML_CONTENT" | yq eval ".brands[$index].deploy" -)
    site=$(echo "$YAML_CONTENT" | yq eval ".brands[$index].site" -)
    lang=$(echo "$YAML_CONTENT" | yq eval ".brands[$index].lang" -)
    brand=$(echo "$YAML_CONTENT" | yq eval ".brands[$index].brand" -)

    echo "Processing brand: $brand, $deploy, $site, $lang"

    image_tag="pgtgs/${deploy}:$Tag"
    
    npm run gitlab-build -- BRAND=${brand} API_URL=/ SITE=${site} DEFAULT_LANGUAGE=${lang} vite build -m prod
    echo "image_tag=$image_tag"
    
    docker build -t $image_tag .
    docker push $image_tag
    kubectl set image deployment/$deploy $deploy=$image_tag -n $tgs_env
    echo "=============="
  done
}

deploy_single_brand() {
  npm run gitlab-build -- BRAND=$BRAND API_URL=/ --SITE=$SITE DEFAULT_LANGUAGE=$LANG vite build -m prod
  lowercase_brand=$(echo "$BRAND" | tr '[:upper:]' '[:lower:]')
  echo "lowercase_brand=$lowercase_brand"
  tag="$(date -d $CI_PIPELINE_CREATED_AT +%Y%m%d%H%M).$CI_PIPELINE_IID"
  tgs_env=$(get_environment "$CI_COMMIT_REF_NAME")
  image="pgtgs/agent-$lowercase_brand:$tag"
  docker build -t $image .
  docker push $image
  
  envsubst < deployment/agent-${tgs_env}.yaml 
  envsubst < deployment/agent-${tgs_env}.yaml  | kubectl apply -f -
}