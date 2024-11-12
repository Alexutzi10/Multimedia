import { ImageEditor } from './image-editor.js';

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
    })
    reader.readAsDataURL(file);
});

const buttons = document.querySelectorAll('button');
for(let i=0; i<buttons.length; i++) {
    buttons[i].addEventListener('click', ()=>{
        const effect = buttons[i].dataset.effect;
        imageEditor.changeEffect(effect);
    });
}