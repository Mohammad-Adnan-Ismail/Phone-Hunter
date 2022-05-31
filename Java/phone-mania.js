// calling search button & loading API
const searchPhone = () => {
  //  Getting input feid text
  const searchFeild = document.getElementById('search-feild');
  const searchText = searchFeild.value;
  searchFeild.value = '';
  
  // Loading result API
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  fetch (url)
  .then(res => res.json())
  .then(data => displayPhones(data.data))
}

// // showing result code
  const displayPhones = (phones) => {
      const fieldSet = document.getElementById("phonesDisplay");
      fieldSet.textContent = "";
      const x = phones[0];
// error case
      if (x == undefined) {
          // error setting
          const error = document.getElementById('error')
          const div = document.createElement('div');
          error.textContent = ''
          div.innerHTML = `
          <p class ="text-amber-50 text-3xl">There is no phone under this name, please search valid phone name or brand name</p>`
          error.appendChild(div);
          const displayDetail = document.getElementById('singleDetails');
          displayDetail.textContent = '';
      }
      else {
  // showing 20 result and rest result
          phones = phones.slice(0, 20);
          phones.forEach(phone => {
              const div = document.createElement('div');
  div.classList.add('col');
  div.innerHTML = `
      <div class="card rounded">
      <div class="p-5">
      <img src="${phone.image}" class="card-img-top img-fluid h-50" alt="...">
      </div>
      <div class="card-body">
          <h4 class="card-title text-2xl font-semibold">Model: ${phone.phone_name}</h4>
          <h5 class="card-title text-2xl font-semibold"> Brand: ${phone.brand}</h5>
          <button onclick="loadDetails('${phone.slug}')" type="button" class="btn btn-primary btn-sm bg-red-500 font-semibold	rounded">Show Details</button>
      </div>
      </div>
  `
  fieldSet.appendChild(div)
  const displayDetail = document.getElementById('singleDetails');
  displayDetail.textContent = '';
  const error = document.getElementById('error')
          error.textContent = '';
  })
  }
  }

// getting single details button
const loadDetails = (phone) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phone}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayDetails(data.data))
}
// displaying single details
const displayDetails = phone =>{
  console.log(phone);
  let date = phone.releaseDate;
  if(date == ''){
      phone.releaseDate = 'No release date found'
  }
  else{
      date = phone.releaseDate;
  }
// Total information including validation
const others = phone.others;

// without others
if(others == undefined){
  const displayDetail = document.getElementById('singleDetails');
   displayDetail.innerHTML =`
   <div class="card mb-3 w-75 mx-auto" >
<div class="row g-0">
  <div class="col-sm-5 col-lg-5">
    <img src="${phone.image}" class="img-fluid rounded-start h-100">
  </div>
  <div class="col-sm-7 col-lg-7">
    <div class="card-body" id="others">
      <h3 class="card-title text-3xl font-semibold">Model: ${phone.name}</h3>
      <h5 class="card-title text-2xl font-semibold">Release Date: ${phone.releaseDate}</h5>
      <h5 class="card-title text-2xl font-semibold">Model: ${phone.brand}</h5>
      <h5 class="card-title text-2xl font-semibold">chipset: ${phone.mainFeatures.chipSet}</h5>
      <h5 class="card-title text-2xl font-semibold">Display Size: ${phone.mainFeatures.displaySize} </h5>
      <h5 class="card-title text-2xl font-semibold">Memory: ${phone.mainFeatures.memory}</h5>
      <h5 class="card-title text-2xl font-semibold">Storage: ${phone.mainFeatures.storage}</h5>

      <h2 class="text-3xl font-semibold">Others Information</h2>
      <h5 class="text-2xl font-semibold">Sensor: ${phone.mainFeatures.sensors}</h5>`
}
// with others and sensor information
  else{
      const displayDetail = document.getElementById('singleDetails');
   displayDetail.innerHTML =`
   <div class="card mb-3 w-75 mx-auto" >
  <div class="row g-0">
      <div class="col-sm-5 col-lg-5">
        <img src="${phone.image}" class="img-fluid rounded-start h-100">
        </div>
          <div class="col-sm-7 col-lg-7">
              <div class="card-body" id="others">
                <h3 class="card-title text-3xl font-semibold">Model: ${phone.name}</h3>
                <h5 class="card-title text-2xl font-semibold">Release Date: ${phone.releaseDate}</h5>
                <h5 class="card-title text-2xl font-semibold">Model: ${phone.brand}</h5>
                <h5 class="card-title text-2xl font-semibold">chipset: ${phone.mainFeatures.chipSet}</h5>
                <h5 class="card-title text-2xl font-semibold">Display Size: ${phone.mainFeatures.displaySize} </h5>
                <h5 class="card-title text-2xl font-semibold">Memory: ${phone.mainFeatures.memory}</h5>
                <h5 class="card-title text-2xl font-semibold">Storage: ${phone.mainFeatures.storage}</h5>

                <div>
                <h2 class="text-3xl font-semibold">Others Information</h2>
                <h5 class="text-2xl font-semibold">Sensor: ${phone.mainFeatures.sensors}</h5>
                <h5 class="text-2xl font-semibold">Bluetooth: ${phone.others.Bluetooth}</h5>
                <h5 class="text-2xl font-semibold">GPS: ${phone.others.GPS}</h5>
                <h5 class="text-2xl font-semibold">NFC: ${phone.others.NFC}</h5>
                <h5 class="text-2xl font-semibold">Radio: ${phone.others.Radio}</h5>
                <h5 class="text-2xl font-semibold">USB: ${phone.others.USB}</h5>
                <h5 class="text-2xl font-semibold">WLAN: ${phone.others.WLAN}</h5>    
                </div>
              </div>
            </div>
        </div>
      </div>
  </div>
`
  }
}