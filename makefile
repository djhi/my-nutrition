.PHONY: met test

copy-conf:
	cp -n ./settings/development/settings-dist.json ./settings/development/settings.json
	cp -n ./settings/production/settings-dist.json ./settings/production/settings.json
	cp -n ./settings/staging/settings-dist.json ./settings/staging/settings.json

make install: copy-conf
	npm install

mongo:
	cd meteor_core && meteor mongo

run-dev:
	node ./bin/development.js

run-debug:
	node ./bin/debug.js

run-prod:
	node ./bin/production.js

deploy-staging:
	NODE_ENV=staging node ./bin/deploy.js mup

deploy-prod:
	NODE_ENV=production node ./bin/deploy.js mup

restart-staging:
	cd ./settings/staging && mup restart

restart-prod:
	cd ./settings/production && mup restart

test:
	NODE_ENV=test ./node_modules/karma/bin/karma start
