import { Headers } from '@angular/http';

export function commonHttpHeaders(userId: number) {
    const headers = new Headers();    
    headers.append('userid', userId.toString());
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return { headers };
  }