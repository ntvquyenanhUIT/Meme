const memeGeneratingButton = document.querySelector('.meme-generating-btn');

const memeContainer = document.querySelector('.meme-container');

const memeAuthor = document.querySelector('.author-heading');

const loadingText = document.querySelector('.loading-text');

memeGeneratingButton.addEventListener('click', () => {
    loadingText.style.display = 'block';
    memeContainer.style.display ='none';
    memeAuthor.textContent ='';
    const url = `https://meme-api.com/gimme?nocache=${new Date().getTime()}`;
    
    
    fetch(url)
    .then(response => {
        if(response.ok)
        {
            return response.json();
        }
        else
        {
            let errorMsg = '';
            if(response.status >= 400 && response.status < 500)
            {
                errorMsg = `Client error: ${response.status}. Please check the request and try again`;
            }
            else if( response.status >=500)
            {
                errorMsg = `Server error: ${response.status}. Try again later`;
            }
            else{
                errorMsg = `Unexpected Error: ${response.status}`;
            }
        }
        throw new Error(errorMsg);
    })
    .then(json => {
        loadPreviewImage(json.author, json.preview[0], json.url);
    })
    .catch(error => {
        memeAuthor.textContent = error.message;
        memeContainer.alt = 'Error';
        memeContainer.src = '';
    })
    .finally(() => {
        loadingText.style.display = 'none';
        memeContainer.style.display = 'block';
    })
})


function loadPreviewImage(author, previewImg, fullImg) {
    memeContainer.src = previewImg;
    memeContainer.alt = `Meme by ${author}`;
    memeAuthor.textContent = `Meme by: ${author}`;

    // Create a new Image object to load the full-resolution image
    const fullImage = new Image();
    fullImage.src = fullImg;
    fullImage.onload = () => {
        memeContainer.src = fullImg; // Replace preview with the full image
    };
}