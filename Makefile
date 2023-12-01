basic_create:
	cd poke-js && yarn build
	rm -rf ./docs ./static
	mv poke-js/build ./docs
	mv ./docs/static ./
	mv ./docs/index.html .
	rm -rf ./docs
	python3 ./replace.py