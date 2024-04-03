document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const photoID = urlParams.get('slug');

    if(photoID){
        fetch("json/photos.json")
            .then(response => response.json())
            .then(data => {
                const photo = data.photos.find(photo => photo._id === photoID);

                if(photo){
                    const singlePhotoTitle = document.querySelector('#singlePhoto-title');
                    const singlePhotoImg = document.querySelector('#singlePhoto-img');
                    const singlePhotoDesc = document.querySelector('#singlePhoto-desc');

                    singlePhotoTitle.textContent = photo.name;
                    photoLocation = "/img/photos/" + photo.location;
                    singlePhotoImg.src = photoLocation;
                    singlePhotoDesc.textContent =  photo.description;

                } else {
                    console.error('PhotoID not found within photos.');
                }
            })
            .catch(error => console.error("Error fetching recipes: ", error));
    } else {
        console.error("Photo slug not provided in the URL.");
    }
})