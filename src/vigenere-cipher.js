const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphabethonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphabethonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphabethonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphabethonse') => '!NWAD TA KCATTA'
 * 
 */
 class VigenereCipheringMachine {
  constructor(direct = true) {
    this.alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    this.direct = direct;
  }

  encrypt(message, key) {
    if (!message || !key) throw new Error('Incorrect arguments!');

    message = message.toUpperCase();
		key = key.toUpperCase();
    let index = 0;
    let res = '';

    for (let i = 0; i < message.length; i++) {
      if (!this.alphabet.includes(message[i])) {
        res += message[i];
        continue;
      }
      res += this.alphabet[(this.alphabet.indexOf(message[i]) + this.alphabet.indexOf(key[index++ % key.length])) % this.alphabet.length];
    }
    return this.direct ? res : res.split('').reverse().join('');
  }

  decrypt(message, key) {
    if (!message || !key) throw new Error('Incorrect arguments!');
    
    message = message.toUpperCase();
		key = key.toUpperCase();
    let index = 0;
    let res = '';

    for (let i = 0; i < message.length; i++) {
      if (!this.alphabet.includes(message[i])) {
        res += message[i];
        continue;
      }

      let dec = this.alphabet.indexOf(message[i]) - this.alphabet.indexOf(key[index++ % key.length]) % this.alphabet.length;

      if (dec >= 0)
        res += this.alphabet[dec];  
      else
        res += this.alphabet[this.alphabet.length + dec];
    }
    return this.direct ? res : res.split('').reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
