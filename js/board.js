class Board{
    //inicialice board
    constructor(width, height, element, func){
        this.width = width;
        this.height = height;
        this.population = 0;
        this.onclik = func;
        this.field = this.createField(element);  
        this.planted = [];          
    }
    createField(element){
        let field = [];
        let index = 1;

        for (let x = 0; x < this.height; x++) {
            let row = document.createElement('div');

            for (let y = 0; y < this.width; y++) {
                let col = document.createElement('div');
                col.id = index++;
                col.addEventListener("click", this.onclik);
                row.appendChild(col);
            }
            element.appendChild(row);
        }
        for (let i = 0; i < this.height; i++) {
            field.push(element.childNodes[i].childNodes)
        }
        return field;
    }

    plant(number, color = '#75972C'){
        let place = document.getElementById(number);
        console.log();
        if(place && !place.hasChildNodes()){
            let icon = document.createElement('i');
            icon.classList.add("fas");
            icon.classList.add("fa-tree");
            icon.style.color = color;
            place.appendChild(icon);
            this.planted.push(number);
        }else{
            if(place && place.hasChildNodes()){
                place.removeChild(place.firstChild);
                let index = this.planted.indexOf(number);
                this.planted.splice(index, 1);
            }
        }
        this.popUpdate();
    }
    clean(){
        for(let i = 1; i <= this.width * this.height; i++){
            let element = document.getElementById(i);
            if(element.hasChildNodes()){            
                element.removeChild(element.firstChild);
            }
        }
        this.planted = [];
        this.popUpdate();
    }

    popUpdate(){
        let pop = 0;
        for(let i = 1; i <= this.width * this.height; i++){
            let element = document.getElementById(i);
            if(element.hasChildNodes()){            
                pop++;
            }
        }
        this.population = pop;
    }
}