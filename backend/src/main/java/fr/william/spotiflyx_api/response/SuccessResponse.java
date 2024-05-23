package fr.william.spotiflyx_api.response;

import org.bson.Document;

public class SuccessResponse implements Response {

    private final Document data;

    public SuccessResponse(Document data) {
        this.data = data;
    }

    @Override
    public boolean isOk() {
        return true;
    }

    @Override
    public int getStatus() {
        return 200;
    }

    @Override
    public String toJson() {
        Document document = new Document();
        document.append("ok", true);
        document.append("data", data);
        return document.toJson();
    }
}
