#  EXERCICES ANGULAR - GESTION DE BIBLIOTHÈQUE

##  Objectif Général

Construire progressivement une application de **gestion de bibliothèque en ligne** (Book Manager) en maîtrisant 13 concepts clés d'Angular.

Chaque exercice est **lié au précédent** et ajoute une nouvelle fonctionnalité.

---

##  Table des Matières

- [Structure de Données](#structure-de-données)
- [Exercice 1 : Data Binding](#exercice-1--data-binding)
- [Exercice 2 : Observables & HTTP](#exercice-2--observables--http)
- [Exercice 3 : BehaviorSubject](#exercice-3--behaviorsubject)
- [Exercice 4 : Signals Angular](#exercice-4--signals-angular)
- [Exercice 5 : Reactive Forms](#exercice-5--reactive-forms)
- [Exercice 6 : Template-driven Forms](#exercice-6--template-driven-forms)
- [Exercice 7 : HTTP Interceptors](#exercice-7--http-interceptors)
- [Exercice 8 : Guards](#exercice-8--guards)
- [Exercice 9 : Pipes](#exercice-9--pipes)
- [Exercice 10 : Routing & Lazy Loading](#exercice-10--routing--lazy-loading)
- [Exercice 11 : Communication entre Composants](#exercice-11--communication-entre-composants)
- [Exercice 12 : Resolvers](#exercice-12--resolvers)
- [Exercice 13 : NgRx (Bonus)](#exercice-13--ngrx-bonus)
- [Récapitulatif](#récapitulatif)

---

##  Structure de Données

### Interface Book
```typescript
interface Book {
  id: number;
  title: string;
  author: string;
  available: boolean;
  category: string;
  publishedYear: number;
  isbn?: string;
  rating?: number;
}
```

### Interface User
```typescript
interface User {
  id: number;
  username: string;
  password: string;
  token: string;
  role: 'admin' | 'user';
}
```

---

##  Exercice 1 : Data Binding

###  Concept
Interpolation, Property Binding, Event Binding, Two-way Binding

###  Énoncé
Créez un composant `book-list` qui affiche une liste de livres avec interactions de base.

###  Fonctionnalités attendues
1. Afficher une liste de **5 livres** (données en dur dans le composant)
2. Un **input** pour rechercher un livre par titre avec **two-way binding**
3. Un **compteur** affichant le nombre de caractères saisis (**interpolation**)
4. Un bouton "Rechercher" **désactivé** si l'input est vide (**property binding**)
5. Un bouton "Toggle disponibilité" pour chaque livre (**event binding**)
6. Afficher le **nombre total** de livres disponibles

###  Livrables
- `book-list.component.ts`
- `book-list.component.html`
- `book-list.component.css`

---

##  Exercice 2 : Observables & HTTP

###  Concept
HttpClient, Observables, subscribe, async pipe, operators RxJS

###  Énoncé
Créez un backend avec **JSON Server** et connectez votre application à une vraie API.

###  Fonctionnalités attendues
1. **Installer et configurer JSON Server**
2. Créer un fichier `db.json` avec au moins **10 livres**
3. Créer un service `BookService` avec les méthodes :
   - `getBooks(): Observable<Book[]>`
   - `addBook(book: Book): Observable<Book>`
   - `updateBook(id, book): Observable<Book>`
   - `deleteBook(id): Observable<void>`
4. Modifier le composant `book-list` pour charger les livres depuis l'API
5. Utiliser l'**async pipe** dans le template
6. Ajouter un **loader** pendant le chargement
7. Utiliser les **operators RxJS** : `map`, `tap`, `catchError`
8. Gérer les erreurs et afficher un message d'erreur

###  Structure db.json
```json
{
  "books": [
    {
      "id": 1,
      "title": "Clean Code",
      "author": "Robert Martin",
      "available": true,
      "category": "Programming",
      "publishedYear": 2008
    },
    {
      "id": 2,
      "title": "1984",
      "author": "George Orwell",
      "available": false,
      "category": "Fiction",
      "publishedYear": 1949
    }
  ]
}
```

###  Commandes
```bash
npm install -g json-server
json-server --watch db.json --port 3000
```

###  Livrables
- `book.service.ts`
- `db.json`
- `book-list.component.ts` (modifié)
- `book.model.ts`

###  Durée estimée
**4 heures**

---

##  Exercice 3 : BehaviorSubject

###  Concept
BehaviorSubject, partage d'état entre composants

###  Énoncé
Créez un système de **panier de livres** partagé entre plusieurs composants.

###  Fonctionnalités attendues
1. Créer un service `CartService` utilisant **BehaviorSubject** pour gérer :
   - Liste des livres dans le panier
   - Nombre total de livres dans le panier
2. Créer un composant `cart-icon` (dans le header) affichant le **nombre de livres**
3. Créer un composant `cart-detail` affichant la **liste complète**
4. Dans `book-list`, ajouter un bouton **"Ajouter au panier"** pour chaque livre
5. Les modifications du panier doivent être **visibles en temps réel** dans tous les composants

###  Architecture
```
AppComponent
├── HeaderComponent
│   └── CartIconComponent (affiche le compteur)
├── BookListComponent (ajoute au panier)
└── CartDetailComponent (affiche le panier complet)
```

###  Livrables
- `cart.service.ts` (avec BehaviorSubject)
- `cart-icon.component.ts`
- `cart-detail.component.ts`
- Modification de `book-list.component.ts`

---

##  Exercice 4 : Signals Angular

###  Concept
Signals, computed signals, gestion d'état réactif

###  Énoncé
Créez un **dashboard statistiques** utilisant les Signals Angular (Angular 16+).

###  Fonctionnalités attendues
1. Créer un service `BookSignalService` utilisant **Signals** :
   - `books` (signal writable)
   - `totalBooks` (computed signal)
   - `availableBooks` (computed signal)
   - `borrowedBooks` (computed signal)
   - `booksByCategory` (computed signal - retourne un objet)
2. Créer un composant `dashboard` affichant :
   - Nombre **total** de livres
   - Nombre de livres **disponibles**
   - Nombre de livres **empruntés**
   - Répartition par **catégorie**
3. Tout doit se mettre à jour **automatiquement** sans `subscribe`

###  Livrables
- `book-signal.service.ts`
- `dashboard.component.ts`
- `dashboard.component.html`


---

## Exercice 5 : Reactive Forms

###  Concept
FormGroup, FormControl, Validators, FormBuilder, Validation personnalisée

###  Énoncé
Créez un formulaire d'ajout/modification de livre avec **validation avancée**.

###  Fonctionnalités attendues
1. Créer un composant `book-form` avec les champs :
   - **Titre** : requis, min 3 caractères, max 100
   - **Auteur** : requis, min 2 caractères
   - **Année de publication** : requis, entre 1900 et année actuelle
   - **Catégorie** : requis, liste déroulante
   - **ISBN** : format spécifique (validateur custom)
   - **Disponible** : checkbox
2. Créer un **validateur personnalisé** pour l'ISBN
3. Afficher des **messages d'erreur** spécifiques par champ
4. Le formulaire doit fonctionner en mode **création** ET **édition**
5. Désactiver le bouton de soumission si le formulaire est invalide
6. Réinitialiser le formulaire après soumission réussie

###  Format ISBN
Format attendu : `XXX-X-XX-XXXXXX-X`  
Exemple : `978-3-16-148410-0`

###  Livrables
- `book-form.component.ts`
- `book-form.component.html`
- `isbn.validator.ts` (validateur custom)

---

##  Exercice 6 : Template-driven Forms

###  Concept
ngModel, FormsModule, validation côté template

###  Énoncé
Créez un **formulaire de recherche/filtrage** simple avec l'approche template-driven.

###  Fonctionnalités attendues
1. Créer un composant `book-filter` avec :
   - **Champ de recherche** (titre ou auteur)
   - **Filtre par catégorie** (dropdown)
   - **Filtre par disponibilité** (radio buttons : Tous / Disponibles / Empruntés)
   - **Filtre par année** (input number, min/max)
2. Validation côté template (pas de FormGroup)
3. Bouton **"Réinitialiser"** pour effacer tous les filtres
4. **Émettre les filtres** vers le composant parent via `@Output`
5. Application des filtres en **temps réel** dans la liste

###  Livrables
- `book-filter.component.ts`
- `book-filter.component.html`
- Interface `BookFilters`

---

##  Exercice 7 : HTTP Interceptors

###  Concept
Interceptors, authentification, headers, gestion d'erreurs

###  Énoncé
Ajoutez un système d'**authentification** à l'application.

###  Fonctionnalités attendues
1. Créer un service `AuthService` avec :
   - `login(username, password): Observable<User>`
   - `logout()`
   - `isAuthenticated(): boolean`
   - Stockage du token dans `localStorage`
2. Créer un **HTTP Interceptor** qui :
   - Ajoute automatiquement le token dans le header `Authorization`
   - Intercepte les erreurs **401** → redirection vers login
   - Intercepte les erreurs **500** → affiche un message global
3. Créer un composant `login` avec formulaire
4. Ajouter des **utilisateurs** dans `db.json`
5. Seuls les utilisateurs connectés peuvent ajouter/modifier/supprimer des livres

###  Structure db.json (ajout)
```json
{
  "users": [
    {
      "id": 1,
      "username": "admin",
      "password": "admin123",
      "token": "fake-jwt-token-admin",
      "role": "admin"
    },
    {
      "id": 2,
      "username": "user",
      "password": "user123",
      "token": "fake-jwt-token-user",
      "role": "user"
    }
  ],
  "books": [...]
}
```

###  Livrables
- `auth.service.ts`
- `auth.interceptor.ts`
- `login.component.ts`
- Enregistrement de l'interceptor dans `app.module.ts`

---

##  Exercice 8 : Guards

###  Concept
CanActivate, CanDeactivate, protection des routes

###  Énoncé
Protégez les routes sensibles de l'application.

###  Fonctionnalités attendues
1. Créer un **AuthGuard** (CanActivate) :
   - Empêche l'accès aux routes si non connecté
   - Redirige vers `/login` avec l'URL de retour
2. Créer un **UnsavedChangesGuard** (CanDeactivate) :
   - Alerte l'utilisateur avant de quitter le formulaire s'il y a des modifications non sauvegardées
3. Appliquer les guards sur les routes appropriées
4. Créer un **AdminGuard** (bonus) :
   - Vérifie que l'utilisateur a le rôle "admin"

###  Routes à protéger
- `/books/new` → AuthGuard + UnsavedChangesGuard
- `/books/:id/edit` → AuthGuard + UnsavedChangesGuard
- `/dashboard` → AuthGuard

###  Livrables
- `auth.guard.ts`
- `unsaved-changes.guard.ts`
- `admin.guard.ts` (bonus)
- Interface `CanComponentDeactivate`
---

##  Exercice 9 : Pipes

###  Concept
Pipes intégrés, pipes personnalisés, PipeTransform

###  Énoncé
Créez des **pipes personnalisés** pour améliorer l'affichage des données.

###  Fonctionnalités attendues
1. Créer un pipe `availability` :
   - `true` → " Disponible"
   - `false` → " Emprunté"
2. Créer un pipe `category` :
   - Ajoute une icône selon la catégorie
   - Fiction → 📚, Programming → 💻, Science → 🔬, History → 📜
3. Créer un pipe `yearsSince` :
   - Affiche "Publié il y a X ans"
4. Créer un pipe `truncate` :
   - Tronque un texte à X caractères avec "..."
   - Exemple : `{{ book.title | truncate:20 }}`
5. Utiliser les pipes intégrés : `date`, `uppercase`, `lowercase`

###  Livrables
- `availability.pipe.ts`
- `category.pipe.ts`
- `years-since.pipe.ts`
- `truncate.pipe.ts`
- Déclaration dans un `SharedModule`

---

##  Exercice 10 : Routing & Lazy Loading

###  Concept
Routes, modules lazy-loaded, paramètres, navigation, child routes

###  Énoncé
Structurez l'application en **modules chargés à la demande**.

###  Fonctionnalités attendues
1. Créer **3 feature modules** :
   - **AuthModule** (lazy-loaded)
   - **BooksModule** (lazy-loaded)
   - **DashboardModule** (lazy-loaded)
2. Configurer le routing avec :
   - Route par défaut → `/dashboard`
   - `/login` → AuthModule
   - `/books` → BooksModule avec **child routes** :
     - `/books` → liste
     - `/books/new` → formulaire création
     - `/books/:id` → détail
     - `/books/:id/edit` → formulaire édition
   - `/dashboard` → DashboardModule
   - `/**` → Page 404
3. **Navigation programmatique** dans les composants
4. **Récupération des paramètres** de route (`:id`)

###  Architecture finale
```
/                       → Redirect vers /dashboard
/login                  → AuthModule (lazy)
/dashboard              → DashboardModule (lazy, protected)
/books                  → BooksModule (lazy, protected)
  /books                → BookListComponent
  /books/new            → BookFormComponent (mode création)
  /books/:id            → BookDetailComponent
  /books/:id/edit       → BookFormComponent (mode édition)
/**                     → NotFoundComponent
```

###  Livrables
- `app-routing.module.ts`
- `books-routing.module.ts`
- `books.module.ts`
- `dashboard.module.ts`
- `auth.module.ts`
- `not-found.component.ts`


---

##  Exercice 11 : Communication entre Composants

###  Concept
@Input, @Output, EventEmitter, services partagés

###  Énoncé
Créez un système de **notation des livres** avec communication parent-enfant.

###  Fonctionnalités attendues
1. Créer un composant **réutilisable** `star-rating` :
   - **@Input** : `rating` (note actuelle 0-5)
   - **@Output** : `ratingChange` (émission de la nouvelle note)
   - Affichage de 5 étoiles cliquables (⭐ / ☆)
2. Intégrer ce composant dans :
   - `book-detail` → affiche et permet de noter
   - `book-list` → affiche la note (lecture seule)
3. Créer un composant `book-card` (enfant de book-list) :
   - **@Input** : `book`
   - **@Output** : événements (`view`, `edit`, `delete`, `addToCart`)
4. Le composant parent `book-list` **gère tous les événements**

###  Architecture
```
BookListComponent (parent)
├── BookFilterComponent
└── BookCardComponent × N (enfant)
    └── StarRatingComponent
```

###  Livrables
- `star-rating.component.ts` (composant réutilisable)
- `book-card.component.ts`
- Modification de `book-list.component.ts`
- Ajout du champ `rating` dans l'interface `Book`

---

##  Exercice 12 : Resolvers

###  Concept
Resolver, préchargement de données, ActivatedRoute

###  Énoncé
Préchargez les données **avant l'affichage** des composants de détail et d'édition.

###  Fonctionnalités attendues
1. Créer un `BookResolver` qui :
   - Charge un livre depuis l'API **avant** d'afficher la route
   - Gère les erreurs (livre inexistant → redirection vers `/books`)
2. Appliquer le resolver sur :
   - `/books/:id` (détail)
   - `/books/:id/edit` (édition)
3. Dans les composants, récupérer les données via `ActivatedRoute.data`
4. **Pas de loader** dans les composants (données déjà disponibles)

###  Livrables
- `book.resolver.ts`
- Modification de `book-detail.component.ts`
- Modification de `book-form.component.ts`
- Configuration dans `books-routing.module.ts`

---

##  Exercice 13 : NgRx 

###  Concept
Store, Actions, Reducers, Effects, Selectors

###  Énoncé
Refactorisez la gestion d'état avec **NgRx** pour une architecture Redux complète.

###  Fonctionnalités attendues
1. Installer `@ngrx/store`, `@ngrx/effects`, `@ngrx/store-devtools`
2. Créer les **Actions** :
   - `loadBooks`, `loadBooksSuccess`, `loadBooksFailure`
   - `addBook`, `addBookSuccess`
   - `updateBook`, `deleteBook`
3. Créer le **Reducer** avec l'état :
```typescript
   {
     books: Book[],
     loading: boolean,
     error: string | null
   }
```
4. Créer les **Effects** pour les appels HTTP asynchrones
5. Créer les **Selectors** :
   - `selectAllBooks`
   - `selectAvailableBooks`
   - `selectBookById`
   - `selectLoading`
6. Modifier les composants pour utiliser le **Store**

###  Installation
```bash
ng add @ngrx/store
ng add @ngrx/effects
ng add @ngrx/store-devtools
```

###  Livrables
- `book.actions.ts`
- `book.reducer.ts`
- `book.effects.ts`
- `book.selectors.ts`
- Configuration dans `app.module.ts`

---
