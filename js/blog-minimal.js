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

// Data fetching from API
const fetchData = async (url, id) => {
    try {
        const response = await fetch(url + id.toString());
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Extract the URL of the photo from the JSON response
        const photoUrl = data.photo.url;
        const photoTitle = data.photo.title;

        // Get the img element by its ID
        const photoElement = document.getElementById('photo' + (id % 3).toString());
        const titleElement = document.getElementById('title' + (id % 3).toString());
        // Set the src attribute of the img element to the photo URL
        photoElement.src = photoUrl;
        titleElement.textContent = photoTitle;
        console.log('Photo URL:', photoUrl);
    } catch (error) {
        console.error('Error:', error);
    }
}

const URL = 'https://api.slingacademy.com/v1/sample-data/photos/';
let szam = 4; // Initialize to 0
fetchData(URL, szam);
// Function to load the next set of images

document.getElementById('eloreGomb').addEventListener('click', () => {
    if(szam<6){
        szam++;
        fetchData(URL, szam);
    }
});

document.getElementById('hatraGomb').addEventListener('click', () => {
    if(szam>4){
        szam--;
        fetchData(URL, szam);
    }
});
