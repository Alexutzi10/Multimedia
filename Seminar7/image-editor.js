export class ImageEditor {
  
    /**
        * @type {HTMLCanvasElement} 
    */
    #visibleCanvas;

    /**
     * @type {HTMLCanvasElement}
     */
    #offscreenCanvas;

    /**
     * @type {CanvasRenderingContext2D}
     */
    #visibleCanvasContext;

    /**
     * @type {CanvasRenderingContext2D}
     */
    #offscreenCanvasContext;

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

    changeEffect(effect) {
        switch(effect) {
            case 'normal':
                this.#normal();
                break;
            
            case 'grayscale':
                this.#grayscale();
                break;

            case 'threshold':
                this.#threshold();
                break;
        }
    }

    #normal() {
        this.#visibleCanvasContext.drawImage(this.#offscreenCanvas, 0, 0);
    }

    #grayscale() {
        const imageData = this.#offscreenCanvasContext.getImageData(0, 0, this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const data = imageData.data;

        for(let i=0; i<data.length; i+=4) {
            data[i] = data[i+1] = data[i+2] = Math.round((data[i]+data[i+1]+data[i+2])/3);
        }

        this.#visibleCanvasContext.putImageData(imageData, 0, 0);
    }

    #threshold() {
        this.#visibleCanvasContext.drawImage(this.#offscreenCanvas, 0, 0);
        const imageData = this.#visibleCanvasContext.getImageData(0, 0, this.#visibleCanvas.width, this.#visibleCanvas.height);
        const pixels = imageData.data;
    
        for (let i=0; i<pixels.length; i+=4) {
          const avg = Math.round((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
          const color = avg > 127 ? 255 : 0;
          pixels[i] = pixels[i+1] = pixels[i+2] = color;
        }
    
        this.#visibleCanvasContext.putImageData(imageData, 0, 0);
      }
}
