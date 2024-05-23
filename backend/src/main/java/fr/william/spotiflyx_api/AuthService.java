package fr.william.spotiflyx_api;

import fr.william.spotiflyx_api.database.MariaDBService;
import fr.william.spotiflyx_api.token.TokenManager;

public class AuthService {

    private final MariaDBService mariaDBService;

    public AuthService(MariaDBService mariaDBService) {
        this.mariaDBService = mariaDBService;
    }

    public static boolean isAuthorized(String token) {
        return token != null && token.startsWith("Bearer ") && TokenManager.isValidToken(extractToken(token));
    }

    public static String extractToken(String token) {
        return token.substring(7);
    }

    public void sendConfirmationEmail(String email, String token) {
        // send email
    }

}
