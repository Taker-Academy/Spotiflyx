package fr.william.spotiflyx_api.routes;

import fr.william.spotiflyx_api.Main;
import fr.william.spotiflyx_api.UserRoute;
import fr.william.spotiflyx_api.response.Response;
import io.javalin.http.Context;
import org.bson.Document;

public class ChangePasswordRoute implements UserRoute {
    @Override
    public void handle(Context ctx) {
        Document document = Document.parse(ctx.body());

        if (!document.containsKey("email") || !document.containsKey("oldPassword") || !document.containsKey("newPassword")) {
            ctx.status(400).json(new Document("message", "Missing email, oldPassword or newPassword"));
            return;
        }

        String email = document.getString("email");
        String oldPassword = document.getString("oldPassword");
        String newPassword = document.getString("newPassword");

        Response response = Main.getUserService().changePassword(email, oldPassword, newPassword);
        ctx.status(response.getStatus()).json(response.toJson());
    }
}
