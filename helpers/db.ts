import * as SQLite from 'expo-sqlite'

// verilen isimde database yoksa oluşturuluyor yoksa sadece açılıyor.
const db = SQLite.openDatabase('places.db')

// Promise'ten dönecek olan erro'ün tipi genelde any olduğu için sadece resolve'dan dönecek değerin türünü belirtmemiz yeterli oluyor.
export const init = (): Promise<SQLite.SQLResultSet> => {
  return new Promise((resolve, reject) => {
    // Database'de yürütülecek herhangi bir işlemi transaction etrafına sarmak, bir error olduğunda işlemin direk bitmesinin yani kopuk verilerin transfer edilmesi sağlıyor.
    // Callback'inin içine aldığı parametre de transiction object'i oluyor.
    db.transaction((tx) => {
      tx.executeSql(
        // REAL float olacağı anlamına geliyor.
        'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
        [],
        (_, result) => {
          resolve(result)
        },
        // başarısız olduğunda yürütüelecek fonksiyon bunun ve yukardaki başarılı fonksiyonunun parametresi o an yürütülen query oluyor sanırım.
        (_, error): boolean => {
          console.log(error)
          reject(error)
          return false
        }
      )
    })
  })
}

export const insertPlace = (
  title: string,
  imageUri: string,
  address: string,
  lat: number,
  lng: number
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        // *aşağıdaki values kısmına ${title} şeklinde değişken değerlerini yazabilirdik fakat kötü bir kod barındırma ihtimaline karşı,
        // *değişkenlerin yerine "?" tutacak şekilde, arguments array'inde belirtiyoruz.
        'INSERT INTO places (title, imageUri, address, lat, lng) VALUES(?, ?, ?, ?, ?);',
        [title, imageUri, address, lat, lng],
        (_, result) => {
          resolve(result)
        },
        (_, error) => {
          reject(error)
          return false
        }
      )
    })
  })
}

export const fetchPlaces = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM places;',
        [],
        (_, result) => {
          resolve(result)
        },
        (_, error) => {
          reject(error)
          return false
        }
      )
    })
  })
}
