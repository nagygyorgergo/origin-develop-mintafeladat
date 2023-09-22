//Functions for navbar dropdown menu
function showInspiration() {
    const inspirationDropdown = document.getElementById("inspirationDropdown");
    inspirationDropdown.classList.toggle("show");
}
function closeInspiration() {
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

// Data fetching from API for the slideshow and error message display
const URL = 'https://api.slingacademy.com/v1/sample-data/photos/';
function displayErrorMessage(message) {
    const errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block';
}
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
    } catch (error) {
        console.error('Error:', error);
        displayErrorMessage('Failed to load images. Try again later.')
    }
}

let slideNumber = 4; // Initialize to starter image number
async function getSlideshow() {
    await fetchSlideshowData(URL, slideNumber);
}

//Adding event listeners
document.getElementById('forwardButton').addEventListener('click', () => {
    if (slideNumber < 6) {
        slideNumber++;
        getSlideshow().then(() => {
            console.log('All slideshow data fetched.');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

document.getElementById('backButton').addEventListener('click', () => {
    if (slideNumber > 4) {
        slideNumber--;
        getSlideshow().then(() => {
            console.log('All slideshow data fetched.');
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

//Fetching initial slideshow data
getSlideshow().then(() => {
    console.log('All initial slideshow data fetched.');
})
    .catch((error) => {
        console.error('Error:', error);
    });

//Fetching data for other images on the page
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
        usernameElement.textContent = "By: " + userName;

    } catch (error) {
        console.error('Error:', error);
        displayErrorMessage('Failed to fetch images. Please try again later.');
    }
}

let imageNumber = 11; //starting image index
async function getImages() {
    for (let i = 0; i < 5; i++) {
        //enable spinner wile images are loading
        const loadingSpinner = document.getElementById('loadingSpinner' + (imageNumber % 5).toString());
        loadingSpinner.style.display = 'block';
        await fetchImageData(URL, imageNumber);
        imageNumber++;
        //disable spinner
        loadingSpinner.style.display = 'none';
    }
 }

// Attach event listeners
document.getElementById('nextPage').addEventListener('click', () => {
    getImages()
        .then(() => {
            console.log('All image data fetched.');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

document.getElementById('previousPage').addEventListener('click', () => {
    if(imageNumber <= 16){
        console.log('You are back to the beginning of images...')
    }
    else {
        imageNumber-=10;
        getImages()
            .then(() => {
                console.log('All image data fetched.');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// Initial image load
getImages()
    .then(() => {
        console.log('All initial image data fetched.');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
