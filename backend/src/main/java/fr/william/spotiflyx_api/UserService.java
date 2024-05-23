package fr.william.spotiflyx_api;

import fr.william.spotiflyx_api.database.MariaDBService;
import fr.william.spotiflyx_api.response.ErrorResponse;
import fr.william.spotiflyx_api.response.Response;
import fr.william.spotiflyx_api.response.SuccessResponse;
import fr.william.spotiflyx_api.token.TokenManager;
import org.bson.Document;
import org.mindrot.jbcrypt.BCrypt;

public class UserService {

    private final MariaDBService mariaDBService;

    public UserService(MariaDBService mariaDBService) {
        this.mariaDBService = mariaDBService;
    }

    public Response register(String email, String password, String firstName, String lastName) {
        if (mariaDBService.emailExists(email))
            return new ErrorResponse("Email already exists", 400);

        String hashedPassword = BCrypt.hashpw(password, System.getenv("SALT_ROUNDS"));
        mariaDBService.createUser(email, hashedPassword, firstName, lastName);
        String token = TokenManager.generateToken(email);
        AuthService authService = new AuthService(mariaDBService);
        authService.sendConfirmationEmail(email, token);
        return new SuccessResponse(new Document("token", token));
    }

    public Response login(String email, String password) {
        if (!mariaDBService.emailExists(email))
            return new ErrorResponse("Email not found", 404);

        String hashedPassword = mariaDBService.getPassword(email);
        if (!BCrypt.checkpw(password, hashedPassword))
            return new ErrorResponse("Invalid password", 400);

        String token = TokenManager.generateToken(email);
        return new SuccessResponse(new Document("token", token));
    }

    public Response changePassword(String email, String oldPassword, String newPassword) {
        if (!mariaDBService.emailExists(email))
            return new ErrorResponse("Account not found", 404);

        String hashedOldPassword = mariaDBService.getPassword(email);
        if (!BCrypt.checkpw(oldPassword, hashedOldPassword))
            return new ErrorResponse("Invalid old password", 400);

        String hashedNewPassword = BCrypt.hashpw(newPassword, System.getenv("SALT_ROUNDS"));
        mariaDBService.updatePassword(email, hashedNewPassword);
        return new SuccessResponse(new Document("message", "Password changed successfully"));
    }

    public Response deleteAccount(String email, String password) {
        if (!mariaDBService.emailExists(email))
            return new ErrorResponse("Email not found", 404);

        String hashedPassword = mariaDBService.getPassword(email);
        if (!BCrypt.checkpw(password, hashedPassword))
            return new ErrorResponse("Invalid password", 400);

        mariaDBService.deleteUser(email);
        return new SuccessResponse(new Document("message", "Account deleted successfully"));
    }

    public Response editAccount(String password, String new_email, String new_password, String new_firstName, String new_lastName) {
        if (!mariaDBService.emailExists(new_email))
            return new ErrorResponse("Email already exists", 400);

        String hashedPassword = mariaDBService.getPasswordFromMail(new_email);
        if (!BCrypt.checkpw(password, hashedPassword))
            return new ErrorResponse("Invalid password", 400);

        String hashedNewPassword = BCrypt.hashpw(new_password, System.getenv("SALT_ROUNDS"));
        mariaDBService.updateAccount(new_email, hashedNewPassword, new_firstName, new_lastName);
        return new SuccessResponse(new Document("message", "Account edited successfully"));
    }
}
