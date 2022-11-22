ECHO OFF

cd .\BoulderSite\
npm build
cd..
cd .\Server\
npm start

PAUSE