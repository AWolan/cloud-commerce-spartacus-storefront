import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromAction from '../actions/titles.action';
import { OccMiscsService } from '../../../occ/miscs/miscs.service';

@Injectable()
export class TitlesEffects {
  @Effect()
  loadTitles$: Observable<fromAction.TitlesAction> = this.actions$.pipe(
    ofType(fromAction.LOAD_TITLES),
    switchMap(() => {
      return this.occMiscsService.loadTitles().pipe(
        map(data => new fromAction.LoadTitlesSuccess(data.titles)),
        catchError(error => of(new fromAction.LoadTitlesFail(error)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private occMiscsService: OccMiscsService
  ) {}
}
