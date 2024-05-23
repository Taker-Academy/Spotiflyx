package fr.william.spotiflyx_api.routes;

import fr.william.spotiflyx_api.Main;
import fr.william.spotiflyx_api.UserRoute;
import fr.william.spotiflyx_api.token.TokenManager;
import io.javalin.http.Context;
import org.bson.Document;

public class LogoutRoute implements UserRoute {
    @Override
    public void handle(Context ctx) {
        if (TokenManager.extractTokenFromCtx(ctx) == null) {
            ctx.status(401).json(new Document("message", "Invalid token"));
            return;
        }

        Main.getUserService().logout(TokenManager.extractTokenFromCtx(ctx));
    }
}
