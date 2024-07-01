FROM alpine:3.20.1

ARG TARGETOS
ARG TARGETARCH
ARG PB_VERSION=0.22.4
ARG PB_ZIP_FILE="pocketbase_${PB_VERSION}_${TARGETOS}_${TARGETARCH}.zip"

RUN apk add --no-cache unzip ca-certificates
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/${PB_ZIP_FILE} /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# uncomment to copy the local pb_migrations dir into the image
# COPY ./pb_migrations /pb/pb_migrations

# uncomment to copy the local pb_hooks dir into the image
# COPY ./pb_hooks /pb/pb_hook

EXPOSE 8080

ENTRYPOINT ["/pb/pocketbase"]

