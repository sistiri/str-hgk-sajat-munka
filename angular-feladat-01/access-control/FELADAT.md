A kész feladat feltöltésének helye:
Repo: str-hgk-sajat-munka

Almappa: angular-feladat-01


## Gyakorlófeladat
Készíts egy egyszerű, Angular alapú alkalmazást. Az alkalmazás célja, hogy ki- és bejelentkezést nyújtson a felhasználóknak.

## 1. Oldalak:
- home: a felhasználók bejelentkezés nélkül is elérhetik 1
- editor: a felhasználók csak editor vagy magasabb jogosultsággal érhetik el 2
- admin: a felhasználók csak admin jogosultsággal érhetik el 3
- login: minden felhasználó elérheti, a bejelentkezést valósítja meg. Sikeres belépés esetén a home oldalra irányít át. 1

## 2. Autentikáció és autorizáció megvalósítása: 
- Az autentikációhoz a json-server-auth NodeJS modult használd.
- Az azonosítás json-webtoken segítségével történjen.
- A tokenek ellenőrzésére és a kérésekhez csatolására használj interceptor-t.
- Hozz létre egy forbidden oldalt, ahol üzenetben tájékoztatod a felhasználót arról, hogy nincs joga megtekinteni a kért oldalt.
- Az egyes url-ek védelmét guard-okkal oldd meg, ezek irányítsák át a felhasználót a forbidden oldalra megfelelő jogosultság hiányában.
- A fejlécben a belépett felhasználóknak jelenjen meg egy logout gomb, amelyre kattintva a rendszer kijelentkezteti őket.

## 3. Az alkalmazás felépítése:
- Egyszerű felépítést használj, a fejlécben legyenek a kattintható linkek a navigációhoz, szintén innen legyen elérhető a login-oldal is.
- Használj natív Bootstrap layout-ot, a hangsúly nem a megjelenésen, hanem a login/logout helyes működésén van.
- Az egyes oldalak tartalma nem lényeges, csak a tesztelés segítik. Kivétel a login oldal, természetesen itt egy belépő űrlapot kell megjeleníteni.
## Segítség
- Az autentikációt és autorizációt a következő osztályok segítik: AuthService, JwtInterceptorService, EditorGuard, AdminGuard.
- Az egyes guard-okat, ha készen vannak, akkor az AppRoutingModule-ban vedd fel, a videókban bemutatott módon, a canActivate tömbben.
- Ebben a sorrendben dolgozz: 
  - komponensek -> 
  - routing -> 
  - authService -> 
  - jwtInterceptorService -> 
  - guard-ok.


## + + + + + + + + + + + + + +
## _ _ _ _ CHEAT SHEET _ _ _ _
## + + + + + + + + + + + + + +

## Set Environment: 
- npm i -g typescript
- npm i -g express
- npm i -g json-server
- npm i -g json-server-auth

## New Angular Project:
  - `ng new access-control`

## Bootstrap, Font-Awesome
  - `npm i bootstrap font-awesome`
```
 "styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/font-awesome/css/font-awesome.min.css",
  "src/styles.scss"
  ],
```
1. Create Pages:
  - `ng g c page/nav`
  - `ng g c page/home`
  - `ng g c page/login`
  - `ng g c page/admin`
  - `ng g c page/editor`
  - `ng g c page/forbidden`

2. Create routes in AppRoutingModule
3. Setup Router Outlet in AppComponent
```
<app-nav></app-nav>
<div class="container">
  <div class="row">
    <div class="col-12 col-md-10 offset-md-1">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
```
4. Create Config Service - Navigation routing
  - `ng g service service/config`

ConfigService:
  ```
    navigation: { label: string, href: string, role: number }[] = [
    { label: 'Home', href: '', role: 1 },
    { label: 'Login', href: '/login', role: 1 },
    { label: 'Editor', href: '/editor', role: 2 },
    { label: 'Admin', href: '/admin', role: 3 }
  ];
  ```
5. Page Navigation 

nav.component.ts: 
  ```
  navigation = this.config.navigation
  ```
  ```
  constructor(
    private config: ConfigService
  ) { }
  ```
nav.component.html:
  ```
  <div class="navbar-nav">
        <a class="nav-link" 
        *ngFor="let link of navigation" 
        routerLinkActive="active"
        [routerLinkActiveOptions]="{exact: true}"
        aria-current="page" 
        [routerLink]="link.href">{{ link.label }}</a>
  ```

6. Create User Model
- `ng g class model/user`

7. Import HttpClientModule to app.module.ts

```
import { HttpClientModule } from '@angular/common/http'
```
> Don't forget to insert it to imports[] 

8. Authorization
 - `ng g service service/auth`
 - `ng g service service/user`
Login, Logout methods
UserSerice methods

9. JWT Interceptor Service
- `ng g service service/jwt-interceptor`

app.module.ts:
```
providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true}
  ],
```
10. Login Component
onLogin() method requires FormsModule
app.module.ts: 
```
import { FormsModule } from '@angular/forms'
```
> Don't forget to insert it to imports[] 

11. NavComponent
```
export class NavComponent implements OnInit, OnDestroy {

  navigation = this.config.navigation
  loginStatus = false;
  userSub: Subscription = new Subscription();
  user: User | null = null

  constructor(
    private config: ConfigService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.userSub = this.auth.currentUserSubject.subscribe(
      user => this.user = user
    );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.auth.logout();
  }

}
```

12. Create routes.json in the root

```
{
  "users": 660
}
```

12. Create AuthGuardService (implements CanActivate)
- `ng g service service/auth-guard`

```
export class AuthGuardService implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router,
  ) { }

  canActivate(): boolean {
    if (!this.auth.currentUserValue) {
      this.router.navigate(['login']);
      return false;
    }
    return true
  }
}
```
13. Impelement AuthGuardService with CanActivate

app.routing.module.ts:
```
{
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
  },
```
14. Create RoleGuardService (implements CanActivate)
- `ng g service service/role-guard`

```
export class RoleGuardService implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    if (
      !this.auth.currentUserValue ||
      !this.auth.currentUserValue.role ||
      this.auth.currentUserValue.role < expectedRole
    ) {
      this.router.navigate(['forbidden']);
      return false;
    }
    return true
  }
}
```
15. Impelement RoleGuardService with CanActivate and Data

app.routing.module.ts:
```
{
    path: 'editor',
    component: EditorComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 2,
    },
  },
```



## + + + + + + + + + + + + + +
## _ _ _ _ CHEAT SHEET _ _ _ _
## + + + + + + + + + + + + + +


## Services:
  - `ng g service service/config`
  - `ng g service service/auth`
  - `ng g service service/user`
  - `ng g service service/jwt-interceptor`

## Guards:
  - `ng g service service/auth-guard`
  - `ng g service service/role-guard`

## Server: 
- `json-server-auth ./server/users.json --watch`
- `json-server-auth ./server/users.json -r ./routes.json`

## Models/Classes:
  - `ng g class model/user`