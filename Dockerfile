FROM node:22-alpine

# パッケージ最新化とインストール
RUN apk update && apk add git curl

# workspaceディレクトリ作成
WORKDIR /workspace