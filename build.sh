#! /bin/bash

BRANCH=$(date +%F_%H-%M-%S)
rm -rf public
git clone --depth=1 https://$GITHUB_KEY@github.com/$REPO_OWNER/$REPO.git public
hexo generate
cd public
git checkout -b $BRANCH
git add .
git diff-index --quiet HEAD -- ':(exclude)rss.xml'
if [ "$?" != "0" ]; then
    git commit -m "Build $BRANCH"
    git push --set-upstream origin $BRANCH
    NOW_URL=$(now --token=$NOW_TOKEN --public -f)
    curl -H "Content-Type: application/json" \
        -H "Authorization: token $GITHUB_KEY" \
        -X POST \
        -d '{"title": "Build '$BRANCH'", "body": "'$NOW_URL'", "head": "'$BRANCH'","base": "master"}' \
        https://api.github.com/repos/$REPO_OWNER/$REPO/pulls
fi;
