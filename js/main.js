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
            const sortedTags = Object.keys(tagCounts).sort();
            const tagsList = document.querySelector('.photo-tags-table');
            tagsList.innerHTML = "";
            for(const tag of sortedTags){
                const tagElement = document.createElement("a");
                tagElement.href = 'viewTag.html?tag=${tag}';
                const countText = '(${tagCounts[tag]})';
                tagElement.textContent = '${tag}${countText}';
                tagsList.appendChild(tagElement);
            }


        })
        .catch(error => console.error("Error fetching recipes: ", error));
});
