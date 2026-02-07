# KubernetesDockerNode

Application Node.js avec Express et MySQL déployable sur Kubernetes. Ce projet démontre l'utilisation de Docker et Kubernetes pour orchestrer une application web avec une base de données MySQL.

## 📋 Description

Cette application est une API Node.js simple qui :
- Se connecte à une base de données MySQL
- Affiche des informations sur le conteneur en cours d'exécution
- Utilise des variables d'environnement pour la configuration
- Est déployable sur Kubernetes avec des manifests prêts à l'emploi

## 🏗️ Architecture

```
KubernetesDockerNode/
├── server.js                      # Serveur Express principal
├── db.js                          # Module de connexion MySQL
├── package.json                   # Dépendances Node.js
├── Dockerfile                     # Image Docker de l'application
└── k8s/                          # Manifests Kubernetes
    ├── app-configmap.yml         # Configuration de l'application
    ├── mysql-secret.yml          # Secrets MySQL
    ├── kubeapp-deployment.yml    # Déploiement de l'application
    └── mysql-deployment.yml      # Déploiement MySQL + Service
```

## 🚀 Fonctionnalités

- **API REST** avec Express
- **Connexion MySQL** avec vérification de santé
- **Variables d'environnement** pour la configuration
- **Déploiement Kubernetes** avec 3 réplicas
- **ConfigMaps et Secrets** pour la gestion de la configuration
- **Health checks** de la base de données

## 📦 Prérequis

- [Node.js](https://nodejs.org/) (v20 recommandé)
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/) (Minikube, k3s, ou un cluster distant)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)

## 🛠️ Installation et utilisation

### Développement local

1. **Cloner le repository**
```bash
git clone https://github.com/Afakhar27/KubernetesDockerNode.git
cd KubernetesDockerNode
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
export DB_HOST=localhost
export DB_NAME=kubeappdb
export DB_USER=kubeuser
export DB_PASSWORD=kubeuserpass
export APP_NAME=kubeapp
export APP_ENV=dev
```

4. **Lancer l'application**
```bash
node server.js
```

L'application sera accessible sur `http://localhost:3000`

### Déploiement avec Docker

1. **Construire l'image Docker**
```bash
docker build -t kubeapp:v1 .
```

2. **Lancer le conteneur**
```bash
docker run -p 3000:3000 \
  -e DB_HOST=mysql \
  -e DB_NAME=kubeappdb \
  -e DB_USER=kubeuser \
  -e DB_PASSWORD=kubeuserpass \
  -e APP_NAME=kubeapp \
  -e APP_ENV=dev \
  kubeapp:v1
```

### Déploiement sur Kubernetes

1. **Appliquer les secrets MySQL**
```bash
kubectl apply -f k8s/mysql-secret.yml
```

2. **Appliquer la ConfigMap de l'application**
```bash
kubectl apply -f k8s/app-configmap.yml
```

3. **Déployer MySQL**
```bash
kubectl apply -f k8s/mysql-deployment.yml
```

4. **Déployer l'application**
```bash
kubectl apply -f k8s/kubeapp-deployment.yml
```

5. **Vérifier le déploiement**
```bash
kubectl get pods
kubectl get services
```

6. **Accéder à l'application**
```bash
kubectl port-forward deployment/kubeapp 3000:3000
```

Puis visitez `http://localhost:3000`

## 🔧 Configuration

### Variables d'environnement

| Variable | Description | Valeur par défaut |
|----------|-------------|-------------------|
| `PORT` | Port du serveur | `3000` |
| `DB_HOST` | Hôte MySQL | `mysql` |
| `DB_NAME` | Nom de la base de données | - |
| `DB_USER` | Utilisateur MySQL | - |
| `DB_PASSWORD` | Mot de passe MySQL | - |
| `APP_NAME` | Nom de l'application | - |
| `APP_ENV` | Environnement (dev/prod) | - |

### Kubernetes Secrets

Les secrets MySQL sont définis dans `k8s/mysql-secret.yml` :
- `DB_NAME`: kubeappdb
- `DB_USER`: kubeuser
- `DB_PASSWORD`: kubeuserpass

**⚠️ Important** : Changez ces valeurs en production !

### ConfigMaps

La configuration de l'application est définie dans `k8s/app-configmap.yml` :
- `APP_NAME`: kubeapp
- `APP_ENV`: dev

## 📡 Endpoints API

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/` | GET | Page d'accueil avec informations système et statut BDD |
| `/exit` | GET | Termine le processus (pour test de redémarrage) |

### Exemple de réponse

```
[v2] Hello World! New Version!
Processed by: kubeapp-7c8f9b6d4-x5k2p
App: kubeapp | Env: dev
DB: kubeappdb | User: kubeuser
✅ Connexion à la BDD établie
```

## 🐳 Image Docker

L'application utilise une image Alpine légère basée sur Node.js 20 :

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

## 🔄 Mise à jour de l'application

Pour déployer une nouvelle version :

1. Modifier le code
2. Construire une nouvelle image avec un nouveau tag
```bash
docker build -t ikramrsi/kubeapp:v2 .
docker push ikramrsi/kubeapp:v2
```
3. Mettre à jour le manifest Kubernetes
```bash
kubectl set image deployment/kubeapp kubeapp=ikramrsi/kubeapp:v2
```

## 🧪 Tests

### Vérifier la connexion MySQL
```bash
curl http://localhost:3000/
```

### Tester le redémarrage automatique
```bash
curl http://localhost:3000/exit
kubectl get pods -w
```

## 📊 Monitoring

Vérifier les logs :
```bash
# Logs de l'application
kubectl logs -f deployment/kubeapp

# Logs de MySQL
kubectl logs -f deployment/mysql
```

Vérifier l'état des pods :
```bash
kubectl describe pod <pod-name>
```

## 🛡️ Sécurité

- ⚠️ Ne committez jamais de vrais secrets dans le code
- Utilisez des Kubernetes Secrets pour les données sensibles
- Changez les mots de passe par défaut en production
- Utilisez un registre privé pour vos images Docker
- Limitez les ressources CPU/mémoire dans les manifests

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📝 License

ISC

## 👤 Auteur

**Afakhar27**
- GitHub: [@Afakhar27](https://github.com/Afakhar27)
