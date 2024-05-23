FROM mariadb:latest

ARG ENV_FILE
ENV MARIADB_ROOT_PASSWORD=""

COPY schema.sql /docker-entrypoint-initdb.d/

CMD ["mariadb"]
