import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { BannerComponent } from './banner/banner.component';
import { LoginComponent } from './login/login.component';
import { TerrainComponent } from './terrain/terrain.component';
import { TnbComponent } from './tnb/tnb.component';
import { CategoryComponent } from './category/category.component';
import { TauxComponent } from './taux/taux.component';
import { RedevableComponent } from './redevable/redevable.component';

export const routes: Routes = [ { path: '', component: BannerComponent },
{ path: 'auth', component: AuthComponent },{ path: 'login', component: LoginComponent },
{ path: 'terrain', component: TerrainComponent },
{ path: 'tnb', component: TnbComponent },
{ path: 'cat', component: CategoryComponent },
{ path: 'taux', component: TauxComponent },
{ path: 'redev', component: RedevableComponent },
];
