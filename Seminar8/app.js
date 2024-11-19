import { ImageEditor } from "./image-editor.js";

const visibleCanvas = document.querySelector('#visible-canvas');
const filePicker = document.querySelector('#file-picker');
const imageEditor = new ImageEditor(visibleCanvas);

filePicker.addEventListener('change', ()=>{
    const file = filePicker.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', ()=>{
        const dataUrl = reader.result;
        
        const img = document.createElement('img');
        img.addEventListener('load', ()=>{
            imageEditor.changeImage(img);
        });
        img.src = dataUrl;
    });
    reader.readAsDataURL(file);
});

const modal = document.getElementById('effects-modal');
const openModalBtn = document.getElementById('open-effects-modal');
const closeModalBtn = modal.querySelector('.close-button');

openModalBtn.addEventListener('click', () => {
    modal.classList.add('show');
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('show');
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});

const effectButtons = modal.querySelectorAll('[data-effect]');
effectButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        const effect = button.dataset.effect;
        imageEditor.changeEffect(effect);
        modal.classList.remove('show');
    });
});