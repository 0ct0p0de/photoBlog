document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedTag = urlParams.get('tag');
    const tagNameElement = document.getElementById('tagName');

    if (selectedTag) {
        tagNameElement.textContent = selectedTag;
        fetch("json/photos.json")
            .then(response => response.json())
            .then(data => {
                const filteredPhotos = data.recipes.filter(photo => photo.tags.includes(selectedTag));

                const photosMat = document.querySelector('.photo-card-mat');

                // Clear existing content
                photosMat.innerHTML = "";

                filteredPhotos.forEach(photo => {
                    const photoElement = document.createElement("a");
                    photoElement.href = `singlePhoto.html?slug=${photo._id}`;
                    photoElement.className = "photo";

                    const imgElement = document.createElement("img");
                    imgElement.src = recipe.image;
                    imgElement.alt = recipe.name;
                    imgElement.className = "img recipe-img";

                    const h5Element = document.createElement("h5");
                    h5Element.textContent = recipe.name;

                    const pElement = document.createElement("p");
                    textString = `Prep: ${recipe.prepTime} | Cook: ${recipe.cookTime}`;
                    pElement.textContent = textString;

                    photoElement.appendChild(imgElement);
                    photoElement.appendChild(h5Element);
                    photoElement.appendChild(pElement);

                    recipesList.appendChild(photoElement);
                });
            })
            .catch(error => console.error("Error fetching recipes: ", error));
    } else {
        console.error("Tag not provided in the URL.");
    }
});
