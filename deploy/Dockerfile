FROM alpine:3.20.1 AS base


############################# Pocketbase #######################################
FROM base AS pocketbase

ARG TARGETOS
ARG TARGETARCH
ARG PB_VERSION=0.22.18
ARG PB_ZIP_FILE="pocketbase_${PB_VERSION}_${TARGETOS}_${TARGETARCH}.zip"

RUN apk add --no-cache unzip ca-certificates
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/${PB_ZIP_FILE} -O /tmp/pb.zip \
	&& unzip /tmp/pb.zip -d /pb/ \
	&& rm /tmp/pb.zip


EXPOSE 8080
ENTRYPOINT ["/pb/pocketbase"]

######################### Pocketbase Migrations ###############################
FROM pocketbase AS pocketbase-migrations

COPY ../backend/pocketbase/pb_migrations ./pb/pb_migrations

EXPOSE 8080
ENTRYPOINT ["/pb/pocketbase"]

######################### Remembit App ########################################
FROM pocketbase-migrations as app

COPY ../web/build ./pb/pb_public

EXPOSE 8080
ENTRYPOINT ["/pb/pocketbase"]

