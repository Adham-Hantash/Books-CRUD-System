// get books status
var bookName = document.getElementById('bookName');
var bookCatigory = document.getElementById('bookCatigory');
var bookNumber = document.getElementById('bookNumber');
var bookPrice = document.getElementById('bookPrice');
var bookDescription = document.getElementById('bookDescription');
var bookBook = document.getElementById('bookBook');
var bookReturn = document.getElementById('bookReturn');
var Submit = document.getElementById('Submit');
var Clear = document.getElementById('Clear');
var search = document.getElementById('search');
var deleteAll = document.getElementById('deleteAll');
var tbody = document.getElementById('tbody');
var bookCount = document.getElementById('bookCount');
var Books;
var index;
if(localStorage.getItem('Books')){
    Books= JSON.parse(localStorage.getItem('Books'));
    displayData(); 
}
else
Books = [];


Submit.onclick = function(event){
    if(Submit.value == "Submit" && bookCount.value == 1){
    event.preventDefault();
    createOrder();
    PrintData();
    displayData();
    clearData();
    }

    else if(Submit.value == "Submit" && bookCount.value>1){
        event.preventDefault();
        booksCount();
        PrintData();
        displayData();
        clearData();
    }
    else if(Submit.value == "Submit" && bookCount.value<1){
        event.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter your books count',
          })
    }

    else{
        event.preventDefault();
        updateData(index);
    }
}

//create order
function createOrder (){
    var book = {
        bookName: bookName.value,
        bookCatigory: bookCatigory.value,
        bookNumber:bookNumber.value,
        bookPrice:bookPrice.value,
        bookDescription:bookDescription.value,
        bookBook:bookBook.value,
        bookReturn:bookReturn.value
    };
    Books.push(book);
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your book has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    localStorage.setItem('Books' , JSON.stringify(Books));
}

function PrintData(){
    console.log(Books);
}

//read orders
function displayData(){
var data = "";
for (var i =0; i<Books.length;i++)
data+=`
<tr>
<td>${i+1}</td>
<td>${Books[i].bookName}</td>
<td>${Books[i].bookCatigory}</td>
<td>${Books[i].bookNumber}</td>
<td>${Books[i].bookPrice}</td>
<td>${Books[i].bookDescription}</td>
<td>${Books[i].bookBook}</td>
<td>${Books[i].bookReturn}</td>
<td><button class="btn btn-info" onclick="selData(${i})">Update</button></td>
<td><button class="btn btn-danger" onclick="delBut(${i})">Delete</button></td>
</tr>
`
tbody.innerHTML = data;
}

//clear Data
function clearData() {
    bookName.value = ''; 
    bookCatigory.value = ''; 
    bookNumber.value = ''; 
    bookPrice.value = ''; 
    bookCount.value = ''; 
    bookDescription.value = ''; 
    bookBook.value = ''; 
    bookReturn.value = ''; 
}

// delete button
function delBut(i){
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
        Books.splice(i,1);
        displayData();
      localStorage.setItem('Books' , JSON.stringify(Books));
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your book has been deleted.',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your book is safe :)',
        'error'
      )
    }
  })

}


//delete all
deleteAll.onclick = function() {
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
        Books= [];
        displayData();
        localStorage.setItem('Books' , JSON.stringify(Books));
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your book has been deleted.',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your books are safe :)',
        'error'
      )
    }
  })

}

//update data
function selData(i) {
    bookName.value = Books[i].bookName;
    bookCatigory.value = Books[i].bookCatigory;
    bookNumber.value = Books[i].bookNumber;
    bookPrice.value = Books[i].bookPrice;
    bookDescription.value = Books[i].bookDescription;
    bookBook.value = Books[i].bookBook;
    bookReturn.value = Books[i].bookReturn;
Submit.value = "Update Book";
index = i;
}

function updateData(i){
    var book = {
        bookName: bookName.value,
        bookCatigory: bookCatigory.value,
        bookNumber:bookNumber.value,
        bookPrice:bookPrice.value,
        bookDescription:bookDescription.value,
        bookBook:bookBook.value,
        bookReturn:bookReturn.value
    };

    Books[i]=book;
    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    localStorage.setItem('Books' , JSON.stringify(Books));
    displayData();
    Submit.value = "Submit";
}

function booksCount(){
    var book = {
        bookName: bookName.value,
        bookCatigory: bookCatigory.value,
        bookNumber:bookNumber.value,
        bookPrice:bookPrice.value,
        bookDescription:bookDescription.value,
        bookBook:bookBook.value,
        bookReturn:bookReturn.value
    };

    for (var i=0;i<bookCount.value;i++){
         Books.push(book);
         localStorage.setItem('Books' , JSON.stringify(Books));
    }

}

