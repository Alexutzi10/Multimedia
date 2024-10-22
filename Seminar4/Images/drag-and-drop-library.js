class BarChart{
    /**
     * The canvas on which the bar chart will be displayed
     */
    #canvas

    /**
     * Construts a new instance
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas){
       this.#canvas = canvas; 
    }

    /**
     * Draws the bar chart
     * @param {Array<number>} values 
     * @param {Object} options
     */
    draw(values, options){
        
        const context = this.#canvas.getContext('2d');

        context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

        const barWidth = this.#canvas.width / values.length;

        const maxValue = Math.max(...values);
        const ratio = this.#canvas.height / maxValue;
       
        context.lineWidth = 2;
        context.strokeStyle = 'orange';
        //ontext.textAlign = 'center';

        for(let i = 0; i < values.length; i++){
            const barX = i * barWidth;
            const barHeight = values[i] * ratio * 0.9;
            const barY = this.#canvas.height - barHeight;

            context.fillStyle = 'red';
            context.fillRect(barX + barWidth / 4, barY, barWidth / 2, barHeight);

            if (options.drawOutline)
                context.strokeRect(barX + barWidth / 4, barY, barWidth / 2, barHeight)

            if (options.drawLabels) {
                context.fillStyle = 'white';
                //context.fillText(values[i], barX + barWidth / 2, barY + 20);

                context.fillText(
                    values[i], 
                    barX + barWidth / 2 - context.measureText(values[i]).width / 2, 
                    barY + 20);
            }
        }
    }
}