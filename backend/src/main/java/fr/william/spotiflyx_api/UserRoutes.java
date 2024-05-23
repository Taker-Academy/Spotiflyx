package fr.william.spotiflyx_api;

import fr.william.spotiflyx_api.routes.*;
import io.javalin.Javalin;
import org.eclipse.jetty.http.HttpMethod;

public enum UserRoutes {

    LOGIN(HttpMethod.POST, "/auth/login", new LoginRoute()),
    REGISTER(HttpMethod.POST, "/auth/register", new RegisterRoute()),
    CHANGE_PASSWORD(HttpMethod.PUT, "/auth/change-password", new ChangePasswordRoute()),
    DELETE_ACCOUNT(HttpMethod.DELETE, "/auth/delete-account", new DeleteAccountRoute()),
    GET_ACCOUNT(HttpMethod.GET, "/auth/account", new GetAccountRoute()),
    EDIT_USER_PROFILE(HttpMethod.PUT, "/auth/edit-profile", new EditUserProfileRoute()),
    ;

    private final HttpMethod method;
    private final String path;
    private final UserRoute route;

    UserRoutes(HttpMethod method, String path, UserRoute route) {
        this.method = method;
        this.path = path;
        this.route = route;
    }

    public HttpMethod getMethod() {
        return method;
    }

    public String getPath() {
        return path;
    }

    public UserRoute getRoute() {
        return route;
    }

    public void register(Javalin app) {
        switch (this.method) {
            case GET:
                app.get(this.path, this.route::handle);
                break;
            case POST:
                app.post(this.path, this.route::handle);
                break;
            case PUT:
                app.put(this.path, this.route::handle);
                break;
            case DELETE:
                app.delete(this.path, this.route::handle);
                break;
            default:
                break;
        }
    }
}