//validation
/*
book name -- chars
at least 3chars
first character must be capital
*/ 

bookName.onkeyup = function(){
    var pattern = /^[A-Z a-z\s]{3,10}$/;
    if(pattern.test(bookName.value.trim())){
      if(bookName.classList.contains('is-invalid')){
        bookName.classList.replace('is-invalid' , 'is-valid')
      }else{
        Submit.removeAttribute('disabled');
        bookName.classList.add('is-valid');
      }
  
    }
    else{
      if(bookName.classList.contains('is-valid')){
        bookName.classList.replace('is-valid' , 'is-invalid')
      }
      else{
        Submit.setAttribute('disabled' , 'disabled' );
        bookName.classList.add('is-invalid');
      }
    }
  }
////////////////////////////////////////////

  bookCatigory.onkeyup = function(){
    var pattern = /^[A-Z a-z\s]{3,10}$/;
    if(pattern.test(bookCatigory.value.trim())){
      if(bookCatigory.classList.contains('is-invalid')){
        bookCatigory.classList.replace('is-invalid' , 'is-valid')
      }else{
        Submit.removeAttribute('disabled');
        bookCatigory.classList.add('is-valid');
      }
  
    }
    else{
      if(bookCatigory.classList.contains('is-valid')){
        bookCatigory.classList.replace('is-valid' , 'is-invalid')
      }
      else{
        Submit.setAttribute('disabled' , 'disabled' );
        bookCatigory.classList.add('is-invalid');
      }
    }
  }
//////////////////////////////////////////////////
  bookNumber.onkeyup = function(){
    var pattern = /^[0-9]{2,10}$/;
    if(pattern.test(bookNumber.value.trim())){
      if(bookNumber.classList.contains('is-invalid')){
        bookNumber.classList.replace('is-invalid' , 'is-valid')
      }else{
        Submit.removeAttribute('disabled');
        bookNumber.classList.add('is-valid');
      }
  
    }
    else{
      if(bookNumber.classList.contains('is-valid')){
        bookNumber.classList.replace('is-valid' , 'is-invalid')
      }
      else{
        Submit.setAttribute('disabled' , 'disabled' );
        bookNumber.classList.add('is-invalid');
      }
    }
  }
//////////////////////////////////////////////////

  bookPrice.onkeyup = function(){
    var pattern = /^[0-9]{2,10}$/;
    if(pattern.test(bookPrice.value.trim())){
      if(bookPrice.classList.contains('is-invalid')){
        bookPrice.classList.replace('is-invalid' , 'is-valid')
      }else{
        Submit.removeAttribute('disabled');
        bookPrice.classList.add('is-valid');
      }
  
    }
    else{
      if(bookPrice.classList.contains('is-valid')){
        bookPrice.classList.replace('is-valid' , 'is-invalid')
      }
      else{
        Submit.setAttribute('disabled' , 'disabled' );
        bookPrice.classList.add('is-invalid');
      }
    }
  }
//////////////////////////////////////////////////

  bookDescription.onkeyup = function(){
    var pattern = /^[A-Z a-z\s]{3,100}$/;
    if(pattern.test(bookDescription.value.trim())){
      if(bookDescription.classList.contains('is-invalid')){
        bookDescription.classList.replace('is-invalid' , 'is-valid')
      }else{
        Submit.removeAttribute('disabled');
        bookDescription.classList.add('is-valid');
      }
  
    }
    else{
      if(bookDescription.classList.contains('is-valid')){
        bookDescription.classList.replace('is-valid' , 'is-invalid')
      }
      else{
        Submit.setAttribute('disabled' , 'disabled' );
        bookDescription.classList.add('is-invalid');
      }
    }
  }

  bookCount.onkeyup = function(){
    var pattern = /^[0-9]{1,3}$/;
    if(pattern.test(bookCount.value.trim())){
      if(bookCount.classList.contains('is-invalid')){
        bookCount.classList.replace('is-invalid' , 'is-valid')
      }else{
        Submit.removeAttribute('disabled');
        bookCount.classList.add('is-valid');
      }
  
    }
    else{
      if(bookCount.classList.contains('is-valid')){
        bookCount.classList.replace('is-valid' , 'is-invalid')
      }
      else{
        Submit.setAttribute('disabled' , 'disabled' );
        bookCount.classList.add('is-invalid');
      }
    }
  }
  //////////////////////////////////////////

  //search
  
