#!/usr/bin/env sh
NAME=birthday

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo "$NAME.sdavis.online" > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:SamuelDavis/$NAME.git master:gh-pages

cd -
