const imgUrl = new URL('img/bild.jpg', import.meta.url);
const img = document.createElement('img');
img.src = imgUrl.href; //ger oss en string med hela url:en till bilden
document.body.append(img)


const newImage = new URL('img/bild2.jpg', import.meta.url);
const image = document.createElement('img');
image.src = newImage.href; //ger oss en string med hela url:en till bilden
document.body.append(image)