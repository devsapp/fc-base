
dev:
	npm run fix
	npm run lint
	git add .
	npm run build
	npm i
	npm run dev