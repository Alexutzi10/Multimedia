export class BarChart{
    #svgns
    #svg

    /**
     * Contructs a new bar chart
     * @param {HTMLDivElement} divElement 
     */
    constructor(divElement){
        this.#svgns = 'http://www.w3.org/2000/svg';

        this.#svg = document.createElementNS(this.#svgns, 'svg');
        this.#svg.style.backgroundColor = 'WhiteSmoke';
        this.#svg.style.borderStyle = 'solid';
        this.#svg.style.borderWidth = '1px';
        divElement.appendChild(this.#svg);
    }

    /**
     * Draws the values
     * @param {Array<Array<>>} values 
     */
    draw(values){
        const barWidth = this.#svg.clientWidth / values.length;

        const maxValue = Math.max(...values.map(x => x[1]))
        const f = this.#svg.clientHeight / maxValue;
        
        for(let i = 0; i< values.length; i++){
            const label = values[i][0];
            const value = values[i][1];

            const barX = i * barWidth;

            const barHeight = value * f;
            const barY = this.#svg.clientHeight - barHeight;

            const bar = document.createElementNS(this.#svgns, 'rect')
            bar.classList.add('bar');
            bar.setAttribute('x', barX);
            bar.setAttribute('y', barY);
            bar.setAttribute('width', barWidth);
            bar.setAttribute('height', barHeight);
            this.#svg.appendChild(bar);

            const barLabel = document.createElementNS(this.#svgns, 'text');
            barLabel.textContent = label;
            barLabel.setAttribute('x', barX + barWidth / 2);
            barLabel.setAttribute('y', this.#svg.clientHeight - 5);
            barLabel.setAttribute('text-anchor', 'middle');
            this.#svg.appendChild(barLabel);            
        }
    }
}