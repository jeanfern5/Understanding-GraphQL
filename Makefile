

build-docker:
	docker build -t todo_list .


run-docker:
	docker run -u 0 -it -p 8080:8080 -p 5000:5000 -v $(shell pwd):/workspace todo_list bash






