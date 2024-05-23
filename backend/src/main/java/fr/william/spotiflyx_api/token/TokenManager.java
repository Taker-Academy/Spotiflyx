package fr.william.spotiflyx_api.token;

import io.javalin.http.Context;
import org.mindrot.jbcrypt.BCrypt;

import java.util.HashMap;
import java.util.Map;

public class TokenManager {

    private final static Map<String, String> tokens = new HashMap<>();
    private static final String SALT_ROUNDS = System.getenv("SALT_ROUNDS");

    public static String generateToken(String userId) {
        String token = BCrypt.hashpw(userId, SALT_ROUNDS);
        tokens.put(token, userId);
        return token;
    }

    public static boolean isValidToken(String token) {
        return tokens.containsKey(token);
    }

    public static String getUserIdFromToken(String token) {
        return tokens.get(token);
    }

    public static void removeToken(String token) {
        tokens.remove(token);
    }

    public static String extractTokenFromCtx(Context ctx) {
        String token = ctx.header("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            return null;
        }
        return token;
    }

}
