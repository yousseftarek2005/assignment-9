var formValid = document.querySelector(".formValid");
var inputName = document.querySelector(".inputName");
var inputNum = document.querySelector(".inputNum");
var inputEmail = document.querySelector(".inputEmail");
var inputAddress = document.querySelector(".inputAddress");
var selectGroup = document.querySelector(".selectGroup");
var textarea = document.querySelector(".textarea");
var favCheck = document.querySelector("#favCheck");
var emergencyCheck = document.querySelector("#emergencyCheck");
var inputSearch = document.querySelector(".inputSearch");
let errorPhone = document.querySelector(".errorPhone");
const modalElement = document.getElementById("exampleModal");
modalElement.addEventListener("hidden.bs.modal", function () {
  formValid.reset();
  resetValidation();
  document.querySelector(".btnUpdate").classList.add("d-none");
  document.querySelector(".btnSave").classList.remove("d-none");
});
var Contact;

if (localStorage.getItem("contact") != null) {
  Contact = JSON.parse(localStorage.getItem("contact"));
} else {
  Contact = [];
}
showcontact();
showFavorite();
showEmergency();
function clear() {
  inputName.value = "";
  inputEmail.value = "";
  inputNum.value = "";
  inputAddress.value = "";
  selectGroup.value = "";
  favCheck.checked = false;
  emergencyCheck.checked = false;
}
function createCard() {
  var ContactList = {
    name: inputName.value,
    email: inputEmail.value,
    number: inputNum.value,
    address: inputAddress.value,
    group: selectGroup.value,
    favorite: favCheck.checked,
    emergency: emergencyCheck.checked,
  };
  Contact.push(ContactList);
  localStorage.setItem("contact", JSON.stringify(Contact));
}
function renderCard(contact, i) {
  let initials = contact.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return ` <div class="col-12 col-md-6">
              
                <div
                  class="card border-0 shadow-sm shadow-h rounded-4 p-4 mb-3"
                  style="max-width: 500px"
                >
                  <div class="d-flex align-items-start gap-3">
                    
                    <div class="position-relative">
                      
                      <div
                        class="d-flex align-items-center justify-content-center text-white fw-bold"
                        style="
                          width: 55px;
                          height: 55px;
                          background-color: #8a3ffc;
                          border-radius: 16px;
                        "
                      >
                        ${initials}
                      </div>

                      <span 
                        class="position-absolute fav-btn  icon-fav-emar  top-0 start-100 translate-middle  d-flex align-items-center justify-content-center ${contact.favorite ? "" : "d-none"}"
                      >
                        <i class="fa-solid fa-star"></i>
                      </span>

                      <span 
                        class="position-absolute top-100 start-100 translate-middle emar-btn  d-flex align-items-center justify-content-center ${contact.emergency ? "" : "d-none"} icon-fav-emar "
                      >
                        <i class="fa-solid fa-heart-pulse"></i>
                      </span>

                    </div>
                    
                    <div>
                      <h5 class="fw-bold mb-1" style="color: #1e293b">
                        ${contact.name}
                      </h5>
                      <div
                        class="d-flex align-items-center gap-2 text-muted small bg-light px-2 py-1 rounded"
                      >
                        <i
                          class="fa-solid fa-phone text-primary"
                          style="font-size: 12px"
                        ></i>
                        <span>${contact.number}</span>
                      </div>
                    </div>
                  </div>

          
                  <div class="mt-4 pt-2">
                    <div
                      class="d-flex align-items-center gap-2 text-muted mb-2 small"
                    >
                      <span
                        class="d-flex align-items-center justify-content-center rounded bg-light-subtle"
                        style="width: 24px; height: 24px"
                      >
                        <i
                          class="fa-solid fa-envelope"
                          style="font-size: 12px; color: #6366f1"
                        ></i>
                      </span>
                      <span>${contact.email}</span>
                    </div>

                    <div
                      class="d-flex align-items-center gap-2 text-muted mb-3 small"
                    >
                      <span
                        class="d-flex align-items-center justify-content-center rounded bg-light-subtle"
                        style="width: 24px; height: 24px"
                      >
                        <i
                          class="fa-solid fa-location-dot text-success"
                          style="font-size: 12px"
                        ></i>
                      </span>
                      <span> ${contact.address}</span>
                    </div>


                    <span
                      class="badge rounded-pill fw-medium small"
                      style="
                        background-color: #e0f2fe;
                        color: #0284c7;
                        padding: 0.375rem 0.75rem;
                      "
                      >${contact.group}</span
                    >
                       <span
                      class="badge rounded-pill fw-medium small ${contact.emergency ? "" : "d-none"}"
                      style="
                        background-color: #fff1f2;
                        color: #ff2a51;
                        padding: 0.375rem 0.75rem;
                      "
                      >  <i class="fa-solid fa-heart-pulse color-emar"></i>Emergency</span
                    >
                  </div>

   
                  <div
                    class="d-flex justify-content-between align-items-center mt-4 pt-3 border-top"
                    style="border-color: #f1f5f9"
                  >
                    <div class="d-flex gap-2">
                      <button
                        type="button"
                        class="btn btn-light rounded-3 p-0 d-flex align-items-center justify-content-center"
                        style="
                          width: 35px;
                          height: 35px;
                          background-color: #f0fdf4;
                          color: #16a34a;
                        "
                      >
                        <i class="fa-solid fa-phone"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-light rounded-3 p-0 d-flex align-items-center justify-content-center emailBtn "
                        style="
                          width: 35px;
                          height: 35px;
                          background-color: #f5f3ff;
                          color: #7c3aed;
                        "
                        onclick="email(${i})"
                      >
                        <i class="fa-solid fa-envelope"></i>
                      </button>
                    </div>

                    <div class="d-flex gap-3">
      
                      <button
                        type="button"
                        class="btn p-0 border-0 favorit cursor-pointer ${contact.favorite ? "color-star" : ""}" onclick="fav(${i})"
                      >
                       <i class=" ${contact.favorite ? " fa-solid fa-star" : " fa-regular fa-star"}"></i>
                      </button>
                      <button
                        type="button"
                        class="btn p-0 border-0 emerg cursor-pointer  ${contact.emergency ? "color-emar" : ""}"onclick="emar(${i})"
                      >
                    <i class=" ${contact.emergency ? " fa-solid fa-heart-pulse" : " fa-regular fa-heart"}"></i>
                      </button>
                      <button
                        type="button"
                        class="btn p-0 border-0 update cursor-pointer" onclick="update(${i})"
                      >
                        <i class="fa-solid fa-pen"></i>
                      </button>
                      <button
                        type="button"
                        class="btn p-0 border-0 text-danger cursor-pointer btndelete" onclick="deletecart(${i})"
                      >
                        <i class="fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>`;
}
function showcontact() {
  var box = "";
  for (var i = 0; i < Contact.length; i++) {
    box += renderCard(Contact[i], i);
  }
  document.querySelectorAll(".total").forEach((k) => {
    k.innerHTML = Contact.length;
  });
  document.querySelector(".rowData").innerHTML =
    box ||
    `<div class="text-center d-flex flex-column align-items-center">
            
            <div class="icon-box">
                <i class="fa-solid fa-contact-book"></i>
            </div>
            
            <h5 class="text-title mb-2">No contacts found</h5>
            <p class="text-subtitle mb-0">Click "Add Contact" to get started</p>
            
        </div>`;
}
function localShow() {
  localStorage.setItem("contact", JSON.stringify(Contact));
  showcontact();
}
function deletecart(index) {
  Swal.fire({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${Contact[index].name}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Contact.splice(index, 1);
      localShow();
      showFavorite();
      showEmergency();
      Swal.fire({
        title: "Deleted!",
        text: "Your Contact has been deleted.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
}
function showFavorite() {
  var box = "";
  var count = 0;

  for (let i = 0; i < Contact.length; i++) {
    if (Contact[i].favorite) {
      let initials = Contact[i].name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

      box += `
     <div class="card border-0 shadow-sm rounded-4 p-3 mb-3">
      <div class="d-flex hover-card bg-fav align-items-center justify-content-between">
        <div class="d-flex align-items-center gap-3">
          <div
            class="d-flex align-items-center justify-content-center rounded-3 text-white fw-bold"
            style="
              width: 50px;
              height: 50px;
              background: linear-gradient(135deg, #df16ca, #e60067);
            "
          >
            ${initials}
          </div>

          <div>
            <h6 class="fw-bold mb-0">${Contact[i].name}</h6>
            <span class="text-muted small">${Contact[i].number}</span>
          </div>
        </div>

        <button class="btn icon-phone favo border-0">
          <i class="fa-solid fa-phone"></i>
        </button>
      </div>
    </div>
      `;
      count++;
    }
  }

  document.querySelector(".fav").innerHTML = count;
  document.querySelector(".favoriteData").innerHTML =
    box || "<p class='text-muted'>No favorite contacts</p>";
}
function showEmergency() {
  let box = "";
  var count = 0;
  for (let i = 0; i < Contact.length; i++) {
    if (Contact[i].emergency) {
      let initials = Contact[i].name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

      box += `
      <div class="card border-0 shadow-sm rounded-4 p-3 mb-3">
        <div class="d-flex hover-card bg-emer align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-3">
            <div
              class="d-flex align-items-center justify-content-center rounded-3 text-white fw-bold"
              style="width:50px;height:50px;background:linear-gradient(135deg,#df16ca,#e60067);"
            >
              ${initials}
            </div>

            <div>
              <h6 class="fw-bold mb-0">${Contact[i].name}</h6>
              <span class="text-muted small">${Contact[i].number}</span>
            </div>
          </div>

          <button class="btn icon-phone emergen border-0">
            <i class="fa-solid fa-phone"></i>
          </button>
        </div>
      </div>
      `;
      count++;
    }
  }
  document.querySelector(".emar").innerHTML = count;
  document.querySelector(".emergencyData").innerHTML =
    box || "<p class='text-muted'>No emergency contacts</p>";
}
function fav(index) {
  Contact[index].favorite = !Contact[index].favorite;
  localShow();
  showFavorite();
}
function emar(index) {
  Contact[index].emergency = !Contact[index].emergency;
  localShow();
  showEmergency();
}
function email(index) {
  var mail = Contact[index].email;
  if (mail != "") {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${mail}`,
      "_blank",
    );
  }
}
var currentEditIndex = 0;
function update(index) {
  currentEditIndex = index;
  const contactupdate = Contact[index];

  inputName.value = contactupdate.name;
  inputEmail.value = contactupdate.email;
  inputNum.value = contactupdate.number;
  inputAddress.value = contactupdate.address;
  favCheck.checked = contactupdate.favorite;
  emergencyCheck.checked = contactupdate.emergency;

  const modal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("exampleModal"),
  );
  modal.show();
  document.querySelector(".btnUpdate").classList.remove("d-none");
  document.querySelector(".btnSave").classList.add("d-none");
}
function relupdate() {
  var ContactList = {
    name: inputName.value,
    email: inputEmail.value,
    number: inputNum.value,
    address: inputAddress.value,
    group: selectGroup.value,
    favorite: favCheck.checked,
    emergency: emergencyCheck.checked,
  };
  Contact.splice(currentEditIndex, 1, ContactList);
  localShow();
  showFavorite();
  showEmergency();
  formValid.reset();
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("exampleModal"),
  );

  modal.hide();

  Swal.fire({
    icon: "success",
    title: "Update!",
    text: "Contact has been Update successfully.",
    showConfirmButton: false,
    timer: 1500,
  });
}
function search() {
  var search = inputSearch.value;
  var box = "";
  if (Contact.length === 0) {
    document.querySelector(".rowData").innerHTML =
      `<div class="text-center d-flex flex-column align-items-center">
            
            <div class="icon-box">
                <i class="fa-solid fa-contact-book"></i>
            </div>
            
            <h5 class="text-title mb-2">No contacts found</h5>
            <p class="text-subtitle mb-0">Click "Add Contact" to get started</p>
            
        </div>`;
  } else {
    for (let i = 0; i < Contact.length; i++) {
      if (Contact[i].name.toUpperCase().includes(search.toUpperCase())) {
        box += renderCard(Contact[i], i);
      }
    }
    document.querySelector(".rowData").innerHTML =
      box ||
      `<div class="text-center d-flex flex-column align-items-center">
            
            <div class="icon-box">
                <i class="fa-solid fa-contact-book"></i>
            </div>
            
            <h5 class="text-title mb-2">No contacts found</h5>
            <p class="text-subtitle mb-0">Click "Add Contact" to get started</p>
            
        </div>`;
  }
}
function deleteAll() {
  if (Contact.length === 0) {
    Swal.fire({
      icon: "info",
      title: "No Contacts",
      text: "There are no contacts to delete.",
      confirmButtonText: "OK",
    });
    return;
  } else {
    Swal.fire({
      title: "Delete All Contact?",
      text: `Are you sure you want to delete All Contact? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Contact = [];
        localShow();
        showFavorite();
        showEmergency();
        Swal.fire({
          title: "Deleted!",
          text: "Your Contact has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
}
function validName(isSubmit = false) {
  var nameRegex = /^[A-Za-z ]{2,50}$/;
  var name = inputName.value;

  if (!isSubmit && name === "") {
    document.querySelector(".errorname").classList.add("d-none");
    inputName.classList.remove("eror");
    inputName.classList.remove("outline");
    return false;
  }

  if (nameRegex.test(name)) {
    document.querySelector(".errorname").classList.add("d-none");
    inputName.classList.remove("eror");
    inputName.classList.add("outline");
    return true;
  }

  document.querySelector(".errorname").classList.remove("d-none");
  inputName.classList.remove("outline");
  inputName.classList.add("eror");
  return false;
}
function validNumber(isSubmit = false) {
  var phoneRegex = /^01(0|1|2|5)[0-9]{8}$/;
  var phonechek = inputNum.value;
  if (!isSubmit && phonechek == "") {
    errorPhone.classList.add("d-none");
    inputNum.classList.remove("eror");
    inputNum.classList.remove("outline");
    return false;
  }
  if (phoneRegex.test(phonechek)) {
    errorPhone.classList.add("d-none");
    inputNum.classList.remove("eror");
    inputNum.classList.add("outline");
    return true;
  } else {
    errorPhone.classList.remove("d-none");
    inputNum.classList.remove("outline");
    inputNum.classList.add("eror");
    return false;
  }
}
function validEmail(isSubmit = false) {
  var emailRegex = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;
  var emailchek = inputEmail.value;
  if (!isSubmit && emailchek == "") {
    document.querySelector(".errorEmail").classList.add("d-none");

    inputEmail.classList.remove("eror");
    inputEmail.classList.remove("outline");
    return false;
  }
  if (emailRegex.test(emailchek)) {
    document.querySelector(".errorEmail").classList.add("d-none");
    inputEmail.classList.remove("eror");
    inputEmail.classList.add("outline");
    return true;
  } else {
    document.querySelector(".errorEmail").classList.remove("d-none");
    inputEmail.classList.remove("outline");
    inputEmail.classList.add("eror");
    return false;
  }
}
function resetValidation() {
  inputName.classList.remove("eror", "outline");
  inputEmail.classList.remove("eror", "outline");
  inputNum.classList.remove("eror", "outline");

  document.querySelector(".errorname").classList.add("d-none");
  document.querySelector(".errorEmail").classList.add("d-none");
  document.querySelector(".errorPhone").classList.add("d-none");
}
function isDuplicateNumber(number) {
  return Contact.some((c) => c.number === number);
}
formValid.onsubmit = (e) => {
  e.preventDefault();
  if (!validName()) {
    Swal.fire({
      icon: "error",
      title: "Missing Name",
      text: "Please enter a valid name!",
    });
    return;
  }
  if (!validNumber()) {
    Swal.fire({
      icon: "error",
      title: "Invalid Phone Number",
      text: "Please enter a valid Egyptian phone number!",
    });
    return;
  }
  if (isDuplicateNumber(inputNum.value)) {
    Swal.fire({
      icon: "warning",
      title: "Duplicate Number",
      text: "This phone number is already saved for another contact!",
    });
    return;
  }
  if (!validEmail()) {
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Please enter a valid email!",
    });
    return;
  }
  createCard();
  showcontact();
  showFavorite();
  showEmergency();

  const modal = bootstrap.Modal.getInstance(
    document.getElementById("exampleModal"),
  );
  modal.hide();
  Swal.fire({
    icon: "success",
    title: "Added!",
    text: "Contact has been added successfully.",
    showConfirmButton: false,
    timer: 1500,
  });
};
