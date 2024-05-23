package fr.william.spotiflyx_api.response;

public interface Response {

    boolean isOk();

    int getStatus();

    String toJson();

}
