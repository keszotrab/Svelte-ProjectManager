// src/lib/firebaseAdmin.js
import { initializeApp, applicationDefault, cert, getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { resolve } from 'path';
let serviceAccount;


  serviceAccount = JSON.parse(readFileSync(resolve('./cred.json'), 'utf8'));

  if (!getApps().length) {
    initializeApp({
      credential: cert(serviceAccount),
    });
  }

  const db = getFirestore();
  export { db };
  

