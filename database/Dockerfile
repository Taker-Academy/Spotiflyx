FROM postgres:14

RUN apt-get update && apt-get install -y --no-install-recommends \
    some-package-name \
    && rm -rf /var/lib/apt/lists/*

COPY ./init-db-scripts/ /docker-entrypoint-initdb.d/

EXPOSE 5432

VOLUME ["/var/lib/postgresql/data"]

CMD ["postgres"]
