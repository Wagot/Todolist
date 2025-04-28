import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js ";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyATgcvem8XVd_Au44mcR2FKjKctx1MmZsQ",
  authDomain: "produl.firebaseapp.com",
  projectId: "produl",
  storageBucket: "produl.firebasestorage.app",
  messagingSenderId: "77023582951",
  appId: "1:77023582951:web:5fd60105e5b08cda366042",
  measurementId: "G-G6X2VN52QK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export async function ambiltoDOList() {
  const refDokumen = collection(db, "toDOList");
  const kueri = query(refDokumen, orderBy("toDOList"));
  const cuplikanKueri = await getDocs(kueri);
  
  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id, 
      tugas: dok.data().tugas,
      prioritas: dok.data().prioritas,
      status: dok.data().status,
      tanggal: dok.data().tanggal
    });
  });
  
  return hasil;
}

export function formatAngka(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahtoDOList(tugas, prioritas, status, tanggal) {
  try {
    const dokRef = await addDoc(collection(db, 'toDOList'), {
      tugas:  tugas,
      prioritas: prioritas,
      status: status,
      tanggal: tanggal
    });
    console.log('Berhasil menambah toDOList' + dokRef.id);
  } catch (e) {
    console.log('Gagal menambah toDOList' + e);
  }
}

export async function hapustoDOList(docId) {
  await deleteDoc(doc(db, "toDOList", docId));
}

export async function ubahtoDOList(docId, tugas, prioritas, status, tanggal) {
  await updateDoc(doc(db, "toDOList", docId),{
    tugas: tugas,
    prioritas: prioritas,
    status: status,
    tanggal: tanggal
  });
}

export async function ambiltoDOList(docId) {
  const docRef = await doc(db, "toDOList", docId);
  const docSnap = await getDoc(docRef);
  
  return await docSnap.data();
}