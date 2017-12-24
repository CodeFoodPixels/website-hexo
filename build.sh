#! /bin/bash
shopt -s extglob

BRANCH=$(date +%F_%H-%M-%S)

# Delete the public folder, clone it down and remove everything that'll be generated
rm -rf public
git clone --depth=1 https://$GITHUB_KEY@github.com/$REPO_OWNER/$REPO.git public
rm -rf public/!(CNAME|README.md)

hexo generate

# If this is a Greenkeeper branch, we don't want to submit a PR
if [[ $(git branch --remote --verbose --no-abbrev --contains | sed -rne 's/^[^\/]*\/([^\ ]+).*$/\1/p') =~ ^greenkeeper/.*$ ]]; then
    exit;
fi

# Commit the changes, push and submit a PR
cd public
git checkout -b $BRANCH
git add .
git commit -m "Build $BRANCH"
git push --set-upstream origin $BRANCH
NOW_URL=$(now --token=$NOW_TOKEN --public -f)
curl -H "Content-Type: application/json" \
    -H "Authorization: token $GITHUB_KEY" \
    -X POST \
    -d '{"title": "Build '$BRANCH'", "body": "'$NOW_URL'", "head": "'$BRANCH'","base": "master"}' \
    https://api.github.com/repos/$REPO_OWNER/$REPO/pulls
