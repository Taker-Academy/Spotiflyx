package fr.william.spotiflyx_api.response;

import org.bson.Document;

public class ErrorResponse implements Response {

    private final String error;
    private final int status;

    public ErrorResponse(String error, int status) {
        this.error = error;
        this.status = status;
    }

    @Override
    public boolean isOk() {
        return false;
    }

    @Override
    public int getStatus() {
        return status;
    }

    @Override
    public String toJson() {
        Document document = new Document();
        document.append("ok", false);
        document.append("error", error);
        return document.toJson();
    }
}
