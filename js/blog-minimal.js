//Functions for navbar dropdown menu
function inspirationShow() {
    const inspirationDropdown = document.getElementById("inspirationDropdown");
    inspirationDropdown.classList.toggle("show");
}
function closeInspirationDropdown() {
    const inspirationDropdown = document.getElementById("inspirationDropdown");
    inspirationDropdown.classList.remove("show");
}
function coursesShow() {
    const coursesDropdown = document.getElementById("coursesDropdown");
    coursesDropdown.classList.toggle("show");
}
function closeCoursesDropdown() {
    const coursesDropdown = document.getElementById("coursesDropdown");
    coursesDropdown.classList.remove("show");
}

// Data fetching from API for the slideshow
const fetchSlideshowData = async (url, id) => {
    try {
        const response = await fetch(url + id.toString());
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Extract the URL and title of the photo from the JSON response
        const photoUrl = data.photo.url;
        const photoTitle = data.photo.title;

        // Get the img element by its ID and the title by the title attribute
        const photoElement = document.getElementById('photo' + (id % 3).toString());
        const titleElement = document.getElementById('title' + (id % 3).toString());

        // Set the src attribute of the img element to the photo URL and the content of the title
        photoElement.src = photoUrl;
        titleElement.textContent = photoTitle;
        //console.log('Photo URL:', photoUrl);
    } catch (error) {
        console.error('Error:', error);
    }
}

const URL = 'https://api.slingacademy.com/v1/sample-data/photos/';
let SlideNumber = 4; // Initialize to starter image
fetchSlideshowData(URL, SlideNumber);

document.getElementById('forwardButton').addEventListener('click', () => {
    if(SlideNumber<6){
        SlideNumber++;
        fetchSlideshowData(URL, SlideNumber);
    }
});

document.getElementById('backButton').addEventListener('click', () => {
    if(SlideNumber>4){
        SlideNumber--;
        fetchSlideshowData(URL, SlideNumber);
    }
});

//Fetching data for other images
const fetchImageData = async (url, id) => {
    try {
        const response = await fetch(url + id.toString());
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Extract the URL of the photo from the JSON response
        const photoUrl = data.photo.url;
        const photoTitle = data.photo.title;
        const photoDescription = data.photo.description;
        const userName = data.photo.user;

        // Get the img element by its ID
        const photoElement = document.getElementById('listImage' + (id % 5).toString());
        const titleElement = document.getElementById('listTitle' + (id % 5).toString());
        const descriptionElement = document.getElementById('description' + (id % 5).toString());
        const usernameElement = document.getElementById('username' + (id % 5).toString());
        // Set the src attribute of the img element to the photo URL
        photoElement.src = photoUrl;
        titleElement.textContent = photoTitle;
        descriptionElement.textContent = photoDescription;
        usernameElement.textContent = "By: "+userName;
        console.log('Photo URL:', photoUrl);
    } catch (error) {
        console.error('Error:', error);
    }
}

let imageNumber = 11; //starting image index
// Add a flag to track whether a request is in progress
let isLoading = false;
async function getImages() {
    if (!isLoading) {
        isLoading = true;
        for (let i = 0; i < 5; i++) {
            try {
                await fetchImageData(URL, imageNumber);
                console.log('Fetched image:', imageNumber);
                imageNumber++;
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        }
        isLoading = false;
    }
}

// Attach event listeners
document.getElementById('nextPage').addEventListener('click', () => {
    getImages()
        .then(() => {
            console.log('All data fetched sequentially.');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

document.getElementById('previousPage').addEventListener('click', () => {
    if(imageNumber <= 16){
        console.log('Back to the beginning...')
    }
    else {
        imageNumber-=10;
        getImages()
            .then(() => {
                console.log('All data fetched sequentially.');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// Initial load
getImages()
    .then(() => {
        console.log('Initial data fetched.');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
