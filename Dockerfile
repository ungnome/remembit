FROM alpine:3.21.0 AS base


############################# Pocketbase #######################################
FROM base AS pocketbase

ARG TARGETOS
ARG TARGETARCH
ARG PB_VERSION=0.24.1
ARG PB_ZIP_FILE="pocketbase_${PB_VERSION}_${TARGETOS}_${TARGETARCH}.zip"

RUN apk add --no-cache unzip ca-certificates
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/${PB_ZIP_FILE} -O /tmp/pb.zip \
	&& unzip /tmp/pb.zip -d /remembit/ \
	&& rm /tmp/pb.zip


EXPOSE 8080
ENTRYPOINT ["/remembit/pocketbase"]
CMD ["serve", "--http=0.0.0.0:8080", "--encryptionEnv=PB_SETTINGS_ENCRYPTION_KEY"]

######################### Pocketbase Migrations ###############################
FROM pocketbase AS pocketbase-migrations

COPY pocketbase/pb_migrations ./remembit/pb_migrations

EXPOSE 8080
ENTRYPOINT ["/remembit/pocketbase"]
CMD ["serve", "--http=0.0.0.0:8080", "--encryptionEnv=PB_SETTINGS_ENCRYPTION_KEY"]

######################### Remembit App ########################################
FROM pocketbase-migrations AS app

COPY web/build ./remembit/pb_public

EXPOSE 8080
ENTRYPOINT ["/remembit/pocketbase"]
CMD ["serve", "--http=0.0.0.0:8080", "--encryptionEnv=PB_SETTINGS_ENCRYPTION_KEY"]
