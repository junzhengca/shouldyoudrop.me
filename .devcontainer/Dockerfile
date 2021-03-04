# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.145.1/containers/ubuntu/.devcontainer/base.Dockerfile

# [Choice] Ubuntu version: bionic, focal
ARG VARIANT="focal"
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}

# Replace shell with bash so we can use more features.
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Install some basic dev dependencies.
RUN export DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y -q --no-install-recommends \
        apt-transport-https \
        build-essential \
        ca-certificates \
        curl \
        git \
        libssl-dev \
        wget \
    && rm -rf /var/lib/apt/lists/*

# Install NVM with Node 14.15.0.
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 14.15.0
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

RUN echo "source $NVM_DIR/nvm.sh" >> /home/vscode/.bashrc

# Install MongoDB
# To start MongoDB, simply run `service mongodb start`
RUN mkdir /data && mkdir /data/db
RUN apt update
RUN apt install -y mongodb

# Install Redis
RUN apt install -y redis-server

# Install Python
RUN apt install -y python3-pip

# Install Golang
RUN apt update && apt install -y golang
