export function PostData(type, userData) {

    let BaseURL = 'http://localhost/react-php/api/users.php';

    return new Promise((resolve, reject) =>{
    
         
        fetch(BaseURL+'?tp='+type, {
            method: 'POST',
            body: JSON.stringify(userData)
          })
          .then((response) => response.json())
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });

  
      });
}