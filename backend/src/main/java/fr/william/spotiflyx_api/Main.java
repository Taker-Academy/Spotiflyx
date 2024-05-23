package fr.william.spotiflyx_api;

import fr.william.spotiflyx_api.database.MariaDBService;
import io.javalin.Javalin;
import io.javalin.plugin.bundled.CorsPluginConfig;

public class Main {

    public final static MariaDBService postgreService = new MariaDBService();
    public final static UserService userService = new UserService(postgreService);

    public static void main(String[] args) {
        MariaDBService.connect();
        Javalin app = Javalin.create(config -> {
            config.bundledPlugins.enableCors(cors -> {
                cors.addRule(CorsPluginConfig.CorsRule::anyHost);
            });
        });

        for (UserRoutes route : UserRoutes.values())
            route.register(app);

        app.events(event -> event.serverStopping(MariaDBService::close));
        app.start(7070);
    }

    public static UserService getUserService() {
        return userService;
    }

}
