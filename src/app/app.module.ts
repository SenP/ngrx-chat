import { MarkReadMessagesEffectService } from './store/effects/mark-read-messages-effect.service';
import { ServerNotificationsEffectService } from './store/effects/server-notifications-effect.service';
import { WriteNewMessageEffectService } from './store/effects/write-new-message-effect.service';
import { appReducer } from './store/reducers/app.reducer';
import { storeData } from './store/reducers/storeData.reducer';
import { uiState } from './store/reducers/uiState.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { LoadThreadsEffectService } from './store/effects/load-threads-effect.service';
import { AllUserData } from '../../shared/to/all-user-data';
import { LOAD_USER_THREADS_ACTION, LoadUserThreadsAction, USER_THREADS_LOADED_ACTION, UserThreadsLoadedAction } from './store/actions';
import { Action, combineReducers, Store, StoreModule } from '@ngrx/store';
import { ApplicationState, INITIAL_APPLICATION_STATE } from './store/application-state';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import * as _ from 'lodash';

import { AppComponent } from './app.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { MessageListComponent } from './message-list/message-list.component';

import { ThreadsService } from './services/threads.service';

@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(appReducer(), INITIAL_APPLICATION_STATE),
    EffectsModule.run(LoadThreadsEffectService),
    EffectsModule.run(WriteNewMessageEffectService),
    EffectsModule.run(ServerNotificationsEffectService),
    EffectsModule.run(MarkReadMessagesEffectService),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [ThreadsService, LoadThreadsEffectService],
  bootstrap: [AppComponent]
})

export class AppModule { }
