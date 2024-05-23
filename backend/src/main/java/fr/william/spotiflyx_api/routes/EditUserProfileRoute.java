package fr.william.spotiflyx_api.routes;

import fr.william.spotiflyx_api.Main;
import fr.william.spotiflyx_api.UserRoute;
import fr.william.spotiflyx_api.response.Response;
import fr.william.spotiflyx_api.token.TokenManager;
import io.javalin.http.Context;
import org.bson.Document;

public class EditUserProfileRoute implements UserRoute {

    /*
    request body:
    {
        "password": "pass",
        "new_email": "william@uwu.cc",
        "new_password": "uwu",
        "new_firstName": "William",
        "new_lastName": "Jolivet"
    }
     */

    @Override
    public void handle(Context ctx) {
        Document document = Document.parse(ctx.body());

        if (!document.containsKey("password") || !document.containsKey("new_email") || !document.containsKey("new_password") || !document.containsKey("new_firstName") || !document.containsKey("new_lastName")) {
            ctx.status(400).json(new Document("message", "Missing password, new_email, new_password, new_firstName or new_lastName"));
            return;
        }

        String password = document.getString("password");
        String new_email = document.getString("new_email");
        String new_password = document.getString("new_password");
        String new_firstName = document.getString("new_firstName");
        String new_lastName = document.getString("new_lastName");

        Response response = Main.getUserService().editAccount(password, new_email, new_password, new_firstName, new_lastName);
        ctx.status(response.getStatus()).json(response.toJson());
    }
}
