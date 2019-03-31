FROM node:8
RUN mkdir /workspace
RUN apt-get update && apt-get install -y \
	vim \
	git


RUN npm install


