//Creates the Tags list and counts for the tags table

document.addEventListener("DOMContentLoaded", function () {
    fetch("json/photos.json")
        .then(response => response.json())
        .then(data => {
            //Calculate the number of photos per tag then sorts alphabetically
            const tagCounts = {};
            data.photos.forEach(photo => {
                photo.tags.forEach(tag => {
                    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                });
            });
            //Sort tags alphabettically
            const sortedTags = Object.keys(tagCounts).sort();
            //Update the tags in photo-tags-table
            const tagsList = document.querySelector('.photo-tags-table');
            tagsList.innerHTML = "";

            for(const tag of sortedTags){
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


        })
        .catch(error => console.error("Error fetching photos: ", error));
});
