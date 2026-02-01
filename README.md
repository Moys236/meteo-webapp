# 🌤️ Weather App

Une application web moderne permettant de consulter la météo en temps réel pour plusieurs villes. Construite avec React et Redux, cette application offre une interface intuitive et réactive pour visualiser les conditions météorologiques actuelles et les prévisions.

## ✨ Fonctionnalités

### 📍 Gestion des Villes

- **Plusieurs villes** : Consultez la météo de plusieurs localités
- **Sélection rapide** : Basculez facilement entre les villes depuis la barre latérale
- **Informations détaillées** : Localisation par pays et identification unique

### 🌡️ Données Météorologiques

- **Conditions actuelles** : Température, humidité, vitesse du vent et autres paramètres en temps réel
- **Prévisions** : Consulter la météo sur plusieurs jours
- **Unités configurables** : Basculez entre les unités métriques et impériales (Celsius/Fahrenheit)

### 📊 Interface Utilisateur

- **Tableau de bord** : Vue d'ensemble complète des conditions météorologiques avec grille d'informations
- **Carrousel** : Navigation fluide à travers les données avec Embla Carousel
- **Chronologie du lever/coucher du soleil** : Visualisez les heures de lever et coucher du soleil
- **Écran de chargement** : Indicateurs visuels pendant le chargement des données
- **Système d'alerte** : Notifications d'erreur intégrées

### ⚙️ Paramètres

- **Configuration personnalisée** : Ajustez les unités de mesure selon vos préférences

## 🛠️ Technologies Utilisées

### Frontend

- **React** (v18.2.0) : Bibliothèque JavaScript pour construire l'interface utilisateur
- **React Router DOM** (v6.28.0) : Gestion du routage et de la navigation
- **Redux Toolkit** (v2.11.2) : Gestion d'état centralisée et prévisible
- **React Redux** (v9.2.0) : Intégration de Redux avec React

### HTTP & API

- **Axios** (v1.13.2) : Client HTTP pour les requêtes vers l'API météo

### Composants UI

- **Embla Carousel** (v8.6.0) : Carrousel responsive pour afficher les prévisions
- **Iconify** (v6.0.2) : Bibliothèque d'icônes pour les symboles météorologiques

### Backend Mock

- **JSON Server** (v1.0.0-beta.5) : Serveur local pour simuler une API REST avec les données météorologiques

### Développement & Tests

- **React Scripts** (v5.0.1) : Outils de construction et de développement Create React App
- **Testing Library** : Frameworks de test pour React

## 🚀 Installation

### Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn

### Étapes d'installation

1. **Cloner le dépôt**

   ```bash
   git clone <url-du-repo>
   cd weather-app
   ```

2. **Configurer les variables d'environnement**

   - Copiez le fichier `.env.example` en `.env`
   ```bash
   cp .env.example .env
   ```
   
   - Ouvrez le fichier `.env` et remplacez `your_api_key_here` par votre clé API OpenWeatherMap
   ```env
   REACT_APP_OPENWEATHER_API_KEY=votre_cle_api_ici
   ```
   
   > **Comment obtenir une clé API ?**
   > 1. Allez sur [OpenWeatherMap](https://openweathermap.org/api)
   > 2. Créez un compte gratuit
   > 3. Générez une clé API depuis votre tableau de bord
   > 4. Collez-la dans le fichier `.env`

3. **Installer les dépendances**

   ```bash
   npm install
   ```

4. **Démarrer le serveur JSON (données mock)** (dans un terminal séparé)

   ```bash
   npm run json-server
   ```

   Le serveur sera disponible sur `http://localhost:4000`

   > **Note** : Vous devez lancer le serveur JSON dans un terminal séparé avant de démarrer l'application React

5. **Lancer l'application en développement**
   ```bash
   npm start
   ```
   L'app s'ouvrira automatiquement sur [http://localhost:3000](http://localhost:3000)

## 📦 Scripts Disponibles

### `npm start`

Lance l'application en mode développement.

- L'application se recharge automatiquement lors de modifications
- Les erreurs s'affichent dans la console

### `npm test`

Lance le testeur en mode interactif.

- Exécute les tests React avec Jest et Testing Library

### `npm run build`

Construit l'application pour la production.

- Optimise et minifie le code
- Génère des fichiers prêts pour le déploiement dans le dossier `build/`

## 📁 Structure du Projet

```
weather-app/
├── public/                  # Fichiers statiques
├── src/
│   ├── component/          # Composants React
│   │   ├── Home.jsx       # Page d'accueil
│   │   ├── Settings.jsx   # Page des paramètres
│   │   ├── Sidebar.jsx    # Barre latérale
│   │   ├── Content.jsx    # Contenu principal
│   │   ├── Forecast.jsx   # Prévisions
│   │   ├── GridDashboard.jsx # Tableau de bord
│   │   ├── SunriseTimeLine.jsx # Chronologie soleil
│   │   ├── Loading.jsx    # Loader
│   │   ├── Alert.jsx      # Composant alerte
│   │   └── carousel.css   # Styles carrousel
│   ├── data/
│   │   ├── meteoSlice.js  # Redux slice pour l'état météo
│   │   ├── store.js       # Configuration Redux store
│   │   └── data.json      # Données mock
│   ├── App.js            # Composant principal
│   ├── App.css           # Styles globaux
│   └── index.js          # Point d'entrée
├── build/                 # Dossier de production (généré)
└── package.json          # Dépendances et scripts
```

## 🔄 Flux de Données

L'application utilise **Redux Toolkit** pour gérer l'état global :

1. **Actions** : Récupération des données (fetch)
2. **Reducers** : Mise à jour de l'état météo
3. **Sélecteurs** : Accès à l'état depuis les composants
4. **Effects** : Synchronisation avec le serveur via hooks `useEffect`

## 📝 Notes de Développement

- Le serveur JSON (`json-server`) doit être lancé avant l'application
- L'API est configurée sur `http://localhost:4000/`
- Les données sont stockées dans [data.json](src/data/data.json)
