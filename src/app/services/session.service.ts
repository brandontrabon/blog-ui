import { Injectable } from '@angular/core';

interface Session {
  token: string;
  tokenExpiry: Date;
  lastActivity: Date;
}

@Injectable()
export class SessionService {
  private readonly _sessionKey = 'session';
  private sessionData = '';

  constructor() {
    this.initSession();
  }

  initSession() {
    const session: Session = {
      token: null,
      tokenExpiry: new Date(Date.now()),
      lastActivity: new Date(Date.now())
    };

    this.setSession(session);
  }

  get token(): string {
    return this.getSession().token;
  }

  set token(value: string) {
    const session = this.getSession();
    session.token = value;
    this.setSession(session);
  }

  get tokenExpiry(): Date {
    return this.getSession().tokenExpiry;
  }

  set tokenExpiry(value: Date) {
    const session = this.getSession();
    session.tokenExpiry = value;
    this.setSession(session);
  }

  get lastActivity(): Date {
    return this.getSession().lastActivity;
  }

  set lastActivity(value: Date) {
    const session = this.getSession();
    session.lastActivity = value;
    this.setSession(session);
  }

  private getSession(): Session {
    if (this.sessionData === '') {
      this.sessionData = JSON.parse(localStorage.getItem(this._sessionKey));
    }
    return this.sessionData as Session;
  }

  private setSession(session: Session) {
    localStorage.setItem(this._sessionKey, JSON.stringify(session));
  }
}
