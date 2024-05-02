async function fetchMeals(searchMeal) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`);
        const data = await response.json();
        return data.meals;
    } catch (error) {
        console.error('Error fetching meals:', error);
    }
}

let mainList = document.querySelector("#main");
let sticky = document.querySelector("#stickynoteContainer");
let mealInfoVal;
let fetchedMeals;   
searchMealButton = async () => {
    sticky.remove();
    const searchText = document.querySelector("#searchText").value;
    fetchedMeals = await fetchMeals(searchText);
    console.log("aa",fetchedMeals);
    mainList.innerHTML = '';
   // console.log(fetchedMeals)
    fetchedMeals.forEach(element => {
        let favicons = ["Icons/fav.png", "Icons/favfilled.png"];
        let currentFaviconIndex = 0;

        // Check if the favicon state is stored in local storage
        const storedFaviconIndex = localStorage.getItem(`${element.strMeal}`);

        if (storedFaviconIndex !== null) {
            currentFaviconIndex = parseInt(storedFaviconIndex);
        }

        let favicon = document.createElement("img");
        favicon.setAttribute("src", favicons[currentFaviconIndex]);
        favicon.classList.add("favicon");

        let mealContainer = document.createElement("div"); // Create a container for each meal
        mealContainer.style.display = 'flex'; // Use flexbox layout
        mealContainer.style.alignItems = 'center'; // Center items vertically

        let mealListItem = document.createElement("a");
        mealListItem.classList.add="meal-det";
        mealListItem.textContent = element.strMeal;
        mealListItem.setAttribute("href", `info.html?mealName=${element.strMeal}&inst=${element.strInstructions}&imgUrl=${element.strMealThumb}`)

        let mealImage = document.createElement("img");
        mealImage.setAttribute("src", element.strMealThumb);

        // Add event listener to toggle favicon source when clicked
        favicon.addEventListener('click', function() {
            currentFaviconIndex = (currentFaviconIndex + 1) % favicons.length;
            favicon.setAttribute("src", favicons[currentFaviconIndex]);
            // Store the current favicon state in local storage
            localStorage.setItem(`${element.strMeal}`, currentFaviconIndex);
        });

        mealContainer.appendChild(mealListItem); // Append name to the container
        mealContainer.appendChild(favicon); // Append favicon to the container
        mealContainer.appendChild(mealImage); // Append image to the container

        mainList.appendChild(mealContainer); // Append the container to the main list
    });
}

function showFavMeal(){
let favMealCount = localStorage.length;
let elem = document.querySelector(".favMealList");
for(let i=0;i<favMealCount;i++){
    if(localStorage.getItem(localStorage.key(i))==1){
     const list= document.createElement("li");   
     const favMeal = localStorage.key(i);
     list.innerHTML = `${favMeal}`;
     elem.appendChild(list);
    }
  
}
}
    function infoMeal(){
        var queryParams = new URLSearchParams(window.location.search);   
    //  console.log("FF", fetchedMeals);
        // Retrieve the value of the 'linkText' parameter
        console.log("ff", fetchedMeals);
        var mealName= queryParams.get('mealName');
        console.log("name", mealName)
        const mealIn = document.querySelector(".meals-inf");
        const mealImg = queryParams.get('imgUrl');
        const inst = queryParams.get('inst');
            const des = document.createElement("div");
            
            const name = document.createElement("p");
            const img = document.createElement("img");
            des.innerHTML =`Instructions: ${inst}`
            name.innerHTML= `${mealName}`;
            img.setAttribute("src",`${mealImg}`);
            mealIn.appendChild(name);
            mealIn.appendChild(img);
            mealIn.appendChild(des);
        
    

    }
