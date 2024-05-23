FROM gradle:7.3.1-jdk11 AS build

COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src

RUN gradle shadowJar --no-daemon

FROM openjdk:11-jre-slim

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

COPY --from=build /home/gradle/src/build/libs/spotiflyx_api-1.0.jar /app.jar

EXPOSE 7070

ENTRYPOINT ["/wait-for-it.sh", "mariadb:3306", "--", "java", "-jar", "/app.jar"]
