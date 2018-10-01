const TypeWriter = function(txtElement, words, wait = 2200) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

//Type Method
TypeWriter.prototype.type = function() {
    //current index of word
    const current = this.wordIndex % this.words.length;

    // full text of the current word
    const fullTxt = this.words[current];

    //Check if the deleting
    if (this.isDeleting) {
        //Remove a char
        this.txt = fullTxt.substring(0 , this.txt.length - 1);
    } else {
        //Add a char
        this.txt = fullTxt.substring(0 , this.txt.length + 1);
    }

    //Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

    // Initial Type speed
    let typeSpeed = 250;

    if (this.isDeleting) {
        typeSpeed /= 2;
    }

    //If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
        typeSpeed = this.wait;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        //Move to next word
        this.wordIndex++;
        //Pause before start typing
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
}

// Init on DOM load
document.addEventListener('DOMContentLoaded', init);

// Init our app
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    //Init typewriter
    new TypeWriter(txtElement, words, wait);
}