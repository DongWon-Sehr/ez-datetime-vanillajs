class ezDatetime {
    constructor() {
    }
  }
  
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = ezDatetime;
  } else {
    window.ezDatetime = ezDatetime;
  }