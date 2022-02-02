const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let photoArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const count = 30;
const apiKey = "Xb7vJhuarM9Yv01Mt-nW4_lcqyiKi4wNKhkfa8P0Bn0";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const setAttribute = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const imageLoaded = () => {
  imagesLoaded += 1;
  if (imagesLoaded === totalImages) {
    ready = true;
  }
};
const displayPhoto = () => {
  totalImages = photoArray.length;
  photoArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttribute(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.description,
      title: photo.description,
    });

    img.addEventListener("load", imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

const getPhotos = async () => {
  try {
    const resp = await fetch(apiUrl);
    photoArray = await resp.json();
    displayPhoto();
  } catch (e) {
    alert(e);
  }
};

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
    ready = false;
    totalImages = 0;
    imagesLoaded = 0;
  }
});

getPhotos();
