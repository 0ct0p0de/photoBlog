document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedTag = urlParams.get('tag');

    if (selectedTag) {
        fetch("json/photos.json")
            .then(response => response.json())
            .then(data => {
                const filteredPhotos = data.photos.filter(photo => photo.tags.includes(selectedTag));
                console.log("filteredPhotos contains; ",filteredPhotos.length);

                const tagName = document.querySelector('.tagName');
                tagName.innerHTML = selectedTag;

                
                const photosMat = document.querySelector('.photo-card-mat');
                photosMat.innerHTML = "";
                filteredPhotos.forEach(photo => {
                    const photoCard = document.createElement("div");
                    photoCard.className = "photo-card";

                    const photoElement = document.createElement("a");
                    photoElement.href = `singlePhoto.html?slug=${photo._id}`;
                    photoElement.className = "photo";

                    const imgElement = document.createElement("img");
                    imgLocation = "/img/photos/" + photo.location;
                    imgElement.src = imgLocation;
                    imgElement.alt = photo.name;
                    imgElement.className = "img photo-img";

                    const h5Element = document.createElement("h5");
                    h5Element.textContent = photo.name;

                    const pElement = document.createElement("p");
                    textString = `  ${photo.description}` ;
                    pElement.textContent = textString;

                    photoCard.appendChild(imgElement);
                    photoCard.appendChild(h5Element);
                    photoCard.appendChild(pElement);

                    photoCard.appendChild(photoElement)
                    photosMat.appendChild(photoCard);
                });
            })
            .catch(error => console.error("Error fetching recipes: ", error));
    } else {
        console.error("Tag not provided in the URL.");
    }
});

