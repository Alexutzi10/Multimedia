const visibleCanvas = document.querySelector('#visible-canvas');

const filePicker = document.querySelector('#file-input').addEventListener('change', function() {
    // console.log(filePicker.files);

    const file = filePicker.files[0];

    const reader = new FileReader();

    reader.addEventListener('load', function() {
        //..
    });	
    reader.readAsDataURL();
});
