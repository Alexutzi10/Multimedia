export class ImageEditor {
    /**
    * @type {HTMLCanvasElement}
    */
    #visibleCanvas
    /**
    * @type {HTMLCanvasElement}
    */
    #offscreenCanvas
    #visibleCanvasContext
    #offscreenCanvasContext

    /**
     * Creates a new instance
     * @param {HTMLCanvasElement} visibleCanvas 
     */
    constructor(visibleCanvas) {
        this.#visibleCanvas = visibleCanvas;
        this.#offscreenCanvas = document.createElement('canvas');
        this.#visibleCanvasContext = this.#visibleCanvas.getContext('2d');
        this.#offscreenCanvasContext = this.#offscreenCanvas.getContext('2d');
    }

    /**
     * Changes the current image
     * @param {HTMLImageElement} img 
     */
    changeImage(img) {
        this.#visibleCanvas.width = this.#offscreenCanvas.width = img.naturalWidth;
        this.#visibleCanvas.height = this.#offscreenCanvas.height = img.naturalHeight;

        this.#offscreenCanvasContext.drawImage(img, 0, 0);
        this.changeEffect('normal');
    }

    /**
     * Saves the current image
     */
    saveImage() {   
        const dataURL = this.#visibleCanvas.toDataURL('image/webp', 1);
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = 'image.webp';
        a.click();
    }

    changeEffect(effect) {
        switch(effect){
            case 'normal':
                this.#normal();
                break;
            case 'grayscale':
                this.#grayscale();
                break;
            case 'sepia':
                this.#sepia();
                break;
            case 'negative':
                this.#negative();
                break;
            case 'darker':
                this.#darker(20);
                break;
            case 'pixelate':
                this.#pixelate(10);
                break;
        }
    }

    #normal() {
        this.#visibleCanvasContext.drawImage(this.#offscreenCanvas, 0, 0);
    }

    #grayscale() {
        const imageData = this.#offscreenCanvasContext.getImageData(0, 0, this.#offscreenCanvas.width, this.#offscreenCanvas.height);

        const data = imageData.data;

        for(let i=0; i < data.length; i+=4){
            data[i] = data[i+1] = data[i+2] = Math.round((data[i] + data[i+1] + data[i+2])/3);
        }

        this.#visibleCanvasContext.putImageData(imageData,0, 0);
    }

    #sepia() {
        const imageData = this.#offscreenCanvasContext.getImageData(0, 0, this.#offscreenCanvas.width, this.#offscreenCanvas.height);

        const data = imageData.data;

        for(let i=0; i < data.length; i+=4){
            const r = data[i];
            const g = data[i+1];
            const b = data[i+2];

            data[i] = Math.min(255, Math.round((r * .393) + (g *.769) + (b * .189)));
            data[i+1] = Math.min(255, Math.round((r * .349) + (g *.686) + (b * .168)));
            data[i+2] = Math.min(255, Math.round((r * .272) + (g *.534) + (b * .131)));
        }

        this.#visibleCanvasContext.putImageData(imageData,0, 0);
    }

    #negative() {
        const imageData = this.#offscreenCanvasContext.getImageData(0, 0, this.#offscreenCanvas.width, this.#offscreenCanvas.height);

        const data = imageData.data;

        for(let i=0; i < data.length; i+=4){
            data[i] = 255 - data[i];
            data[i+1] = 255 - data[i+1];
            data[i+2] = 255 - data[i+2];
        }

        this.#visibleCanvasContext.putImageData(imageData,0, 0);
    }

    #darker(adjustment) {
        const imageData = this.#offscreenCanvasContext.getImageData(0, 0, this.#offscreenCanvas.width, this.#offscreenCanvas.height);

        const data = imageData.data;

        for(let i=0; i < data.length; i+=4){
            data[i] = Math.max(0, data[i] - adjustment);
            data[i+1] = Math.max(0, data[i+1] - adjustment);
            data[i+2] = Math.max(0, data[i+2] - adjustment);
        }

        this.#visibleCanvasContext.putImageData(imageData,0, 0);
    }

    #pixelate(pixelLevel) {
        const imageData = this.#offscreenCanvasContext.getImageData(0, 0, this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const data = imageData.data;
        const width = this.#offscreenCanvas.width;
        const height = this.#offscreenCanvas.height;

        const pixelatedData = new ImageData(width, height);

        for (let y = 0; y < height; y += pixelLevel) {
            for (let x = 0; x < width; x += pixelLevel) {
                let rTotal = 0, gTotal = 0, bTotal = 0, aTotal = 0;
                let pixelCount = 0;

                for (let dy = 0; dy < pixelLevel && y + dy < height; dy++) {
                    for (let dx = 0; dx < pixelLevel && x + dx < width; dx++) {
                        const index = 4 * ((y + dy) * width + (x + dx));
                        rTotal += data[index];
                        gTotal += data[index + 1];
                        bTotal += data[index + 2];
                        aTotal += data[index + 3];
                        pixelCount++;
                    }
                }

                const rAvg = Math.round(rTotal / pixelCount);
                const gAvg = Math.round(gTotal / pixelCount);
                const bAvg = Math.round(bTotal / pixelCount);
                const aAvg = Math.round(aTotal / pixelCount);

                for (let dy = 0; dy < pixelLevel && y + dy < height; dy++) {
                    for (let dx = 0; dx < pixelLevel && x + dx < width; dx++) {
                        const index = 4 * ((y + dy) * width + (x + dx));
                        pixelatedData.data[index] = rAvg;
                        pixelatedData.data[index + 1] = gAvg;
                        pixelatedData.data[index + 2] = bAvg;
                        pixelatedData.data[index + 3] = aAvg;
                    }
                }
            }
        }

        this.#visibleCanvasContext.putImageData(pixelatedData, 0, 0);
    }
}