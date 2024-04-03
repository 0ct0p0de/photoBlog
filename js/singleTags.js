document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const photoID = urlParams.get('slug');

    if(photoID){
        fetch("json/photos.json")
            .then(response => response.json())
            .then(data => {
                const mainPhoto = data.photos.find(photo => photo._id === photoID);
                if (mainPhoto) {
                    const phototags = mainPhoto.tags;
                    const tagCounts = {};

                    data.photos.forEach(photo => {
                        photo.tags.forEach(tag =>{
                            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                        });
                    });

                    const sortedTags = Object.keys(tagCounts)
                        .filter(tag => phototags.includes(tag))
                        .sort();

                    const tagsList = document.querySelector('.photo-tags-table');
                    tagsList.innerHTML = "";

                    for (const tag of sortedTags) {
                        const tagElement = document.createElement("a");
                        tagElement.href = `viewTag.html?tag=${tag}`;
                        tagElement.className = "tag";

                        const h5Element = document.createElement("h5");
                        h5Element.textContent = tag;

                        const pElement = document.createElement("p");
                        pElement.textContent = `${tagCounts[tag]} photo${tagCounts[tag] === 1 ? '' : 's'}`;

                        tagElement.appendChild(h5Element);
                        tagElement.appendChild(pElement);
                        tagsList.appendChild(tagElement);
                    }
                } else {
                    console.error("Photo with provided slug not found.");
                }
                
            })
            .catch(error => console.error("Error fetching photos: ", error));
    } else {
        console.error("Photo slug not provided in the URL.")
    }    
});
