
const loadData =(phoneName,dataLimit) =>{
    // speender
    const speener = document.getElementById('speener');
    speener.classList.remove('d-none');
    fetch (`https://openapi.programming-hero.com/api/phones?search=${phoneName}`)
    .then (res => res.json())
    .then (data => receivedData(data.data , dataLimit))
}
const receivedData= (phones,dataLimit )=>{
    // spener 
    const speener = document.getElementById('speener');
    speener.classList.add('d-none');
    const cardContainer=document.getElementById('card-section');
    // display only 10 phone 
    const showAll = document.getElementById('show-more');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }

    // alert phone not found 
    if(phones.length === 0){
        Swal.fire({
            title: 'Oops...Phone Not Found',
            text: 'Something went wrong!.Please input Valid name',
          }) 
          return;
    }
    cardContainer.innerHTML = '';
   phones.forEach(phone => {
    const {brand,phone_name,image} = phone;
    const cardDiv = document.createElement('div')
    cardDiv.classList.add('col')
    cardDiv.innerHTML=`
    <div class="card ">
            <img class="w-50" src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-title">${brand}</h3>
            <h5 class="card-title">${phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
        </div>
  </div>
    `
    cardContainer.appendChild(cardDiv)
    // cardDiv.innerHTML=''
    
   });
}
const pressesSearch = (dataLimit)=>{
    const searchInput =document.getElementById('search-input');
    const searchInputValue = searchInput.value;
    searchInput.value = '';
    loadData(searchInputValue,dataLimit);
}
// search 
document.getElementById('submit-btn').addEventListener('click',function(){
    // const searchInput =document.getElementById('search-input');
    // const searchInputValue = searchInput.value;
    // searchInput.value = '';
    // loadData(searchInputValue);
    pressesSearch(10)
})
// enter prees hander 
document.getElementById('search-input').addEventListener('keypress',function(e){
    if(e.key === 'Enter'){
        pressesSearch(10)
    }
})


// show more btn 
document.getElementById('show-more-btn').addEventListener('click',function(){
        pressesSearch();
})

// load phone detailes

const loadPhoneDetails =id =>{
    fetch (`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(data => displayPhone(data.data))
}
const displayPhone = phone =>{
    console.log(phone);
    const modalTitle =document.getElementById('exampleModalLabel');
    modalTitle.innerText = phone.name;
    const modalBody =document.getElementById('phone-detailes');
    modalBody.innerHTML =`
    <p>releaseDate : ${phone.releaseDate ? phone.releaseDate : 'No releaseDate Found'}</p>
    <p>chipSet : ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'No chipSet details Found'}</p>
    <p>displaySize : ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : 'No displaySize details Found'}</p>
    <p>storage : ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'No storage details Found'}</p>
    `;
}

loadData('apple')