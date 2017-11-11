#! /bin/bash
rm -rf public
git clone --depth=1 git@github.com:lukeb-uk/website.git public
hexo generate
cd public
BRANCH=$(date +%F_%H-%M-%S)
git checkout -b $BRANCH
git add .
git commit -m "Build $BRANCH"
git push --set-upstream origin $BRANCH
