#!/usr/bin/env sh

# abort on errors
set -e

# set environment variable NODE_ENV to production
export NODE_ENV=production

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -B main
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:yuyu0905/yuyu0905.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/yuyu0905/project-sourire.git main:gh-pages

cd -