# 🔄 Guide de Migration BabyLink

Ce guide vous aide à transférer le projet BabyLink vers un autre PC en conservant toutes vos données.

## 📋 Prérequis

- **Node.js 18+** installé
- **npm** ou **yarn** installé  
- **Git** (optionnel, pour cloner le repo)

## 🚀 Migration Rapide

### Étape 1: Exporter depuis l'ancien PC

```bash
# Dans le dossier frontend/
npm run export-db
```

Cela créera :
- `migration-package.json` - Configuration complète
- `database-backup.db` - Copie de votre base de données

### Étape 2: Transférer vers le nouveau PC

1. **Copiez tout le dossier `frontend/`** vers le nouveau PC
2. **Copiez les fichiers de backup** (`migration-package.json`, `database-backup.db`)

### Étape 3: Installation sur le nouveau PC

```bash
# 1. Créer le fichier .env
cat > .env << 'EOF'
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
EOF

# 2. Installer les dépendances et configurer la DB
npm install
npm run setup-db
```

### Étape 4: Restaurer vos données (optionnel)

Si vous voulez récupérer vos données existantes :

```bash
# Si database-backup.db existe
cp database-backup.db prisma/dev.db
```

## 🔧 Configuration Manuelle

Si vous préférez faire étape par étape :

### 1. Installation des dépendances

```bash
npm install
```

### 2. Configuration de l'environnement

Créez `.env` :
```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

### 3. Configuration de la base de données

```bash
# Génerer le client Prisma
npx prisma generate

# Créer la base de données
npx prisma db push

# Peupler avec des données de test (optionnel)
npx prisma db seed
```

### 4. Démarrage

```bash
npm run dev
```

## 🗄️ Structure de la Base de Données

### Schéma Prisma

```prisma
model User {
  id           Int      @id @default(autoincrement())
  email        String   @unique
  name         String
  password     String   // SHA256 hash
  score        Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  // Profil complet
  firstName    String?
  lastName     String?
  avatar       String?
  jerseyNumber Int?
  skillLevel   String?
  position     String?
  championship String?
  xp           Int?
  coins        Int?
  elo          Int?
}
```

### Données de Test

Le seeding crée 4 utilisateurs test :
- **messi@epsi.fr** / test123 (Score: 2450)
- **ronaldo@epsi.fr** / test123 (Score: 1890)
- **neymar@epsi.fr** / test123 (Score: 1650)
- **mbappe@epsi.fr** / test123 (Score: 1200)

## 🛠️ Dépannage

### Erreur "Module not found: Can't resolve '../generated/prisma'"

```bash
npx prisma generate
# Redémarrer votre IDE/serveur TypeScript
```

### Erreur lors du seeding

```bash
# Vérifier que tsx est installé
npm install tsx --save-dev

# Vérifier la DB
npx prisma db push
```

### Erreur de permissions Windows

```bash
# Exécuter en tant qu'administrateur ou dans PowerShell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Base de données corrompue

```bash
# Supprimer et recréer
rm prisma/dev.db
npx prisma db push
npx prisma db seed
```

## 📂 Structure du Projet

```
frontend/
├── prisma/
│   ├── schema.prisma      # Schéma de la DB
│   ├── seed.ts           # Données de test
│   └── dev.db           # Base de données SQLite
├── src/
│   ├── generated/       # Client Prisma généré
│   ├── lib/prisma.ts    # Configuration Prisma
│   └── app/api/auth/    # Routes d'authentification
├── scripts/
│   └── export-schema.js # Script d'export
├── .env                 # Variables d'environnement
└── package.json
```

## ✅ Vérification

Pour tester que tout fonctionne :

1. **Démarrer le serveur** : `npm run dev`
2. **Aller sur** : http://localhost:3000
3. **Se connecter** avec messi@epsi.fr / test123
4. **Vérifier** que les données s'affichent correctement

## 🆘 Support

Si vous rencontrez des problèmes :

1. Vérifiez que tous les **prérequis** sont installés
2. Consultez le fichier `migration-package.json` pour des instructions détaillées
3. Vérifiez les **logs d'erreur** dans la console
4. Relancez `npm run setup-db` si nécessaire

---

✨ **Votre projet BabyLink est maintenant prêt sur votre nouveau PC !** 