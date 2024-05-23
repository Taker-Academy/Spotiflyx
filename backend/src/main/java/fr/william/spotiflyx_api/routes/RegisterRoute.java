package fr.william.spotiflyx_api.routes;

import fr.william.spotiflyx_api.Main;
import fr.william.spotiflyx_api.UserRoute;
import fr.william.spotiflyx_api.response.Response;
import io.javalin.http.Context;
import org.bson.Document;

public class RegisterRoute implements UserRoute {
    @Override
    public void handle(Context ctx) {
        Document body = ctx.bodyAsClass(Document.class);

        if (!body.containsKey("email") || !body.containsKey("password") || !body.containsKey("firstName") || !body.containsKey("lastName")) {
            ctx.status(400).json(new Document("message", "Missing email, password, first name or last name"));
            return;
        }

        String email = body.getString("email");
        String password = body.getString("password");
        String firstName = body.getString("firstName");
        String lastName = body.getString("lastName");

        Response response = Main.getUserService().register(email, password, firstName, lastName);
        ctx.status(response.getStatus()).json(response.toJson());
    }
}
