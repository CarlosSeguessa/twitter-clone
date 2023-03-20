const admin = require('firebase-admin')
const serviceAccount = process.env.NEXT_PUBLIC_FIREBASE_KEYS

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(serviceAccount))
  })
}

export const firestore = admin.firestore()
