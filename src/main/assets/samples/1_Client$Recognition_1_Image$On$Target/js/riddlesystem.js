var Riddle = function() {
    this.isPassed = false;
    this.riddleText = '';
    this.nextRiddle = '';
};

Riddle.prototype = {

    setRiddleText: function(riddleText) {
        this.riddleText = riddleText;
    },

    getRiddleText : function() {
        return this.riddleText;
    },

    showText : function(target, index) {
        if (index < this.riddleText.length) {
            console.log('writing ' + this.riddleText[index]);
            if(this.riddleText.substring(index, index+5) == '<br/>') {
                $(target).append("<br/>");
                index +=5;
            } else {
                $(target).append(this.riddleText[index++]);
            }
            var $that = this;
            setTimeout(function () {
                $that.showText(target, index);
            }, 100);
        }
    },

    passRiddle : function() {
        this.isPassed = true;
    },

    setNextRiddle : function(riddle) {
        this.nextRiddle = riddle;
    },

    getNextRiddle : function() {
        return this.nextRiddle;
    },

    isSolved : function() {
        return this.isPassed;
    }

};