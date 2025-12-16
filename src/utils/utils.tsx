import { catIcon, dogIcon, birdIcon, undefinedIcon } from "../icons/icons";



export const chooseImage = (kind: string) => {
  switch (kind) {
    case "dog":
      return dogIcon;
    case "cat":
      return catIcon;
    case "bird":
      return birdIcon;
    default:
      return undefinedIcon;
  }
};

export const getCookie = (name: string) => {
  const cookies = document.cookie.split(';'); 
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim(); 
    if (cookie.startsWith(name + '=')) {
      return decodeURIComponent(cookie.substring(name.length + 1)); 
    }
  }
  return null;
}

export const setCookie = (name: string, value: string, secondsToExpire: number) => {
  const now = new Date();
  const expirationTime = new Date(now.getTime() + secondsToExpire * 1000); 

  document.cookie = `${name}=${value}; expires=${expirationTime.toUTCString()}; path=/`;
};

