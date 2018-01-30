var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');
var assert = require('assert');
describe('generateMessage',()=>{
    it('should generate correct message',()=>{
        var from = 'matt';
        var text = 'hello bob';

        var result = generateMessage(from, text);
        // expect(result.from).toBe(from);
        // expect(result.text).toBe(text);
        expect(result.createdAt).toBeA('number');
        expect(result).toInclude({from,text});


    });
});

describe('generationLocationMessage', ()=>{
    it('should generate correct location object ', ()=>{
        var from = 'Admin';
        var lat = 15;
        var long = 19;
        var url = 'https://www.google.com/maps/?q=15,19';
        var msg = generateLocationMessage(from,lat,long);

        expect(msg.createdAt).toBeA('number');
        expect(msg).toInclude({from,url});
    });
});