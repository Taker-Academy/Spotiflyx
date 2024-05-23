package fr.william.spotiflyx_api.database;

import org.bson.Document;

public class UserData {

    private int id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Document data;

    public UserData(int id, String email, String password, String firstName, String lastName, Document data) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.data = data;
    }

    public int getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Document getData() {
        return data;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setData(Document data) {
        this.data = data;
    }
}
