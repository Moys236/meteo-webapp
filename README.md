# ⛅ Weather App

Application web météo moderne permettant de consulter les prévisions en temps réel avec authentification utilisateur et personnalisation des préférences.

**Réalisé par :**
Nom : **CHLIAH Mohamed Yassine**
Email : mohamdysn2365@gmail.com

## 1. Présentation du projet

Weather App est une application web permettant de consulter la météo en temps réel pour différentes villes, avec gestion d’authentification (login/token), tableau de bord météo, prévisions, et personnalisation des unités.

Les données météorologiques sont récupérées en direct depuis l’API OpenWeatherMap. Les villes favorites et les unités préférées de l’utilisateur sont stockées dans le serveur mock (json-server). Lors de la recherche de villes, les recommandations sont proposées à partir d’un fichier JSON local contenant la liste des villes supportées par l’API.

## Identifiants de connexion (pour tests)

Pour accéder à l’application, utilisez l’un des comptes suivants sur la page de login :

- **Nom d’utilisateur :** user1 | **Mot de passe :** 1234
- **Nom d’utilisateur :** user2 | **Mot de passe :** 0000

---

## API externe utilisée

Les données météo proviennent de l’API OpenWeatherMap :
https://openweathermap.org/api

### Technologies utilisées

- React 18
- Redux Toolkit
- Node.js & Express
- JSON Web Token (JWT)
- OpenWeatherMap API
- JSON Server
- Axios

## 2. Fonctionnalités principales

- Authentification par token JWT (connexion, vérification, rafraîchissement)
- Consultation météo de plusieurs villes (température, humidité, vent, etc.)
- Prévisions sur plusieurs jours
- Sélection rapide de ville via une sidebar
- Paramètres personnalisables (unités, préférences)
- Alertes et gestion des erreurs
- Interface moderne et responsive

## 3. Navigation dans l'application

L’application propose une navigation intuitive :

- Un bouton en forme d’icône de réglages (settings) est accessible depuis la barre latérale ou l’interface principale. En cliquant dessus, vous accédez à la page des paramètres.
- Sur la page des paramètres, vous pouvez :
  - Ajouter ou supprimer vos villes favorites.
  - Modifier vos unités préférées (Celsius/Fahrenheit, etc.).
- Pour consulter rapidement la météo d’une ville favorite, effectuez un double-clic sur son nom dans la page des paramètres : vous serez automatiquement redirigé vers la page d’accueil, où s’affichent les données météorologiques de cette ville.

Cette navigation permet une gestion personnalisée et rapide de vos préférences, tout en facilitant l’accès aux informations météo.

## 4. Architecture technique

- **Frontend** : React 18, Redux Toolkit, React Router, Axios, Embla Carousel, Iconify
- **Backend** : Node.js, Express, JWT, CORS
- **Mock API** : JSON Server pour simuler des données météo

## 5. Installation et lancement du projet

### Prérequis

- Node.js (v14+)
- npm (ou yarn)

### Étapes à suivre

#### a) Cloner le projet

```bash
git clone <url-du-repo>
cd weather-app
```

#### b) Installation des dépendances

- **Backend**

```bash
cd backend
npm install
```

- **Frontend**

```bash
cd ../frontend
npm install
```

#### c) Lancer les serveurs

- **Backend (API Auth)**

```bash
cd backend
node index.js
```

Le backend écoute sur http://localhost:5000

- **Serveur JSON (données météo mock)**

```bash
cd frontend
npm run json-server
```

Le serveur JSON écoute sur http://localhost:4000

- **Frontend (React)**

```bash
cd frontend
npm start
```

L’application s’ouvre sur http://localhost:3000

> **Remarque** : Les trois serveurs doivent tourner en parallèle pour le fonctionnement complet.

## 6. Détails techniques & logique de développement

- **Authentification** :
  - Lors de la connexion, un token JWT est généré côté backend et stocké dans le localStorage côté frontend.
  - À chaque rafraîchissement, le frontend vérifie la validité du token via `/api/auth/verify`.
  - Si le token est expiré/non valide, l’utilisateur est redirigé vers la page de login.

- **Gestion météo** :
  - Les données météo (température, humidité, prévisions, etc.) sont récupérées en temps réel depuis l’API OpenWeatherMap via Axios.
  - Les villes favorites et les unités préférées de l’utilisateur sont stockées et gérées via le serveur JSON local (json-server).
  - Lors de la recherche d’une ville, les suggestions sont générées à partir d’un fichier JSON local (`cities-optimized.json`) qui recense toutes les villes supportées par l’API OpenWeatherMap.
  - Redux gère l’état global (ville sélectionnée, données météo, erreurs).
  - Les composants React consomment l’état via `useSelector` et déclenchent les actions via `useDispatch`.

- **Navigation** :
  - React Router permet la navigation entre `/`, `/login`, `/settings`.
  - La sidebar permet de changer rapidement de ville.

- **UI/UX** :
  - Embla Carousel pour les prévisions, Alert pour les erreurs, Loader pour l’attente des données.

## 7. Structure du projet

```
weather-app/
├── backend/         # Serveur Node.js (auth)
│   ├── index.js
│   └── package.json
├── frontend/        # Application React
│   ├── src/
│   │   ├── component/
│   │   ├── data/
│   │   ├── App.js
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── ...
```
