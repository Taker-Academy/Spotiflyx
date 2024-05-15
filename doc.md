# Documentation de l'API spotiflix

## Schéma de la base de données

### User 👤

Le schéma utilisateur définit la structure des données pour un utilisateur dans la base de données.

- **email (String):** Email de l'utilisateur
- **password (String):** Mot de passe de l'utilisateur.
- **id (string):** ID de l'utilisateur généré par l'api.

### favori spotify

- **id (string):** ID de l'utilisateur généré par l'api.
- **favs (Array)** array d'id de musique

## Authentification 🔑

L'authentification est gérée par un token JWT (JSON Web Token) qui est généré lors de la connexion ou l'inscription d'un utilisateur.
Il doit être envoyé dans le header de chaque requête pour les routes protégées, sous forme de `"Bearer {TOKEN}"`.

> ℹ️ Le token est construit à partir de l'id de l'utilisateur *(id)* pour une durée de 24h
---

# Routes

- 🔐 = La route nécessite un token JWT valide dans le header de la requête.

## Auth

> Prefix: `/auth`

### Endpoint [POST] `/register`

## Description

Cette route permet de créer un nouvel utilisateur dans la base de données, il chiffre également le mot de passe de l'utilisateur avant de le stocker dans la base de données. Si un utilisateur avec la même adresse e-mail existe déjà, la requête échouera.
Le serveur renvoie un token JWT qui permettra à l'utilisateur de s'authentifier sur les routes protégées.

## Paramètres

### Body

- **email (String, required):** Adresse e-mail de l'utilisateur.
- **password (String, required):** Mot de passe de l'utilisateur.
- **firstName (String, required):** Prénom de l'utilisateur.
- **lastName (String, required):** Nom de famille de l'utilisateur.

## Exemple de Requête

```json
{
    "email": "my.email@bip.com",
    "password": "myPassword123",
}
```


## Format de réponse (201 OK)

```json
{
    "token": "eg.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzQzYWNmZWI0NjU3MTU0Yjg1Y2VjMyIsImlhdCI6MTcwMjExNjA0NywiZXhwIjoxNzAyMjAyNDQ3fQ.hQ2Om2eiNVPquH9npiCC9hOUy3hoizsFVt8QACCPolU",
    "email": "my.email@gmail.com",
}
```


## Réponse possible

- **201 OK:** Utilisateur créé avec succès.
- **400 Bad Request:** Mauvaise requête, paramètres manquants ou invalides.
- **401 Unauthorized:** Mauvais identifiants.
- **500 Internal Server Error:** Erreur interne du serveur.
--- 

### Endpoint [POST] `/login`

## Description

Cette route permet de connecter un utilisateur existant à l'application. Si les identifiants sont corrects, le serveur renvoie un token JWT qui permettra à l'utilisateur de s'authentifier sur les routes protégées.

## Paramètres

### Body

- **email (String, required):** Adresse e-mail de l'utilisateur.
- **password (String, required):** Mot de passe de l'utilisateur.

## Format de réponse (200 OK)

```json
{
    "token": "eg.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzQzYWNmZWI0NjU3MTU0Yjg1Y2VjMyIsImlhdCI6MTcwMjExNjA0NywiZXhwIjoxNzAyMjAyNDQ3fQ.hQ2Om2eiNVPquH9npiCC9hOUy3hoizsFVt8QACCPolU",
    "email": "my.email@gmail.com",
}
```


## Réponse possible

- **200 OK:** Connexion réussie.
- **400 Bad Request:** Mauvaise requête, paramètres manquants ou invalides.
- **401 Unauthorized:** Mauvais identifiants.
- **500 Internal Server Error:** Erreur interne du serveur.

---

## User

> Prefix: `/user`

### Endpoint [GET] `` 🔐

## Description

Cette route permet à un utilisateur de recuperer ses informations.

## Paramètres

### Header

- **Authorization (String, required):** Token JWT pour l'authentification.

### Body

- **id (String):** id de l'utilisateur.
- **email (String):** email de l'utilisateur.

## Format de réponse (200 OK)

```json
{
    "id": "id",
    "email": "john.doe@example.com",
}
```

## Réponses Possibles
- **200 OK:** Informations de l'utilisateur recuperée avec succès.
- **401 Unauthorized:** Mauvais token JWT.
- **500 Internal Server Error:** Erreur interne du serveur.

---

### Endpoint [PUT] `/update` 🔐

## Description

Cette route permet à un utilisateur de modifier ses informations.

## Paramètres

### Header

- **Authorization (String, required):** Token JWT pour l'authentification.

### Body

- **email (String):** Nouvelle adresse e-mail de l'utilisateur.
- **password (String):** Nouveau mot de passe de l'utilisateur.

## Format de réponse (200 OK)

```json
{
    "token": "eg.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzQzYWNmZWI0NjU3MTU0Yjg1Y2VjMyIsImlhdCI6MTcwMjExNjA0NywiZXhwIjoxNzAyMjAyNDQ3fQ.hQ2Om2eiNVPquH9npiCC9hOUy3hoizsFVt8QACCPolU",
    "email": "john.doe@example.com",
}
```

## Réponses Possibles
- **200 OK:** Informations de l'utilisateur mises à jour avec succès.
- **401 Unauthorized:** Mauvais token JWT.
- **500 Internal Server Error:** Erreur interne du serveur.

---

### Endpoint [DELETE] `/remove` 🔐

## Description

Cette route permet à un utilisateur de supprimer son compte.

## Paramètres

### Header

- **Authorization (String, required):** Token JWT pour l'authentification.

## Format de réponse (200 OK)

```json
{
    "ok": true,
}
```

## Réponses Possibles
- **200 OK:** Compte utilisateur supprimé avec succès.
- **401 Unauthorized:** Mauvais token JWT.
- **500 Internal Server Error:** Erreur interne du serveur.

---

## User

> Prefix: `/fav`

### Endpoint [GET] `/music` 🔐

## Description

Cette route permet de recuperer les musiques favorites du user

## Paramètres

### Header

- **Authorization (String, required):** Token JWT pour l'authentification.

## Format de réponse (200 OK)

```json
{
    "ok": true,
    "data": [
        {
            "link": "exemple"
        },
        ...
    ]
}
```

## Réponses Possibles
- **200 OK:** Favoris recupérés avec succes.
- **401 Unauthorized:** Mauvais token JWT.
- **500 Internal Server Error:** Erreur interne du serveur.

---

### Endpoint [POST] `/music` 🔐

## Description

Cette route permet à un utilisateur de creer un favori.

## Paramètres

### Header

- **Authorization (String, required):** Token JWT pour l'authentification.

## Exemple de Requête

```json
{
    "link": "exemple",
}
```

## Format de réponse (200 OK)

```json
{
    "ok": true,
}
```

## Réponses Possibles
- **200 OK:** favori crée avec succes.
- **401 Unauthorized:** Mauvais token JWT.
- **500 Internal Server Error:** Erreur interne du serveur.

---
